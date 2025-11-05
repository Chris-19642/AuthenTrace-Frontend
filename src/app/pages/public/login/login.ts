import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from '../../../services/auth-service';
import {FormsModule} from '@angular/forms';

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


        // Redirigir según el rol
        if (roles.includes('ROLE_ADMIN')) {
          console.log('Redirigiendo a /admin/inicio');
          this.router.navigate(['/admin/inicio']);
        } else if (roles.includes('ROLE_USUARIO')) {
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
}
