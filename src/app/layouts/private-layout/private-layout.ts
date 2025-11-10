import { Component } from '@angular/core';
import {Sidebar} from '../../components/sidebar/sidebar';
import {RouterOutlet} from '@angular/router';
import {NavbarPrivado} from '../../components/navbar-privado/navbar-privado';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [
    Sidebar,
    RouterOutlet,
    NavbarPrivado
  ],
  templateUrl: './private-layout.html',
  styleUrl: './private-layout.css',
})
export class PrivateLayout {

}
