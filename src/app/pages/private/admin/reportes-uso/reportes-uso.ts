import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

interface SesionInfo {
  idUsuario: number;
  usuario: string;
  ipOrigen: string;
  navegador: string;
}

@Component({
  selector: 'app-reportes-uso',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './reportes-uso.html',
  styleUrls: ['./reportes-uso.css']
})
export class ReportesUso implements OnInit {

  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);

  // Datos de la gráfica (mock estático)
  actividadData = [
    { label: 'Sem 1', value: 20 },
    { label: 'Sem 2', value: 35 },
    { label: 'Sem 3', value: 45 },
    { label: 'Sem 4', value: 28 },
    { label: 'Sem 5', value: 50 },
    { label: 'Sem 6', value: 18 },
    { label: 'Sem 7', value: 60 }
  ];

  // Información de acceso
  sesionesRecientes: SesionInfo[] = [];
  displayedColumns: string[] = ['usuario', 'ip', 'navegador'];

  constructor() {
    console.log('Constructor ReportesUso');
  }

  ngOnInit() {
    this.cargarSesionesRecientes();
  }

  cargarSesionesRecientes() {
    // Llamada al backend para obtener las últimas sesiones
    this.http.get<any[]>('http://localhost:8080/api/sesiones')
      .subscribe({
        next: (data) => {
          // Tomamos solo las 5 más recientes
          this.sesionesRecientes = data.slice(0, 5).map((sesion, index) => ({
            idUsuario: sesion.idUsuario,
            usuario: `Usuario ${index + 1}`,
            ipOrigen: sesion.ipOrigen,
            navegador: sesion.navegador
          }));
          console.log('Sesiones recientes cargadas:', this.sesionesRecientes);
        },
        error: (err) => {
          console.error('Error al cargar sesiones:', err);
          // Datos de respaldo para pruebas
          this.sesionesRecientes = [
            { idUsuario: 1, usuario: 'Usuario 1', ipOrigen: '181.65.34.22', navegador: 'Chrome 118 on Windows' },
            { idUsuario: 2, usuario: 'Usuario 2', ipOrigen: '181.65.34.22', navegador: 'Chrome 118 on Windows' }
          ];
        }
      });
  }

  irAGenerarInforme() {
    this.router.navigate(['/admin/reportes-uso/informe-mensual']);
  }

  // Método para calcular la altura de las barras en el gráfico
  getBarHeight(value: number): number {
    const maxValue = Math.max(...this.actividadData.map(d => d.value));
    return (value / maxValue) * 100;
  }
}
