import {Component, EventEmitter, Input, Output, } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VerificacionResultado} from '../../../../model/verificacion-resultado';

@Component({
  selector: 'app-verificacion-reporte',
  imports: [CommonModule],
  templateUrl: './verificacion-reporte.html',
  styleUrl: './verificacion-reporte.css',
})
export class VerificacionReporte {

  @Input() resultado!: VerificacionResultado;
  @Input() mostrarModal: boolean = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() descargar = new EventEmitter<void>();

  // ► Propiedades calculadas para el HTML
  get nombreDocumento(): string {
    return this.resultado?.nombreArchivo ?? "Documento";
  }

  get resultadoValido(): boolean {
    return this.resultado?.firmaValida ?? false;
  }

  get similitudPorcentaje(): number {
    return this.resultado?.similitudPorcentaje ?? 0;
  }

  descargarPDF(): void {
    this.descargar.emit();
  }
}
