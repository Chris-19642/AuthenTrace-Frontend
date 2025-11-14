export class Sesion {
  idSesion: number;
  idUsuario: number;
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  ipOrigen: string;
  navegador: string;
  rol: string;
}
