# Plataforma de Ayudantías UCN

Plataforma web para gestionar la postulación y asignación de ayudantías en la Universidad Católica del Norte. Permite a los estudiantes explorar ayudantías abiertas y postular, y a los profesores publicar ayudantías de sus ramos y revisar postulaciones.

## Integrantes

- Danilo Lucero
- Martin Diaz
- Nicolás Rojas

## Stack

**Frontend**
- React 19 + TypeScript + Vite
- React Router 7
- Zustand (con `persist`) para estado global
- Tailwind CSS 4
- Lucide React (íconos)

**Backend**
- Pendiente (carpeta `backend/` reservada).

## Estructura

```
plataforma-ayudantias/
├── backend/                  # (placeholder)
└── frontend/
    └── src/
        ├── App.tsx           # Rutas y guards por rol
        ├── components/layout # Layout compartido autenticado
        ├── pages/
        │   ├── Landing.tsx
        │   ├── auth/Login.tsx
        │   ├── student/      # Dashboard, Profile, BrowseAyudantias, Postulaciones
        │   └── professor/    # Dashboard, MisRamos, GestionAyudantia
        ├── store/            # Zustand store (currentUser, datos)
        └── types/            # User, StudentProfile, Course, Ayudantia, Application, ...
```

## Roles y rutas

- **Estudiante** (`/student/*`): dashboard, perfil, explorar ayudantías, mis postulaciones.
- **Profesor** (`/profesor/*`): dashboard, mis ramos, gestión de cada ayudantía (`/profesor/ayudantia/:id`).

Las rutas están protegidas por `RequireStudent` / `RequireProfessor` en `App.tsx`; usuarios autenticados son redirigidos al dashboard que les corresponde.

## Modelo de datos (resumen)

`User` (role: `student` | `professor`), `StudentProfile` (RUT, carrera, año, GPA, experiencia), `ProfessorProfile`, `Course`, `Ayudantia` (estado `open`/`closed`, cupos, asignados), `Application` (estado `pending`/`accepted`/`rejected`). Definiciones completas en `frontend/src/types/index.ts`.

## Desarrollo

Requisitos: Node.js 20+ y npm.

```bash
cd frontend
npm install
npm run dev      # Vite en modo desarrollo
npm run build    # tsc -b && vite build
npm run lint
npm run preview
```

El estado se persiste en `localStorage` vía `zustand/middleware`, por lo que actualmente la app funciona sin backend.
