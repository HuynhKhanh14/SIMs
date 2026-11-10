import { User, Student, Certificate, LoginHistory } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr_admin_001',
    name: 'Quản Trị Viên (Admin)',
    email: 'admin@studentapp.com',
    age: 32,
    phoneNumber: '0901234567',
    role: 'admin',
    status: 'normal',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    createdAt: '2023-09-01T08:00:00Z',
    password: 'admin123'
  },
  {
    id: 'usr_mgr_002',
    name: 'Trần Văn Quản Lý (Manager)',
    email: 'manager@studentapp.com',
    age: 29,
    phoneNumber: '0912345678',
    role: 'manager',
    status: 'normal',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    createdAt: '2023-09-15T09:30:00Z',
    password: 'manager123'
  },
  {
    id: 'usr_emp_003',
    name: 'Nguyễn Thị Nhân Viên (Employee)',
    email: 'employee@studentapp.com',
    age: 24,
    phoneNumber: '0923456789',
    role: 'employee',
    status: 'normal',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    createdAt: '2023-10-01T14:15:00Z',
    password: 'employee123'
  },
  {
    id: 'usr_emp_004',
    name: 'Lê Hoàng Khóa (Locked User)',
    email: 'locked@studentapp.com',
    age: 27,
    phoneNumber: '0934567890',
    role: 'employee',
    status: 'locked',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    createdAt: '2023-10-10T11:00:00Z',
    password: 'password123'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'stu_001',
    studentCode: '21110001',
    fullName: 'Nguyễn Đình Khang',
    dateOfBirth: '2003-05-18',
    email: 'khang.nd@student.edu.vn',
    phoneNumber: '0987111222',
    major: 'Công nghệ Thông tin',
    gpa: 3.82,
    address: '123 Võ Văn Ngân, TP. Thủ Đức, TP. Hồ Chí Minh',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    status: 'studying',
    enrollmentYear: 2021,
    createdAt: '2023-09-10T08:00:00Z'
  },
  {
    id: 'stu_002',
    studentCode: '21110002',
    fullName: 'Phạm Thuỳ Linh',
    dateOfBirth: '2003-09-24',
    email: 'linh.pt@student.edu.vn',
    phoneNumber: '0978222333',
    major: 'Kỹ thuật Phần mềm',
    gpa: 3.91,
    address: '45 Lê Văn Việt, Tăng Nhơn Phú B, TP. Thủ Đức',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    status: 'studying',
    enrollmentYear: 2021,
    createdAt: '2023-09-12T09:15:00Z'
  },
  {
    id: 'stu_003',
    studentCode: '20110003',
    fullName: 'Hoàng Minh Tuấn',
    dateOfBirth: '2002-03-12',
    email: 'tuan.hm@student.edu.vn',
    phoneNumber: '0969333444',
    major: 'Hệ thống Thông tin',
    gpa: 3.45,
    address: '78 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    status: 'studying',
    enrollmentYear: 2020,
    createdAt: '2023-09-14T10:40:00Z'
  },
  {
    id: 'stu_004',
    studentCode: '21110004',
    fullName: 'Đỗ Hải Đăng',
    dateOfBirth: '2003-11-05',
    email: 'dang.dh@student.edu.vn',
    phoneNumber: '0945444555',
    major: 'Khoa học Máy tính',
    gpa: 3.65,
    address: '12 Tạ Quang Bửu, Khu phố 6, Linh Trung, TP. Thủ Đức',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    status: 'studying',
    enrollmentYear: 2021,
    createdAt: '2023-09-18T13:20:00Z'
  },
  {
    id: 'stu_005',
    studentCode: '19110005',
    fullName: 'Lê Hoàng Yến Vy',
    dateOfBirth: '2001-08-30',
    email: 'vy.lhy@student.edu.vn',
    phoneNumber: '0932555666',
    major: 'Kỹ thuật Phần mềm',
    gpa: 3.75,
    address: '88 Bạch Đằng, Phường 24, Quận Bình Thạnh',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    status: 'graduated',
    enrollmentYear: 2019,
    createdAt: '2023-09-20T16:00:00Z'
  },
  {
    id: 'stu_006',
    studentCode: '22110006',
    fullName: 'Vũ Quốc Bảo',
    dateOfBirth: '2004-01-19',
    email: 'bao.vq@student.edu.vn',
    phoneNumber: '0918666777',
    major: 'An toàn Thông tin',
    gpa: 2.85,
    address: '256 Điện Biên Phủ, Phường 17, Bình Thạnh',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
    status: 'suspended',
    enrollmentYear: 2022,
    createdAt: '2023-09-22T08:30:00Z'
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert_001',
    studentId: 'stu_001',
    certName: 'IELTS Academic (Band 7.5)',
    issuer: 'British Council & IDP Education',
    issueDate: '2023-06-15',
    expiryDate: '2025-06-15',
    certCode: 'BC-2023-VN-78912',
    score: '7.5 / 9.0'
  },
  {
    id: 'cert_002',
    studentId: 'stu_001',
    certName: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2023-11-20',
    expiryDate: '2026-11-20',
    certCode: 'AWS-CCP-847291',
    score: '840 / 1000'
  },
  {
    id: 'cert_003',
    studentId: 'stu_002',
    certName: 'Google Associate Android Developer',
    issuer: 'Google Developers Certification',
    issueDate: '2023-08-10',
    expiryDate: '2026-08-10',
    certCode: 'G-AAD-2023-994',
    score: 'Passed (Score: 92%)'
  },
  {
    id: 'cert_004',
    studentId: 'stu_002',
    certName: 'TOEIC Listening & Reading',
    issuer: 'ETS Global / IIG Vietnam',
    issueDate: '2023-04-12',
    expiryDate: '2025-04-12',
    certCode: 'ETS-TOEIC-915002',
    score: '915 / 990'
  },
  {
    id: 'cert_005',
    studentId: 'stu_003',
    certName: 'Microsoft Certified: Azure Data Fundamentals',
    issuer: 'Microsoft Corporation',
    issueDate: '2022-12-05',
    expiryDate: '2025-12-05',
    certCode: 'MS-DP900-3341',
    score: '880 / 1000'
  },
  {
    id: 'cert_006',
    studentId: 'stu_004',
    certName: 'JLPT N3 (Japanese Language Proficiency)',
    issuer: 'Japan Foundation',
    issueDate: '2023-07-28',
    expiryDate: '2030-01-01',
    certCode: 'JLPT-N3-882194',
    score: '135 / 180'
  },
  {
    id: 'cert_007',
    studentId: 'stu_005',
    certName: 'Oracle Certified Professional: Java SE 17 Developer',
    issuer: 'Oracle University',
    issueDate: '2023-01-18',
    expiryDate: '2027-01-18',
    certCode: 'OCP-1Z0-829-91',
    score: '89%'
  }
];

