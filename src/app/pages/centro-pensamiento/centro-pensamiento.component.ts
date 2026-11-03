import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  pais?: string;
}

interface AutorFiltro {
  nombre: string;
  nombreCorto: string;
  foto: string;
}

type OrdenArticulos = 'recientes' | 'antiguos' | 'titulo';

interface NodoAutorRed {
  id: string;
  filtro: string;
  nombre: string;
  foto: string;
  y: number;
  total: number;
  clipId: string;
}

interface NodoPublicacionRed {
  indice: number;
  articulo: Articulo;
  y: number;
}

interface EnlaceRed {
  id: number;
  yAutor: number;
  yPublicacion: number;
}

interface DatosRed {
  alto: number;
  autores: NodoAutorRed[];
  publicaciones: NodoPublicacionRed[];
  enlaces: EnlaceRed[];
}

@Component({
  selector: 'app-centro-pensamiento',
  imports: [FormsModule, RouterLink],
  templateUrl: './centro-pensamiento.component.html',
  styleUrl: './centro-pensamiento.component.css'
})
export class CentroPensamientoComponent {
  // Estado inicial: lista
  vistaActual: 'lista' | 'red' = 'lista';

  terminoBusqueda = '';
  autorSeleccionado = '';
  anioSeleccionado = '';
  paisSeleccionado = '';
  ordenSeleccionado: OrdenArticulos = 'recientes';

  readonly autores: AutorFiltro[] = [
    {
      nombre: 'Virginia Gonfiantini',
      nombreCorto: 'Virginia',
      foto: 'assets/images/virginia-gonfiantini.png'
    },
    {
      nombre: 'Carlos Eduardo Maldonado',
      nombreCorto: 'Carlos',
      foto: 'assets/images/carlos-maldonado.png'
    },
    {
      nombre: 'Felipe Rojas Toro',
      nombreCorto: 'Felipe',
      foto: 'assets/images/felipe-rojas.png'
    }
  ];

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

  get aniosDisponibles(): string[] {
    return [...new Set(
      this.articulos
        .map((articulo) => this.obtenerAnio(articulo.fecha))
        .filter((anio) => anio !== '')
    )].sort((a, b) => Number(b) - Number(a));
  }

  get paisesDisponibles(): string[] {
    return [...new Set(
      this.articulos
        .map((articulo) => articulo.pais?.trim() ?? '')
        .filter((pais) => pais !== '')
    )].sort((a, b) => a.localeCompare(b));
  }

  get articulosFiltrados(): Articulo[] {
    const termino = this.normalizar(this.terminoBusqueda.trim());

    return this.articulos
      .filter((articulo) => {
        const coincideBusqueda = !termino || this.normalizar([
          articulo.titulo,
          articulo.subtitulo,
          articulo.descripcion,
          articulo.autor
        ].join(' ')).includes(termino);
        const coincideAutor = !this.autorSeleccionado || articulo.autor === this.autorSeleccionado;
        const coincideAnio = !this.anioSeleccionado
          || this.obtenerAnio(articulo.fecha) === this.anioSeleccionado;
        const coincidePais = !this.paisSeleccionado || articulo.pais === this.paisSeleccionado;

        return coincideBusqueda && coincideAutor && coincideAnio && coincidePais;
      })
      .sort((a, b) => {
        if (this.ordenSeleccionado === 'titulo') {
          return a.titulo.localeCompare(b.titulo, 'es', { sensitivity: 'base' });
        }

        const fechaA = this.obtenerFechaOrdenable(a.fecha);
        const fechaB = this.obtenerFechaOrdenable(b.fecha);

        if (fechaA === null && fechaB === null) return 0;
        if (fechaA === null) return 1;
        if (fechaB === null) return -1;

        return this.ordenSeleccionado === 'recientes' ? fechaB - fechaA : fechaA - fechaB;
      });
  }

