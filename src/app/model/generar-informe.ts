export class GenerarInforme {
  mes: number;
  anio: number;
  totalSesiones: number;
  sesionesActivas: number;
  totalIntentosFallidos: number;
  ipsPrincipales: string[];
  estado?: string; // 'Listo' | 'En proceso'
  fechaGeneracion?: Date;
}
