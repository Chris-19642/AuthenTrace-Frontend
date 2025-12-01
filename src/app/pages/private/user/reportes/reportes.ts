import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatSortModule, MatSort, Sort} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ReporteService} from '../../../../services/reporte-service';
import {Reporte} from '../../../../model/reporte';

@Component({
  selector: 'app-reportes-uso',
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './reportes.html',
  styleUrls: ['./reportes.css']
})
export class Reportes implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['icono', 'nombre', 'resultado', 'fecha', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  mostrarModal = false;
  reporteSeleccionado: any;

  constructor(private reportesService: ReporteService) {}

  ngOnInit(): void {
    this.cargarReportesPorUsuario();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  cargarReportesPorUsuario(): void {
    const idUsuarioStr = localStorage.getItem('idUsuario');
    if (!idUsuarioStr) return;
    const idUsuario = Number(idUsuarioStr);

    this.reportesService.getReportesPorUsuario(idUsuario).subscribe({
      next: (data: Reporte[]) => {
        this.dataSource.data = data.map(r => ({
          ...r,
          nombre: `Documento ${r.idDocumento}`,
          resultado: r.estadoFirma,
          fecha: new Date(r.fechaGeneracion)
        }));
      },
      error: err => console.error('Error cargando reportes', err)
    });
  }

  verDetalle(reporte: any): void {
    this.reporteSeleccionado = reporte;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.reporteSeleccionado = null;
  }

  descargarReporte(reporte: any): void {
    if (!reporte.id) return;
    this.reportesService.descargarReporte(reporte.id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte_${reporte.id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: err => console.error('Error descargando PDF', err)
    });
  }

  sortData(sort: Sort): void {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nombre': return this.compare(a.nombre, b.nombre, isAsc);
        case 'resultado': return this.compare(a.resultado, b.resultado, isAsc);
        case 'fecha': return this.compare(a.fecha.getTime(), b.fecha.getTime(), isAsc);
        default: return 0;
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
