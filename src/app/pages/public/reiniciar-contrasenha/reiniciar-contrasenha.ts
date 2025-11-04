import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reiniciar-contrasenha.html',
  styleUrls: ['./reiniciar-contrasenha.css']
})
export class ReiniciarContrasenha implements OnInit {
  email: string = '';
  codigo: string[] = ['', '', '', '', '', ''];
  password: string = '';
  mostrarPassword: boolean = false;

  // Validaciones
  tieneMayuscula: boolean = false;
  tieneMinuscula: boolean = false;
  tieneMinimo8: boolean = false;
  tieneNumero: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el email desde los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onCodigoInput(index: number, event: any): void {
    const value = event.target.value;

    if (value && index < 5) {
      // Mover al siguiente input
      const nextInput = document.getElementById(`codigo-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  }

  onCodigoKeydown(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.codigo[index] && index > 0) {
      // Mover al input anterior
      const prevInput = document.getElementById(`codigo-${index - 1}`);
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    }
  }

  onPasswordChange(): void {
    this.tieneMayuscula = /[A-Z]/.test(this.password);
    this.tieneMinuscula = /[a-z]/.test(this.password);
    this.tieneMinimo8 = this.password.length >= 8;
    this.tieneNumero = /[0-9]/.test(this.password);
  }

  toggleMostrarPassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  cambiarContrasenha(): void {
    const codigoCompleto = this.codigo.join('');

    if (codigoCompleto.length !== 6) {
      alert('Por favor ingresa el código de 6 dígitos');
      return;
    }

    if (!this.tieneMayuscula || !this.tieneMinuscula || !this.tieneMinimo8 || !this.tieneNumero) {
      alert('La contraseña no cumple con todos los requisitos');
      return;
    }

    console.log('Cambiando contraseña para:', this.email);
    console.log('Código:', codigoCompleto);
    console.log('Nueva contraseña:', this.password);

    // Aquí harías la llamada al backend
    alert('¡Contraseña cambiada exitosamente!');
    this.router.navigate(['/']);
  }

  volverInicio(): void {
    this.router.navigate(['/']);
  }
}
