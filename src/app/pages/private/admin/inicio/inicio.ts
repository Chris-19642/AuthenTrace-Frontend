import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-inicio-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const ctx = document.getElementById('performanceChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: 12 }, (_, i) => `T${i + 1}`),
          datasets: [
            {
              label: 'Rendimiento',
              data: [5, 8, 4, 9, 12, 10, 7, 9, 6, 10, 11, 8],
              borderColor: '#660708',
              backgroundColor: 'transparent',
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: false } }
        }
      });
    }
  }
}
