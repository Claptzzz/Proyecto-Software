import { Link } from 'react-router-dom';
import { useStore } from '../../store';
import { BookOpen, FileText, Clock, Users, ChevronRight } from 'lucide-react';

export default function ProfessorDashboard() {
  const { currentUser, courses, ayudantias, applications, users, studentProfiles } = useStore();

  const myCourses  = courses.filter(c => c.professorId === currentUser?.id);
  const myAys      = ayudantias.filter(a => a.professorId === currentUser?.id);
  const myAppIds   = myAys.map(a => a.id);
  const allApps    = applications.filter(a => myAppIds.includes(a.ayudantiaId));
  const pendingApps = allApps.filter(a => a.status === 'pending');
  const activeAys  = myAys.filter(a => a.status === 'open');

  const stats = [
    { label: 'Mis ramos',            value: myCourses.length,   icon: BookOpen,  color: 'text-blue-600',   bg: 'bg-blue-50',   accent: 'bg-blue-500' },
    { label: 'Ayudantías activas',   value: activeAys.length,   icon: Users,     color: 'text-green-600',  bg: 'bg-green-50',  accent: 'bg-green-500' },
    { label: 'Postulaciones',        value: allApps.length,     icon: FileText,  color: 'text-purple-600', bg: 'bg-purple-50', accent: 'bg-purple-500' },
    { label: 'Pendientes de revisión', value: pendingApps.length, icon: Clock,   color: 'text-yellow-600', bg: 'bg-yellow-50', accent: 'bg-yellow-400' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto animate-slide-up">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido/a, {currentUser?.name.split(' ').slice(0, 2).join(' ')} 👋
        </h1>
        <p className="text-gray-500 mt-1">Panel de gestión de ayudantías</p>
      </div>

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
        {/* Pending applications */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Postulaciones pendientes</h2>
            {pendingApps.length > 0 && (
              <p className="text-sm text-gray-400 mt-0.5">{pendingApps.length} esperando revisión</p>
            )}
          </div>
          <div className="divide-y divide-gray-50">
            {pendingApps.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-gray-400">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <Clock size={22} className="text-gray-400" />
                </div>
                No hay postulaciones pendientes.
              </div>
            ) : (
              pendingApps.slice(0, 4).map(app => {
                const student = users.find(u => u.id === app.studentId);
                const profile = studentProfiles.find(p => p.userId === app.studentId);
                const ay = myAys.find(a => a.id === app.ayudantiaId);
                return (
                  <div key={app.id} className="px-6 py-4 flex items-center justify-between gap-3 hover:bg-gray-50/60 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {student?.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{student?.name}</p>
                        <p className="text-xs text-gray-400">{ay?.title}{profile?.gpa ? ` · Prom. ${profile.gpa.toFixed(1)}` : ''}</p>
                      </div>
                    </div>
                    <Link
                      to={`/profesor/ayudantia/${app.ayudantiaId}`}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 shrink-0 flex items-center gap-1 transition-colors"
                    >
                      Revisar <ChevronRight size={13} />
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Active ayudantias */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Ayudantías activas</h2>
            <Link to="/profesor/ramos" className="text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
              Gestionar <ChevronRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {activeAys.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-gray-400">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <Users size={22} className="text-gray-400" />
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
                    className="px-6 py-4 flex items-center justify-between gap-3 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{ay.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{course?.code} — {appCount} pendientes</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-0.5 transition-transform duration-150 shrink-0" />
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
