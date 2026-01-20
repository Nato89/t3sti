import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-centro-pensamiento',
  imports: [RouterLink],
  templateUrl: './centro-pensamiento.component.html',
  styleUrl: './centro-pensamiento.component.css'
})
export class CentroPensamientoComponent {
  // Estado inicial: lista
  vistaActual: 'lista' | 'red' = 'lista';

  cambiarVista(vista: 'lista' | 'red') {
    this.vistaActual = vista;
  }

}
