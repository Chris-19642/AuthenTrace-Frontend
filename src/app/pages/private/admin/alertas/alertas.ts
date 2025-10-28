import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Alerta {
  id: number;
  fecha: string;
  tipo: string;
  estado: string;
}

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './alertas.html',
  styleUrls: ['./alertas.css']
})
export class AlertasComponent implements OnInit {
  alertas: Alerta[] = [];
  alertasFiltradas: Alerta[] = [];
  filtroTexto: string = '';

  ngOnInit(): void {
    this.cargarAlertas();
  }

  cargarAlertas(): void {
    // Datos simulados - reemplazar con llamada a servicio
    this.alertas = [
      {
        id: 1,
        fecha: '02/09/25, 14:32',
        tipo: 'Intentos fallidos de inicio de sesion',
        estado: 'Pendiente'
      },
      {
        id: 2,
        fecha: '02/09/25, 13:58',
        tipo: 'Cambio no autorizado',
        estado: 'Investigando'
      },
      {
        id: 3,
        fecha: '02/09/25, 10:21',
        tipo: 'Usuario deshabilitado',
        estado: 'Resuelto'
      }
    ];
    this.alertasFiltradas = [...this.alertas];
  }

  filtrarAlertas(): void {
    if (!this.filtroTexto.trim()) {
      this.alertasFiltradas = [...this.alertas];
      return;
    }

    const filtro = this.filtroTexto.toLowerCase();
    this.alertasFiltradas = this.alertas.filter(alerta =>
      alerta.fecha.toLowerCase().includes(filtro) ||
      alerta.tipo.toLowerCase().includes(filtro) ||
      alerta.estado.toLowerCase().includes(filtro)
    );
  }

  getRowClass(alerta: Alerta): string {
    const tipoNormalizado = alerta.tipo.toLowerCase();

    if (tipoNormalizado.includes('intentos')) {
      return 'alerta-critica';
    } else if (tipoNormalizado.includes('cambio')) {
      return 'alerta-advertencia';
    } else if (tipoNormalizado.includes('usuario')) {
      return 'alerta-info';
    }

    return '';
  }

  investigar(id: number): void {
    console.log('Investigando alerta con ID:', id);
    // Implementar lógica de investigación
    // Puede abrir un modal, redirigir a página de detalles, etc.
  }
}