  get articulosDestacados(): Articulo[] {
    return this.articulosFiltrados.slice(0, 3);
  }

  get articulosSecundarios(): Articulo[] {
    return this.articulosFiltrados.slice(3);
  }

  get datosRed(): DatosRed {
    const articulos = this.articulosFiltrados;
    const publicaciones = articulos.map((articulo, indice) => ({
      indice,
      articulo,
      y: 82 + indice * 76
    }));
    const porAutor = new Map<string, NodoAutorRed>();

    for (const publicacion of publicaciones) {
      const { articulo } = publicacion;
      const nombreOriginal = articulo.autor.trim();
      const id = !nombreOriginal || nombreOriginal.toLocaleLowerCase('es') === 'xxxx xxxx'
        ? 'autor-desconocido'
        : nombreOriginal;
      const autor = porAutor.get(id);

      if (autor) {
        autor.y = (autor.y * autor.total + publicacion.y) / (autor.total + 1);
        autor.total += 1;
      } else {
        const nombre = id === 'autor-desconocido' ? 'Autor por identificar' : id;
        porAutor.set(id, {
          id,
          filtro: nombreOriginal || 'xxxx xxxx',
          nombre,
          foto: articulo.fotoAutor,
          y: publicacion.y,
          total: 1,
          clipId: `network-author-${porAutor.size}`
        });
      }
    }

    const autores = [...porAutor.values()];
    const posicionesAutores = new Map(autores.map((autor) => [autor.id, autor.y]));
    const enlaces = publicaciones.map((publicacion) => {
      const nombreOriginal = publicacion.articulo.autor.trim();
      const id = !nombreOriginal || nombreOriginal.toLocaleLowerCase('es') === 'xxxx xxxx'
        ? 'autor-desconocido'
        : nombreOriginal;

      return {
        id: publicacion.indice,
        yAutor: posicionesAutores.get(id) ?? publicacion.y,
        yPublicacion: publicacion.y
      };
    });

    return {
      alto: Math.max(220, 126 + publicaciones.length * 76),
      autores,
      publicaciones,
      enlaces
    };
  }

  get hayFiltrosActivos(): boolean {
    return Boolean(
      this.terminoBusqueda
      || this.autorSeleccionado
      || this.anioSeleccionado
      || this.paisSeleccionado
      || this.ordenSeleccionado !== 'recientes'
    );
  }

  alternarAutor(autor: string): void {
    this.autorSeleccionado = this.autorSeleccionado === autor ? '' : autor;
  }

  limpiarFiltros(): void {
    this.terminoBusqueda = '';
    this.autorSeleccionado = '';
    this.anioSeleccionado = '';
    this.paisSeleccionado = '';
    this.ordenSeleccionado = 'recientes';
  }

  private obtenerAnio(fecha: string): string {
    return fecha.match(/\b\d{4}\b/)?.[0] ?? '';
  }

  private obtenerFechaOrdenable(fecha: string): number | null {
    const match = fecha.match(/^(\d{1,2}) de ([a-záéíóúñ]+) de (\d{4})$/i);
    if (!match) return null;

    const meses: Record<string, number> = {
      enero: 0,
      febrero: 1,
      marzo: 2,
      abril: 3,
      mayo: 4,
      junio: 5,
      julio: 6,
      agosto: 7,
      septiembre: 8,
      setiembre: 8,
      octubre: 9,
      noviembre: 10,
      diciembre: 11
    };
    const dia = Number(match[1]);
    const mes = meses[this.normalizar(match[2])];
    const anio = Number(match[3]);

    if (mes === undefined) return null;
    const fechaOrdenable = new Date(Date.UTC(anio, mes, dia));
    if (fechaOrdenable.getUTCMonth() !== mes || fechaOrdenable.getUTCDate() !== dia) return null;

    return fechaOrdenable.getTime();
  }

  private normalizar(texto: string): string {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('es');
  }

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