export const INITIAL_LOGIN_HISTORY: LoginHistory[] = [
  {
    id: 'log_001',
    userId: 'usr_admin_001',
    userName: 'Quản Trị Viên (Admin)',
    userEmail: 'admin@studentapp.com',
    userRole: 'admin',
    timestamp: '2023-11-10T08:14:22Z',
    ipAddress: '118.69.182.45 (TP. Hồ Chí Minh)',
    deviceInfo: 'Google Pixel 8 Pro (Android 14) / Jetpack Compose',
    status: 'success'
  },
  {
    id: 'log_002',
    userId: 'usr_mgr_002',
    userName: 'Trần Văn Quản Lý (Manager)',
    userEmail: 'manager@studentapp.com',
    userRole: 'manager',
    timestamp: '2023-11-09T14:22:10Z',
    ipAddress: '14.161.23.90 (Hà Nội)',
    deviceInfo: 'Samsung Galaxy S23 (Android 14)',
    status: 'success'
  },
  {
    id: 'log_003',
    userId: 'usr_emp_003',
    userName: 'Nguyễn Thị Nhân Viên (Employee)',
    userEmail: 'employee@studentapp.com',
    userRole: 'employee',
    timestamp: '2023-11-09T09:05:41Z',
    ipAddress: '171.244.38.12 (Đà Nẵng)',
    deviceInfo: 'Xiaomi 13T (Android 13)',
    status: 'success'
  },
  {
    id: 'log_004',
    userId: 'usr_emp_004',
    userName: 'Lê Hoàng Khóa (Locked User)',
    userEmail: 'locked@studentapp.com',
    userRole: 'employee',
    timestamp: '2023-11-08T18:40:15Z',
    ipAddress: '113.161.80.33 (Cần Thơ)',
    deviceInfo: 'Oppo Reno10 (Android 13)',
    status: 'locked_attempt'
  }
];
