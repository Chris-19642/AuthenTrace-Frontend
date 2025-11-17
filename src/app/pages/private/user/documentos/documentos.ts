import {Component, inject} from '@angular/core';
import {DocumentoService} from '../../../../services/documento-service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {VerificacionResultado} from '../../../../model/verificacion-resultado';
import {VerificacionService} from '../../../../services/verificacion-service';
import {VerificacionReporte} from '../verificacion-reporte/verificacion-reporte';

@Component({
  selector: 'app-documentos',
  imports: [
    CommonModule,
    VerificacionReporte,
  ],
  templateUrl: './documentos.html',
  styleUrl: './documentos.css',
})
export class Documentos {
  documentoService = inject(DocumentoService);
  router = inject(Router);
  verificarService = inject(VerificacionService);

  selectedFile: File | null = null;
  nombreTemporal: string | null = null;
  isDragging = false;

  resultadoVerificacion: VerificacionResultado | null = null;
  mostrarModal: boolean = false;

  constructor() {}

  //drag over
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  //drag leave
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  //drop
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  // Manejar selección
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  // Procesar archivo
  private handleFile(file: File): void {
    // Validar que sea PDF
    if (file.type !== 'application/pdf') {
      alert('Solo se permiten archivos PDF.');
      return;
    }
    this.documentoService.subirTemporal(file).subscribe({
      next: (nombre) => {
        this.selectedFile = file;
        this.nombreTemporal = nombre;
      },
      error: (error) => ("Error al subir el archivo.")
    });
  }

  // Limpiar archivo
  clearFile(event: Event): void {
    event.stopPropagation();
    if (this.nombreTemporal) {
      this.documentoService.cancelarTemporal(this.nombreTemporal).subscribe();
    }
    this.selectedFile = null;
    this.nombreTemporal = null;
  }

  // Verificar
  verifySignature(): void {
    if (!this.selectedFile || !this.nombreTemporal) {
      alert("No hay archivo cargado.");
      return;
    }

    const idUsuarioStr = localStorage.getItem('idUsuario');
    if (!idUsuarioStr) {
      alert("No se encontró el id de usuario. Por favor inicie sesión de nuevo.");
      return;
    }
    const idUsuario = Number(idUsuarioStr);

    console.log("Guardando documento definitivo con:", this.nombreTemporal, idUsuario);


    this.documentoService.guardarDefinitivo(this.nombreTemporal, idUsuario)
      .subscribe({
        next: (doc) => {
          console.log("📄 Documento guardado:", doc);
          alert("Documento guardado correctamente. Iniciando verificación...");

          // 2️⃣ Llamar verificación usando ID del documento recién guardado
          this.verificarService.verificarFirma(doc.id, idUsuario)
            .subscribe({
              next: (resultado: VerificacionResultado) => {
                console.log("🔎 Resultado:", resultado);

                this.resultadoVerificacion = {
                  ...resultado,
                  nombreArchivo: doc.nombreArchivo
                };

                this.mostrarModal = true;

              },
              error: (err) => {
                console.error(err);
                alert("Error al verificar firma.");
              }
            });

        },
        error: (err) => {
          console.error(err);
          alert("Error al guardar el documento.");
        }
      });
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.resultadoVerificacion = null;
    this.selectedFile = null; // para resetear lo cargado
  }



  descargarPDF(): void {
    console.log("📥 Descargar PDF solicitado");
    //  Aquí luego llamaremos al servicio que genera el PDF
  }

}

