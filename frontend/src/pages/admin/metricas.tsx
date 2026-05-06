import { useStore } from '../../store';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  XCircle,
  Calendar,
  Download
} from 'lucide-react';

// UCN Brand colors:
// Azul institucional: #7E9BC0
// Terra / Cobre: #AC6D33
export default function AdminMetricas() {
  const { applications, ayudantias, courses, users, studentProfiles } = useStore();

  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalProfessors = users.filter(u => u.role === 'professor').length;
  const acceptedApps = applications.filter(a => a.status === 'accepted').length;
  const rejectedApps = applications.filter(a => a.status === 'rejected').length;
  const pendingApps = applications.filter(a => a.status === 'pending').length;

  // Career distribution logic for applicants
  const applicantIds = Array.from(new Set(applications.map(a => a.studentId)));
  const getCareerCount = (careerName: string) => {
    return applicantIds.filter(id => {
      const profile = studentProfiles.find(p => p.userId === id);
      return profile?.career === careerName;
    }).length;
  };

  const careerStats = [
    { label: 'Ing. Civil en Computación e Informática', count: getCareerCount('Ingeniería Civil en Computación e Informática'), color: 'bg-[#7E9BC0]' },
    { label: 'Ingeniería Civil Industrial', count: getCareerCount('Ingeniería Civil Industrial'), color: 'bg-[#AC6D33]' },
    { label: 'Ing. en Tecnologías de la Información', count: getCareerCount('Ingeniería en Tecnologías de la Información'), color: 'bg-indigo-500' },
  ];

  const totalApplicants = applicantIds.length || 1;

  const stats = [
// ... (rest of stats array)

    { label: 'Postulantes Totales', value: totalStudents, icon: Users, color: 'bg-blue-500' },
    { label: 'Ayudantías Activas', value: ayudantias.filter(a => a.status === 'open').length, icon: BookOpen, color: 'bg-[#AC6D33]' },
    { label: 'Tasa de Aceptación', value: `${((acceptedApps / (applications.length || 1)) * 100).toFixed(1)}%`, icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Postulantes por vacante', value: (applications.length / (ayudantias.length || 1)).toFixed(1), icon: BarChart3, color: 'bg-[#7E9BC0]' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Métricas del Sistema</h1>
        <p className="text-slate-500 mt-2">Análisis detallado de la actividad y rendimiento de la plataforma.</p>
      </header>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white shadow-lg shadow-opacity-20`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Comparison Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900">Comparativa de Postulaciones</h2>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <TrendingUp size={14} />
              <span>Estado Global</span>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-center gap-12 sm:gap-20">
            {/* Visual comparison bars */}
            {[
              { label: 'Totales', value: applications.length, color: 'from-[#7E9BC0] to-[#2B5C8A]', bg: 'bg-slate-100' },
              { label: 'Aceptadas', value: acceptedApps, color: 'from-green-500 to-green-600', bg: 'bg-green-50' },
              { label: 'Rechazadas', value: rejectedApps, color: 'from-red-500 to-red-600', bg: 'bg-red-50' },
            ].map((bar, i) => (
              <div key={i} className="w-20 sm:w-24 flex flex-col items-center gap-4 group">
                <div className="relative w-full h-48">
                  {/* Background track */}
                  <div 
                    className={`w-full h-full ${bar.bg} rounded-2xl transition-all duration-500 group-hover:opacity-80`} 
                  />
                  {/* Progress bar */}
                  <div 
                    className={`absolute bottom-0 w-full bg-gradient-to-t ${bar.color} rounded-2xl transition-all duration-1000 flex flex-col items-center justify-start pt-3 overflow-hidden shadow-lg`} 
                    style={{ height: `${(bar.value / (applications.length || 1)) * 100}%`, minHeight: bar.value > 0 ? '40px' : '0' }} 
                  >
                    <span className="text-white font-black text-lg drop-shadow-md">{bar.value}</span>
                  </div>
                </div>
                <div className="text-center">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">{bar.label}</span>
                  <span className="text-[10px] font-bold text-slate-300">
                    {((bar.value / (applications.length || 1)) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center gap-6">
            <button className="flex items-center gap-2 bg-slate-100 text-slate-400 px-6 py-3 rounded-xl font-bold cursor-not-allowed transition-all whitespace-nowrap">
              <Download size={20} />
              Descargar datos de ayudantes
            </button>
            <p className="text-xs text-slate-500 flex-1 leading-relaxed italic">
              Descarga todos los datos de los ayudantes aceptados incluyendo: Nombre, RUT, correo electronico, PPA, estado PIA, condicion de coordinador. Este boton solo estara disponible luego de cerrar la convocatoria.
            </p>
          </div>
        </div>

        {/* Career Distribution */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-8">Distribución por Carrera</h2>
          <div className="space-y-6">
            {careerStats.map((career) => (
              <div key={career.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-600 truncate mr-2">{career.label}</span>
                  <span className="font-bold text-slate-900">{career.count}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${career.color} transition-all duration-1000`} 
                    style={{ width: `${(career.count / totalApplicants) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-500 leading-relaxed">
              Muestra la cantidad de estudiantes únicos que han postulado a al menos una ayudantía, segmentados por su carrera de origen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
