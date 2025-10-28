import { Component } from '@angular/core';

@Component({
  selector: 'app-documentos',
  imports: [],
  templateUrl: './documentos.html',
  styleUrl: './documentos.css',
})
export class Documentos {
  selectedFile: File | null = null;
  isDragging: boolean = false;

  constructor() {}

  //drag over
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  //drag leave
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  //drop
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
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
    if (file.type === 'application/pdf') {
      this.selectedFile = file;
      console.log('Archivo seleccionado:', file.name);
    } else {
      alert('Por favor, selecciona un archivo PDF');
    }
  }

  // Limpiar archivo
  clearFile(event: Event): void {
    event.stopPropagation();
    this.selectedFile = null;
    console.log('Archivo eliminado');
  }

  // Verificar
  verifySignature(): void {
    if (this.selectedFile) {
      console.log('Verificando firma del archivo:', this.selectedFile.name);

      alert(`Verificando firma del archivo: ${this.selectedFile.name}`);
    }
  }
}
