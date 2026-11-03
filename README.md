# T3STI — Centro de Pensamiento

Plataforma digital para presentar el trabajo de T3STI y acercar publicaciones, autores y contenidos sobre pensamiento complejo y gerencia cuántica. Reúne en un mismo sitio la identidad del centro y una experiencia para explorar sus artículos.

[![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![Firebase Hosting](https://img.shields.io/badge/Firebase-Hosting-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/docs/hosting)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![D3.js](https://img.shields.io/badge/D3.js-Visualization-F9A03C?logo=d3.js&logoColor=white)](https://d3js.org/)
[![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?logo=reactivex&logoColor=white)](https://rxjs.dev/)

## Vista previa

- **Demo en Firebase:** [https://t3sti-app.web.app](https://t3sti-app.web.app)
- **Captura o GIF:**

  ![Vista previa del sitio](docs/sabio.gif)

## Características principales

- **Landing institucional:** presenta el centro, su equipo y sus áreas de práctica.
- **Identidad interactiva:** explora los contenidos de misión, visión y valores desde la ilustración del lápiz.
- **Centro de Pensamiento:** consulta artículos en vista de lista o en un grafo que relaciona autores y publicaciones.
- **Búsqueda y filtros:** busca por título, tema, descripción o autor; filtra por autor y año, y ordena por fecha o título.
- **Exploración del grafo:** selecciona un autor para filtrar publicaciones relacionadas o abre una publicación desde su nodo.
- **Navegación por rutas y secciones:** incluye desplazamiento a anclas y restauración de posición.
- **Diseño adaptable:** estilos y recursos organizados para las distintas secciones de la aplicación.

> El contenido de artículos incluye registros de demostración. El filtro por país aparece deshabilitado hasta que se agregue ese dato a las publicaciones.

## Stack tecnológico

| Área | Tecnología |
| --- | --- |
| Aplicación web | Angular 19, componentes standalone y Angular Router |
| Lenguaje | TypeScript 5.8 |
| Interfaz | HTML5, CSS3, Tailwind CSS 4 y PostCSS |
| Gráficos | D3.js 7 y SVG |
| Reactividad | RxJS 7 |
| Renderizado | Angular SSR, hidratación y Express 5 |
| Herramientas | Angular CLI, npm, Vitest y jsdom |

## Instalación y ejecución local

### Requisitos

- Node.js y npm instalados.
- Git para clonar el repositorio.

### Pasos

```bash
git clone <URL_DEL_REPOSITORIO>
cd <CARPETA_DEL_REPOSITORIO>
npm install
npm start
```

Abre [http://localhost:4200](http://localhost:4200) en el navegador. El servidor de desarrollo recarga los cambios mientras trabajas.

### Comandos disponibles

```bash
npm start       # Inicia el servidor de desarrollo de Angular
npm run build   # Genera la compilación de producción
npm test        # Ejecuta las pruebas (consulta la nota sobre el builder)
npm run serve:ssr:test-simple # Sirve la compilación SSR después de npm run build
```

> **Pruebas:** el script `npm test` está definido, pero el builder configurado como `@angular/build:unit-test` debe estar disponible para ejecutarlo.

## Despliegue en Firebase Hosting

Con Firebase CLI instalado, inicia sesión y, desde la raíz del proyecto, ejecuta:

```bash
ng build
firebase deploy
```

La configuración de Hosting publica los archivos generados en `dist/test-simple/browser`.

## Rutas de la aplicación

| Ruta | Contenido |
| --- | --- |
| `/` | Landing institucional |
| `/centro-pensamiento` | Publicaciones, filtros y vista de red |
| `/mesh` | Visualización de malla |
| `/graph` | Visualización de grafo D3 |

## Estructura del proyecto

```text
src/
├── app/
│   ├── core/
│   │   ├── models/              # Modelos de personas
│   │   └── services/            # Cliente HTTP para /api/people
│   ├── layout/                  # Navegación y pie de página
│   ├── pages/
│   │   ├── landing/             # Inicio, equipo y secciones institucionales
│   │   ├── centro-pensamiento/  # Artículos, filtros y red autor-publicación
│   │   └── mesh/                # Visualización de malla
│   ├── app.routes.ts            # Rutas del cliente
│   ├── app.routes.server.ts     # Rutas de renderizado en servidor
│   └── graph.component.ts       # Visualización D3
├── assets/
│   ├── icons/
│   ├── images/
│   └── pdfs/
├── main.ts                      # Punto de entrada del navegador
├── main.server.ts               # Punto de entrada SSR
├── server.ts                    # Servidor Express para Angular SSR
└── styles.css                   # Estilos globales
```

## Integración y datos

La aplicación presenta la experiencia web y se integra con servicios backend a través de API. La capa de servicios del cliente incluye operaciones para consultar y administrar personas mediante `/api/people`; la implementación del backend se mantiene como un servicio independiente de este repositorio. Los artículos que alimentan la vista del Centro de Pensamiento se definen actualmente en el cliente.

## Autor y contacto

- **GitHub:** [Nato89](https://github.com/Nato89)
