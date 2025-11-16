import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 🔹 Endpoints públicos donde NO se debe enviar el token
  const publicEndpoints = [
    '/api/authenticate',
    '/api/actualizaciones/programar',
    '/api/actualizaciones',
  ];

  const isPublic = publicEndpoints.some(url => req.url.includes(url));
  const token = authService.getToken();

  let authReq = req;

  // ✅ Si la ruta es privada y hay token, se adjunta
  if (!isPublic && token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    console.log(`🟢 Token agregado a: ${req.url}`);
  }
  // 🚫 Si es pública, eliminamos cualquier rastro de token
  else {
    authReq = req.clone({
      headers: req.headers.delete('Authorization'),
    });
    console.log(`🟡 Petición pública sin token: ${req.url}`);
  }

  // 🔄 Manejo de errores y renovación automática del token
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if ((error.status === 401 || error.status === 403) && !isPublic) {
        console.warn('⚠️ Token expirado. Intentando renovarlo...');

        const username = localStorage.getItem('lastUser');
        const password = localStorage.getItem('lastPass');

        if (username && password) {
          return authService.login(username, password).pipe(
            switchMap((res: any) => {
              localStorage.setItem('token', res.jwt);
              if (res.roles?.length) {
                localStorage.setItem('rol', res.roles[0]);
              }

              const newReq = req.clone({
                setHeaders: { Authorization: `Bearer ${res.jwt}` },
              });

              console.log('🔁 Token renovado correctamente. Reintentando solicitud...');
              return next(newReq);
            }),
            catchError(() => {
              console.error('❌ No se pudo renovar el token. Cerrando sesión.');
              localStorage.clear();
              router.navigate(['/login']);
              return throwError(() => error);
            })
          );
        } else {
          console.warn('⚠️ No hay credenciales guardadas. Cerrando sesión.');
          localStorage.clear();
          router.navigate(['/login']);
        }
      }

      // Otros errores
      console.error('❌ Error HTTP:', error.message);
      return throwError(() => error);
    })
  );
};
