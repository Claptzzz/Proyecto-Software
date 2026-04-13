import { useStore } from '../../store';
import { Clock, CheckCircle, XCircle, FileText, ChevronDown, Crown, Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const statusConfig = {
  pending:  { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
  accepted: { label: 'Aceptado',  color: 'bg-green-100 text-green-800 border-green-200',   icon: CheckCircle },
  rejected: { label: 'Rechazado', color: 'bg-red-100 text-red-800 border-red-200',         icon: XCircle },
};

export default function Postulaciones() {
  const { currentUser, applications, ayudantias, courses, users } = useStore();
  const [expanded, setExpanded] = useState<string | null>(null);

  const myApps = [...applications.filter(a => a.studentId === currentUser?.id)]
    .sort((a, b) => b.appliedAt.localeCompare(a.appliedAt));

  const pending  = myApps.filter(a => a.status === 'pending').length;
  const accepted = myApps.filter(a => a.status === 'accepted').length;

  function isCoordinator(appId: string) {
    const app = applications.find(a => a.id === appId);
    if (!app) return false;
    const ay = ayudantias.find(a => a.id === app.ayudantiaId);
    return ay?.assignedStudents.find(s => s.studentId === currentUser?.id)?.role === 'coordinador';
  }

  return (
    <div className="p-8 max-w-3xl mx-auto animate-slide-up">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mis Postulaciones</h1>
        <p className="text-gray-500 mt-1">
          {myApps.length} postulaciones — {pending} pendientes · {accepted} aceptadas
        </p>
      </div>

      {myApps.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 py-20 text-center shadow-sm animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FileText size={28} className="text-gray-400" />
          </div>
          <p className="font-medium text-gray-600">Aún no tienes postulaciones</p>
          <p className="text-sm text-gray-400 mt-1 mb-5">Explora las ayudantías disponibles y postula a las que te interesen.</p>
          <Link
            to="/student/ayudantias"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-4 py-2 rounded-xl transition-colors"
          >
            <Search size={15} /> Explorar ayudantías
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {myApps.map((app, idx) => {
            const ay = ayudantias.find(a => a.id === app.ayudantiaId);
            const course = courses.find(c => c.id === ay?.courseId);
            const professor = users.find(u => u.id === ay?.professorId);
            const cfg = statusConfig[app.status];
            const StatusIcon = cfg.icon;
            const isOpen = expanded === app.id;
            const coordinator = app.status === 'accepted' && isCoordinator(app.id);

            return (
              <div
                key={app.id}
                style={{ animationDelay: `${idx * 0.05}s` }}
                className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm animate-slide-up ${
                  app.status === 'accepted' ? 'border-green-200' : 'border-gray-200'
                }`}
              >
                <div
                  className="px-6 py-4 flex items-start justify-between gap-3 cursor-pointer hover:bg-gray-50/60 rounded-2xl transition-colors"
                  onClick={() => setExpanded(isOpen ? null : app.id)}
                  aria-expanded={isOpen}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">{course?.code}</span>
                      {coordinator && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-700 bg-yellow-50 border border-yellow-200 px-2 py-0.5 rounded-full">
                          <Crown size={10} /> Coordinador/a
                        </span>
                      )}
                    </div>
                    <p className="font-semibold text-gray-900 mt-1">{ay?.title ?? 'Ayudantía'}</p>
                    <p className="text-sm text-gray-500">{course?.name} · Prof. {professor?.name}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.color}`}>
                      <StatusIcon size={11} /> {cfg.label}
                    </span>
                    <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {isOpen && (
                  <div className="px-6 pb-5 border-t border-gray-100 pt-4 space-y-4 animate-slide-up">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Tu carta de presentación</p>
                      <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4">{app.coverLetter}</p>
                    </div>
                    <div className="flex gap-6 text-xs text-gray-400">
                      <span>Enviado: {new Date(app.appliedAt).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      {app.reviewedAt && (
                        <span>Revisado: {new Date(app.reviewedAt).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      )}
                    </div>
                    {coordinator && (
                      <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-3.5">
                        <Crown size={16} className="text-yellow-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-yellow-800">Eres el/la coordinador/a</p>
                          <p className="text-xs text-yellow-600 mt-0.5">El profesor/a te ha asignado el rol de coordinador/a de esta ayudantía.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
