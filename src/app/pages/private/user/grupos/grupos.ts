import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
// TODO: Descomenta e importa tu servicio cuando lo tengas listo
// import { GrupoService } from '../services/grupo.service';

/**
 * INTERFAZ: Define la estructura de un grupo
 * TODO: Ajusta esta interfaz según la respuesta de tu backend
 */
interface Grupo {
  id: number;
  nombre: string;
  cantidad: number; // TODO: Número de informes en el grupo
}

@Component({
  selector: 'app-grupos',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './grupos.html',
  styleUrl: './grupos.css'
})
export class Grupos {

  // ==================== PROPIEDADES DEL COMPONENTE ====================

  /**
   * TODO: ELIMINAR DESPUÉS DE INTEGRAR CON BACKEND
   * Lista de grupos
   * GET /api/grupos/listar
   *
   * Estructura esperada del backend:
   * {
   *   success: true,
   *   data: {
   *     grupos: [
   *       {
   *         id: 1,
   *         nombre: "Control Interno",
   *         cantidad: 3
   *       }
   *     ]
   *   }
   * }
   */
  grupos: Grupo[] = [
    { id: 1, nombre: 'Control Interno', cantidad: 3 },
    { id: 2, nombre: 'Grupo Temporal', cantidad: 4 },
    { id: 3, nombre: 'Verificaciones 2025', cantidad: 4 },
    { id: 4, nombre: 'Grupo A', cantidad: 2 }
  ];

  /**
   * Grupos filtrados según búsqueda
   */
  gruposFiltrados: Grupo[] = [];

  /**
   * Término de búsqueda
   */
  searchTerm: string = '';

  /**
   * Control de modal para crear grupo
   */
  showModalCrear: boolean = false;

  /**
   * Nombre del nuevo grupo a crear
   */
  nuevoGrupo: string = '';

  /**
   * TODO: Inyectar tu servicio cuando lo tengas
   * constructor(private grupoService: GrupoService) {}
   */
  constructor() {
    // Inicializar grupos filtrados
    this.gruposFiltrados = [...this.grupos];
  }

  // ==================== MÉTODOS ====================

  /**
   * TODO: IMPLEMENTAR ESTE MÉTODO CON TUS LLAMADAS AL BACKEND
   *
   * Ejemplo de integración:
   *
   * private cargarGrupos(): void {
   *   this.grupoService.obtenerGrupos().subscribe(
   *     (respuesta) => {
   *       this.grupos = respuesta.data.grupos;
   *       this.gruposFiltrados = [...this.grupos];
   *     },
   *     (error) => {
   *       console.error('Error al cargar grupos:', error);
   *       // TODO: Mostrar snackbar o toast de error
   *     }
   *   );
   * }
   */

