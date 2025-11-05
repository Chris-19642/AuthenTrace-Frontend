import {inject, Injectable } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import {AuthService} from '../services/auth-service';
import {Router} from '@angular/router';
import {catchError, switchMap, throwError} from 'rxjs';

export const JwtInterceptor:HttpInterceptorFn = (req, next) =>{
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  // 🔹 Agregar token si existe
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // 🔸 Si el token expiró (403 del backend)
      if (error.status === 403) {
        console.warn('Token expirado. Intentando renovarlo automáticamente...');

        const username = localStorage.getItem('lastUser');
        const password = localStorage.getItem('lastPass');

        if (username && password) {
          // Rehacer login con las credenciales guardadas
          return authService.login(username, password).pipe(
            switchMap((res: any) => {
              // Guardar nuevo token y rol
              localStorage.setItem('token', res.jwt);
              if (res.roles?.length) {
                localStorage.setItem('rol', res.roles[0]);
              }

              // Reintentar la petición original con el nuevo token
              const newReq = req.clone({
                setHeaders: { Authorization: `Bearer ${res.jwt}` },
              });
              console.log('🔁 Token renovado. Reintentando solicitud original...');
              return next(newReq);
            }),
            catchError(() => {
              console.error('No se pudo renovar el token. Cerrando sesión.');
              localStorage.clear();
              router.navigate(['/login']);
              return throwError(() => error);
            })
          );
        } else {
          console.warn('No hay credenciales guardadas. Cerrando sesión.');
          localStorage.clear();
          router.navigate(['/login']);
        }
      }

      return throwError(() => error);
    })
  );
}
