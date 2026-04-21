import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import {
  LayoutDashboard, User, Search, FileText,
  BookOpen, LogOut, GraduationCap,
} from 'lucide-react';

const studentLinks = [
  { to: '/student/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { to: '/student/profile', label: 'Mi Perfil', icon: User },
  { to: '/student/ayudantias', label: 'Ayudantías', icon: Search },
  { to: '/student/postulaciones', label: 'Mis Postulaciones', icon: FileText },
];

const professorLinks = [
  { to: '/profesor/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { to: '/profesor/ramos', label: 'Mis Ramos', icon: BookOpen },
];

export default function Layout() {
  const { currentUser, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const links = currentUser?.role === 'student' ? studentLinks : professorLinks;
  const roleLabel = currentUser?.role === 'student' ? 'Estudiante' : 'Profesor/a';
  const initials = currentUser?.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() ?? '?';

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700/60">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md shadow-blue-900/40">
            <GraduationCap size={18} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">UCN Ayudantías</p>
            <p className="text-slate-400 text-xs mt-0.5">Plataforma de Gestión</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {links.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to || location.pathname.startsWith(to + '/');
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-900/50'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-0.5'
                }`}
              >
                <Icon size={17} className={active ? 'text-blue-200' : ''} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-slate-700/60">
          <div className="flex items-center gap-3 px-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{currentUser?.name}</p>
              <p className="text-slate-400 text-xs">{roleLabel}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all duration-150 group"
          >
            <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform duration-150" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
