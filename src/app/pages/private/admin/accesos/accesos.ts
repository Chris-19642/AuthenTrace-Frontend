import { Component, inject, ViewChild } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {DatePipe} from '@angular/common';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatFormField, MatLabel, MatPrefix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {Sesion} from '../../../../model/sesion';
import {SesionService} from '../../../../services/sesion-service';


@Component({
  selector: 'app-accesos',
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
    MatPaginator,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatPrefix
  ],
  standalone: true,
  templateUrl: './accesos.html',
  styleUrls: ['./accesos.css']
})
export class Accesos {

  lista: Sesion[] = [];
  displayedColumns: string[] = ['idUsuario', 'rol', 'fechaInicio', 'ipOrigen', 'navegador'];
  dataSource: MatTableDataSource<Sesion> = new MatTableDataSource<Sesion>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  sesionService: SesionService = inject(SesionService);
  route: Router = inject(Router);

  constructor() {
    console.log("Constructor SesionListarComponent");
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    console.log('Component ngOnInit llamando al API Get');
    this.sesionService.listarSesiones().subscribe({
      next: data => {
        this.dataSource.data = data;
        console.log('Sesiones cargadas:', data);
      },
      error: err => {
        console.error('Error al cargar sesiones:', err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
