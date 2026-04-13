import { Link } from 'react-router-dom';
import { useStore } from '../../store';
import { FileText, Clock, CheckCircle, XCircle, Search, ChevronRight, UserCircle } from 'lucide-react';

const statusConfig = {
  pending:  { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  accepted: { label: 'Aceptado',  color: 'bg-green-100 text-green-800',  icon: CheckCircle },
  rejected: { label: 'Rechazado', color: 'bg-red-100 text-red-800',      icon: XCircle },
};

export default function StudentDashboard() {
  const { currentUser, applications, ayudantias, courses, studentProfiles } = useStore();

  const myApps = applications.filter(a => a.studentId === currentUser?.id);
  const pending  = myApps.filter(a => a.status === 'pending').length;
  const accepted = myApps.filter(a => a.status === 'accepted').length;
  const rejected = myApps.filter(a => a.status === 'rejected').length;
  const openAyudantias = ayudantias.filter(a => a.status === 'open').length;

  const profile = studentProfiles.find(p => p.userId === currentUser?.id);
  const recentApps = [...myApps].sort((a, b) => b.appliedAt.localeCompare(a.appliedAt)).slice(0, 3);

  const stats = [
    { label: 'Postulaciones', value: myApps.length, icon: FileText,    color: 'text-blue-600',   bg: 'bg-blue-50',   accent: 'bg-blue-500' },
    { label: 'Pendientes',    value: pending,        icon: Clock,       color: 'text-yellow-600', bg: 'bg-yellow-50', accent: 'bg-yellow-400' },
    { label: 'Aceptadas',     value: accepted,       icon: CheckCircle, color: 'text-green-600',  bg: 'bg-green-50',  accent: 'bg-green-500' },
    { label: 'Rechazadas',    value: rejected,       icon: XCircle,     color: 'text-red-600',    bg: 'bg-red-50',    accent: 'bg-red-400' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto animate-slide-up">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido/a, {currentUser?.name.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          {profile?.career ?? 'Completa tu perfil para empezar'}{profile?.year ? ` · ${profile.year}° año` : ''}
        </p>
      </div>

      {/* Profile incomplete banner */}
      {profile && (!profile.bio || !profile.rut) && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between animate-slide-up">
          <div className="flex items-center gap-3">
            <UserCircle size={20} className="text-blue-600 shrink-0" />
            <p className="text-sm text-blue-800">Tu perfil está incompleto. Complétalo para aumentar tus chances de ser aceptado.</p>
          </div>
          <Link to="/student/profile" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap ml-4">
            Completar →
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg, accent }, idx) => (
          <div
            key={label}
            style={{ animationDelay: `${idx * 0.06}s` }}
            className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden animate-slide-up"
          >
            <div className={`absolute inset-x-0 top-0 h-0.5 ${accent}`} />
            <div className={`inline-flex w-10 h-10 rounded-xl ${bg} items-center justify-center mb-3 mt-1`}>
              <Icon size={20} className={color} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent applications */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Postulaciones recientes</h2>
            <Link to="/student/postulaciones" className="text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
              Ver todas <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentApps.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-gray-400">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <FileText size={22} className="text-gray-400" />
                </div>
                No has postulado a ninguna ayudantía aún.
              </div>
            ) : (
              recentApps.map(app => {
                const ay = ayudantias.find(a => a.id === app.ayudantiaId);
                const course = courses.find(c => c.id === ay?.courseId);
                const cfg = statusConfig[app.status];
                const StatusIcon = cfg.icon;
                return (
                  <div key={app.id} className="px-6 py-4 hover:bg-gray-50/60 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{ay?.title ?? 'Ayudantía'}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{course?.code} — {course?.name}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cfg.color} shrink-0`}>
                        <StatusIcon size={11} /> {cfg.label}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4">Acciones rápidas</h2>
            <div className="space-y-3">
              <Link
                to="/student/ayudantias"
                className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-150 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <Search size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Explorar ayudantías</p>
                    <p className="text-xs text-gray-400">{openAyudantias} disponibles ahora</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform duration-150" />
              </Link>
              <Link
                to="/student/profile"
                className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-150 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <UserCircle size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Editar perfil</p>
                    <p className="text-xs text-gray-400">Agrega tu experiencia</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform duration-150" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
