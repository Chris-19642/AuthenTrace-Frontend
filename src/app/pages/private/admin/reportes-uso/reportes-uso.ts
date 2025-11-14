import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReporteMensualService } from '../../../../services/reporte-mensual';
import { ReporteMensual } from '../../../../model/reporte-mensual';

@Component({
  selector: 'app-reportes-uso',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule
  ],
  templateUrl: './reportes-uso.html',
  styleUrl: './reportes-uso.css',
})
export class ReportesUso {
  reporteService = inject(ReporteMensualService);

  mesSeleccionado: number = new Date().getMonth() + 1;
  anioSeleccionado: number = new Date().getFullYear();

  reporteData: ReporteMensual | null = null;
  cargando: boolean = false;
  mensajeError: string = '';

  meses = [
    { valor: 1, nombre: 'Enero' },
    { valor: 2, nombre: 'Febrero' },
    { valor: 3, nombre: 'Marzo' },
    { valor: 4, nombre: 'Abril' },
    { valor: 5, nombre: 'Mayo' },
    { valor: 6, nombre: 'Junio' },
    { valor: 7, nombre: 'Julio' },
    { valor: 8, nombre: 'Agosto' },
    { valor: 9, nombre: 'Septiembre' },
    { valor: 10, nombre: 'Octubre' },
    { valor: 11, nombre: 'Noviembre' },
    { valor: 12, nombre: 'Diciembre' }
  ];

  anios: number[] = [];

  // Datos para el gráfico
  chartData: number[] = [];
  chartLabels: string[] = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7'];

  // Datos de tabla de accesos (simulados para el ejemplo)
  accesos = [
    { usuario: 'Usuario 1', ip: '181.65.34.22', navegador: 'Chrome 118 on Windows' },
    { usuario: 'Usuario 2', ip: '181.65.34.22', navegador: 'Chrome 118 on Windows' }
  ];

  constructor() {
    // Generar años desde 2020 hasta el año actual
    const anioActual = new Date().getFullYear();
    for (let i = anioActual; i >= 2020; i--) {
      this.anios.push(i);
    }

    // Datos simulados para el gráfico (puedes reemplazarlos con datos reales)
    this.chartData = [15, 25, 45, 25, 50, 15, 60];
  }

  generarInforme() {
    if (!this.mesSeleccionado || !this.anioSeleccionado) {
      this.mensajeError = 'Por favor seleccione mes y año';
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    this.reporteService.obtenerReporteMensual(this.mesSeleccionado, this.anioSeleccionado).subscribe({
      next: (data) => {
        this.reporteData = data;
        this.cargando = false;
        console.log('Reporte generado:', data);
      },
      error: (error) => {
        this.cargando = false;
        this.mensajeError = 'Error al generar el informe';
        console.error('Error:', error);
      }
    });
  }

  // Calcular el máximo valor para escalar el gráfico
  getMaxValue(): number {
    return Math.max(...this.chartData, 80);
  }

  // Calcular altura de cada barra en porcentaje
  getBarHeight(value: number): number {
    return (value / this.getMaxValue()) * 100;
  }
}
