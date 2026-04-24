# NO MODIFICAR ESTE ARCHIVO

# Especificaciones Técnicas — Studio Ghibli App

---

## Resumen del proyecto

Aplicación web SPA (Single Page Application) que consume la API pública de Studio Ghibli para mostrar su catálogo de películas. Permite buscar, filtrar, ver detalles y guardar favoritos con persistencia local.

---

## Finalidad del proyecto

Proyecto final del Módulo 2 del bootcamp. Objetivo: demostrar el dominio de React y su ecosistema construyendo una aplicación funcional, modular y testeada.

---

## Requisitos técnicos

- React 19 con Vite como bundler
- React Router v7 para navegación entre páginas
- Context API para estado global
- CSS Modules + CSS global + inline styles
- Vitest + Testing Library para tests unitarios
- API pública sin autenticación: `https://ghibliapi.vercel.app`
- Deploy en Vercel
- Responsive para 600px, 1024px y superior

---

## Jerarquía de carpetas

```
src/
├── components/
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   └── Navbar.module.css
│   └── MovieCard/
│       ├── MovieCard.jsx
│       └── MovieCard.module.css
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
│   ├── context/
│   │   ├── FilmsContext.test.jsx
│   │   └── WatchlistContext.test.jsx
│   ├── helpers.jsx
│   └── setup.js
├── App.jsx
├── main.jsx
└── global.css
```

---
