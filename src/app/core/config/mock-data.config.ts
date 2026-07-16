import { Center } from '../models/center.model';
import { Instructor } from '../models/instructor.model';
import { Trainee } from '../models/trainee.model';
import { User } from '../models/user.model';

export const MOCK_CENTERS: Center[] = [
  {
    id: 1,
    name: 'مركز الرياض الرئيسي',
    city: 'الرياض',
    address: 'شارع الملك فهد، حي العليا',
    phone: '0500000001',
    capacity: 50,
    managerId: 1,
    status: 'active'
  },
  {
    id: 2,
    name: 'مركز جدة الشمالي',
    city: 'جدة',
    address: 'شارع التحلية، حي الصفا',
    phone: '0500000002',
    capacity: 40,
    managerId: 2,
    status: 'active'
  },
  {
    id: 3,
    name: 'مركز الدمام',
    city: 'الدمام',
    address: 'شارع الملك سعود، حي الشاطئ',
    phone: '0500000003',
    capacity: 30,
    managerId: 3,
    status: 'inactive'
  },
  {
    id: 4,
    name: 'مركز المدينة المنورة',
    city: 'المدينة المنورة',
    address: 'شارع السلام، حي العزيزية',
    phone: '0500000004',
    capacity: 35,
    managerId: 1,
    status: 'active'
  },
  {
    id: 5,
    name: 'مركز الطائف',
    city: 'الطائف',
    address: 'شارع الملك عبدالعزيز، حي الشهداء',
    phone: '0500000005',
    capacity: 25,
    managerId: 2,
    status: 'active'
  }
];
export const MOCK_INSTRUCTORS: Instructor[] = [
  {
    id: 1,
    name: 'أحمد محمد السالم',
    email: 'ahmed.salem@drive.sa',
    phone: '0501111001',
    licenseNumber: 'LIC-2019-00101',
    centerId: 1,
    status: 'active',
    hireDate: '2019-03-15',
    traineeCount: 0
  },
  {
    id: 2,
    name: 'خالد عبدالله الفهد',
    email: 'khalid.fahad@drive.sa',
    phone: '0501111002',
    licenseNumber: 'LIC-2020-00102',
    centerId: 1,
    status: 'active',
    hireDate: '2020-06-01',
    traineeCount: 0
  },
  {
    id: 3,
    name: 'سعد إبراهيم الحربي',
    email: 'saad.harbi@drive.sa',
    phone: '0501111003',
    licenseNumber: 'LIC-2018-00103',
    centerId: 2,
    status: 'active',
    hireDate: '2018-09-20',
    traineeCount: 0
  },
  {
    id: 4,
    name: 'نورة عبدالرحمن الشمري',
    email: 'noura.shamri@drive.sa',
    phone: '0501111004',
    licenseNumber: 'LIC-2021-00104',
    centerId: 2,
    status: 'inactive',
    hireDate: '2021-01-10',
    traineeCount: 0
  },
  {
    id: 5,
    name: 'فهد سلمان العتيبي',
    email: 'fahad.otaibi@drive.sa',
    phone: '0501111005',
    licenseNumber: 'LIC-2017-00105',
    centerId: 3,
    status: 'active',
    hireDate: '2017-05-25',
    traineeCount: 0
  },
  {
    id: 6,
    name: 'منيرة يوسف القحطاني',
    email: 'munira.qahtani@drive.sa',
    phone: '0501111006',
    licenseNumber: 'LIC-2022-00106',
    centerId: 1,
    status: 'active',
    hireDate: '2022-03-08',
    traineeCount: 0
  },
  {
    id: 7,
    name: 'عمر فيصل الزهراني',
    email: 'omar.zahrani@drive.sa',
    phone: '0501111007',
    licenseNumber: 'LIC-2020-00107',
    centerId: 4,
    status: 'active',
    hireDate: '2020-11-15',
    traineeCount: 0
  },
  {
    id: 8,
    name: 'ريم أحمد الدوسري',
    email: 'reem.dosari@drive.sa',
    phone: '0501111008',
    licenseNumber: 'LIC-2019-00108',
    centerId: 4,
    status: 'inactive',
    hireDate: '2019-07-22',
    traineeCount: 0
  },
  {
    id: 9,
    name: 'تركي محمد العنزي',
    email: 'turki.anazi@drive.sa',
    phone: '0501111009',
    licenseNumber: 'LIC-2021-00109',
    centerId: 5,
    status: 'active',
    hireDate: '2021-08-30',
    traineeCount: 0
  },
  {
    id: 10,
    name: 'هند سعد البقمي',
    email: 'hind.baqmi@drive.sa',
    phone: '0501111010',
    licenseNumber: 'LIC-2023-00110',
    centerId: 5,
    status: 'active',
    hireDate: '2023-01-05',
    traineeCount: 0
  }
];
export const MOCK_TRAINEES: Trainee[] = [
  {
    id: 1,
    name: 'محمد علي الغامدي',
    email: 'mohammed.ghamdi@email.com',
    phone: '0552221001',
    nationalId: '1234567891',
    instructorId: 1,
    centerId: 1,
    enrollDate: '2024-01-10',
    sessionsCompleted: 18,
    totalSessions: 30,
    status: 'enrolled'
  },
  {
    id: 2,
    name: 'سارة خالد المطيري',
    email: 'sara.mutairi@email.com',
    phone: '0552221002',
    nationalId: '1234567892',
    instructorId: 1,
    centerId: 1,
    enrollDate: '2024-01-15',
    sessionsCompleted: 30,
    totalSessions: 30,
    status: 'passed'
  },
  {
    id: 3,
    name: 'عبدالله فهد الرشيدي',
    email: 'abdullah.rashidi@email.com',
    phone: '0552221003',
    nationalId: '1234567893',
    instructorId: 2,
    centerId: 1,
    enrollDate: '2024-02-01',
    sessionsCompleted: 10,
    totalSessions: 25,
    status: 'enrolled'
  },
  {
    id: 4,
    name: 'لطيفة سعود السبيعي',
    email: 'latifa.subai@email.com',
    phone: '0552221004',
    nationalId: '1234567894',
    instructorId: 2,
    centerId: 1,
    enrollDate: '2023-11-20',
    sessionsCompleted: 20,
    totalSessions: 20,
    status: 'failed'
  },
  {
    id: 5,
    name: 'يوسف أحمد الحمدان',
    email: 'yousuf.hamdan@email.com',
    phone: '0552221005',
    nationalId: '1234567895',
    instructorId: 3,
    centerId: 2,
    enrollDate: '2024-03-05',
    sessionsCompleted: 5,
    totalSessions: 30,
    status: 'enrolled'
  },
  {
    id: 6,
    name: 'دانة محمد العسيري',
    email: 'dana.asiri@email.com',
    phone: '0552221006',
    nationalId: '1234567896',
    instructorId: 3,
    centerId: 2,
    enrollDate: '2023-12-01',
    sessionsCompleted: 28,
    totalSessions: 28,
    status: 'passed'
  },
  {
    id: 7,
    name: 'فيصل عبدالعزيز الجهني',
    email: 'faisal.juhani@email.com',
    phone: '0552221007',
    nationalId: '1234567897',
    instructorId: 5,
    centerId: 3,
    enrollDate: '2024-02-15',
    sessionsCompleted: 12,
    totalSessions: 25,
    status: 'enrolled'
  },
  {
    id: 8,
    name: 'نوف عمر الحازمي',
    email: 'nouf.hazmi@email.com',
    phone: '0552221008',
    nationalId: '1234567898',
    instructorId: 6,
    centerId: 1,
    enrollDate: '2024-01-20',
    sessionsCompleted: 22,
    totalSessions: 30,
    status: 'enrolled'
  },
  {
    id: 9,
    name: 'عمر سعد الثبيتي',
    email: 'omar.thubaiti@email.com',
    phone: '0552221009',
    nationalId: '1234567899',
    instructorId: 7,
    centerId: 4,
    enrollDate: '2024-03-10',
    sessionsCompleted: 8,
    totalSessions: 20,
    status: 'enrolled'
  },
  {
    id: 10,
    name: 'بسمة علي الصاعدي',
    email: 'basma.saedi@email.com',
    phone: '0552221010',
    nationalId: '1234567900',
    instructorId: 7,
    centerId: 4,
    enrollDate: '2023-10-15',
    sessionsCompleted: 30,
    totalSessions: 30,
    status: 'passed'
  },
  {
    id: 11,
    name: 'راشد محمد البلوي',
    email: 'rashed.balawi@email.com',
    phone: '0552221011',
    nationalId: '1234567901',
    instructorId: 9,
    centerId: 5,
    enrollDate: '2024-02-28',
    sessionsCompleted: 15,
    totalSessions: 25,
    status: 'enrolled'
  },
  {
    id: 12,
    name: 'منى خالد الشهري',
    email: 'mona.shahri@email.com',
    phone: '0552221012',
    nationalId: '1234567902',
    instructorId: 9,
    centerId: 5,
    enrollDate: '2023-09-01',
    sessionsCompleted: 25,
    totalSessions: 25,
    status: 'passed'
  }
];
export const MOCK_USERS: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'مدير النظام',
    email: 'admin@drive.sa'
  },
  {
    id: 2,
    username: 'staff1',
    password: 'staff123',
    role: 'staff',
    name: 'موظف الرياض',
    email: 'staff1@drive.sa'
  },
  {
    id: 3,
    username: 'staff2',
    password: 'staff123',
    role: 'staff',
    name: 'موظفة جدة',
    email: 'staff2@drive.sa'
  }
];
MOCK_INSTRUCTORS.forEach(instructor => {
  instructor.traineeCount = MOCK_TRAINEES.filter(
    t => t.instructorId === instructor.id
  ).length;
});