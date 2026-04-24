# Studio Ghibli App

Aplicación web desarrollada con React que permite explorar el catálogo de películas de Studio Ghibli, buscarlas, filtrarlas y guardar favoritos.

**Demo:** [proyecto-react-igkc.vercel.app](https://proyecto-react-igkc.vercel.app)  
**Repositorio:** [github.com/hecrocsoc-cpu/Proyecto-react](https://github.com/hecrocsoc-cpu/Proyecto-react)

---

## Tecnologías

- React 19 + Vite
- React Router v7
- CSS Modules + CSS global + variables CSS
- Vitest + Testing Library
- API pública: [Studio Ghibli API](https://ghibliapi.vercel.app)

---

## Estructura del proyecto
```
src/
├── components/
│   ├── Navbar/
│   └── MovieCard/
├── context/
│   ├── FilmsContext.jsx
│   ├── WatchlistContext.jsx
│   └── ThemeContext.jsx
├── hooks/
│   └── useCharacterSearch.js
├── pages/
│   ├── HomePage/
│   ├── SearchPage/
│   ├── FilmDetailPage/
│   ├── FavoritesPage/
│   └── NotFoundPage/
├── tests/
├── App.jsx
├── main.jsx
└── global.css
```
---

## Funcionalidades

- Listado de todas las películas de Studio Ghibli
- Filtros por título, año, duración y puntuación
- Búsqueda por texto
- Detalle de cada película con ruta `/film/:id`
- Añadir y quitar favoritos (persistidos en localStorage)
- Modo claro/oscuro
- Diseño responsive (móvil, tablet y escritorio)
- Menú hamburguesa en móvil
- Efecto flip 3D en las cards

---

## Tests

12 tests unitarios con Vitest y Testing Library.

Para ejecutarlos:

```bash
npm run test
```

**WatchlistContext** (8 tests): estado inicial vacío, añadir película, no duplicar, eliminar, `isInFavorites`, persistencia en localStorage, restauración desde localStorage, error fuera del Provider.

**FilmsContext** (4 tests): estado de carga, carga correcta de películas, error de API, error fuera del Provider.

---

## Instalación local

```bash
git clone https://github.com/hecrocsoc-cpu/Proyecto-react.git
cd Proyecto-react
npm install
npm run dev
```

No se requiere `.env` — la API es pública y no necesita autenticación.

---

## Responsive

| Breakpoint | Layout |
|---|---|
| < 600px | 1 columna, menú hamburguesa |
| 600px – 1024px | 2 columnas |
| > 1024px | 3+ columnas |

---

## Tiempos de desarrollo

| Tarea | Tiempo estimado | Tiempo real | Anotaciones 
|---|---|---|---|
| Configuración inicial (Vite, Router, estructura) | 1h | 4h | Familiarización y retocar varias veces |
| Contextos (Films, Watchlist, Theme) | 2h | 3h| Problemas con modo oscuro 
| Páginas y rutas | 2h | 1h | Fácil de entedner con IA
| Componentes (Navbar, MovieCard) | 2h | 4h | Cuadrar fondo, distribución y efectos en las cards
| Estilos y responsive | 3h | 5h | Detalles en diferentes resoluciones y ajustes
| Tests unitarios | 2h | 1h | Base muy rápida con IA
| Correcciones y mejoras (overlay, hamburguesa) | 2h | 1h | Mayor control en el proyecto
| Deploy y README | 1h | 1h | Sencillo con Vercel
| Refactorización y arreglar README | 1h | 2h| Unificar comentarios y documentación suelta
| **Total** | **16h** | **22h** | |

---

## Uso de la IA

Durante el desarrollo utilicé dos herramientas de IA como apoyo:

**Claude**  
Usado principalmente para generación y corrección de código. Fue el asistente principal durante todo el proyecto: componentes, contextos, tests, estilos y resolución de bugs concretos y guia en funciones de JS.

**ChatGPT**  
Usado mayormente para consultas de react, css y deploy.

