import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
// @ts-ignore
import { MatIconModule } from '@angular/material/icon';
// TODO: Descomenta e importa tu servicio cuando lo tengas listo
// import { DocumentoService } from '../services/documento.service';

/**
 * INTERFAZ: Define la estructura de los datos de verificación
 * TODO: Ajusta esta interfaz según la respuesta de tu backend
 */
interface Documento {
  id: number;
  nombre: string;
  estado: 'válido' | 'falso'; // TODO: Cambiar por los valores que use tu backend
  fecha: string; // TODO: Si el backend devuelve timestamp, convertir a string formateado
}

/**
 * INTERFAZ: Define la estructura de los datos del gráfico
 * TODO: Ajusta según los datos que devuelva tu backend
 */
interface DatoGrafico {
  name: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class InicioUser implements OnInit {

  // ==================== PROPIEDADES DEL COMPONENTE ====================

  /**
   * TODO: ELIMINAR DESPUÉS DE INTEGRAR CON BACKEND
   * Total de documentos subidos - reemplazar con data del backend
   */
  documentosSubidos: number = 4;

  /**
   * TODO: ELIMINAR DESPUÉS DE INTEGRAR CON BACKEND
   * Datos mock del gráfico de firmas válidas vs fraude
   * Estructura esperada del backend en GET /api/estadisticas/resumen
   */
  datosGrafico: DatoGrafico[] = [
    { name: 'Firmas válidas', value: 75, color: '#C8E6C9' },
    { name: 'Fraude detectado', value: 25, color: '#CD6B72' }
  ];

  /**
   * TODO: REEMPLAZAR CON DATOS DEL BACKEND
   * Últimas verificaciones de documentos
   * GET /api/documentos/ultimas-verificaciones
   *
   * Estructura esperada del backend:
   * {
   *   success: true,
   *   data: {
   *     documentos: [
   *       {
   *         id: 1,
   *         nombre: "Documento 1",
   *         estado: "válido", // o "falso" según tu backend
   *         fecha: "2024-01-15 10:30:00" // o timestamp
   *       }
   *     ]
   *   }
   * }
   */
  ultimasVerificaciones: Documento[] = [
    {
      id: 1,
      nombre: 'Documento 1',
      estado: 'válido',
      fecha: 'DD/MM/YYYY 00:00'
    },
    {
      id: 2,
      nombre: 'Documento 2',
      estado: 'válido',
      fecha: 'DD/MM/YYYY 00:00'
    },
    {
      id: 3,
      nombre: 'Documento 3',
      estado: 'falso',
      fecha: 'DD/MM/YYYY 00:00'
    },
    {
      id: 4,
      nombre: 'Documento 4',
      estado: 'válido',
      fecha: 'DD/MM/YYYY 00:00'
    }
  ];

  /**
   * TODO: Inyectar tu servicio cuando lo tengas
   * constructor(private documentoService: DocumentoService) {}
   */
  constructor() {}

  // ==================== CICLO DE VIDA ====================

  /**
   * ngOnInit: Se ejecuta cuando el componente se inicializa
   * TODO: Aquí es donde debes cargar los datos reales del backend
   */
  ngOnInit(): void {
    // TODO: Descomenta cuando integres el backend
    // this.cargarDatos();

    console.log('Dashboard cargado'); // TODO: Eliminar en producción
  }

  // ==================== MÉTODOS ====================

  /**
   * TODO: IMPLEMENTAR ESTE MÉTODO CON TUS LLAMADAS AL BACKEND
   *
   * Ejemplo de integración:
   *
   * private cargarDatos(): void {
   *   // Cargar documentos subidos
   *   this.documentoService.obtenerEstadisticas().subscribe(
   *     (respuesta) => {
   *       this.documentosSubidos = respuesta.data.totalDocumentos;
   *       this.datosGrafico = respuesta.data.estadisticas;
   *     },
   *     (error) => {
   *       console.error('Error al cargar estadísticas:', error);
   *       // TODO: Mostrar snackbar o toast de error
   *     }
   *   );
   *
   *   // Cargar últimas verificaciones
   *   this.documentoService.obtenerUltimas(4).subscribe(
   *     (respuesta) => {
   *       // TODO: Si el backend devuelve fechas en timestamp, convertir
   *       this.ultimasVerificaciones = respuesta.data.documentos.map(doc => ({
   *         ...doc,
   *         fecha: this.formatearFecha(doc.fecha)
   *       }));
   *     },
   *     (error) => {
   *       console.error('Error al cargar verificaciones:', error);
   *     }
   *   );
   * }
   */

  /**
   * Determina la clase CSS del badge de estado
   * Retorna: 'estado-valido' o 'estado-falso'
   *
   * @param estado - El estado del documento ('válido' o 'falso')
   * @returns Clase CSS correspondiente
   *
   * TODO: Si tu backend usa otros valores, ajusta esta función
   * Ejemplo: if (estado === 1) return 'estado-valido'
   */
  getEstadoBadgeClass(estado: string): string {
    if (estado === 'válido') {
      return 'estado-valido';
    } else if (estado === 'falso') {
      return 'estado-falso';
    }
    return ''; // TODO: Manejar casos inesperados
  }

  /**
   * TODO: IMPLEMENTAR FORMATEO DE FECHA
   *
   * Ejemplo usando DatePipe de Angular:
   *
   * private formatearFecha(fecha: any): string {
   *   const datePipe = new DatePipe('es-ES');
   *   if (typeof fecha === 'number') {
   *     // Si es timestamp en milisegundos
   *     return datePipe.transform(fecha, 'dd/MM/yyyy HH:mm') || '';
   *   }
   *   // Si es string ISO
   *   return datePipe.transform(new Date(fecha), 'dd/MM/yyyy HH:mm') || '';
   * }
   *
   * O usando librería moment.js:
   * import * as moment from 'moment';
   *
   * private formatearFecha(fecha: any): string {
   *   return moment(fecha).format('DD/MM/YYYY HH:mm');
   * }
   */

  /**
   * TODO: MÉTODO OPCIONAL - Refrescar datos
   * Útil para un botón de "Actualizar" en la interfaz
   *
   * public refrescarDatos(): void {
   *   this.cargarDatos();
   * }
   */

  /**
   * TODO: MÉTODO OPCIONAL - Descargar reporte
   *
   * public descargarReporte(): void {
   *   this.documentoService.obtenerReporte().subscribe(
   *     (blob) => {
   *       const url = window.URL.createObjectURL(blob);
   *       const link = document.createElement('a');
   *       link.href = url;
   *       link.download = 'reporte-verificaciones.pdf';
   *       link.click();
   *     }
   *   );
   * }
   */

}

/**
 * ==================== GUÍA DE INTEGRACIÓN CON BACKEND ====================
 *
 * 1. CREAR SERVICIO (documento.service.ts):
 *    - GET /api/estadisticas/resumen → documentosSubidos, datosGrafico
 *    - GET /api/documentos/ultimas-verificaciones → ultimasVerificaciones
 *
 * 2. MÓDULOS NECESARIOS (imports en el component):
 *    - CommonModule (para *ngFor, *ngIf)
 *    - MatCardModule (para mat-card)
 *    - MatIconModule (para mat-icon)
 *
 * 3. INSTALACIÓN ANGULAR MATERIAL:
 *    ng add @angular/material
 *
 * 4. INSTALACIÓN MOMENT.JS (opcional):
 *    npm install moment --save
 *
 * 5. ESTRUCTURA ESPERADA DEL BACKEND:
 *
 *    GET /api/estadisticas/resumen
 *    {
 *      "success": true,
 *      "data": {
 *        "totalDocumentos": 4,
 *        "estadisticas": [
 *          { "name": "Firmas válidas", "value": 75 },
 *          { "name": "Fraude detectado", "value": 25 }
 *        ]
 *      }
 *    }
 *
 *    GET /api/documentos/ultimas-verificaciones
 *    {
 *      "success": true,
 *      "data": {
 *        "documentos": [
 *          {
 *            "id": 1,
 *            "nombre": "Documento 1",
 *            "estado": "válido",
 *            "fecha": "2024-01-15T10:30:00Z"
 *          }
 *        ]
 *      }
 *    }
 *
 * 6. USO EN APP ROUTING (app.routes.ts):
 *    import { InicioUser } from './components/inicio/inicio';
 *
 *    export const routes: Routes = [
 *      { path: 'dashboard', component: InicioUser },
 *      ...
 *    ];
 *
 * ==================== FIN GUÍA ====================
 */
