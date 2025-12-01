import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { GenerarInformeService } from '../../../../../services/generar-informe-service';
import { GenerarInforme } from '../../../../../model/generar-informe';

interface InformeGenerado {
  mesAnio: string;
  estado: string;
  mes: number;
  anio: number;
}

@Component({
  selector: 'app-generar-informe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  templateUrl: './generar-informe.html',
  styleUrl: './generar-informe.css',
})
export class GenerarInformeComponent implements OnInit {

  router: Router = inject(Router);
  informeService: GenerarInformeService = inject(GenerarInformeService);

  // Fecha seleccionada
  fechaSeleccionada: Date = new Date();

  // Lista de informes generados
  informesGenerados: InformeGenerado[] = [];
  displayedColumns: string[] = ['mesAnio', 'estado', 'descargar'];

  // Estado de carga
  generandoInforme: boolean = false;

  constructor() {
    console.log('Constructor GenerarInformeComponent');
  }

  ngOnInit() {
    this.cargarInformesGuardados();
  }

  cargarInformesGuardados() {
    // Cargar desde localStorage los informes ya generados
    const informes = localStorage.getItem('informes_generados');
    if (informes) {
      this.informesGenerados = JSON.parse(informes);
    } else {
      // Datos de ejemplo iniciales
      this.informesGenerados = [
        { mesAnio: 'Julio 2025', estado: 'Listo', mes: 7, anio: 2025 },
        { mesAnio: 'Junio 2025', estado: 'Listo', mes: 6, anio: 2025 },
        { mesAnio: 'Mayo 2025', estado: 'En proceso', mes: 5, anio: 2025 }
      ];
    }
  }

  confirmarGeneracion() {
    if (!this.fechaSeleccionada) {
      alert('Por favor selecciona una fecha');
      return;
    }

    const mes = this.fechaSeleccionada.getMonth() + 1;
    const anio = this.fechaSeleccionada.getFullYear();

    // Verificar si ya existe un informe para este mes/año
    const existe = this.informesGenerados.find(
      inf => inf.mes === mes && inf.anio === anio
    );

    if (existe) {
      alert('Ya existe un informe para este período');
      return;
    }

    this.generandoInforme = true;

    // Llamar al backend
    this.informeService.obtenerReporteMensual(mes, anio).subscribe({
      next: (data: GenerarInforme) => {
        console.log('Informe generado:', data);

        // Agregar a la lista
        const nombreMes = this.obtenerNombreMes(mes);
        const nuevoInforme: InformeGenerado = {
          mesAnio: `${nombreMes} ${anio}`,
          estado: 'Listo',
          mes: mes,
          anio: anio
        };

        this.informesGenerados.unshift(nuevoInforme);

        // Guardar en localStorage
        localStorage.setItem('informes_generados', JSON.stringify(this.informesGenerados));

        this.generandoInforme = false;
        alert('Informe generado exitosamente');
      },
      error: (err) => {
        console.error('Error al generar informe:', err);
        this.generandoInforme = false;
        alert('Error al generar el informe. Intenta nuevamente.');
      }
    });
  }

  descargarPDF(informe: InformeGenerado) {
    if (informe.estado !== 'Listo') {
      alert('El informe aún no está listo');
      return;
    }

    // Llamar al servicio para descargar el PDF
    this.informeService.exportarPDF(informe.mes, informe.anio).subscribe({
      next: (blob: Blob) => {
        // Crear un enlace temporal para descargar
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `informe_${informe.mesAnio.replace(' ', '_')}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar PDF:', err);
        alert('Error al descargar el archivo PDF');
      }
    });
  }

  volver() {
    this.router.navigate(['/admin/reportes-uso']);
  }

  obtenerNombreMes(mes: number): string {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return meses[mes - 1];
  }
}
