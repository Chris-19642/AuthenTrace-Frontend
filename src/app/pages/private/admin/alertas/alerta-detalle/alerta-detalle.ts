import {Component, Inject} from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Alerta} from '../../../../../model/alerta';

@Component({
  selector: 'app-alerta-detalle',
  imports: [
    DatePipe,
    MatButton],
  templateUrl: './alerta-detalle.html',
  styleUrl: './alerta-detalle.css',
})
export class AlertaDetalle {
  constructor(
    public dialogRef: MatDialogRef<AlertaDetalle>,
    @Inject(MAT_DIALOG_DATA) public data: Alerta
  ) {}

  formatearTitulo(tipo: string): string {
    return tipo.replace(/_/g, ' ').toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  bloquearCuenta() {
    console.log('Bloqueando cuenta del usuario:', this.data.usuarioAfectado);
    // Aquí llamarías al servicio para bloquear la cuenta
    this.dialogRef.close({ accion: 'BLOQUEAR', alerta: this.data });
  }

  reiniciarContrasena() {
    console.log('Reiniciando contraseña del usuario:', this.data.usuarioAfectado);
    // Aquí llamarías al servicio para reiniciar contraseña
    this.dialogRef.close({ accion: 'REINICIAR', alerta: this.data });
  }

  cerrar() {
    this.dialogRef.close();
  }
}
