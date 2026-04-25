import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  User, UserRole, StudentProfile, ProfessorProfile,
  Course, Ayudantia, Application, Experience,
  ApplicationStatus, AssistantRole,
} from '../types';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_USERS: User[] = [
  { id: 'prof-1', email: 'carlos.perez@ucn.cl', password: 'password123', role: 'professor', name: 'Dr. Carlos Pérez', createdAt: '2024-01-15T00:00:00Z' },
  { id: 'prof-2', email: 'maria.gonzalez@ucn.cl', password: 'password123', role: 'professor', name: 'Dra. María González', createdAt: '2024-01-15T00:00:00Z' },
  { id: 'student-1', email: 'juan.rodriguez@alumnos.ucn.cl', password: 'password123', role: 'student', name: 'Juan Rodríguez', createdAt: '2024-03-01T00:00:00Z' },
  { id: 'student-2', email: 'ana.torres@alumnos.ucn.cl', password: 'password123', role: 'student', name: 'Ana Torres', createdAt: '2024-03-01T00:00:00Z' },
];

const MOCK_PROFESSOR_PROFILES: ProfessorProfile[] = [
  { userId: 'prof-1', department: 'Departamento de Ingeniería en Computación e Informática', title: 'Doctor en Ciencias de la Computación', phone: '+56 9 1234 5678', office: 'Edificio D, Oficina 301' },
  { userId: 'prof-2', department: 'Departamento de Matemáticas', title: 'Doctora en Matemáticas Aplicadas', phone: '+56 9 8765 4321', office: 'Edificio C, Oficina 210' },
];

const MOCK_STUDENT_PROFILES: StudentProfile[] = [
  {
    userId: 'student-1',
    rut: '20.123.456-7',
    career: 'Ingeniería Civil en Computación e Informática',
    year: 3,
    gpa: 5.8,
    bio: 'Estudiante apasionado por el desarrollo de software y la inteligencia artificial. Busco oportunidades para compartir y profundizar mis conocimientos en entornos académicos.',
    phone: '+56 9 9876 5432',
    linkedin: 'linkedin.com/in/juan-rodriguez',
    github: 'github.com/jrodriguez',
    experience: [
      { id: 'exp-1', type: 'ayudantia', title: 'Ayudante de Programación I', organization: 'UCN — Departamento de Computación', startDate: '2024-03-01', endDate: '2024-07-31', current: false, description: 'Apoyo en clases de laboratorio, corrección de tareas y atención de dudas de estudiantes de primer año en lenguaje C.' },
      { id: 'exp-2', type: 'proyecto', title: 'Sistema de Gestión Académica', organization: 'Proyecto Personal', startDate: '2024-08-01', current: true, description: 'Desarrollo de una aplicación web para gestionar el historial académico. Stack: React, Node.js, PostgreSQL.' },
    ],
  },
  {
    userId: 'student-2',
    rut: '20.987.654-3',
    career: 'Ingeniería Civil en Computación e Informática',
    year: 4,
    gpa: 6.2,
    bio: 'Estudiante de último año con experiencia en desarrollo web y bases de datos. Me apasiona la enseñanza y el aprendizaje colaborativo. Tengo experiencia laboral y académica que aporta valor en roles de ayudantía.',
    phone: '+56 9 8765 1234',
    linkedin: 'linkedin.com/in/ana-torres',
    github: 'github.com/atorres',
    experience: [
      { id: 'exp-3', type: 'trabajo', title: 'Desarrolladora Web Part-time', organization: 'StartupTech SPA', startDate: '2024-01-15', current: true, description: 'Desarrollo de interfaces de usuario con React y TypeScript. Implementación de APIs RESTful con Node.js y Express.' },
      { id: 'exp-4', type: 'voluntariado', title: 'Mentora en Club de Programación', organization: 'UCN — Centro de Estudiantes', startDate: '2023-08-01', endDate: '2024-12-31', current: false, description: 'Mentoría a estudiantes de primeros años en programación y algoritmos. Coordinación de talleres semanales.' },
      { id: 'exp-5', type: 'ayudantia', title: 'Ayudante de Bases de Datos', organization: 'UCN — Departamento de Computación', startDate: '2025-03-01', current: true, description: 'Apoyo en ejercitaciones, corrección de certámenes y atención de consultas sobre SQL, modelamiento y normalización.' },
    ],
  },
];

const MOCK_COURSES: Course[] = [
  { id: 'course-1', code: 'ICI-220', name: 'Programación Orientada a Objetos', professorId: 'prof-1', semester: '1', year: 2025, credits: 6 },
  { id: 'course-2', code: 'ICI-350', name: 'Bases de Datos', professorId: 'prof-1', semester: '1', year: 2025, credits: 6 },
  { id: 'course-3', code: 'MAT-210', name: 'Cálculo III', professorId: 'prof-2', semester: '1', year: 2025, credits: 5 },
  { id: 'course-4', code: 'ICI-110', name: 'Introducción a la Programación', professorId: 'prof-1', semester: '1', year: 2025, credits: 5 },
];

