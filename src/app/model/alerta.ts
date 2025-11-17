export class Alerta {
  id: number;
  tipoActividad: string;
  descripcion: string;
  fecha: Date = new Date();
  estado: string = 'PENDIENTE';
  usuarioAfectado: number;
  ipOrigen: string;
}
