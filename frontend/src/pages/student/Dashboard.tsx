import { Link } from 'react-router-dom';
import { useStore } from '../../store';
import {
  FileText, Clock, CheckCircle, XCircle, Search, ChevronRight,
  UserCircle, GraduationCap, ArrowUpRight,
} from 'lucide-react';
import ucnShield from '../../assets/LogoUCN_acentuado.png';
import escuelaLogo from '../../assets/Logo Escuela Ingeniería.svg';

// UCN Brand colors (Guía de Normas Gráficas Institucionales):
// Pantone 652 C → #7E9BC0  (azul institucional)
// Pantone 471 C → #AC6D33  (terra / cobre)
// Terra 60%     → #CAA987  (terra claro)
// Azul oscuro   → #2B5C8A  (Pantone 540/300, paleta secundaria)

const statusConfig = {
  pending: {
    label: 'Pendiente',
    badgeBg: 'bg-[#CAA987]/20',
    badgeText: 'text-[#8B5226]',
    badgeBorder: 'border-[#CAA987]/40',
    icon: Clock,
  },
  accepted: {
    label: 'Aceptado',
    badgeBg: 'bg-[#7E9BC0]/15',
    badgeText: 'text-[#2B5C8A]',
    badgeBorder: 'border-[#7E9BC0]/40',
    icon: CheckCircle,
  },
  rejected: {
    label: 'Rechazado',
    badgeBg: 'bg-[#9B3F3F]/10',
    badgeText: 'text-[#7C3030]',
    badgeBorder: 'border-[#9B3F3F]/30',
    icon: XCircle,
  },
} as const;