const MOCK_AYUDANTIAS: Ayudantia[] = [
  {
    id: 'ayudantia-1',
    courseId: 'course-1',
    professorId: 'prof-1',
    title: 'Ayudantía POO 2025-1',
    description: 'Se buscan ayudantes para apoyar en clases de laboratorio y atención de dudas. Las ayudantías se realizarán semanalmente en horario coordinado con los estudiantes.',
    requirements: 'Haber aprobado el ramo con nota igual o superior a 5.5. Disponibilidad para 4–6 horas semanales. Buenas habilidades de comunicación y disposición para enseñar.',
    maxAssistants: 4,
    status: 'open',
    createdAt: '2025-03-01T00:00:00Z',
    assignedStudents: [],
  },
  {
    id: 'ayudantia-2',
    courseId: 'course-3',
    professorId: 'prof-2',
    title: 'Ayudantía Cálculo III 2025-1',
    description: 'Búsqueda de ayudantes para apoyo en ejercitación y preparación de evaluaciones. Se coordinará horario semanal de atención de consultas y sesiones de ejercitación.',
    requirements: 'Promedio mínimo de 5.0 en el ramo. Conocimiento sólido de cálculo diferencial e integral. Disponibilidad de 3–5 horas semanales.',
    maxAssistants: 3,
    status: 'open',
    createdAt: '2025-03-05T00:00:00Z',
    assignedStudents: [],
  },
  {
    id: 'ayudantia-3',
    courseId: 'course-2',
    professorId: 'prof-1',
    title: 'Ayudantía Bases de Datos 2025-1',
    description: 'Ayudantes para apoyar en laboratorios de SQL, diseño de bases de datos relacionales y ejercitaciones prácticas.',
    requirements: 'Nota igual o superior a 5.5 en el ramo. Dominio de SQL y modelamiento entidad-relación. 3–5 horas semanales.',
    maxAssistants: 3,
    status: 'open',
    createdAt: '2025-03-08T00:00:00Z',
    assignedStudents: [],
  },
];

const MOCK_APPLICATIONS: Application[] = [
  { id: 'app-1', ayudantiaId: 'ayudantia-1', studentId: 'student-1', status: 'pending', coverLetter: 'Postulo a esta ayudantía por mi experiencia previa como ayudante de Programación I y mi sólido dominio de los contenidos de POO. Estoy motivado para apoyar el aprendizaje de los estudiantes y contribuir al equipo docente.', appliedAt: '2025-03-10T10:00:00Z' },
  { id: 'app-2', ayudantiaId: 'ayudantia-1', studentId: 'student-2', status: 'pending', coverLetter: 'Tengo amplia experiencia tanto académica como laboral en programación orientada a objetos. Mi desempeño académico, mi rol actual como ayudante y mi experiencia en la industria me hacen una candidata sólida para esta posición.', appliedAt: '2025-03-11T14:30:00Z' },
];

// ─── Store Definition ─────────────────────────────────────────────────────────

const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

interface AppState {
  currentUser: User | null;
  users: User[];
  studentProfiles: StudentProfile[];
  professorProfiles: ProfessorProfile[];
  courses: Course[];
  ayudantias: Ayudantia[];
  applications: Application[];

  login: (email: string, password: string) => boolean;
  loginWithGoogle: (role: UserRole) => boolean;
  logout: () => void;
  register: (data: {
    email: string; password: string; name: string; role: UserRole;
    career?: string; year?: number; department?: string; title?: string;
  }) => { success: boolean; message: string };

  updateStudentProfile: (userId: string, data: Partial<Omit<StudentProfile, 'userId' | 'experience'>>) => void;
  addExperience: (userId: string, experience: Omit<Experience, 'id'>) => void;
  updateExperience: (userId: string, experienceId: string, data: Partial<Experience>) => void;
  deleteExperience: (userId: string, experienceId: string) => void;

  applyToAyudantia: (ayudantiaId: string, coverLetter: string) => { success: boolean; message: string };

