import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Code2,
  Database,
  Award,
  Layers,
  Sparkles,
  Download,
  Users,
  Maximize2,
  Minimize2,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { User, Student, Certificate, LoginHistory, UserRole } from './types';
import {
  INITIAL_USERS,
  INITIAL_STUDENTS,
  INITIAL_CERTIFICATES,
  INITIAL_LOGIN_HISTORY
} from './data/mockData';
import { AndroidEmulator } from './components/AndroidEmulator';
import { CodeHub } from './components/CodeHub';
import { FirestoreInspector } from './components/FirestoreInspector';
import { ReportGuideModal } from './components/ReportGuideModal';

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'emulator' | 'code' | 'firestore' | 'report'>('emulator');
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  // Application Data States (persistent via localStorage)
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('sm_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('sm_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem('sm_certificates');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>(() => {
    const saved = localStorage.getItem('sm_login_history');
    return saved ? JSON.parse(saved) : INITIAL_LOGIN_HISTORY;
  });

  // Current logged in user (default starts logged in as Admin for instant testability)
  const [currentUser, setCurrentUser] = useState<User | null>(() => users.find(u => u.role === 'admin') || users[0]);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('sm_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('sm_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('sm_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('sm_login_history', JSON.stringify(loginHistory));
  }, [loginHistory]);

  // Auth actions
  const handleLogin = (email: string, role?: UserRole) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      if (user.status === 'locked') {
        alert('Tài khoản này đã bị KHÓA!');
        return;
      }
      setCurrentUser(user);
      // Record login history
      const newLog: LoginHistory = {
        id: `log_${Date.now()}`,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userRole: user.role,
        timestamp: new Date().toISOString(),
        ipAddress: '118.69.182.45 (TP. Hồ Chí Minh)',
        deviceInfo: 'Google Pixel 8 (Android 14) / Jetpack Compose',
        status: 'success'
      };
      setLoginHistory(prev => [newLog, ...prev]);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Student CRUD actions
  const handleAddStudent = (newStudentData: Omit<Student, 'id' | 'createdAt'>) => {
    const newStudent: Student = {
      ...newStudentData,
      id: `stu_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setStudents(prev => [newStudent, ...prev]);
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    // Also delete associated certificates
    setCertificates(prev => prev.filter(c => c.studentId !== id));
  };

  // Certificate CRUD actions
  const handleAddCertificate = (newCertData: Omit<Certificate, 'id'>) => {
    const newCert: Certificate = {
      ...newCertData,
      id: `cert_${Date.now()}`
    };
    setCertificates(prev => [...prev, newCert]);
  };

  const handleUpdateCertificate = (updatedCert: Certificate) => {
    setCertificates(prev => prev.map(c => c.id === updatedCert.id ? updatedCert : c));
  };

  const handleDeleteCertificate = (id: string) => {
    setCertificates(prev => prev.filter(c => c.id !== id));
  };

  // User Management actions (Admin only)
  const handleAddUser = (newUserData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...newUserData,
      id: `usr_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
  };

  const handleToggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        return {
          ...u,
          status: u.status === 'normal' ? 'locked' : 'normal'
        };
      }
      return u;
    }));
  };

  const handleDeleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  // Profile picture update for all users
  const handleUpdateAvatar = (url: string) => {
    if (!currentUser) return;
    const updated = { ...currentUser, avatarUrl: url };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
  };

  // Data Export to CSV
  const handleExportStudentsCsv = () => {
    const header = 'MSSV,HoVaTen,NgaySinh,Email,SoDienThoai,NganhHoc,GPA,TrangThai,KhoaHoc\n';
    const rows = students.map(s =>
      `"${s.studentCode}","${s.fullName}","${s.dateOfBirth}","${s.email}","${s.phoneNumber}","${s.major}",${s.gpa},"${s.status}",${s.enrollmentYear}`
    ).join('\n');
    const csvContent = '\uFEFF' + header + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DanhSachSinhVien_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Data Import
  const handleImportStudents = (imported: Partial<Student>[]) => {
    const newItems: Student[] = imported.map((item, idx) => ({
      id: `stu_imported_${Date.now()}_${idx}`,
      studentCode: item.studentCode || `SV${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: item.fullName || 'Sinh Viên Import',
      dateOfBirth: item.dateOfBirth || '2003-01-01',
      email: item.email || 'import@student.edu.vn',
      phoneNumber: item.phoneNumber || '0900000000',
      major: item.major || 'Công nghệ Thông tin',
      gpa: item.gpa ?? 3.5,
      address: item.address || 'TP. Hồ Chí Minh',
      avatarUrl: item.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      status: item.status || 'studying',
      enrollmentYear: item.enrollmentYear || 2023,
      createdAt: new Date().toISOString()
    }));
    setStudents(prev => [...newItems, ...prev]);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans select-none overflow-hidden">
      {/* Universal Top Navigation Header */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 z-30">
        {/* Brand & Project Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                StudentHub
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Kotlin & Compose
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Đề tài Nghiên cứu Firebase Firestore & Quản lý Sinh viên (Android Studio)
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800/80">
          <button
            onClick={() => setActiveTab('emulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'emulator'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Giả Lập App</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Mã Nguồn Kotlin</span>
          </button>

          <button
            onClick={() => setActiveTab('firestore')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'firestore'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Firestore Live</span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'report'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">Báo Cáo & Demo (10/10)</span>
            <span className="sm:hidden">Báo Cáo</span>
          </button>
        </div>

        {/* User Role Switcher Pill & Tools */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 rounded-xl px-2.5 py-1 text-xs">
              <img src={currentUser.avatarUrl} alt="User" className="w-5 h-5 rounded-full object-cover" />
              <div className="hidden md:block text-left">
                <span className="text-[11px] font-bold text-slate-200 block leading-tight">{currentUser.name}</span>
                <span className="text-[9px] uppercase font-bold text-indigo-400 block tracking-wider leading-tight">
                  Vai trò: {currentUser.role}
                </span>
              </div>

              {/* Quick switch roles dropdown / buttons */}
              <div className="flex items-center gap-1 ml-1 pl-1 border-l border-slate-700">
                <button
                  onClick={() => {
                    const admin = users.find(u => u.role === 'admin');
                    if (admin) setCurrentUser(admin);
                  }}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                    currentUser.role === 'admin' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Chuyển sang quyền Admin"
                >
                  Admin
                </button>
                <button
                  onClick={() => {
                    const mgr = users.find(u => u.role === 'manager');
                    if (mgr) setCurrentUser(mgr);
                  }}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                    currentUser.role === 'manager' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Chuyển sang quyền Manager"
                >
                  Mgr
                </button>
                <button
                  onClick={() => {
                    const emp = users.find(u => u.role === 'employee');
                    if (emp) setCurrentUser(emp);
                  }}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                    currentUser.role === 'employee' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Chuyển sang quyền Employee"
                >
                  Emp
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                const admin = users.find(u => u.role === 'admin') || users[0];
                setCurrentUser(admin);
              }}
              className="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
            >
              Đăng nhập Admin
            </button>
          )}

          {activeTab === 'emulator' && (
            <button
              onClick={() => setIsPhoneFrame(!isPhoneFrame)}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition cursor-pointer hidden md:flex items-center"
              title={isPhoneFrame ? 'Mở rộng toàn màn hình' : 'Thu về khung điện thoại'}
            >
              {isPhoneFrame ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 overflow-hidden relative">
        {/* TAB 1: EMULATOR */}
        {activeTab === 'emulator' && (
          <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-auto">
            {isPhoneFrame ? (
              // Realistic Google Pixel 8 Android Frame
              <div className="relative w-full max-w-[400px] h-[92vh] max-h-[820px] bg-slate-900 rounded-[44px] p-3 shadow-2xl shadow-indigo-950/40 border-[5px] border-slate-700/80 flex flex-col shrink-0">
                {/* Speaker Grill & Front Camera Punch Hole */}
                <div className="absolute top-4 inset-x-0 flex justify-center items-center pointer-events-none z-30">
                  <div className="w-12 h-1 bg-slate-700/80 rounded-full mb-1" />
                  <div className="w-3.5 h-3.5 bg-black border border-slate-800 rounded-full ml-2" />
                </div>

                {/* Inner Screen Surface */}
                <div className="w-full h-full bg-slate-900 rounded-[34px] overflow-hidden flex flex-col relative pt-4">
                  <AndroidEmulator
                    currentUser={currentUser}
                    onLogin={handleLogin}
                    onLogout={handleLogout}
                    users={users}
                    students={students}
                    certificates={certificates}
                    loginHistory={loginHistory}
                    onAddStudent={handleAddStudent}
                    onUpdateStudent={handleUpdateStudent}
                    onDeleteStudent={handleDeleteStudent}
                    onAddCertificate={handleAddCertificate}
                    onUpdateCertificate={handleUpdateCertificate}
                    onDeleteCertificate={handleDeleteCertificate}
                    onAddUser={handleAddUser}
                    onToggleUserStatus={handleToggleUserStatus}
                    onDeleteUser={handleDeleteUser}
                    onUpdateAvatar={handleUpdateAvatar}
                    onExportStudentsCsv={handleExportStudentsCsv}
                    onImportStudents={handleImportStudents}
                  />

                  {/* Android Bottom Home Bar Indicator */}
                  <div className="absolute bottom-1 inset-x-0 flex justify-center pointer-events-none z-30">
                    <div className="w-28 h-1 bg-slate-500/50 rounded-full" />
                  </div>
                </div>
              </div>
            ) : (
              // Full-screen responsive view
              <div className="w-full h-full max-w-4xl bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
                <AndroidEmulator
                  currentUser={currentUser}
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                  users={users}
                  students={students}
                  certificates={certificates}
                  loginHistory={loginHistory}
                  onAddStudent={handleAddStudent}
                  onUpdateStudent={handleUpdateStudent}
                  onDeleteStudent={handleDeleteStudent}
                  onAddCertificate={handleAddCertificate}
                  onUpdateCertificate={handleUpdateCertificate}
                  onDeleteCertificate={handleDeleteCertificate}
                  onAddUser={handleAddUser}
                  onToggleUserStatus={handleToggleUserStatus}
                  onDeleteUser={handleDeleteUser}
                  onUpdateAvatar={handleUpdateAvatar}
                  onExportStudentsCsv={handleExportStudentsCsv}
                  onImportStudents={handleImportStudents}
                />
              </div>
            )}
          </div>
        )}

        {/* TAB 2: KOTLIN & JETPACK COMPOSE SOURCE CODE */}
        {activeTab === 'code' && (
          <CodeHub />
        )}

        {/* TAB 3: FIRESTORE LIVE INSPECTOR */}
        {activeTab === 'firestore' && (
          <FirestoreInspector
            users={users}
            students={students}
            certificates={certificates}
            loginHistory={loginHistory}
          />
        )}

        {/* TAB 4: RUBRIC & PRESENTATION GUIDE */}
        {activeTab === 'report' && (
          <ReportGuideModal />
        )}
      </main>
    </div>
  );
}
