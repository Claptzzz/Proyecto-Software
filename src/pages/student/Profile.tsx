import { useState } from 'react';
import { useStore } from '../../store';
import type { Experience, ExperienceType } from '../../types';
import {
  Pencil, Plus, Trash2, X, Save, Briefcase, BookOpen,
  Heart, Code, HelpCircle, ExternalLink, Phone,
} from 'lucide-react';

const expTypeConfig: Record<ExperienceType, { label: string; icon: React.ElementType; color: string; dot: string }> = {
  ayudantia:   { label: 'Ayudantía',   icon: BookOpen,    color: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-500' },
  voluntariado:{ label: 'Voluntariado', icon: Heart,       color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  trabajo:     { label: 'Trabajo',      icon: Briefcase,   color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
  proyecto:    { label: 'Proyecto',     icon: Code,        color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
  otro:        { label: 'Otro',         icon: HelpCircle,  color: 'bg-gray-100 text-gray-600',   dot: 'bg-gray-400' },
};

const emptyExp: Omit<Experience, 'id'> = {
  type: 'ayudantia', title: '', organization: '', startDate: '', current: false, description: '',
};

const inputCls = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 bg-gray-50 focus:bg-white transition-colors';

export default function StudentProfile() {
  const { currentUser, studentProfiles, updateStudentProfile, addExperience, updateExperience, deleteExperience } = useStore();
  const profile = studentProfiles.find(p => p.userId === currentUser?.id);

  const [editingProfile, setEditingProfile] = useState(false);
  const [form, setForm] = useState({
    rut: profile?.rut ?? '', career: profile?.career ?? '', year: profile?.year ?? 1,
    gpa: profile?.gpa ?? 0, bio: profile?.bio ?? '', phone: profile?.phone ?? '',
    linkedin: profile?.linkedin ?? '', github: profile?.github ?? '',
  });

  const [showExpModal, setShowExpModal] = useState(false);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expForm, setExpForm] = useState<Omit<Experience, 'id'>>(emptyExp);

  function saveProfile(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!currentUser) return;
    updateStudentProfile(currentUser.id, form);
    setEditingProfile(false);
  }

  function openAddExp() {
    setEditingExpId(null);
    setExpForm(emptyExp);
    setShowExpModal(true);
  }

  function openEditExp(exp: Experience) {
    setEditingExpId(exp.id);
    setExpForm({ type: exp.type, title: exp.title, organization: exp.organization, startDate: exp.startDate, endDate: exp.endDate, current: exp.current, description: exp.description });
    setShowExpModal(true);
  }

  function saveExp(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!currentUser) return;
    if (editingExpId) {
      updateExperience(currentUser.id, editingExpId, expForm);
    } else {
      addExperience(currentUser.id, expForm);
    }
    setShowExpModal(false);
  }

  const initials = currentUser?.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() ?? '?';

  return (
    <div className="p-8 max-w-3xl mx-auto animate-slide-up">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
          <p className="text-sm text-gray-500 mt-0.5">Gestiona tu información académica y experiencia</p>
        </div>
        {!editingProfile && (
          <button
            onClick={() => setEditingProfile(true)}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 px-4 py-2 rounded-xl transition-all duration-150"
          >
            <Pencil size={15} /> Editar perfil
          </button>
        )}
      </div>

      {/* Profile header card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-5 shadow-sm animate-fade-in">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-md shadow-blue-200">
            {initials}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{currentUser?.name}</h2>
            <p className="text-gray-500 text-sm mt-0.5">
              {profile?.career ?? '—'}{profile?.year ? ` · ${profile.year}° año` : ''}
            </p>
            <div className="flex flex-wrap gap-3 mt-3">
              {profile?.gpa ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                  Promedio: {profile.gpa.toFixed(1)}
                </span>
              ) : null}
              {profile?.rut && (
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">
                  RUT {profile.rut}
                </span>
              )}
              {profile?.phone && (
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                  <Phone size={12} /> {profile.phone}
                </span>
              )}
              {profile?.linkedin && (
                <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                  <ExternalLink size={12} /> LinkedIn
                </a>
              )}
              {profile?.github && (
                <a href={`https://${profile.github}`} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 hover:underline transition-colors">
                  <ExternalLink size={12} /> GitHub
                </a>
              )}
            </div>
            {profile?.bio && (
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">{profile.bio}</p>
            )}
          </div>
        </div>

        {/* Edit form */}
        {editingProfile && (
          <form onSubmit={saveProfile} className="mt-6 pt-6 border-t border-gray-100 space-y-4 animate-slide-up">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">RUT</label>
                <input value={form.rut} onChange={e => setForm(f => ({ ...f, rut: e.target.value }))}
                  className={inputCls} placeholder="12.345.678-9" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Teléfono</label>
                <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className={inputCls} placeholder="+56 9 1234 5678" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Carrera</label>
                <input value={form.career} onChange={e => setForm(f => ({ ...f, career: e.target.value }))}
                  className={inputCls} placeholder="Ingeniería Civil en..." required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Año</label>
                  <select value={form.year} onChange={e => setForm(f => ({ ...f, year: parseInt(e.target.value) }))}
                    className={inputCls}>
                    {[1, 2, 3, 4, 5].map(y => <option key={y} value={y}>{y}°</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Promedio</label>
                  <input type="number" min="1" max="7" step="0.1" value={form.gpa}
                    onChange={e => setForm(f => ({ ...f, gpa: parseFloat(e.target.value) }))}
                    className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">LinkedIn</label>
                <input value={form.linkedin} onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))}
                  className={inputCls} placeholder="linkedin.com/in/tu-perfil" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">GitHub</label>
                <input value={form.github} onChange={e => setForm(f => ({ ...f, github: e.target.value }))}
                  className={inputCls} placeholder="github.com/tu-usuario" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Sobre mí</label>
              <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3}
                className={inputCls + ' resize-none'}
                placeholder="Cuéntale a los profesores quién eres y qué te motiva..." />
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button type="button" onClick={() => setEditingProfile(false)}
                className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                <X size={14} /> Cancelar
              </button>
              <button type="submit"
                className="flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors shadow-sm">
                <Save size={14} /> Guardar cambios
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Experience section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">Experiencia</h2>
            {profile?.experience && profile.experience.length > 0 && (
              <p className="text-xs text-gray-400 mt-0.5">{profile.experience.length} {profile.experience.length === 1 ? 'entrada' : 'entradas'}</p>
            )}
          </div>
          <button
            onClick={openAddExp}
            aria-label="Agregar experiencia"
            className="flex items-center gap-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 px-3 py-1.5 rounded-xl transition-all duration-150"
          >
            <Plus size={15} /> Agregar
          </button>
        </div>

        {(!profile?.experience || profile.experience.length === 0) ? (
          <div className="px-6 py-14 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <Briefcase size={26} className="text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-500">Sin experiencias aún</p>
            <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">Agrega ayudantías previas, trabajos, voluntariados o proyectos para destacar ante los profesores.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {profile.experience.map((exp, idx) => {
              const cfg = expTypeConfig[exp.type];
              const IconComp = cfg.icon;
              return (
                <div
                  key={exp.id}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                  className="px-6 py-5 flex items-start gap-4 hover:bg-gray-50/70 transition-colors animate-fade-in group"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cfg.color}`}>
                    <IconComp size={17} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900 text-sm">{exp.title}</p>
                          {exp.current && (
                            <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded-full">Actual</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{exp.organization}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {exp.startDate} — {exp.current ? 'Presente' : (exp.endDate ?? '—')}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <button
                          onClick={() => openEditExp(exp)}
                          aria-label={`Editar ${exp.title}`}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => currentUser && deleteExperience(currentUser.id, exp.id)}
                          aria-label={`Eliminar ${exp.title}`}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Experience modal */}
      {showExpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{editingExpId ? 'Editar experiencia' : 'Agregar experiencia'}</h3>
              <button
                onClick={() => setShowExpModal(false)}
                aria-label="Cerrar modal"
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={saveExp} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Tipo</label>
                <select value={expForm.type} onChange={e => setExpForm(f => ({ ...f, type: e.target.value as ExperienceType }))}
                  className={inputCls}>
                  {Object.entries(expTypeConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Título / Cargo</label>
                <input value={expForm.title} onChange={e => setExpForm(f => ({ ...f, title: e.target.value }))} required
                  className={inputCls} placeholder="Ej: Ayudante de Cálculo I" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Organización / Lugar</label>
                <input value={expForm.organization} onChange={e => setExpForm(f => ({ ...f, organization: e.target.value }))} required
                  className={inputCls} placeholder="Ej: UCN — Departamento de Matemáticas" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Fecha inicio</label>
                  <input type="date" value={expForm.startDate} onChange={e => setExpForm(f => ({ ...f, startDate: e.target.value }))} required
                    className={inputCls} />
                </div>
                {!expForm.current && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Fecha término</label>
                    <input type="date" value={expForm.endDate ?? ''} onChange={e => setExpForm(f => ({ ...f, endDate: e.target.value }))}
                      className={inputCls} />
                  </div>
                )}
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input type="checkbox" checked={expForm.current}
                  onChange={e => setExpForm(f => ({ ...f, current: e.target.checked, endDate: undefined }))}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-700">Actualmente en este rol</span>
              </label>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Descripción</label>
                <textarea value={expForm.description} onChange={e => setExpForm(f => ({ ...f, description: e.target.value }))} rows={3} required
                  className={inputCls + ' resize-none'}
                  placeholder="Describe tus responsabilidades y logros..." />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowExpModal(false)}
                  className="text-sm text-gray-600 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                  Cancelar
                </button>
                <button type="submit"
                  className="flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors shadow-sm">
                  <Save size={14} /> {editingExpId ? 'Guardar cambios' : 'Agregar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
