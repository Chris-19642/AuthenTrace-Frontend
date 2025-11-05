import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  rol: string | null = null;

  constructor(private router: Router) {
    const storedRol = localStorage.getItem('rol');

    if (storedRol === 'ROLE_ADMIN') this.rol = 'ADMIN';
    else if (storedRol === 'ROLE_USUARIO') this.rol = 'USER';
    else this.rol = null;
  }
  logout() {
    // 🔹 Eliminar token y rol
    localStorage.removeItem('token');
    localStorage.removeItem('rol');

    // 🔹 Redirigir al login
    this.router.navigate(['/login']);
  }
}
