export type UserRole = 'student' | 'professor' | 'admin';
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';
export type AyudantiaStatus = 'open' | 'closed';
export type ExperienceType = 'ayudantia' | 'voluntariado' | 'trabajo' | 'proyecto' | 'otro';
export type AssistantRole = 'ayudante' | 'coordinador';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  createdAt: string;
}

export interface Experience {
  id: string;
  type: ExperienceType;
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface StudentProfile {
  userId: string;
  rut: string;
  career: string;
  year: number;
  gpa: number;
  bio: string;
  phone: string;
  linkedin?: string;
  github?: string;
  experience: Experience[];
}

export interface ProfessorProfile {
  userId: string;
  department: string;
  title: string;
  phone?: string;
  office?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  professorId: string;
  semester: string;
  year: number;
  credits: number;
}

export interface AssignedStudent {
  studentId: string;
  role: AssistantRole;
  assignedAt: string;
}

export interface Ayudantia {
  id: string;
  courseId: string;
  professorId: string;
  title: string;
  description: string;
  requirements: string;
  maxAssistants: number;
  status: AyudantiaStatus;
  createdAt: string;
  closedAt?: string;
  assignedStudents: AssignedStudent[];
}

export interface Application {
  id: string;
  ayudantiaId: string;
  studentId: string;
  status: ApplicationStatus;
  coverLetter: string;
  appliedAt: string;
  reviewedAt?: string;
}
