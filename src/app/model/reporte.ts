export interface Reporte {
  id: number;
  idUsuario: number;
  idDocumento: number;
  estadoFirma: string;
  fechaGeneracion: string; // ISO string del backend
  rutaReporte: string;
}
