import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}


@Component({
  selector: 'app-ia-rotrot',
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './ia-rotrot.html',
  styleUrl: './ia-rotrot.css',
})
export class IaRotrot {
  userInput: string = '';
  messages: Message[] = [];
  step: number = 0;

  nombre: string = '';
  apellido: string = '';
  dni: string = '';

  constructor() {
    this.addMessage('Hola, soy IA ROTROT. ¿En qué puedo ayudarte hoy?', 'bot');
  }

  addMessage(text: string, sender: 'user' | 'bot') {
    this.messages.push({ text, sender });
    setTimeout(() => {
      const container = document.querySelector('.messages');
      if (container) container.scrollTop = container.scrollHeight;
    });
  }

  sendMessage() {
    const text = this.userInput.trim();
    if (!text) return;

    this.addMessage(text, 'user');
    this.userInput = '';

    switch (this.step) {
      case 0:
        this.addMessage('Antes de continuar, ¿podrías decirme tu nombre?', 'bot');
        this.step++;
        break;

      case 1:
        this.nombre = text;
        sessionStorage.setItem('nombre', this.nombre);
        this.addMessage(`Gracias, ${this.nombre}. ¿Cuál es tu apellido?`, 'bot');
        this.step++;
        break;

      case 2:
        this.apellido = text;
        sessionStorage.setItem('apellido', this.apellido);
        this.addMessage('Perfecto. ¿Podrías brindarme tu DNI?', 'bot');
        this.step++;
        break;

      case 3:
        this.dni = text;
        sessionStorage.setItem('dni', this.dni);
        this.addMessage(
          `Gracias ${this.nombre}. Ya tengo tus datos. Ahora dime, ¿qué te gustaría saber sobre AuthenTrace?`,
          'bot'
        );
        this.step++;
        break;

      default:
        this.handleAuthenTraceQuestion(text);
        break;
    }
  }

  handleAuthenTraceQuestion(question: string) {
    const q = question.toLowerCase();

    if (q.includes('registrar') || q.includes('cuenta')) {
      this.addMessage(
        'Para registrar una cuenta en AuthenTrace, dirígete a la sección "Crear Cuenta" y completa tus datos personales.',
        'bot'
      );
    } else if (q.includes('documento') || q.includes('subir')) {
      this.addMessage(
        'Para subir un documento, accede a tu panel y selecciona "Documentos" → "Nuevo Documento". Luego adjunta el archivo y guarda.',
        'bot'
      );
    } else if (q.includes('firma') || q.includes('firmar')) {
      this.addMessage(
        'En AuthenTrace puedes firmar tus documentos desde la sección "Firmas". Solo selecciona el documento y elige "Firmar".',
        'bot'
      );
    } else if (q.includes('reporte')) {
      this.addMessage(
        'Los reportes se generan automáticamente con la actividad de tus documentos y firmas. Puedes consultarlos en la pestaña "Reportes".',
        'bot'
      );
    } else if (q.includes('soporte')) {
      this.addMessage(
        'Puedes contactar con nuestro equipo de soporte enviando un formulario desde la sección "Soporte".',
        'bot'
      );
    } else {
      this.addMessage(
        'No tengo esa información específica aún 🤖, pero puedo ayudarte con temas como crear cuenta, subir documentos, firmar o reportes.',
        'bot'
      );
    }
  }
}
