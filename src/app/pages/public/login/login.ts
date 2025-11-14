import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from '../../../services/auth-service';
import {FormsModule} from '@angular/forms';
import {Sesion} from '../../../model/sesion';
import {SesionService} from '../../../services/sesion-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';

  sesionService = inject(SesionService);
  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log('Login exitoso:', res);
        const roles = res.roles || [];

        // Guardar token y rol en localStorage
        localStorage.setItem('token', res.jwt);
        localStorage.setItem('rol', roles[0]);

        localStorage.setItem('lastUser', this.username);
        localStorage.setItem('lastPass', this.password);

        const sesion = new Sesion();
        sesion.idSesion = 0;
        sesion.idUsuario = res.idUsuario;
        sesion.fechaInicio = new Date();
        sesion.fechaFin = new Date();
        sesion.ipOrigen = 'localhost';
        sesion.navegador = this.obtenerNavegador();

        console.log('Registrando sesión:', sesion);

        this.sesionService.registrarSesion(sesion).subscribe({
          next: (sesionRes) => {
            console.log('Sesión registrada exitosamente:', sesionRes);
            if (sesionRes.id) {
              localStorage.setItem('idSesion', sesionRes.id.toString());
            }
          },
          error: (err) => {
            console.error('Error al registrar sesión:', err);
          }
        });


        // Redirigir según el rol
        if (roles.includes('ROLE_ADMIN')) {
          console.log('Redirigiendo a /admin/inicio');
          this.router.navigate(['/admin/inicio']);
        } else if (roles.includes('ROLE_USER')) {
          console.log('Redirigiendo a /user/inicio');
          this.router.navigate(['/user/inicio']);
        } else {
          this.errorMessage = 'Rol desconocido.';
        }
      },
      error: (err) => {
        console.error('Error de login', err);
        this.errorMessage = 'Credenciales incorrectas.';
      }
    });
  }
  obtenerNavegador(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Desconocido';
  }
}
