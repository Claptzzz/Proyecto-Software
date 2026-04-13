import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { useStore } from './store';

import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import BrowseAyudantias from './pages/student/BrowseAyudantias';
import Postulaciones from './pages/student/Postulaciones';
import ProfessorDashboard from './pages/professor/Dashboard';
import MisRamos from './pages/professor/MisRamos';
import GestionAyudantia from './pages/professor/GestionAyudantia';

function RequireStudent() {
  const currentUser = useStore(s => s.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== 'student') return <Navigate to="/profesor/dashboard" replace />;
  return <Outlet />;
}

function RequireProfessor() {
  const currentUser = useStore(s => s.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== 'professor') return <Navigate to="/student/dashboard" replace />;
  return <Outlet />;
}

function RedirectIfLoggedIn({ to }: { to?: string }) {
  const currentUser = useStore(s => s.currentUser);
  if (currentUser) {
    return <Navigate to={to ?? (currentUser.role === 'student' ? '/student/dashboard' : '/profesor/dashboard')} replace />;
  }
  return <Outlet />;
}

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },

  {
    element: <RedirectIfLoggedIn />,
    children: [
      { path: '/login', element: <Login /> },
    ],
  },

  {
    element: <RequireStudent />,
    children: [
      {
        path: '/student',
        element: <Layout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <StudentDashboard /> },
          { path: 'profile', element: <StudentProfile /> },
          { path: 'ayudantias', element: <BrowseAyudantias /> },
          { path: 'postulaciones', element: <Postulaciones /> },
        ],
      },
    ],
  },

  {
    element: <RequireProfessor />,
    children: [
      {
        path: '/profesor',
        element: <Layout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <ProfessorDashboard /> },
          { path: 'ramos', element: <MisRamos /> },
          { path: 'ayudantia/:id', element: <GestionAyudantia /> },
        ],
      },
    ],
  },

  { path: '*', element: <Navigate to="/" replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
