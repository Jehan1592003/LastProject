export interface Trainee {
  id: number;
  name: string;
  email: string;
  phone: string;
  nationalId: string;
  instructorId: number;
  centerId: number;
  enrollDate: string;
  sessionsCompleted: number;
  totalSessions: number;
  status: 'enrolled' | 'passed' | 'failed';
}