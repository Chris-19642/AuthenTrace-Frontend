import { Rol } from './rol';

export class Usuario {
  idUsuario: number = 0;
  nombre: string;
  correo: string;
  contrasena: string;
  bloqueado: boolean = false;
  rol: Rol = { idRol: 1, nombre: 'USUARIO' };
}