  createAyudantia: (data: Omit<Ayudantia, 'id' | 'createdAt' | 'assignedStudents'>) => void;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => void;
  assignCoordinatorRole: (ayudantiaId: string, studentId: string, role: AssistantRole) => void;
  closeAyudantia: (ayudantiaId: string) => void;
  reopenAyudantia: (ayudantiaId: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: MOCK_USERS,
      studentProfiles: MOCK_STUDENT_PROFILES,
      professorProfiles: MOCK_PROFESSOR_PROFILES,
      courses: MOCK_COURSES,
      ayudantias: MOCK_AYUDANTIAS,
      applications: MOCK_APPLICATIONS,

      login: (email, password) => {
        const user = get().users.find(
          u => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
        );
        if (user) { set({ currentUser: user }); return true; }
        return false;
      },

      loginWithGoogle: (role) => {
        const user = get().users.find(u => u.role === role);
        if (user) { set({ currentUser: user }); return true; }
        return false;
      },

      logout: () => set({ currentUser: null }),

      register: (data) => {
        if (get().users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
          return { success: false, message: 'Este correo ya está registrado.' };
        }
        const newUser: User = {
          id: genId(), email: data.email, password: data.password,
          role: data.role, name: data.name, createdAt: new Date().toISOString(),
        };
        if (data.role === 'student') {
          const profile: StudentProfile = {
            userId: newUser.id, rut: '', career: data.career ?? '', year: data.year ?? 1,
            gpa: 0, bio: '', phone: '', experience: [],
          };
          set(s => ({ users: [...s.users, newUser], studentProfiles: [...s.studentProfiles, profile], currentUser: newUser }));
        } else {
          const profile: ProfessorProfile = {
            userId: newUser.id, department: data.department ?? '', title: data.title ?? '',
          };
          set(s => ({ users: [...s.users, newUser], professorProfiles: [...s.professorProfiles, profile], currentUser: newUser }));
        }
        return { success: true, message: 'Cuenta creada exitosamente.' };
      },

      updateStudentProfile: (userId, data) =>
        set(s => ({
          studentProfiles: s.studentProfiles.map(p => p.userId === userId ? { ...p, ...data } : p),
        })),

      addExperience: (userId, experience) => {
        const newExp: Experience = { ...experience, id: genId() };
        set(s => ({
          studentProfiles: s.studentProfiles.map(p =>
            p.userId === userId ? { ...p, experience: [...p.experience, newExp] } : p,
          ),
        }));
      },

      updateExperience: (userId, experienceId, data) =>
        set(s => ({
          studentProfiles: s.studentProfiles.map(p =>
            p.userId === userId
              ? { ...p, experience: p.experience.map(e => e.id === experienceId ? { ...e, ...data } : e) }
              : p,
          ),
        })),

      deleteExperience: (userId, experienceId) =>
        set(s => ({
          studentProfiles: s.studentProfiles.map(p =>
            p.userId === userId
              ? { ...p, experience: p.experience.filter(e => e.id !== experienceId) }
              : p,
          ),
        })),

      applyToAyudantia: (ayudantiaId, coverLetter) => {
        const { currentUser, applications, ayudantias } = get();
        if (!currentUser) return { success: false, message: 'No autenticado.' };
        const ay = ayudantias.find(a => a.id === ayudantiaId);
        if (!ay || ay.status === 'closed') return { success: false, message: 'Esta ayudantía no está disponible.' };
        if (applications.find(a => a.ayudantiaId === ayudantiaId && a.studentId === currentUser.id))
          return { success: false, message: 'Ya postulaste a esta ayudantía.' };
        const app: Application = {
          id: genId(), ayudantiaId, studentId: currentUser.id,
          status: 'pending', coverLetter, appliedAt: new Date().toISOString(),
        };
        set(s => ({ applications: [...s.applications, app] }));
        return { success: true, message: '¡Postulación enviada con éxito!' };
      },

      createAyudantia: (data) => {
        const newAy: Ayudantia = { ...data, id: genId(), createdAt: new Date().toISOString(), assignedStudents: [] };
        set(s => ({ ayudantias: [...s.ayudantias, newAy] }));
      },

      updateApplicationStatus: (applicationId, status) => {
        const app = get().applications.find(a => a.id === applicationId);
        if (!app) return;
        set(s => ({
          applications: s.applications.map(a =>
            a.id === applicationId ? { ...a, status, reviewedAt: new Date().toISOString() } : a,
          ),
          ayudantias: s.ayudantias.map(ay => {
            if (ay.id !== app.ayudantiaId) return ay;
            if (status === 'accepted') {
              if (ay.assignedStudents.some(x => x.studentId === app.studentId)) return ay;
              return { ...ay, assignedStudents: [...ay.assignedStudents, { studentId: app.studentId, role: 'ayudante' as const, assignedAt: new Date().toISOString() }] };
            }
            if (status === 'rejected') {
              return { ...ay, assignedStudents: ay.assignedStudents.filter(x => x.studentId !== app.studentId) };
            }
            return ay;
          }),
        }));
      },

      assignCoordinatorRole: (ayudantiaId, studentId, role) =>
        set(s => ({
          ayudantias: s.ayudantias.map(ay => {
            if (ay.id !== ayudantiaId) return ay;
            return {
              ...ay,
              assignedStudents: ay.assignedStudents.map(x => {
                if (x.studentId === studentId) return { ...x, role };
                if (role === 'coordinador' && x.role === 'coordinador') return { ...x, role: 'ayudante' as const };
                return x;
              }),
            };
          }),
        })),

      closeAyudantia: (id) =>
        set(s => ({ ayudantias: s.ayudantias.map(ay => ay.id === id ? { ...ay, status: 'closed', closedAt: new Date().toISOString() } : ay) })),

      reopenAyudantia: (id) =>
        set(s => ({ ayudantias: s.ayudantias.map(ay => ay.id === id ? { ...ay, status: 'open', closedAt: undefined } : ay) })),
    }),
    { name: 'ucn-ayudantias' },
  ),
);
