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

import AdminDashboard from './pages/admin/dashboard';

function RequireStudent() {
  const currentUser = useStore(s => s.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== 'student') {
    const target = currentUser.role === 'professor' ? '/profesor/dashboard' : '/admin/dashboard';
    return <Navigate to={target} replace />;
  }
  return <Outlet />;
}

function RequireProfessor() {
  const currentUser = useStore(s => s.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== 'professor') {
    const target = currentUser.role === 'student' ? '/student/dashboard' : '/admin/dashboard';
    return <Navigate to={target} replace />;
  }
  return <Outlet />;
}

function RequireAdmin() {
  const currentUser = useStore(s => s.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== 'admin') {
    const target = currentUser.role === 'student' ? '/student/dashboard' : '/profesor/dashboard';
    return <Navigate to={target} replace />;
  }
  return <Outlet />;
}

function RedirectIfLoggedIn({ to }: { to?: string }) {
  const currentUser = useStore(s => s.currentUser);
  if (currentUser) {
    let target = to;
    if (!target) {
      if (currentUser.role === 'student') target = '/student/dashboard';
      else if (currentUser.role === 'professor') target = '/profesor/dashboard';
      else target = '/admin/dashboard';
    }
    return <Navigate to={target} replace />;
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

  {
    element: <RequireAdmin />,
    children: [
      {
        path: '/admin',
        element: <Layout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <AdminDashboard /> },
        ],
      },
    ],
  },

  { path: '*', element: <Navigate to="/" replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
