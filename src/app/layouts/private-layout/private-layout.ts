import { Component } from '@angular/core';
import {Sidebar} from '../../components/sidebar/sidebar';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [
    Sidebar,
    RouterOutlet
  ],
  templateUrl: './private-layout.html',
  styleUrl: './private-layout.css',
})
export class PrivateLayout {

}
