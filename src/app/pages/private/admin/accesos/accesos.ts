import { Component } from '@angular/core';

interface Usuario {
  nombre: string;
  rol: string;
  estado: string;
}

@Component({
  selector: 'app-accesos',
  standalone: true,
  templateUrl: './accesos.html',
  styleUrls: ['./accesos.css']
})
export class Accesos {
  usuarios: Usuario[] = [
    { nombre: 'Usuario 1', rol: 'Usuario', estado: 'Activo' },
    { nombre: 'Usuario 2', rol: 'Usuario', estado: 'Activo' },
    { nombre: 'Usuario 3', rol: 'Admin', estado: 'Bloqueado' },
    { nombre: 'Usuario 4', rol: '', estado: 'Bloqueado' },
    { nombre: 'Usuario 5', rol: '', estado: 'Activo' },
    { nombre: 'Usuario 6', rol: 'Admin', estado: 'Activo' }
  ];

  usuariosFiltrados: Usuario[] = [...this.usuarios];

  buscar(termino: string): void {
    const terminoLower = termino.toLowerCase().trim();

    if (!terminoLower) {
      this.usuariosFiltrados = [...this.usuarios];
      return;
    }

    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(terminoLower) ||
      usuario.rol.toLowerCase().includes(terminoLower) ||
      usuario.estado.toLowerCase().includes(terminoLower)
    );
  }


  editar(usuario: Usuario): void {
    console.log('Editar usuario:', usuario);
    alert(`Editando: ${usuario.nombre}`);
  }

  bloquear(usuario: Usuario): void {
    console.log('Bloquear usuario:', usuario);
    usuario.estado = usuario.estado === 'Activo' ? 'Bloqueado' : 'Activo';
  }

  eliminar(usuario: Usuario): void {
    console.log('Eliminar usuario:', usuario);
    if (confirm(`¿Desea eliminar a ${usuario.nombre}?`)) {
      this.usuarios = this.usuarios.filter(u => u !== usuario);
      this.usuariosFiltrados = this.usuariosFiltrados.filter(u => u !== usuario);
    }
  }

  verHistorial(): void {
    console.log('Ver historial de accesos');
    alert('Navegando al historial de accesos...');
  }
}
