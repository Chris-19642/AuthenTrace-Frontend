import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recuperar-contrasenha',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recuperar-contrasenha.html',
  styleUrls: ['./recuperar-contrasenha.css']
})
export class RecuperarContrasenha {
  email: string = '';

  constructor(private router: Router) {}

  enviarCodigo(): void {
    if (this.email) {
      console.log('Enviando código a:', this.email);

      this.router.navigate(['/reiniciar-contrasenha'], {
        queryParams: { email: this.email }
      });
    }
  }

  volverInicio(): void {
    this.router.navigate(['/']);
  }
}
