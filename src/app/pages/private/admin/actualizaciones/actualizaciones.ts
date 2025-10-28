import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';

interface Actualizacion {
  version: string;
  fecha?: string;
  estado: 'Pendiente' | 'Aplicada';
  fechaAplicacion?: string;
}

@Component({
  selector: 'app-actualizaciones',
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './actualizaciones.html',
  styleUrl: './actualizaciones.css',
})
export class Actualizaciones {
  actualizaciones: Actualizacion[] = [];
  fechaSeleccionada: string = '';
  mensajeExito: string = '';
  mensajeError: string = '';
  cargando: boolean = false;

  ngOnInit(): void {
    this.cargarDatosEjemplo();
    this.establecerFechaMinima();
  }


  establecerFechaMinima(): void {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    this.fechaSeleccionada = `${año}-${mes}-${dia}`;
  }


  cargarDatosEjemplo(): void {
    this.actualizaciones = [
      { version: '1.2.1', estado: 'Pendiente' },
      { version: '1.2.0', estado: 'Aplicada', fechaAplicacion: '01/02/2025' },
      { version: '1.1.9', estado: 'Aplicada', fechaAplicacion: '01/02/2025' }
    ];
  }


  programarActualizacion(): void {
    if (!this.fechaSeleccionada) {
      this.mostrarError('Por favor selecciona una fecha');
      return;
    }

    if (!this.validarFechaFutura(this.fechaSeleccionada)) {
      this.mostrarError('La fecha debe ser futura');
      return;
    }


    this.cargando = true;

    setTimeout(() => {

      this.mostrarExito(`Actualización programada para ${this.formatearFecha(this.fechaSeleccionada)}`);
      this.cargando = false;


      this.actualizaciones.unshift({
        version: '1.2.2',
        estado: 'Pendiente',
        fecha: this.fechaSeleccionada
      });
    }, 1000);
  }


  validarFechaFutura(fecha: string): boolean {
    const fechaSelec = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return fechaSelec >= hoy;
  }


  formatearFecha(fecha: string): string {
    const [año, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${año}`;
  }


  mostrarExito(mensaje: string): void {
    this.mensajeExito = mensaje;
    this.mensajeError = '';
    setTimeout(() => {
      this.mensajeExito = '';
    }, 5000);
  }


  mostrarError(mensaje: string): void {
    this.mensajeError = mensaje;
    this.mensajeExito = '';
    setTimeout(() => {
      this.mensajeError = '';
    }, 5000);
  }


  obtenerClaseEstado(estado: string): string {
    return estado === 'Pendiente' ? 'estado-pendiente' : 'estado-aplicada';
  }
}
