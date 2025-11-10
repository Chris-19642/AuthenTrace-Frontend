import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-navbar-privado',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar-privado.html',
  styleUrl: './navbar-privado.css',
})
export class NavbarPrivado {
  menuAbierto = false;
  usuario: any;

  constructor(private auth: AuthService, private router: Router) {

    // TEMPORAL: hasta tener el login funcional
    this.usuario = {
      nombre: "Usuario Demo"
    };

    // CUANDO SE TENGAS LOGIN, ESTO REEMPLAZA LO DE ARRIBA:
    // this.usuario = this.auth.getUsuarioActual();
  }

  //toggleMenu() {
    //this.menuAbierto = !this.menuAbierto;
  //}

  irPerfil() {
    this.router.navigate(['/user/perfil']);
    this.menuAbierto = false;
  }
}
