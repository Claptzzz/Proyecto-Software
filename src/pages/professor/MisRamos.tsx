import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store';
import { Plus, X, Save, ChevronRight, BookOpen, Users, Clock, CheckCircle } from 'lucide-react';

const inputCls = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 bg-gray-50 focus:bg-white transition-colors';

export default function MisRamos() {
  const { currentUser, courses, ayudantias, applications, createAyudantia } = useStore();

  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [form, setForm] = useState({ title: '', description: '', requirements: '', maxAssistants: 3 });

  const myCourses = courses.filter(c => c.professorId === currentUser?.id);

  function getAysForCourse(courseId: string) {
    return ayudantias.filter(a => a.courseId === courseId && a.professorId === currentUser?.id);
  }

  function openModal(courseId: string) {
    setSelectedCourseId(courseId);
    setForm({ title: '', description: '', requirements: '', maxAssistants: 3 });
    setShowModal(true);
  }

  function handleCreate(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!currentUser || !selectedCourseId) return;
    createAyudantia({
      courseId: selectedCourseId,
      professorId: currentUser.id,
      ...form,
      status: 'open',
    });
    setShowModal(false);
  }

  function countApps(ayId: string, status?: string) {
    return applications.filter(a => a.ayudantiaId === ayId && (!status || a.status === status)).length;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto animate-slide-up">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mis Ramos</h1>
        <p className="text-gray-500 mt-1">{myCourses.length} ramos asignados</p>
      </div>

      {myCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 py-20 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <BookOpen size={28} className="text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">No tienes ramos asignados</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myCourses.map((course, idx) => {
            const ays = getAysForCourse(course.id);
            return (
              <div
                key={course.id}
                style={{ animationDelay: `${idx * 0.07}s` }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm animate-slide-up"
              >
                {/* Course header */}
                <div className="px-6 py-5 flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <BookOpen size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">{course.code}</span>
                        <span className="text-xs text-gray-400">{course.credits} créditos</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mt-1">{course.name}</h3>
                      <p className="text-xs text-gray-400">{course.semester}° semestre {course.year}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openModal(course.id)}
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 border border-blue-200 hover:border-blue-400 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all duration-150 shrink-0"
                  >
                    <Plus size={15} /> Nueva ayudantía
                  </button>
                </div>

                {/* Ayudantias list */}
                {ays.length > 0 && (
                  <div className="border-t border-gray-100 divide-y divide-gray-50">
                    {ays.map(ay => {
                      const total   = countApps(ay.id);
                      const pending = countApps(ay.id, 'pending');
                      const accepted = ay.assignedStudents.length;
                      return (
                        <div key={ay.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50/60 transition-colors">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-2 h-2 rounded-full shrink-0 ${ay.status === 'open' ? 'bg-green-400' : 'bg-gray-300'}`} />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{ay.title}</p>
                              <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                                <span className="flex items-center gap-1"><Users size={11} /> {accepted}/{ay.maxAssistants} ayudantes</span>
                                <span className="flex items-center gap-1"><Clock size={11} /> {pending} pendientes</span>
                                <span className="flex items-center gap-1"><CheckCircle size={11} /> {total} total</span>
                              </div>
                            </div>
                          </div>
                          <Link
                            to={`/profesor/ayudantia/${ay.id}`}
                            className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium shrink-0 transition-colors"
                          >
                            Gestionar <ChevronRight size={14} />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
                {ays.length === 0 && (
                  <p className="px-6 py-4 text-sm text-gray-400 border-t border-gray-50">
                    Sin ayudantías creadas para este ramo.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Create ayudantia modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Nueva ayudantía</h3>
              <button
                onClick={() => setShowModal(false)}
                aria-label="Cerrar modal"
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              {selectedCourseId && (() => {
                const c = courses.find(co => co.id === selectedCourseId);
                return c ? (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-800">
                    <span className="font-semibold">{c.code}</span> — {c.name}
                  </div>
                ) : null;
              })()}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Título</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required
                  className={inputCls} placeholder="Ej: Ayudantía POO 2025-1" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Descripción</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required rows={3}
                  className={inputCls + ' resize-none'}
                  placeholder="Describe el rol y actividades del ayudante..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Requisitos</label>
                <textarea value={form.requirements} onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} required rows={3}
                  className={inputCls + ' resize-none'}
                  placeholder="Nota mínima, disponibilidad, habilidades requeridas..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Máximo de ayudantes</label>
                <input type="number" min="1" max="20" value={form.maxAssistants}
                  onChange={e => setForm(f => ({ ...f, maxAssistants: parseInt(e.target.value) }))}
                  className="w-32 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 bg-gray-50 focus:bg-white transition-colors" />
                <p className="text-xs text-gray-400 mt-1">Con 3 o más ayudantes podrás asignar un coordinador.</p>
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                  Cancelar
                </button>
                <button type="submit"
                  className="flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors shadow-sm">
                  <Save size={14} /> Crear ayudantía
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
