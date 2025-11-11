import {Component, inject} from '@angular/core';
import {DocumentoService} from '../../../../services/documento-service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth-service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-documentos',
  imports: [
    CommonModule,
  ],
  templateUrl: './documentos.html',
  styleUrl: './documentos.css',
})
export class Documentos {
  documentoService = inject(DocumentoService);
  router = inject(Router);
  auth = inject(AuthService); // por ahora aún no se usa

  selectedFile: File | null = null;
  nombreTemporal: string | null = null;
  isDragging = false;

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
    if (!this.selectedFile || !this.nombreTemporal) return;

    // Por ahora harcoded, luego tomamos del AuthService
    const idUsuario = 1;

    this.documentoService.guardarDefinitivo(this.nombreTemporal, idUsuario).subscribe({
      next: () => alert("Documento guardado correctamente."),
      error: () => alert("Error al guardar documento.")
    });
  }
}
