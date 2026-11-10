export type UserRole = 'admin' | 'manager' | 'employee';
export type UserStatus = 'normal' | 'locked';

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  phoneNumber: string;
  role: UserRole;
  status: UserStatus;
  avatarUrl: string;
  createdAt: string;
  password?: string;
}

export interface Student {
  id: string;
  studentCode: string; // MSSV (e.g. SV2023001)
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  email: string;
  phoneNumber: string;
  major: string; // e.g. Khoa học Máy tính, Kỹ thuật Phần mềm, HTTT
  gpa: number; // 0.0 - 4.0
  address: string;
  avatarUrl: string;
  status: 'studying' | 'graduated' | 'suspended';
  enrollmentYear: number;
  createdAt: string;
}

export interface Certificate {
  id: string;
  studentId: string;
  certName: string; // e.g. IELTS 7.5, AWS Certified Cloud Practitioner
  issuer: string; // e.g. IDP, Amazon Web Services, Google
  issueDate: string; // YYYY-MM-DD
  expiryDate?: string; // YYYY-MM-DD
  certCode: string; // Serial / License #
  score?: string; // e.g. 7.5/9.0, Pass, 920/1000
}

export interface LoginHistory {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: UserRole;
  timestamp: string;
  ipAddress: string;
  deviceInfo: string;
  status: 'success' | 'failed' | 'locked_attempt';
}

export interface AndroidFile {
  name: string;
  path: string;
  category: 'config' | 'model' | 'repository' | 'viewmodel' | 'ui_screen' | 'ui_component' | 'navigation' | 'docs';
  description: string;
  content: string;
  language: 'kotlin' | 'groovy' | 'xml' | 'json' | 'markdown';
}
