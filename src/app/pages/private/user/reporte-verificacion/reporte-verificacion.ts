import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

export interface VerificacionReporte {
  idReporte: string;
  idDocumento: string;
  idUsuario: string;
  nombreDocumento: string;
  firmaAutentica: boolean;
  confianza: number;
  fechaVerificacion: Date;
  detalles?: string;
  discrepancias?: string[];
}

@Component({
  selector: 'app-reporte-verificacion',
  imports: [CommonModule],
  templateUrl: './reporte-verificacion.html',
  styleUrl: './reporte-verificacion.css',
})
export class ReporteVerificacion implements OnInit {

  // Datos del reporte - Aquí conectarás con el backend
  reporte: VerificacionReporte = {
    idReporte: 'REP001',
    idDocumento: 'DOC001',
    idUsuario: 'USR001',
    nombreDocumento: 'Documento 1',
    firmaAutentica: true,
    confianza: 95,
    fechaVerificacion: new Date(),
    detalles: 'La firma digital ha sido verificada exitosamente.',
    discrepancias: []
  };

  cargando: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener parámetros de la ruta si existen
    const idDocumento = this.route.snapshot.queryParamMap.get('idDocumento');
    const idUsuario = this.route.snapshot.queryParamMap.get('idUsuario');
    const idReporte = this.route.snapshot.paramMap.get('id');

    if (idReporte) {
      this.cargarReportePorId(idReporte);
    } else if (idDocumento && idUsuario) {
      this.verificarFirma(idDocumento, idUsuario);
    }
  }

  // Método para verificar firma (Escenario 1)
  verificarFirma(idDocumento: string, idUsuario: string): void {
    this.cargando = true;
    this.error = '';

    // TODO: Conectar con el backend
    // Endpoint: GET /api/verificacion/firma?idDocumento={id}&idUsuario={id}

    /* Ejemplo de implementación:
    this.verificacionService.verificarFirma(idDocumento, idUsuario).subscribe(
      (resultado: VerificacionReporte) => {
        this.reporte = resultado;
        this.cargando = false;
      },
      (error) => {
        this.error = 'Error al verificar la firma.';
        this.cargando = false;
      }
    );
    */

    setTimeout(() => {
      this.cargando = false;
    }, 1000);
  }

  // Método para cargar reporte por ID
  cargarReportePorId(idReporte: string): void {
    this.cargando = true;
    this.error = '';

    // TODO: Conectar con el backend
    // Endpoint: GET /api/reportes/{idReporte}

    setTimeout(() => {
      this.cargando = false;
    }, 1000);
  }

  // Método para descargar reporte como PDF (Escenario 2)
  descargarPDF(): void {
    console.log('Descargando PDF del reporte:', this.reporte.idReporte);

    // TODO: Conectar con el backend
    // Endpoint: GET /api/reportes/descargar/{idReporte}

    /* Ejemplo de implementación:
    this.reportesService.descargarReportePDF(this.reporte.idReporte).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `reporte_${this.reporte.nombreDocumento}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        if (error.status === 404) {
          this.error = 'El reporte no existe.';
        } else {
          this.error = 'Error al generar el PDF.';
        }
      }
    );
    */

    alert('Funcionalidad de descarga PDF - Conectar con backend');
  }

  get estadoTexto(): string {
    return this.reporte.firmaAutentica ? 'Firma auténtica' : 'Firma no auténtica';
  }
}
