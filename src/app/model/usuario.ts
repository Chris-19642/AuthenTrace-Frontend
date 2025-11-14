export class Usuario {
  idUsuario: number | null;
  nombre: string;
  apellido: string;
  correo: string;
  username: string;
  password: string;
  bloqueado: boolean = false;
  roles: any[] | null;
}
