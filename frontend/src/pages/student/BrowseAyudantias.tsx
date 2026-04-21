import { useState } from 'react';
import { useStore } from '../../store';
import { Search, X, Users, CalendarDays, ChevronRight, CheckCircle, Send, AlertCircle } from 'lucide-react';
import type { Ayudantia } from '../../types';

export default function BrowseAyudantias() {
  const { ayudantias, courses, users, applications, currentUser, applyToAyudantia } = useStore();

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Ayudantia | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const openAys = ayudantias.filter(a => a.status === 'open');

  const filtered = openAys.filter(ay => {
    const course = courses.find(c => c.id === ay.courseId);
    const q = search.toLowerCase();
    return !q || ay.title.toLowerCase().includes(q) || course?.name.toLowerCase().includes(q) || course?.code.toLowerCase().includes(q);
  });

  function hasApplied(ayId: string) {
    return applications.some(a => a.ayudantiaId === ayId && a.studentId === currentUser?.id);
  }

  function handleApply() {
    if (!selected || !coverLetter.trim()) return;
    const result = applyToAyudantia(selected.id, coverLetter.trim());
    if (result.success) {
      setToast({ type: 'success', msg: result.message });
      setSelected(null);
      setCoverLetter('');
    } else {
      setToast({ type: 'error', msg: result.message });
    }
    setTimeout(() => setToast(null), 4000);
  }

  return (
    <div className="p-8 max-w-5xl mx-auto animate-slide-up">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Ayudantías disponibles</h1>
        <p className="text-gray-500 mt-1">{openAys.length} ayudantías abiertas</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 bg-white shadow-sm transition-all"
          placeholder="Buscar por ramo o título..."
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            aria-label="Limpiar búsqueda"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Search size={28} className="text-gray-400" />
          </div>
          <p className="font-medium text-gray-600">No se encontraron ayudantías</p>
          <p className="text-sm text-gray-400 mt-1">Intenta con otro término de búsqueda.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((ay, idx) => {
            const course = courses.find(c => c.id === ay.courseId);
            const professor = users.find(u => u.id === ay.professorId);
            const applied = hasApplied(ay.id);
            return (
              <div
                key={ay.id}
                style={{ animationDelay: `${idx * 0.05}s` }}
                className="bg-white rounded-2xl border border-gray-200 hover:border-blue-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 p-5 animate-slide-up"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                      {course?.code}
                    </span>
                    <h3 className="font-semibold text-gray-900 mt-1.5">{ay.title}</h3>
                    <p className="text-sm text-gray-500">{course?.name}</p>
                  </div>
                  {applied && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full shrink-0">
                      <CheckCircle size={11} /> Postulado
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">{ay.description}</p>

                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Users size={13} /> Hasta {ay.maxAssistants} ayudantes
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={13} />
                    {new Date(ay.createdAt).toLocaleDateString('es-CL', { day: 'numeric', month: 'long' })}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <p className="text-xs text-gray-400">Prof. {professor?.name}</p>
                  <button
                    onClick={() => { setSelected(ay); setCoverLetter(''); }}
                    className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Ver detalles <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail / Apply modal */}
      {selected && (() => {
        const course = courses.find(c => c.id === selected.courseId);
        const professor = users.find(u => u.id === selected.professorId);
        const applied = hasApplied(selected.id);
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-scale-in">
              <div className="px-6 py-4 border-b border-gray-100 flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">{course?.code}</span>
                  <h3 className="font-semibold text-gray-900 mt-1">{selected.title}</h3>
                  <p className="text-sm text-gray-500">{course?.name} · Prof. {professor?.name}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Cerrar"
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors mt-0.5 shrink-0"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Descripción</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{selected.description}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Requisitos</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{selected.requirements}</p>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5"><Users size={14} className="text-blue-500" /> Hasta {selected.maxAssistants} ayudantes</span>
                </div>

                {applied ? (
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm">
                    <CheckCircle size={16} className="shrink-0" /> Ya postulaste a esta ayudantía.
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Carta de presentación</label>
                      <textarea
                        value={coverLetter}
                        onChange={e => setCoverLetter(e.target.value)}
                        rows={5}
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 bg-gray-50 focus:bg-white resize-none transition-colors"
                        placeholder="Cuéntale al profesor por qué eres el candidato ideal, tu experiencia relevante y tu motivación..."
                      />
                      <p className="text-xs text-gray-400 mt-1">{coverLetter.length} caracteres</p>
                    </div>
                    <button
                      onClick={handleApply}
                      disabled={!coverLetter.trim()}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-colors text-sm shadow-sm"
                    >
                      <Send size={15} /> Enviar postulación
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 flex items-center gap-2.5 px-5 py-3.5 rounded-xl shadow-xl text-sm font-medium z-50 animate-slide-in-right ${
          toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
