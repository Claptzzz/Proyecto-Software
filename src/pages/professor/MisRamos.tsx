import { Link } from 'react-router-dom';
import { useStore } from '../../store';
import { ChevronRight, BookOpen, Users, Clock, CheckCircle, Star } from 'lucide-react';

export default function MisRamos() {
  const { currentUser, courses, ayudantias, applications, users } = useStore();

  const myCourses = courses.filter(c => c.professorId === currentUser?.id);

  function getAysForCourse(courseId: string) {
    return ayudantias.filter(a => a.courseId === courseId && a.professorId === currentUser?.id);
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
                </div>

                {/* Ayudantias list */}
                {ays.length > 0 && (
                  <div className="border-t border-gray-100 divide-y divide-gray-50">
                    {ays.map(ay => {
                      const total   = countApps(ay.id);
                      const pending = countApps(ay.id, 'pending');
                      const accepted = ay.assignedStudents.length;
                      const isFull = accepted >= ay.maxAssistants;
                      const coordinator = ay.assignedStudents.find(s => s.role === 'coordinador');
                      const coordinatorUser = coordinator ? users.find(u => u.id === coordinator.studentId) : null;
                      return (
                        <div key={ay.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50/60 transition-colors">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-2 h-2 rounded-full shrink-0 ${ay.status === 'open' ? 'bg-green-400' : 'bg-gray-300'}`} />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-medium text-gray-900 truncate">{ay.title}</p>
                                {isFull && (
                                  <span className="inline-flex items-center ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200 shrink-0">
                                    LLENO
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                                {ay.maxAssistants >= 3 ? (
                                  coordinator ? (
                                    <>
                                      <Star size={12} className="text-blue-600" />
                                      <span className="text-blue-600 font-semibold">Coordinador: {coordinatorUser?.name}</span>
                                    </>
                                  ) : (
                                    <span className="text-gray-500">Coordinador: Sin asignar</span>
                                  )
                                ) : (
                                  <span className="text-gray-500">Coordinador: No disponible para este ramo</span>
                                )}
                              </p>
                              <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                                <span className="flex items-center gap-1"><Users size={11} /> {accepted}/{ay.maxAssistants} ayudantes</span>
                                <span className="flex items-center gap-1"><Clock size={11} /> {pending} pendientes</span>
                                <span className="flex items-center gap-1"><CheckCircle size={11} /> {total} postulante/s en total</span>
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
    </div>
  );
}