  /**
   * Filtra grupos según el término de búsqueda
   */
  filtrarGrupos(): void {
    if (this.searchTerm.trim() === '') {
      this.gruposFiltrados = [...this.grupos];
    } else {
      this.gruposFiltrados = this.grupos.filter(grupo =>
        grupo.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  /**
   * Abre el modal para crear un nuevo grupo
   */
  abrirModalCrear(): void {
    this.showModalCrear = true;
    this.nuevoGrupo = '';
  }

  /**
   * Cierra el modal de crear grupo
   */
  cerrarModal(): void {
    this.showModalCrear = false;
    this.nuevoGrupo = '';
  }

  /**
   * Crea un nuevo grupo
   * TODO: Reemplazar con POST /api/grupos/crear
   *
   * Ejemplo de integración:
   *
   * crearGrupo(): void {
   *   if (this.nuevoGrupo.trim()) {
   *     this.grupoService.crearGrupo({ nombre: this.nuevoGrupo }).subscribe(
   *       (respuesta) => {
   *         this.grupos.push(respuesta.data.grupo);
   *         this.filtrarGrupos();
   *         this.cerrarModal();
   *         // TODO: Mostrar snackbar de éxito
   *       },
   *       (error) => {
   *         console.error('Error al crear grupo:', error);
   *         // TODO: Mostrar snackbar de error
   *       }
   *     );
   *   }
   * }
   */
  crearGrupo(): void {
    if (this.nuevoGrupo.trim()) {
      // Generar nuevo ID (en producción, el backend devuelve el ID)
      const nuevoId = Math.max(...this.grupos.map(g => g.id), 0) + 1;

      // Crear nuevo grupo
      const grupo: Grupo = {
        id: nuevoId,
        nombre: this.nuevoGrupo,
        cantidad: 0
      };

      this.grupos.push(grupo);
      this.filtrarGrupos();
      this.cerrarModal();

      console.log('Grupo creado:', grupo); // TODO: Eliminar en producción
    }
  }

  /**
   * Abre un grupo específico
   * TODO: Implementar navegación a detalles del grupo
   *
   * @param grupoId - ID del grupo a abrir
   */
  abrirGrupo(grupoId: number): void {
    // TODO: Navegar a componente de detalles del grupo
    // this.router.navigate(['/grupos', grupoId]);
    console.log('Abriendo grupo:', grupoId);
  }

  /**
   * TODO: MÉTODO OPCIONAL - Eliminar grupo
   *
   * eliminarGrupo(grupoId: number): void {
   *   this.grupoService.eliminarGrupo(grupoId).subscribe(
   *     () => {
   *       this.grupos = this.grupos.filter(g => g.id !== grupoId);
   *       this.filtrarGrupos();
   *       // TODO: Mostrar snackbar de éxito
   *     }
   *   );
   * }
   */

  /**
   * TODO: MÉTODO OPCIONAL - Editar grupo
   *
   * editarGrupo(grupoId: number, nuevoNombre: string): void {
   *   this.grupoService.actualizarGrupo(grupoId, { nombre: nuevoNombre }).subscribe(
   *     (respuesta) => {
   *       const grupo = this.grupos.find(g => g.id === grupoId);
   *       if (grupo) {
   *         grupo.nombre = nuevoNombre;
   *       }
   *     }
   *   );
   * }
   */

}

/**
 * ==================== GUÍA DE INTEGRACIÓN CON BACKEND ====================
 *
 * 1. CREAR SERVICIO (grupo.service.ts):
 *    - GET /api/grupos/listar → obtenerGrupos()
 *    - POST /api/grupos/crear → crearGrupo(data)
 *    - DELETE /api/grupos/{id} → eliminarGrupo(id)
 *    - PUT /api/grupos/{id} → actualizarGrupo(id, data)
 *
 * 2. MÓDULOS NECESARIOS (imports en el component):
 *    - CommonModule (para *ngFor, *ngIf)
 *    - FormsModule (para [(ngModel)])
 *    - MatIconModule (para mat-icon)
 *
 * 3. INSTALACIÓN ANGULAR MATERIAL:
 *    ng add @angular/material
 *
 * 4. ESTRUCTURA ESPERADA DEL BACKEND:
 *
 *    GET /api/grupos/listar
 *    {
 *      "success": true,
 *      "data": {
 *        "grupos": [
 *          {
 *            "id": 1,
 *            "nombre": "Control Interno",
 *            "cantidad": 3
 *          }
 *        ]
 *      }
 *    }
 *
 *    POST /api/grupos/crear
 *    Request: { "nombre": "Nuevo Grupo" }
 *    Response: {
 *      "success": true,
 *      "data": {
 *        "grupo": {
 *          "id": 5,
 *          "nombre": "Nuevo Grupo",
 *          "cantidad": 0
 *        }
 *      }
 *    }
 *
 * 5. USO EN APP ROUTING (app.routes.ts):
 *    import { Grupos } from './components/grupos/grupos';
 *
 *    export const routes: Routes = [
 *      { path: 'grupos', component: Grupos },
 *      ...
 *    ];
 *
 * ==================== FIN GUÍA ====================
 */
