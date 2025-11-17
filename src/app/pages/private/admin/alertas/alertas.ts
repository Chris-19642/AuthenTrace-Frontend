import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule, DatePipe, NgClass} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatFormField, MatPrefix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {AlertaService} from '../../../../services/alerta-service';
import {MatDialog} from '@angular/material/dialog';
import {AlertaDetalle} from './alerta-detalle/alerta-detalle';
import {Alerta} from '../../../../model/alerta';


@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderRowDef,
    MatRowDef,
    DatePipe,
    MatSort,
    MatSortHeader,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatFormField,
    MatInput,
    MatIcon,
    MatPrefix,
    MatButton,
    NgClass],
  templateUrl: './alertas.html',
  styleUrls: ['./alertas.css']
})
export class AlertasComponent implements OnInit {
  lista: Alerta[] = [];
  displayedColumns: string[] = ['fecha', 'tipo', 'estado', 'accion'];
  dataSource: MatTableDataSource<Alerta> = new MatTableDataSource<Alerta>();
  @ViewChild(MatSort) sort: MatSort;
  alertaService: AlertaService = inject(AlertaService);
  route: Router = inject(Router);
  dialog = inject(MatDialog);

  constructor() {
    console.log("Constructor AlertaListarComponent");
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    console.log('Component ngOnInit llamando al API Get');
    this.alertaService.list().subscribe({
      next: data => {
        this.dataSource.data = data;
        console.log('Alertas cargadas:', data);
      },
      error: err => {
        console.error('Error al cargar alertas:', err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  obtenerClaseTipo(tipo: string): string {
    if (tipo.includes('FALLIDO')) return 'tipo-rojo';
    if (tipo.includes('NO_AUTORIZADO')) return 'tipo-amarillo';
    return 'tipo-verde';
  }

  obtenerClaseEstado(estado: string): string {
    if (estado === 'PENDIENTE') return 'estado-pendiente';
    if (estado === 'INVESTIGANDO') return 'estado-investigando';
    return 'estado-resuelto';
  }

  formatearTipo(tipo: string): string {
    return tipo.replace(/_/g, ' ').toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  abrirModal(alerta: Alerta) {
    const dialogRef = this.dialog.open(AlertaDetalle, {
      width: '600px',
      data: alerta
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Acción tomada:', result);
        this.ngOnInit(); // Recargar alertas
      }
    });
  }
}
