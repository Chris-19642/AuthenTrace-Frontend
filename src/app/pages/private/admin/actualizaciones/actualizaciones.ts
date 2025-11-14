import {Component, inject, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ActualizacionService} from '../../../../services/actualizacion-service';
import {Actualizacion} from "../../../../model/actualizacion";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-actualizaciones',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatPaginator,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatSort,
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
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatIconModule,
  ],
  templateUrl: './actualizaciones.html',
  styleUrl: './actualizaciones.css',
})
export class Actualizaciones {
  lista: Actualizacion[] = [];
  displayedColumns: string[] = ['version', 'fechaProgramada'];
  dataSource: MatTableDataSource<Actualizacion> = new MatTableDataSource<Actualizacion>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  actualizacionForm: FormGroup;
  fb = inject(FormBuilder);
  actualizacionService = inject(ActualizacionService);
  router = inject(Router);
  actualizaciones: Actualizacion[] = [];

  fechaSeleccionada: string = '';
  cargando: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';
  versionIngresada: string = '';

  constructor() {
    this.actualizacionForm = this.fb.group({
      idActualizacion: [''],
      version: ['', Validators.required],
      fechaProgramada: ['', Validators.required]
    })
    const hoy = new Date();
    this.fechaSeleccionada = hoy.toISOString().split('T')[0];
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit() {
    console.log('Component ngOnInit');
    this.actualizacionService.listarActualizaciones().subscribe({
      next: data => {
        this.dataSource.data = data
        this.ngAfterViewInit()
        console.log('Actualizaciones cargadas:', data);},
    })
  }

  programarActualizacion() {
    if (!this.fechaSeleccionada) {
      this.mensajeError = 'Por favor seleccione una fecha';
      return;
    }

    this.cargando = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    const actualizacion = new Actualizacion();
    actualizacion.idActualizacion = 0;
    actualizacion.version = this.versionIngresada;
    actualizacion.fechaProgramada = new Date(this.fechaSeleccionada);

    console.log("Actualización a Programar:", actualizacion);

    this.actualizacionService.programarActualizacion(actualizacion).subscribe({
      next: data => {
        this.cargando = false;
        this.mensajeExito = 'Actualización programada exitosamente';
        console.log("Se programó:", data);
        this.ngOnInit();
        setTimeout(() => {
          this.mensajeExito = '';
        }, 3000);
      },
      error: error => {
        this.cargando = false;
        this.mensajeError = 'Error al programar actualización';
        console.log("Error:", error);
        setTimeout(() => {
          this.mensajeError = '';
        }, 3000);
      }
    });
  }
}
