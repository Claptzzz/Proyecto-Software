import { Link } from 'react-router-dom';
import { useStore } from '../../store';
import { 
  FileCheck,  
  ClipboardList,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

// UCN Brand colors:
// Azul institucional: #7E9BC0
// Terra / Cobre: #AC6D33

export default function AdminDashboard() {
  const { applications, users, ayudantias } = useStore();

  const stats = [
    {
      label: 'Postulaciones Totales',
      value: applications.length,
      icon: ClipboardList,
      color: 'bg-[#AC6D33]',
    },
    {
      label: 'Postulaciones Pendientes',
      value: applications.filter(a => a.status === 'pending').length,
      icon: Clock,
      color: 'bg-[#7E9BC0]',
    },
    {
      label: 'Ayudantes Aceptados',
      value: applications.filter(a => a.status === 'accepted').length,
      icon: FileCheck,
      color: 'bg-green-600',
    },
  ];

  const getStudentName = (studentId: string) => {
    return users.find(u => u.id === studentId)?.name || 'Estudiante desconocido';
  };

  const getAyudantiaTitle = (ayudantiaId: string) => {
    return ayudantias.find(a => a.id === ayudantiaId)?.title || 'Ayudantía desconocida';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded-full text-xs font-medium border border-green-200"><CheckCircle size={12} /> Aceptado</span>;
      case 'rejected':
        return <span className="flex items-center gap-1 text-red-700 bg-red-50 px-2 py-1 rounded-full text-xs font-medium border border-red-200"><XCircle size={12} /> Rechazado</span>;
      default:
        return <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-1 rounded-full text-xs font-medium border border-amber-200"><Clock size={12} /> Pendiente</span>;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Panel de Administración</h1>
        <p className="text-slate-500 mt-2">Gestión global de ayudantías y postulaciones UCN.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-5 transition-transform hover:scale-[1.02]">
            <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center text-white shadow-lg`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* TA Management Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="text-[#AC6D33]" size={20} />
            <h2 className="text-lg font-bold text-slate-900">Gestión de Postulaciones</h2>
          </div>
          <Link to="/admin/gestion" className="text-sm font-semibold text-[#7E9BC0] hover:underline">Ver todas</Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Estudiante</th>
                <th className="px-6 py-4">Ayudantía</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.slice(0, 10).map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#7E9BC0]/20 flex items-center justify-center text-[#7E9BC0] text-xs font-bold">
                        {getStudentName(app.studentId).charAt(0)}
                      </div>
                      <span className="font-medium text-slate-900">{getStudentName(app.studentId)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {getAyudantiaTitle(app.ayudantiaId)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(app.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
