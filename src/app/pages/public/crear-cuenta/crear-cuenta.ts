import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCard } from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { CrearCuentaService } from '../../../services/crear-cuenta-service';
import {Usuario} from '../../../model/usuario';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCard,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatError,
    RouterLink
  ],
  templateUrl: './crear-cuenta.html',
  styleUrls: ['./crear-cuenta.css']
})
export class CrearCuenta {
  form: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  crearCuentaService = inject(CrearCuentaService);
  router = inject(Router);
  constructor() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]{2,50}$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]{2,50}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const nuevoUsuario:Usuario = {
        ...this.form.value,
        bloqueado: false,
        rol:{idRol: 1, nombre: 'USUARIO'}
      };
      console.log('Datos del nuevo usuario:', nuevoUsuario);

      this.crearCuentaService.registrarCuenta(nuevoUsuario).subscribe({
        next: (data) => {
          console.log('Usuario creado:', data);
          alert('Cuenta creada con éxito');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error al registrar:', err);
          alert('No se pudo crear la cuenta');
        }
      });
    } else {
      this.form.markAllAsTouched();
      console.log('Formulario no válido');
    }
  }
}
