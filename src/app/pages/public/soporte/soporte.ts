import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { VisitanteService } from '../../../services/visitante-service';
import { Visitante } from '../../../model/visitante';

@Component({
  selector: 'app-soporte',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './soporte.html',
  styleUrls: ['./soporte.css'],
})
export class Soporte {
  contactoForm: FormGroup;
  private fb = inject(FormBuilder);
  private visitanteService = inject(VisitanteService);
  private router = inject(Router);
  route = inject(ActivatedRoute);
  edicion = false;
  idVisitante = 0;

  constructor() {
    this.contactoForm = this.fb.group({
      idVisitante: [''],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      pais: ['', Validators.required],
      telefono: ['', Validators.required],
      empresa: ['', Validators.required],
      trabajo: ['', Validators.required],
      mensaje: [''],
      interesadoApi: [false]
    });
  }

  onSubmit() {
    if (this.contactoForm.invalid) {
      this.contactoForm.markAllAsTouched();
      return;
    }

    const visitante: Visitante = this.contactoForm.value;

    this.visitanteService.insert(visitante).subscribe({
      next: () => {
        alert('Formulario enviado con éxito.');
        this.contactoForm.reset();
        this.contactoForm.markAsPristine();
        this.contactoForm.markAsUntouched();
      },
      error: err => {
        console.error('Error al enviar visitante:', err);
        alert('Ocurrió un error al enviar. Revisa la consola.');
      }
    });
  }
}
