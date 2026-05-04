import { Link } from 'react-router-dom';
import { useStore } from '../../store';
import { BookOpen, FileText, Clock, Users, ChevronRight, ArrowUpRight, GraduationCap, Sparkles } from 'lucide-react';
import ucnShield from '../../assets/LogoUCN_acentuado.png';
import escuelaLogo from '../../assets/Logo Escuela Ingeniería.svg';

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

  return (
    <div className="min-h-full bg-gradient-to-br from-white via-gray-50/40 to-[#7E9BC0]/5">
      <div className="p-6 lg:p-10 max-w-6xl mx-auto animate-slide-up">

        {/* ── Hero institucional ───────────────────────────────── */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1629] via-[#102040] to-[#081420] text-white mb-8 shadow-xl shadow-[#0B1629]/20">
          <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
          <div className="absolute -top-16 -left-12 w-72 h-72 bg-[#7E9BC0]/15 rounded-full blur-3xl animate-float" aria-hidden="true" />
          <div
            className="absolute -bottom-20 -right-10 w-80 h-80 bg-[#AC6D33]/12 rounded-full blur-3xl animate-float"
            style={{ animationDelay: '-3s' }}
            aria-hidden="true"
          />

          <div className="relative z-10 px-6 sm:px-10 py-9 sm:py-11 flex flex-col lg:flex-row lg:items-center gap-7 lg:gap-10">
            <div className="flex items-center gap-5 shrink-0">
              <img
                src={ucnShield}
                alt="Universidad Católica del Norte"
                className="h-16 w-16 lg:h-20 lg:w-20 object-contain drop-shadow-lg"
              />
              <div className="leading-snug">
                <p className="text-white font-light text-lg lg:text-xl">Universidad</p>
                <p className="text-white font-light text-lg lg:text-xl">Católica del Norte</p>
                <p className="text-[#7E9BC0] text-[10px] font-semibold tracking-[0.2em] uppercase mt-1">
                  Plataforma de Ayudantías
                </p>
              </div>
            </div>

            <div className="hidden lg:block w-px self-stretch bg-white/10" aria-hidden="true" />

            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/8 border border-white/10 text-[11px] font-semibold tracking-wider uppercase text-[#7E9BC0] mb-3">
                <Sparkles size={12} />
                Panel del profesor
              </div>
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

            <img
              src={escuelaLogo}
              alt="Escuela de Ingeniería UCN"
              className="hidden xl:block h-12 object-contain brightness-0 invert opacity-70 shrink-0"
            />
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
                            {profile?.gpa ? ` · Prom. ${profile.gpa.toFixed(1)}` : ''}
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
