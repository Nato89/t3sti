import { MeshComponent } from '../mesh/mesh.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, MeshComponent],
  templateUrl: './landing.component.html',
  styleUrls: [
    './landing.component.css',   // utilidades compartidas
    './landing-hero.css',
    './landing-identity.css',
    './landing-team.css',
    './landing-areas.css',
    './landing-services.css',
    './landing-centro.css'
  ]
})
export class LandingComponent {

  // Inicialmente el logo se muestra, pero cuando se pasa el mouse por el lapiz, se oculta
  mostrarLogo: boolean = true;

  // Variable para guardar el contenido dinámico (mision, vision y valores)
  // Si es null, no se muestra nada, si tiene datos, se renderiza en el HTML
  contenidoActual: { titulo: string; texto: string } | null = null;

  // Controla si el recuadro de perfil está visible
  mostrarPerfil: boolean = false;
  // Guarda el miembro seleccionado al dar clic en "Más información"
miembroSeleccionado: { nombre: string; titulo: string; foto: string; descripcion: string } | null = null;

verMas(miembro: any) {
    this.miembroSeleccionado = miembro;
    this.mostrarPerfil = true;
  }

  cerrarPerfil() {
    this.mostrarPerfil = false;
    this.miembroSeleccionado = null;
  }



  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Método para activar contenido dinámico, recibe el tipo de zona y oculta el logo y carga el texto correspondiente
  activarContenido(tipo:string) {
    this.mostrarLogo = false;

    if (tipo === 'mision') {
      this.contenidoActual = { titulo: 'Misión', texto: 'Aportar conocimiento estratégico desde la complejidad y la gerencia cuántica para anticipar, comprender y transformar sistemas sociales, políticos y económicos.' };
    } else if (tipo === 'valores') {
      this.contenidoActual = { titulo: 'Valores', texto: '* Interdisciplinaridad\n* Innovación\n* Ética\n* Pensamiento crítico\n* Prospectiva' };
    } else if (tipo === 'vision') {
      this.contenidoActual = { titulo: 'Visión', texto: 'Ser referentes iberoamericano en la generación de conocimiento innovador para gobiernos, empresas y sociedad civil' };
    }
  }

  // Método para desactivar el contenido dinámico y volver a mostrar el logo
  restaurar() {
    this.mostrarLogo = true;
    this.contenidoActual = null;
  }

 currentSlide = 0;
totalSlides = 6; // número de slides que tienes

prevSlide() {
  this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
}

nextSlide() {
  this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
}

}
