import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../../store';
import type { ApplicationStatus, AssistantRole } from '../../types';
import {
  ArrowLeft, CheckCircle, XCircle, Clock, Users, Crown,
  ChevronDown, BookOpen, Briefcase, Heart, Code, HelpCircle,
  ExternalLink, Phone, Lock, Unlock, ArrowUpDown,
} from 'lucide-react';

const statusCfg: Record<ApplicationStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending:  { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
  accepted: { label: 'Aceptado',  color: 'bg-green-100 text-green-800 border-green-200',   icon: CheckCircle },
  rejected: { label: 'Rechazado', color: 'bg-red-100 text-red-800 border-red-200',         icon: XCircle },
};

const expIcons = { ayudantia: BookOpen, voluntariado: Heart, trabajo: Briefcase, proyecto: Code, otro: HelpCircle } as const;

export default function GestionAyudantia() {
  const { id } = useParams<{ id: string }>();
  const { ayudantias, courses, users, studentProfiles, applications, updateApplicationStatus, assignCoordinatorRole, closeAyudantia, reopenAyudantia } = useStore();

  const [expanded, setExpanded] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'gpaHigh' | 'gpaLow' | 'name'>('recent');

  const foundAy = ayudantias.find(a => a.id === id);
  if (!foundAy) return (
    <div className="p-8 text-center text-gray-500">
      <p>Ayudantía no encontrada.</p>
      <Link to="/profesor/ramos" className="text-blue-600 text-sm hover:underline mt-2 inline-block">← Volver</Link>
    </div>
  );
  const ay = foundAy;

  const course = courses.find(c => c.id === ay.courseId);
  let appList = applications.filter(a => a.ayudantiaId === ay.id)
    .sort((a, b) => b.appliedAt.localeCompare(a.appliedAt));

  // Apply sorting based on sortBy state
  if (sortBy === 'gpaHigh') {
    appList = appList.sort((a, b) => {
      const profileA = studentProfiles.find(p => p.userId === a.studentId);
      const profileB = studentProfiles.find(p => p.userId === b.studentId);
      return (profileB?.gpa ?? 0) - (profileA?.gpa ?? 0);
    });
  } else if (sortBy === 'gpaLow') {
    appList = appList.sort((a, b) => {
      const profileA = studentProfiles.find(p => p.userId === a.studentId);
      const profileB = studentProfiles.find(p => p.userId === b.studentId);
      return (profileA?.gpa ?? 0) - (profileB?.gpa ?? 0);
    });
  } else if (sortBy === 'name') {
    appList = appList.sort((a, b) => {
      const userA = users.find(u => u.id === a.studentId);
      const userB = users.find(u => u.id === b.studentId);
      return (userA?.name ?? '').localeCompare(userB?.name ?? '');
    });
  }
  // 'recent' is already sorted from above

  const acceptedCount = ay.assignedStudents.length;
  const canAssignCoordinator = acceptedCount >= 3;
  const coordinator = ay.assignedStudents.find(s => s.role === 'coordinador');

  function getAssignedRole(studentId: string): AssistantRole | null {
    return ay.assignedStudents.find(s => s.studentId === studentId)?.role ?? null;
  }

  function handleStatus(appId: string, status: ApplicationStatus) {
    updateApplicationStatus(appId, status);
  }

  function handleCoordinator(studentId: string) {
    const current = getAssignedRole(studentId);
    assignCoordinatorRole(ay.id, studentId, current === 'coordinador' ? 'ayudante' : 'coordinador');
  }

  return (
    <div className="p-8 max-w-4xl mx-auto animate-slide-up">
      {/* Back + header */}
      <div className="mb-6">
        <Link to="/profesor/ramos" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-4 transition-colors">
          <ArrowLeft size={15} /> Volver a Mis Ramos
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">{course?.code}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ay.status === 'open' ? 'text-green-700 bg-green-50' : 'text-gray-600 bg-gray-100'}`}>
                {ay.status === 'open' ? 'Abierta' : 'Cerrada'}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">{ay.title}</h1>
            <p className="text-gray-500">{course?.name}</p>
          </div>
          <button
            onClick={() => ay.status === 'open' ? closeAyudantia(ay.id) : reopenAyudantia(ay.id)}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border transition-all duration-150 shrink-0 ${
              ay.status === 'open'
                ? 'text-gray-600 border-gray-200 hover:bg-gray-50'
                : 'text-green-700 border-green-200 hover:bg-green-50'
            }`}
          >
            {ay.status === 'open' ? <><Lock size={14} /> Cerrar convocatoria</> : <><Unlock size={14} /> Reabrir convocatoria</>}
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Postulaciones', value: appList.length, color: 'text-gray-900' },
          { label: 'Pendientes',    value: appList.filter(a => a.status === 'pending').length, color: 'text-yellow-600' },
          { label: 'Aceptados',     value: acceptedCount, color: 'text-green-600' },
        ].map(({ label, value, color }, idx) => (
          <div
            key={label}
            style={{ animationDelay: `${idx * 0.05}s` }}
            className="bg-white rounded-2xl border border-gray-200 p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-slide-up"
          >
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Coordinator section */}
      {canAssignCoordinator && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 mb-6 animate-slide-up">
          <div className="flex items-start gap-3">
            <Crown size={20} className="text-yellow-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-900">Asignar coordinador/a</p>
              <p className="text-sm text-yellow-700 mt-1">
                Tienes {acceptedCount} ayudantes aceptados. Puedes asignar un coordinador haciendo clic en el botón de corona junto a su nombre.
              </p>
              {coordinator && (
                <p className="text-sm font-medium text-yellow-800 mt-2">
                  Coordinador/a actual: <span className="font-bold">{users.find(u => u.id === coordinator.studentId)?.name}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Applications */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">Postulaciones</h2>
            {appList.length === 0 && <p className="text-sm text-gray-400 mt-0.5">Aún no hay postulaciones.</p>}
          </div>
          {appList.length > 0 && (
            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'gpaHigh' | 'gpaLow' | 'name')}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 bg-white hover:border-gray-300 transition-colors"
              >
                <option value="recent">Más recientes</option>
                <option value="gpaHigh">Promedio más alto</option>
                <option value="gpaLow">Promedio más bajo</option>
                <option value="name">Nombre (A-Z)</option>
              </select>
            </div>
          )}
        </div>

        {appList.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <Users size={26} className="text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-500">Sin postulaciones aún</p>
            <p className="text-xs text-gray-400 mt-1">Los estudiantes aún no han postulado a esta ayudantía.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {appList.map((app, idx) => {
              const student = users.find(u => u.id === app.studentId);
              const profile = studentProfiles.find(p => p.userId === app.studentId);
              const cfg = statusCfg[app.status];
              const StatusIcon = cfg.icon;
              const isOpen = expanded === app.id;
              const assignedRole = getAssignedRole(app.studentId);

              return (
                <div
                  key={app.id}
                  style={{ animationDelay: `${idx * 0.04}s` }}
                  className={`transition-colors animate-fade-in ${app.status === 'accepted' ? 'bg-green-50/40' : ''}`}
                >
                  {/* Card header */}
                  <div
                    className="px-6 py-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50/60 transition-colors"
                    onClick={() => setExpanded(isOpen ? null : app.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {student?.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-gray-900 text-sm">{student?.name}</p>
                        {assignedRole === 'coordinador' && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-700 bg-yellow-50 border border-yellow-200 px-1.5 py-0.5 rounded-full">
                            <Crown size={9} /> Coordinador/a
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        {profile?.career ?? '—'}{profile?.year ? ` · ${profile.year}° año` : ''}{profile?.gpa ? ` · Prom. ${profile.gpa.toFixed(1)}` : ''}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.color}`}>
                        <StatusIcon size={11} /> {cfg.label}
                      </span>
                      <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div className="px-6 pb-6 border-t border-gray-100 bg-white space-y-5 animate-slide-up">
                      {/* Bio + contacts */}
                      {profile && (
                        <div className="pt-4">
                          {profile.bio && <p className="text-sm text-gray-700 leading-relaxed mb-3">{profile.bio}</p>}
                          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                            {profile.phone && (
                              <span className="flex items-center gap-1"><Phone size={12} />{profile.phone}</span>
                            )}
                            {profile.linkedin && (
                              <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer"
                                className="flex items-center gap-1 text-blue-600 hover:underline transition-colors">
                                <ExternalLink size={12} /> LinkedIn
                              </a>
                            )}
                            {profile.github && (
                              <a href={`https://${profile.github}`} target="_blank" rel="noreferrer"
                                className="flex items-center gap-1 text-gray-600 hover:underline transition-colors">
                                <ExternalLink size={12} /> GitHub
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Experience */}
                      {profile && profile.experience.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Experiencia</p>
                          <div className="space-y-2">
                            {profile.experience.map(exp => {
                              const ExpIcon = expIcons[exp.type] ?? HelpCircle;
                              return (
                                <div key={exp.id} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                                  <ExpIcon size={15} className="text-gray-500 shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-800">{exp.title}</p>
                                    <p className="text-xs text-gray-500">{exp.organization} · {exp.startDate} — {exp.current ? 'Presente' : (exp.endDate ?? '—')}</p>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{exp.description}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Cover letter */}
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Carta de presentación</p>
                        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4">{app.coverLetter}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-2 border-t border-gray-100 flex-wrap">
                        {app.status !== 'accepted' && (
                          <button
                            onClick={() => handleStatus(app.id, 'accepted')}
                            className="flex items-center gap-1.5 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 px-4 py-2 rounded-xl transition-all duration-150"
                          >
                            <CheckCircle size={15} /> Aceptar
                          </button>
                        )}
                        {app.status !== 'rejected' && (
                          <button
                            onClick={() => handleStatus(app.id, 'rejected')}
                            className="flex items-center gap-1.5 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-xl transition-all duration-150"
                          >
                            <XCircle size={15} /> Rechazar
                          </button>
                        )}
                        {app.status === 'accepted' && canAssignCoordinator && (
                          <button
                            onClick={() => handleCoordinator(app.studentId)}
                            className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl border transition-all duration-150 ${
                              assignedRole === 'coordinador'
                                ? 'text-yellow-700 bg-yellow-50 hover:bg-yellow-100 border-yellow-300'
                                : 'text-gray-600 bg-white hover:bg-yellow-50 border-gray-200 hover:border-yellow-300'
                            }`}
                          >
                            <Crown size={15} />
                            {assignedRole === 'coordinador' ? 'Quitar coordinador' : 'Asignar coordinador'}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
