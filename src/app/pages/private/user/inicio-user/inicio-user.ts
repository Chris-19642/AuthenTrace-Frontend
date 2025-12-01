import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType ,ChartData} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {NgClass, DatePipe, CommonModule} from '@angular/common';
import { ReporteService } from '../../../../services/reporte-service';
import { InicioUserService } from '../../../../services/inicio-user-service';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-inicio-user',
  templateUrl: './inicio-user.html',
  imports: [
    CommonModule,
    BaseChartDirective,
    NgClass,
    DatePipe,
    RouterLink,
    MatButton
  ],
  styleUrls: ['./inicio-user.css']
})
export class InicioUser implements OnInit {

  nombreUsuario: string = '';
  cantidadDocumentos: number = 0;
  listaReportes: any[] = [];
  mostrarModal = false;
  reporteSeleccionado: any = null;
  ultimosReportes: any[] = [];

  pieChartLabels = ['Firmas válidas', 'Fraude detectado'];
  pieChartType: ChartType = 'pie';

  pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#D7F5D7', '#D9A19A']
    }]
  };

  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: { legend: { display: true } }
  };

  constructor(
    private reporteService: ReporteService,
    private inicioUserService: InicioUserService
  ) {}

  ngOnInit(): void {
    const idUsuario = Number(localStorage.getItem('idUsuario'));

    this.inicioUserService.getById(idUsuario).subscribe(usuario => {
      this.nombreUsuario = usuario.nombre;
    });

    this.reporteService.getReportesPorUsuario(idUsuario).subscribe(data => {
      this.listaReportes = data;

      this.listaReportes.sort(
        (a, b) => new Date(b.fechaGeneracion).getTime() - new Date(a.fechaGeneracion).getTime()
      );

      this.ultimosReportes = this.listaReportes.slice(0, 4);
      this.cantidadDocumentos = data.length;

      this.calcularPorcentajes();
    });
  }

  calcularPorcentajes(): void {
    const total = this.listaReportes.length;
    if (total === 0) {
      this.pieChartData.datasets[0].data = [0, 0];
      return;
    }

    // Normalizador general
    const esValido = (estado: string) => {
      const e = estado.toLowerCase().trim();
      return (
        e.includes("valido") ||
        e.includes("válido") ||
        e.includes("valida") ||
        e.includes("válida")
      );
    };

    const validos = this.listaReportes.filter(r => esValido(r.estadoFirma)).length;
    const falsos = total - validos;

    this.pieChartData.datasets[0].data = [
      Math.round((validos / total) * 100),
      Math.round((falsos / total) * 100)
    ];
  }


  estadoClase(estado: string): string {
    const e = estado.toLowerCase().trim();
    return (
      e.includes("valido") ||
      e.includes("válido") ||
      e.includes("valida") ||
      e.includes("válida")
    ) ? 'estado-valido' : 'estado-invalido';
  }


  abrirReporte(item: any) {
    this.reporteSeleccionado = item;
    this.mostrarModal = true;
  }
  cerrarModal() {
    this.mostrarModal = false;
  }
}
