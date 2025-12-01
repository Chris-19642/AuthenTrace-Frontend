import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface ReporteUso {
  id: number;
  nombre: string;
  resultado: 'Válido' | 'Falso';
  fecha: Date;
  idDocumento?: string;
}


@Component({
  selector: 'app-reportes-uso',
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './reportes-uso.html',
  styleUrl: './reportes-uso.css',
})
export class ReportesUso implements OnInit {
  displayedColumns: string[] = ['icono', 'nombre', 'resultado', 'fecha', 'acciones'];
  dataSource: MatTableDataSource<ReporteUso>;

  @ViewChild(MatSort) sort!: MatSort;

  // Datos de ejemplo - Aquí conectarás con el backend
  reportesData: ReporteUso[] = [
    {
      id: 1,
      nombre: 'Documento 1',
      resultado: 'Válido',
      fecha: new Date('2024-03-15T10:30:00'),
      idDocumento: 'DOC001'
    },
    {
      id: 2,
      nombre: 'Documento 2',
      resultado: 'Válido',
      fecha: new Date('2024-03-14T14:20:00'),
      idDocumento: 'DOC002'
    },
    {
      id: 3,
      nombre: 'Documento 3',
      resultado: 'Falso',
      fecha: new Date('2024-03-13T09:15:00'),
      idDocumento: 'DOC003'
    },
    {
      id: 4,
      nombre: 'Documento 4',
      resultado: 'Válido',
      fecha: new Date('2024-03-12T16:45:00'),
      idDocumento: 'DOC004'
    }
  ];

  constructor() {
    this.dataSource = new MatTableDataSource(this.reportesData);
  }

  ngOnInit(): void {
    // Aquí llamarías al servicio del backend
    // this.cargarReportes();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  // Método para cargar reportes desde el backend (a implementar)
  cargarReportes(): void {
    // TODO: Conectar con el backend
    // Endpoint: GET /api/reportes/lista
    // this.reportesService.getReportes().subscribe(
    //   (data: Reporte[]) => {
    //     this.dataSource.data = data;
    //   }
    // );
  }

  // Método para cargar reportes por usuario (a implementar)
  cargarReportesPorUsuario(idUsuario: string): void {
    // TODO: Conectar con el backend
    // Endpoint: GET /api/reportes/usuario/{idUsuario}
  }

  // Método para cargar reporte por documento (a implementar)
  cargarReportePorDocumento(idDocumento: string): void {
    // TODO: Conectar con el backend
    // Endpoint: GET /api/reportes/documento/{idDocumento}
  }

  verDetalle(reporte: ReporteUso): void {
    console.log('Ver detalle del reporte:', reporte);
    // TODO: Implementar navegación o modal con detalles
    // Aquí podrías abrir un diálogo con información detallada
    // incluyendo discrepancias si resultado es 'Falso'
  }

  descargarReporte(reporte: ReporteUso): void {
    console.log('Descargar reporte:', reporte);
    // TODO: Implementar descarga del reporte en PDF
    // this.reportesService.descargarReporte(reporte.id).subscribe();
  }

  sortData(sort: Sort): void {
    const data = this.reportesData.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nombre':
          return this.compare(a.nombre, b.nombre, isAsc);
        case 'resultado':
          return this.compare(a.resultado, b.resultado, isAsc);
        case 'fecha':
          return this.compare(a.fecha.getTime(), b.fecha.getTime(), isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getResultadoClass(resultado: string): string {
    return resultado === 'Válido' ? 'resultado-valido' : 'resultado-falso';
  }
}

