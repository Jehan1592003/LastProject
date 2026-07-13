export interface Instructor {
  id: number;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  centerId: number;
  status: 'active' | 'inactive';
  hireDate: string;
  traineeCount: number;
}