import { useStore } from '../../store';
import { 
  BookOpen, 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  Clock
} from 'lucide-react';

export default function AdminGestion() {
  const { ayudantias, courses, users } = useStore();

  const getProfessorName = (professorId: string) => {
    return users.find(u => u.id === professorId)?.name || 'Profesor desconocido';
  };

  const getCourseName = (courseId: string) => {
    return courses.find(c => c.id === courseId)?.name || 'Ramo desconocido';
  };

  const getCourseCode = (courseId: string) => {
    return courses.find(c => c.id === courseId)?.code || '---';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestión de Ayudantías</h1>
          <p className="text-slate-500 mt-2">Administra todas las ofertas de ayudantía disponibles en la plataforma.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#AC6D33] hover:bg-[#8B5226] text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-[#AC6D33]/20 self-start">
          <Plus size={20} />
          Nueva Ayudantía
        </button>
      </header>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por título, ramo o profesor..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7E9BC0]/40 focus:border-[#7E9BC0] transition-all text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={16} />
            Filtros
          </button>
          <select className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all focus:outline-none bg-white">
            <option>Todos los estados</option>
            <option>Abiertas</option>
            <option>Cerradas</option>
          </select>
        </div>
      </div>

      {/* Grid of Ayudantias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ayudantias.map((ay) => (
          <div key={ay.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#7E9BC0]/10 flex items-center justify-center text-[#7E9BC0]">
                  <BookOpen size={24} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    ay.status === 'open' 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {ay.status === 'open' ? 'Abierta' : 'Cerrada'}
                  </span>
                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{ay.title}</h3>
              <div className="mb-4">
                <p className="text-[#AC6D33] text-sm font-semibold">{getCourseName(ay.courseId)}</p>
                <p className="text-slate-400 text-xs font-mono">{getCourseCode(ay.courseId)}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock size={14} />
                  <span>Publicada el {new Date(ay.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    {getProfessorName(ay.professorId).charAt(0)}
                  </div>
                  <span>{getProfessorName(ay.professorId)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100" />
                  ))}
                  <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[8px] font-bold text-slate-400">
                    +{ay.maxAssistants}
                  </div>
                </div>
                <button className="text-sm font-bold text-[#7E9BC0] hover:underline">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
