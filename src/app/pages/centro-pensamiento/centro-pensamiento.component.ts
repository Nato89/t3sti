import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

interface Articulo {
  id: number;
  autor: string;
  fecha: string;
  fotoAutor: string;
  portada: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  pdfUrl: string;
}

@Component({
  selector: 'app-centro-pensamiento',
  imports: [RouterLink],
  templateUrl: './centro-pensamiento.component.html',
  styleUrl: './centro-pensamiento.component.css'
})
export class CentroPensamientoComponent {
  // Estado inicial: lista
  vistaActual: 'lista' | 'red' = 'lista';

  // Mock de artículos
  articulos: Articulo[] = [
    {
    id: 1,
    autor: 'Virginia Gonfiantini',
    fecha: '11 de agosto de 2025',
    fotoAutor: 'assets/images/virginia-gonfiantini.png',
    portada: 'assets/images/fa-01.png',  // Las imágenes tienen un tamaño de: 741x463,5 px
    titulo: 'Teoría del derecho modo complejo',
    subtitulo: 'Un bosquejo sobre la epigenética jurídica', // Cambiar artículo, este no es de ella
    descripcion: 'La teoría del derecho positivo es inconsistente porque tiende a ser completa...', // Cambiar artículo, este no es de ella
    pdfUrl: 'assets/pdfs/articulo1.pdf'
  },
  {
    id: 2,
    autor: 'Carlos Eduardo Maldonado',
    fecha: '27 de febrero de 2024',
    fotoAutor: 'assets/images/carlos-maldonado.png',
    portada: 'assets/images/fa-02.png',  // Las imágenes tienen un tamaño de: 741x463,5 px
    titulo: 'El problema de la ética: el convivio.',
    subtitulo: 'Ética e inteligencia artificial',
    descripcion: 'Este artículo afirma que el problema principal que plantea la IA es...',
    pdfUrl: 'assets/pdfs/el-problema-de-la-etica-Carlos_Maldonado.pdf'
  },
  {
    id: 3,
    autor: 'Felipe Rojas Toro',
    fecha: 'xx de xxxx de 2024',
    fotoAutor: 'assets/images/felipe-rojas.png',
    portada: 'assets/images/fa-03.png',    // Las imágenes tienen un tamaño de: 741x463,5 px
    titulo: 'Desinstitucionalizar la ciencia',
    subtitulo: 'Revolución científica y políticas públicas',
    descripcion: 'Este artículo formula un problema: la ciencia en América Latina nace...',
    pdfUrl: 'assets/pdfs/desinstitucionalizar-la-ciencia-Dr_Felipe_Rojas_Toro.pdf'
  },
  {
    id: 4,
    autor: 'xxxx xxxx',
    fecha: '',
    fotoAutor: '',
    portada: '',
    titulo: 'Teoría del derecho modo complejo',
    subtitulo: 'Un bosquejo sobre la epigenética jurídica',
    descripcion: 'La teoría del derecho positivo es inconsistente porque tiende a ser completa...',
    pdfUrl: 'assets/pdfs/articulo4.pdf'
  },
  {
    id: 5,
    autor: 'xxxx xxxx',
    fecha: '',
    fotoAutor: '',
    portada: '',
    titulo: 'El problema de la ética: el Convivio',
    subtitulo: 'Ética e Inteligencia Artificial',
    descripcion: 'Este artículo afirma que el problema principal que plantea la IA es...',
    pdfUrl: 'assets/pdfs/articulo5.pdf'
  },
  {
    id: 4,
    autor: 'xxxx xxxx',
    fecha: '',
    fotoAutor: '',
    portada: '',
    titulo: 'Teoría del derecho modo complejo',
    subtitulo: 'Un bosquejo sobre la epigenética jurídica',
    descripcion: 'La teoría del derecho positivo es inconsistente porque tiende a ser completa...',
    pdfUrl: 'assets/pdfs/articulo4.pdf'
  },
  {
    id: 5,
    autor: 'xxxx xxxx',
    fecha: '',
    fotoAutor: '',
    portada: '',
    titulo: 'El problema de la ética: el Convivio',
    subtitulo: 'Ética e Inteligencia Artificial',
    descripcion: 'Este artículo afirma que el problema principal que plantea la IA es...',
    pdfUrl: 'assets/pdfs/articulo5.pdf'
  },
  ];

    cambiarVista(vista: 'lista' | 'red') {
    this.vistaActual = vista;
  }

  verDetalle(articulo: Articulo) {
      console.log (`Detalle del artículo:`, articulo);
  }

  abrirArticulo(url: string) {
  window.open(url, '_blank');
  }

}