export default function StudentDashboard() {
  const { currentUser, applications, ayudantias, courses, studentProfiles } = useStore();

  const myApps = applications.filter(a => a.studentId === currentUser?.id);
  const pending  = myApps.filter(a => a.status === 'pending').length;
  const accepted = myApps.filter(a => a.status === 'accepted').length;
  const rejected = myApps.filter(a => a.status === 'rejected').length;
  const openAyudantias = ayudantias.filter(a => a.status === 'open').length;

  const profile = studentProfiles.find(p => p.userId === currentUser?.id);
  const recentApps = [...myApps].sort((a, b) => b.appliedAt.localeCompare(a.appliedAt)).slice(0, 3);

  const firstName = currentUser?.name.split(' ')[0];

  const stats = [
    {
      label: 'Postulaciones',
      value: myApps.length,
      icon: FileText,
      iconColor: 'text-[#2B5C8A]',
      iconBg: 'bg-[#7E9BC0]/12',
      accent: 'bg-[#7E9BC0]',
      hover: 'hover:border-[#7E9BC0]/60 hover:shadow-[#7E9BC0]/15',
    },
    {
      label: 'Pendientes',
      value: pending,
      icon: Clock,
      iconColor: 'text-[#8B5226]',
      iconBg: 'bg-[#CAA987]/25',
      accent: 'bg-[#CAA987]',
      hover: 'hover:border-[#CAA987]/70 hover:shadow-[#CAA987]/25',
    },
    {
      label: 'Aceptadas',
      value: accepted,
      icon: CheckCircle,
      iconColor: 'text-[#1A3F6A]',
      iconBg: 'bg-[#2B5C8A]/12',
      accent: 'bg-[#2B5C8A]',
      hover: 'hover:border-[#2B5C8A]/60 hover:shadow-[#2B5C8A]/15',
    },
    {
      label: 'Rechazadas',
      value: rejected,
      icon: XCircle,
      iconColor: 'text-[#8B5226]',
      iconBg: 'bg-[#AC6D33]/12',
      accent: 'bg-[#AC6D33]',
      hover: 'hover:border-[#AC6D33]/60 hover:shadow-[#AC6D33]/15',
    },
  ];

  const profileIncomplete = profile && (!profile.bio || !profile.rut);

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
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Bienvenido/a,{' '}
                <span className="bg-gradient-to-r from-[#7E9BC0] to-[#CAA987] bg-clip-text text-transparent">
                  {firstName}
                </span>
              </h1>
              <p className="text-gray-300 text-sm lg:text-base mt-2 max-w-xl">
                {profile?.career
                  ? <>
                      <span className="text-white/90 font-medium">{profile.career}</span>
                      {profile.year ? ` · ${profile.year}° año` : ''} — explora ayudantías abiertas y haz seguimiento de tus postulaciones.
                    </>
                  : 'Completa tu perfil para empezar a postular a las ayudantías abiertas en la UCN.'}
              </p>
            </div>

            <img
              src={escuelaLogo}
              alt="Escuela de Ingeniería UCN"
              className="hidden xl:block h-12 object-contain brightness-0 invert opacity-70 shrink-0"
            />
          </div>
        </section>

        {/* ── Banner perfil incompleto (solo si aplica) ────────── */}
        {profileIncomplete && (
          <div className="mb-8 relative overflow-hidden rounded-2xl border border-[#AC6D33]/25 bg-gradient-to-r from-[#AC6D33]/8 via-[#CAA987]/10 to-[#7E9BC0]/8 p-5 flex items-center justify-between gap-4 animate-slide-up">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-white/70 backdrop-blur border border-[#AC6D33]/20 flex items-center justify-center shrink-0">
                <UserCircle size={22} className="text-[#8B5226]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">Tu perfil aún está incompleto</p>
                <p className="text-xs text-gray-600 mt-0.5">Complétalo para aumentar tus chances de ser aceptado por los profesores.</p>
              </div>
            </div>
            <Link
              to="/student/profile"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#AC6D33] hover:bg-[#8B5226] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-[#AC6D33]/30 hover:-translate-y-0.5 shrink-0"
            >
              Completar perfil <ChevronRight size={13} />
            </Link>
          </div>
        )}

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

        {/* ── Acciones rápidas destacadas ──────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/student/ayudantias"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#7E9BC0] to-[#2B5C8A] text-white p-5 hover:shadow-lg hover:shadow-[#7E9BC0]/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-4"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" aria-hidden="true" />
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0 border border-white/20">
              <Search size={22} className="text-white" />
            </div>
            <div className="flex-1 min-w-0 relative">
              <p className="text-sm font-semibold">Explorar ayudantías</p>
              <p className="text-xs text-white/85 mt-0.5">{openAyudantias} {openAyudantias === 1 ? 'disponible' : 'disponibles'} ahora</p>
            </div>
            <ArrowUpRight size={18} className="text-white/85 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            to="/student/profile"
            className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-5 hover:border-[#AC6D33]/60 hover:shadow-lg hover:shadow-[#AC6D33]/10 transition-all duration-200 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#AC6D33]/12 flex items-center justify-center shrink-0 group-hover:bg-[#AC6D33]/20 transition-colors">
              <UserCircle size={22} className="text-[#8B5226]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">Editar perfil</p>
              <p className="text-xs text-gray-500 mt-0.5">Agrega tu experiencia académica</p>
            </div>
            <ArrowUpRight size={18} className="text-gray-400 group-hover:text-[#8B5226] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>

        {/* ── Listas ───────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Postulaciones recientes */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-slide-up" style={{ animationDelay: '0.18s' }}>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-3 bg-gradient-to-r from-[#7E9BC0]/5 to-transparent">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-[#7E9BC0]" aria-hidden="true" />
                Postulaciones recientes
              </h2>
              <Link
                to="/student/postulaciones"
                className="text-xs font-semibold text-[#2B5C8A] hover:text-[#AC6D33] inline-flex items-center gap-1 transition-colors"
              >
                Ver todas <ChevronRight size={13} />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recentApps.length === 0 ? (
                <div className="px-6 py-12 text-center text-sm text-gray-400">
                  <div className="w-12 h-12 rounded-2xl bg-[#7E9BC0]/8 flex items-center justify-center mx-auto mb-3">
                    <FileText size={22} className="text-[#7E9BC0]" />
                  </div>
                  No has postulado a ninguna ayudantía aún.
                  <div className="mt-4">
                    <Link
                      to="/student/ayudantias"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2B5C8A] hover:text-[#AC6D33] transition-colors"
                    >
                      Explorar ayudantías abiertas <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              ) : (
                recentApps.map(app => {
                  const ay = ayudantias.find(a => a.id === app.ayudantiaId);
                  const course = courses.find(c => c.id === ay?.courseId);
                  const cfg = statusConfig[app.status];
                  const StatusIcon = cfg.icon;
                  return (
                    <div key={app.id} className="px-6 py-4 hover:bg-[#7E9BC0]/5 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-[#7E9BC0]/10 flex items-center justify-center shrink-0 mt-0.5">
                            <GraduationCap size={16} className="text-[#2B5C8A]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{ay?.title ?? 'Ayudantía'}</p>
                            <p className="text-xs text-gray-500 mt-0.5 truncate">
                              {course?.code} — {course?.name}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${cfg.badgeBg} ${cfg.badgeText} ${cfg.badgeBorder}`}
                        >
                          <StatusIcon size={11} /> {cfg.label}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Resumen del perfil */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-slide-up" style={{ animationDelay: '0.24s' }}>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-3 bg-gradient-to-r from-[#AC6D33]/5 to-transparent">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-[#AC6D33]" aria-hidden="true" />
                Mi perfil
              </h2>
              <Link
                to="/student/profile"
                className="text-xs font-semibold text-[#8B5226] hover:text-[#AC6D33] inline-flex items-center gap-1 transition-colors"
              >
                Editar <ChevronRight size={13} />
              </Link>
            </div>

            <div className="px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#AC6D33] to-[#8B5226] text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-md shadow-[#AC6D33]/25">
                  {firstName?.charAt(0).toUpperCase() ?? '?'}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {profile?.career ?? 'Carrera no especificada'}
                    {profile?.year ? ` · ${profile.year}° año` : ''}
                  </p>
                </div>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-gray-100 bg-[#7E9BC0]/5 px-3 py-2.5">
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-[#2B5C8A]">Promedio</dt>
                  <dd className="text-sm font-bold text-gray-900 mt-0.5">
                    {profile?.gpa ? profile.gpa.toFixed(1) : '—'}
                  </dd>
                </div>
                <div className="rounded-xl border border-gray-100 bg-[#AC6D33]/5 px-3 py-2.5">
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-[#8B5226]">RUT</dt>
                  <dd className="text-sm font-bold text-gray-900 mt-0.5 truncate">
                    {profile?.rut ?? '—'}
                  </dd>
                </div>
              </dl>

              {!profile?.bio && (
                <p className="mt-4 text-[11px] text-gray-500 italic">
                  Agrega una breve descripción en tu perfil para destacar entre los postulantes.
                </p>
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
