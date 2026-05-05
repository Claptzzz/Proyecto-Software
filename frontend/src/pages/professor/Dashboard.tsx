import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store';
import {
  BookOpen, FileText, Clock, Users, ChevronRight, ArrowUpRight,
  GraduationCap, Sun, Moon, CloudSun, MapPin, Camera,
} from 'lucide-react';
import ucnShield from '../../assets/LogoUCN_acentuado.png';

const WEEKDAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const MONTHS   = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

function getGreeting(h: number) {
  if (h >= 5  && h < 12) return { label: 'Buenos días',   Icon: Sun };
  if (h >= 12 && h < 19) return { label: 'Buenas tardes', Icon: CloudSun };
  return                       { label: 'Buenas noches', Icon: Moon };
}

// UCN Brand colors (Guía de Normas Gráficas Institucionales):
// Pantone 652 C → #7E9BC0  (azul institucional)
// Pantone 471 C → #AC6D33  (terra / cobre)
// Terra 60%     → #CAA987  (terra claro)
// Azul oscuro   → #2B5C8A  (Pantone 540/300, paleta secundaria)

export default function ProfessorDashboard() {
  const { currentUser, courses, ayudantias, applications, users, studentProfiles } = useStore();

  const myCourses  = courses.filter(c => c.professorId === currentUser?.id);
  const myAys      = ayudantias.filter(a => a.professorId === currentUser?.id);
  const myAppIds   = myAys.map(a => a.id);
  const allApps    = applications.filter(a => myAppIds.includes(a.ayudantiaId));
  const pendingApps = allApps.filter(a => a.status === 'pending');
  const activeAys  = myAys.filter(a => a.status === 'open');

  const stats = [
    {
      label: 'Mis ramos',
      value: myCourses.length,
      icon: BookOpen,
      iconColor: 'text-[#2B5C8A]',
      iconBg: 'bg-[#7E9BC0]/12',
      accent: 'bg-[#7E9BC0]',
      hover: 'hover:border-[#7E9BC0]/60 hover:shadow-[#7E9BC0]/15',
    },
    {
      label: 'Ayudantías activas',
      value: activeAys.length,
      icon: Users,
      iconColor: 'text-[#8B5226]',
      iconBg: 'bg-[#AC6D33]/12',
      accent: 'bg-[#AC6D33]',
      hover: 'hover:border-[#AC6D33]/60 hover:shadow-[#AC6D33]/15',
    },
    {
      label: 'Postulaciones',
      value: allApps.length,
      icon: FileText,
      iconColor: 'text-[#1A3F6A]',
      iconBg: 'bg-[#2B5C8A]/12',
      accent: 'bg-[#2B5C8A]',
      hover: 'hover:border-[#2B5C8A]/60 hover:shadow-[#2B5C8A]/15',
    },
    {
      label: 'Pendientes de revisión',
      value: pendingApps.length,
      icon: Clock,
      iconColor: 'text-[#8B5226]',
      iconBg: 'bg-[#CAA987]/25',
      accent: 'bg-[#CAA987]',
      hover: 'hover:border-[#CAA987]/70 hover:shadow-[#CAA987]/25',
    },
  ];

  const firstName = currentUser?.name.split(' ').slice(0, 2).join(' ');
  const initials = currentUser?.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() ?? '?';

  // Reloj en vivo para el widget del hero (refresca cada minuto).
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const { label: greeting, Icon: GreetingIcon } = getGreeting(now.getHours());
  const dateStr = `${WEEKDAYS[now.getDay()]}, ${now.getDate()} de ${MONTHS[now.getMonth()]}`;
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div className="min-h-full bg-gradient-to-br from-white via-gray-50/40 to-[#7E9BC0]/5">
      <div className="p-6 lg:p-10 max-w-6xl mx-auto animate-slide-up">

        {/* ── Hero institucional ───────────────────────────────── */}
        {/*
          La normativa UCN describe los azules del isotipo como "los cielos
          nortinos, la posibilidad de tocar las estrellas y el mar". El hero
          evoca esa idea con un cielo nocturno animado: gradiente profundo,
          grilla y constelación de estrellas titilantes.
        */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1629] via-[#102040] to-[#081420] text-white mb-8 shadow-xl shadow-[#0B1629]/20">
          <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
          <div className="absolute -top-16 -left-12 w-72 h-72 bg-[#7E9BC0]/15 rounded-full blur-3xl animate-float" aria-hidden="true" />
          <div
            className="absolute -bottom-20 -right-10 w-80 h-80 bg-[#AC6D33]/12 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '-3s' }}
            aria-hidden="true"
          />

          {/* Constelación: cielos nortinos */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {[
              // Estrellas brillantes (4 con halo azul UCN)
              { top: '15%', left: '12%', size: 5, delay: '0s',   bright: true },
              { top: '42%', left: '78%', size: 5, delay: '0.8s', bright: true },
              { top: '68%', left: '32%', size: 5, delay: '1.4s', bright: true },
              { top: '25%', left: '92%', size: 5, delay: '0.4s', bright: true },
              // Medianas
              { top: '8%',  left: '28%', size: 3, delay: '0.3s' },
              { top: '22%', left: '45%', size: 3, delay: '1.0s' },
              { top: '32%', left: '8%',  size: 3, delay: '0.7s' },
              { top: '38%', left: '58%', size: 3, delay: '1.6s' },
              { top: '52%', left: '22%', size: 3, delay: '0.5s' },
              { top: '60%', left: '85%', size: 3, delay: '1.3s' },
              { top: '72%', left: '15%', size: 3, delay: '0.9s' },
              { top: '80%', left: '52%', size: 3, delay: '0.2s' },
              { top: '85%', left: '88%', size: 3, delay: '1.5s' },
              { top: '12%', left: '62%', size: 3, delay: '1.1s' },
              // Pequeñas (estrellas lejanas)
              { top: '5%',  left: '50%', size: 2, delay: '0.6s' },
              { top: '18%', left: '72%', size: 2, delay: '1.2s' },
              { top: '28%', left: '32%', size: 2, delay: '1.7s' },
              { top: '45%', left: '95%', size: 2, delay: '0.4s' },
              { top: '55%', left: '40%', size: 2, delay: '0.8s' },
              { top: '62%', left: '5%',  size: 2, delay: '1.4s' },
              { top: '65%', left: '68%', size: 2, delay: '0.1s' },
              { top: '75%', left: '92%', size: 2, delay: '1.0s' },
              { top: '78%', left: '40%', size: 2, delay: '0.5s' },
              { top: '88%', left: '20%', size: 2, delay: '1.3s' },
              { top: '92%', left: '65%', size: 2, delay: '0.7s' },
              { top: '38%', left: '38%', size: 2, delay: '1.6s' },
              { top: '48%', left: '52%', size: 2, delay: '0.9s' },
              { top: '70%', left: '75%', size: 2, delay: '1.2s' },
            ].map((s, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  top: s.top,
                  left: s.left,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  opacity: s.bright ? 0.95 : 0.55 + (s.size - 2) * 0.15,
                  boxShadow: s.bright
                    ? '0 0 12px rgba(255,255,255,0.95), 0 0 22px rgba(126,155,192,0.55)'
                    : '0 0 6px rgba(255,255,255,0.7)',
                  animationDelay: s.delay,
                  animationDuration: s.bright ? '2.8s' : '3.5s',
                }}
              />
            ))}
          </div>

          <div className="relative z-10 px-6 sm:px-10 py-9 sm:py-11 flex flex-col lg:flex-row lg:items-center gap-8">

            {/* Avatar mockup (foto de perfil) + saludo */}
            <div className="flex items-center gap-5 lg:gap-6 flex-1 min-w-0">

              {/* Foto de perfil — placeholder, se conectará desde Mi Perfil */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-[#AC6D33] to-[#8B5226] flex items-center justify-center text-white text-2xl lg:text-3xl font-bold ring-4 ring-white/10 shadow-xl shadow-[#AC6D33]/30 select-none">
                  {initials}
                </div>
                <span
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center"
                  aria-hidden="true"
                  title="Próximamente: editar foto de perfil"
                >
                  <Camera size={12} className="text-white/85" />
                </span>
              </div>

              {/* Saludo */}
              <div className="min-w-0 flex-1">
                <p className="text-[#7E9BC0] text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">
                  Plataforma de Ayudantías · UCN
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  Bienvenido/a,{' '}
                  <span className="bg-gradient-to-r from-[#7E9BC0] to-[#CAA987] bg-clip-text text-transparent">
                    {firstName}
                  </span>
                </h1>
                <p className="text-gray-300 text-sm lg:text-base mt-2 max-w-xl">
                  Gestiona tus ramos, revisa postulaciones y administra las ayudantías de la comunidad UCN desde un solo lugar.
                </p>
              </div>
            </div>

            {/* Widget cielo nortino: fecha · hora local */}
            <div className="lg:w-72 shrink-0">
              <div className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5 overflow-hidden">
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl"
                  style={{ background: 'radial-gradient(circle, rgba(126,155,192,0.35), transparent 70%)' }}
                  aria-hidden="true"
                />
                <div className="relative flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7E9BC0]/30 to-[#AC6D33]/25 flex items-center justify-center border border-white/15 shrink-0">
                    <GreetingIcon size={18} className="text-[#CAA987]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7E9BC0]">{greeting}</p>
                    <p className="text-white text-[13px] font-medium truncate">{dateStr}</p>
                  </div>
                </div>

                <div className="relative flex items-baseline gap-2 mb-4">
                  <p className="text-4xl font-bold text-white tracking-tight tabular-nums leading-none">
                    {timeStr}
                  </p>
                  <p className="text-[10px] text-white/45 uppercase tracking-wider">hrs</p>
                </div>

                <div className="relative flex items-center gap-2 pt-3 border-t border-white/10">
                  <MapPin size={11} className="text-[#7E9BC0]" />
                  <p className="text-[10px] text-white/55 tracking-wide">Antofagasta · Norte de Chile</p>
                  <span className="ml-auto relative flex h-1.5 w-1.5" aria-label="Plataforma operativa">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats UCN ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, iconColor, iconBg, accent, hover }, idx) => (
            <div
              key={label}
              style={{ animationDelay: `${idx * 0.06}s` }}
              className={`group relative bg-white rounded-2xl border border-gray-200 p-5 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 overflow-hidden animate-slide-up ${hover}`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 ${accent}`} aria-hidden="true" />
              <div className={`inline-flex w-10 h-10 rounded-xl ${iconBg} items-center justify-center mb-3 mt-1 transition-transform duration-200 group-hover:scale-110`}>
                <Icon size={20} className={iconColor} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5 tracking-wide">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Acciones rápidas ─────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/profesor/ramos"
            className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-5 hover:border-[#7E9BC0]/60 hover:shadow-lg hover:shadow-[#7E9BC0]/10 transition-all duration-200 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#7E9BC0]/12 flex items-center justify-center shrink-0 group-hover:bg-[#7E9BC0]/20 transition-colors">
              <BookOpen size={22} className="text-[#2B5C8A]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">Mis ramos</p>
              <p className="text-xs text-gray-500 mt-0.5">Administra tus cursos y ayudantías</p>
            </div>
            <ArrowUpRight size={18} className="text-gray-400 group-hover:text-[#2B5C8A] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            to="/profesor/ramos"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#AC6D33] to-[#8B5226] text-white p-5 hover:shadow-lg hover:shadow-[#AC6D33]/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-4"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" aria-hidden="true" />
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0 border border-white/20">
              <GraduationCap size={22} className="text-white" />
            </div>
            <div className="flex-1 min-w-0 relative">
              <p className="text-sm font-semibold">Crear ayudantía</p>
              <p className="text-xs text-white/80 mt-0.5">Publica una nueva posición</p>
            </div>
            <ArrowUpRight size={18} className="text-white/80 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* ── Listas ───────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Postulaciones pendientes */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-slide-up" style={{ animationDelay: '0.18s' }}>
            <div className="px-6 py-4 border-b border-gray-100 flex items-start justify-between gap-3 bg-gradient-to-r from-[#7E9BC0]/5 to-transparent">
              <div>
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-full bg-[#7E9BC0]" aria-hidden="true" />
                  Postulaciones pendientes
                </h2>
                {pendingApps.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1 ml-3.5">{pendingApps.length} esperando revisión</p>
                )}
              </div>
              {pendingApps.length > 0 && (
                <span className="inline-flex items-center justify-center min-w-[26px] h-6 px-2 rounded-full bg-[#AC6D33]/10 text-[#8B5226] text-[11px] font-bold border border-[#AC6D33]/20">
                  {pendingApps.length}
                </span>
              )}
            </div>
            <div className="divide-y divide-gray-50">
              {pendingApps.length === 0 ? (
                <div className="px-6 py-12 text-center text-sm text-gray-400">
                  <div className="w-12 h-12 rounded-2xl bg-[#7E9BC0]/8 flex items-center justify-center mx-auto mb-3">
                    <Clock size={22} className="text-[#7E9BC0]" />
                  </div>
                  No hay postulaciones pendientes.
                </div>
              ) : (
                pendingApps.slice(0, 4).map(app => {
                  const student = users.find(u => u.id === app.studentId);
                  const profile = studentProfiles.find(p => p.userId === app.studentId);
                  const ay = myAys.find(a => a.id === app.ayudantiaId);
                  return (
                    <div key={app.id} className="px-6 py-4 flex items-center justify-between gap-3 hover:bg-[#7E9BC0]/5 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7E9BC0] to-[#2B5C8A] flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
                          {student?.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{student?.name}</p>
                          <p className="text-xs text-gray-500 truncate">
                            {ay?.title}
                            {profile?.gpa ? ` · PPA ${profile.gpa.toFixed(1)}` : ''}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/profesor/ayudantia/${app.ayudantiaId}`}
                        className="text-xs font-semibold text-[#2B5C8A] hover:text-[#AC6D33] shrink-0 inline-flex items-center gap-1 transition-colors"
                      >
                        Revisar <ChevronRight size={13} />
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Ayudantías activas */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-slide-up" style={{ animationDelay: '0.24s' }}>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-3 bg-gradient-to-r from-[#AC6D33]/5 to-transparent">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-[#AC6D33]" aria-hidden="true" />
                Ayudantías activas
              </h2>
              <Link
                to="/profesor/ramos"
                className="text-xs font-semibold text-[#8B5226] hover:text-[#AC6D33] inline-flex items-center gap-1 transition-colors"
              >
                Gestionar <ChevronRight size={13} />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {activeAys.length === 0 ? (
                <div className="px-6 py-12 text-center text-sm text-gray-400">
                  <div className="w-12 h-12 rounded-2xl bg-[#AC6D33]/8 flex items-center justify-center mx-auto mb-3">
                    <Users size={22} className="text-[#AC6D33]" />
                  </div>
                  No hay ayudantías activas.
                </div>
              ) : (
                activeAys.map(ay => {
                  const course = courses.find(c => c.id === ay.courseId);
                  const appCount = applications.filter(a => a.ayudantiaId === ay.id && a.status === 'pending').length;
                  return (
                    <Link
                      key={ay.id}
                      to={`/profesor/ayudantia/${ay.id}`}
                      className="px-6 py-4 flex items-center justify-between gap-3 hover:bg-[#AC6D33]/5 transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-[#AC6D33]/10 flex items-center justify-center shrink-0 group-hover:bg-[#AC6D33]/18 transition-colors">
                          <BookOpen size={16} className="text-[#8B5226]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{ay.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 truncate">
                            {course?.code} · {appCount} {appCount === 1 ? 'pendiente' : 'pendientes'}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-gray-400 group-hover:text-[#AC6D33] group-hover:translate-x-0.5 transition-all duration-150 shrink-0"
                      />
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* ── Footer institucional sutil ───────────────────────── */}
        <div className="mt-10 pt-6 border-t border-gray-200/70 flex items-center gap-2 text-[11px] text-gray-400">
          <img src={ucnShield} alt="" className="h-5 w-5 object-contain opacity-60" aria-hidden="true" />
          <span className="tracking-wider uppercase font-semibold">Universidad Católica del Norte · Plataforma de Ayudantías</span>
        </div>
      </div>
    </div>
  );
}
