import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../store';
import {
  LayoutDashboard, User, Search, FileText,
  BookOpen, LogOut,
} from 'lucide-react';
import ucnShield from '../../assets/LogoUCN_acentuado.png';
import escuelaLogo from '../../assets/Logo Escuela Ingeniería.svg';
import acreditacionBlanco from '../../assets/acreditacion-blanco-horizontal.png';

// UCN Brand colors (Guía de Normas Gráficas Institucionales):
// Pantone 652 C → #7E9BC0  (azul institucional)
// Pantone 471 C → #AC6D33  (terra / cobre)
// Terra 60%     → #CAA987  (terra claro)
// Azul oscuro   → #2B5C8A  (Pantone 540/300, paleta secundaria)

const studentLinks = [
  { to: '/student/dashboard',     label: 'Inicio',            icon: LayoutDashboard },
  { to: '/student/profile',       label: 'Mi Perfil',         icon: User },
  { to: '/student/ayudantias',    label: 'Ayudantías',        icon: Search },
  { to: '/student/postulaciones', label: 'Mis Postulaciones', icon: FileText },
];

const professorLinks = [
  { to: '/profesor/dashboard', label: 'Inicio',    icon: LayoutDashboard },
  { to: '/profesor/ramos',     label: 'Mis Ramos', icon: BookOpen },
];

const adminLinks = [
  { to: '/admin/dashboard', label: 'Panel Control', icon: LayoutDashboard },
];

type RoleAccent = {
  hex: string;
  hexDark: string;
  text: string;
  blob: string;
};

const roleAccents: Record<string, RoleAccent> = {
  student:   { hex: '#7E9BC0', hexDark: '#2B5C8A', text: 'text-[#7E9BC0]', blob: 'rgba(126,155,192,0.18)' },
  professor: { hex: '#AC6D33', hexDark: '#8B5226', text: 'text-[#CAA987]', blob: 'rgba(172,109,51,0.18)' },
  admin:     { hex: '#2B5C8A', hexDark: '#1A3F6A', text: 'text-[#7E9BC0]', blob: 'rgba(43,92,138,0.20)' },
};

export default function Layout() {
  const { currentUser, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const role = currentUser?.role ?? 'student';
  const accent = roleAccents[role] ?? roleAccents.student;

  const links = (() => {
    if (role === 'student')   return studentLinks;
    if (role === 'professor') return professorLinks;
    if (role === 'admin')     return adminLinks;
    return [];
  })();

  const roleLabel = (() => {
    if (role === 'student')   return 'Estudiante';
    if (role === 'professor') return 'Profesor/a';
    if (role === 'admin')     return 'Administrador';
    return '';
  })();

  const initials = currentUser?.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() ?? '?';

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* ── Sidebar institucional UCN ───────────────────────── */}
      <aside className="relative w-64 shrink-0 flex flex-col overflow-hidden bg-gradient-to-b from-[#0B1629] via-[#102040] to-[#081420]">
        {/* Decorativos */}
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" aria-hidden="true" />
        <div
          className="absolute -top-20 -left-16 w-64 h-64 rounded-full blur-3xl animate-float pointer-events-none"
          style={{ backgroundColor: accent.blob }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -right-12 w-72 h-72 rounded-full blur-3xl animate-float pointer-events-none"
          style={{ backgroundColor: 'rgba(202,169,135,0.10)', animationDelay: '-3s' }}
          aria-hidden="true"
        />

        {/* Marca institucional */}
        <div className="relative z-10 px-5 py-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 group" aria-label="Ir al inicio">
            <img
              src={ucnShield}
              alt="Universidad Católica del Norte"
              className="h-11 w-11 object-contain drop-shadow-lg shrink-0 transition-transform duration-200 group-hover:scale-105"
            />
            <div className="leading-tight min-w-0">
              <p className="text-white font-light text-sm">Universidad</p>
              <p className="text-white font-light text-sm">Católica del Norte</p>
              <p className={`text-[9px] font-semibold tracking-[0.2em] uppercase mt-1 ${accent.text}`}>
                Plataforma Ayudantías
              </p>
            </div>
          </Link>
        </div>

        {/* Navegación */}
        <nav className="relative z-10 flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <p className="px-3 mb-2 text-[10px] font-semibold tracking-[0.22em] uppercase text-white/35">
            Menú
          </p>
          {links.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to || location.pathname.startsWith(to + '/');
            return (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'text-white'
                    : 'text-white/55 hover:text-white hover:bg-white/5 hover:translate-x-0.5'
                }`}
                style={
                  active
                    ? {
                        backgroundImage: `linear-gradient(135deg, ${accent.hex}, ${accent.hexDark})`,
                        boxShadow: `0 10px 24px -12px ${accent.hex}`,
                      }
                    : undefined
                }
              >
                {active && (
                  <span
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-white/90"
                    aria-hidden="true"
                  />
                )}
                <Icon size={17} className={active ? 'text-white' : 'text-white/70'} />
                <span className="flex-1">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Tarjeta de usuario */}
        <div className="relative z-10 px-3 pt-3 pb-3 border-t border-white/10 space-y-2">
          <div className="flex items-center gap-3 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md ring-1 ring-white/15"
              style={{ backgroundImage: `linear-gradient(135deg, ${accent.hex}, ${accent.hexDark})` }}
            >
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-xs font-semibold truncate">{currentUser?.name}</p>
              <p className={`text-[10px] tracking-wider uppercase font-semibold ${accent.text}`}>
                {roleLabel}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-white/55 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-150 group"
          >
            <LogOut size={15} className="group-hover:-translate-x-0.5 transition-transform duration-150" />
            Cerrar sesión
          </button>
        </div>

        {/* Footer institucional */}
        <div className="relative z-10 px-5 pb-4 pt-2 border-t border-white/5 flex items-center justify-between gap-3">
          <img
            src={escuelaLogo}
            alt="Escuela de Ingeniería UCN"
            className="h-7 object-contain brightness-0 invert opacity-50"
          />
          <img
            src={acreditacionBlanco}
            alt="Acreditación Institucional UCN"
            className="h-8 object-contain opacity-75"
          />
        </div>
      </aside>

      {/* ── Contenido ───────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
