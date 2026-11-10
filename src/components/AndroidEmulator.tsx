import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Award,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Upload,
  UserCheck,
  UserX,
  Trash2,
  Edit,
  History,
  Lock,
  Unlock,
  Camera,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  X,
  LogOut,
  ExternalLink,
  Calendar,
  Mail,
  Phone,
  BookOpen
} from 'lucide-react';
import { User, Student, Certificate, LoginHistory, UserRole } from '../types';

interface AndroidEmulatorProps {
  currentUser: User | null;
  onLogin: (email: string, role?: UserRole) => void;
  onLogout: () => void;
  users: User[];
  students: Student[];
  certificates: Certificate[];
  loginHistory: LoginHistory[];
  onAddStudent: (student: Omit<Student, 'id' | 'createdAt'>) => void;
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
  onAddCertificate: (cert: Omit<Certificate, 'id'>) => void;
  onUpdateCertificate: (cert: Certificate) => void;
  onDeleteCertificate: (id: string) => void;
  onAddUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  onToggleUserStatus: (id: string) => void;
  onDeleteUser: (id: string) => void;
  onUpdateAvatar: (url: string) => void;
  onExportStudentsCsv: () => void;
  onImportStudents: (data: Partial<Student>[]) => void;
}

export const AndroidEmulator: React.FC<AndroidEmulatorProps> = ({
  currentUser,
  onLogin,
  onLogout,
  users,
  students,
  certificates,
  loginHistory,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  onAddCertificate,
  onUpdateCertificate,
  onDeleteCertificate,
  onAddUser,
  onToggleUserStatus,
  onDeleteUser,
  onUpdateAvatar,
  onExportStudentsCsv,
  onImportStudents
}) => {
  // Navigation State inside the emulator
  const [currentScreen, setCurrentScreen] = useState<'students' | 'detail' | 'users' | 'history' | 'profile' | 'import_export'>('students');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMajor, setFilterMajor] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOption, setSortOption] = useState<'name_asc' | 'name_desc' | 'gpa_desc' | 'code_asc'>('name_asc');
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Modals for CRUD
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showAddCertModal, setShowAddCertModal] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@studentapp.com');
  const [loginPass, setLoginPass] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // RBAC checks as defined in PDF
  const isAdmin = currentUser?.role === 'admin';
  const isManager = currentUser?.role === 'manager';
  const isEmployee = currentUser?.role === 'employee';
  const canEditStudents = isAdmin || isManager; // Manager & Admin can edit student info
  const canManageUsers = isAdmin; // Only Admin can manage users

  // Selected student
  const activeStudent = students.find(s => s.id === selectedStudentId);
  const activeCertificates = certificates.filter(c => c.studentId === selectedStudentId);

  // Filtered and Sorted students
  const filteredStudents = students.filter(s => {
    const matchesQuery = !searchQuery.trim() ||
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMajor = filterMajor === 'All' || s.major === filterMajor;
    const matchesStatus = filterStatus === 'All' || s.status === filterStatus;
    return matchesQuery && matchesMajor && matchesStatus;
  }).sort((a, b) => {
    if (sortOption === 'name_asc') return a.fullName.localeCompare(b.fullName);
    if (sortOption === 'name_desc') return b.fullName.localeCompare(a.fullName);
    if (sortOption === 'gpa_desc') return b.gpa - a.gpa;
    if (sortOption === 'code_asc') return a.studentCode.localeCompare(b.studentCode);
    return 0;
  });

  const majors = ['All', 'Công nghệ Thông tin', 'Kỹ thuật Phần mềm', 'Khoa học Máy tính', 'Hệ thống Thông tin', 'An toàn Thông tin'];

  // Handle Login
  const handleDoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (loginEmail === 'locked@studentapp.com') {
      setLoginError('Tài khoản này đang bị KHÓA bởi Quản trị viên!');
      return;
    }
    const found = users.find(u => u.email.toLowerCase() === loginEmail.toLowerCase());
    if (found) {
      if (found.status === 'locked') {
        setLoginError('Tài khoản này đã bị KHÓA. Không thể đăng nhập.');
        return;
      }
      onLogin(found.email, found.role);
    } else {
      setLoginError('Email hoặc mật khẩu không chính xác.');
    }
  };

  // If not logged in, render Android Login Screen
  if (!currentUser) {
    return (
      <div className="flex flex-col h-full bg-slate-900 text-slate-100 justify-between p-6">
        <div className="text-center pt-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4">
            <GraduationCap className="w-9 h-9 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Student Management</h2>
          <p className="text-xs text-indigo-300 mt-1">Firebase Firestore & Jetpack Compose</p>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-400" /> Đăng nhập hệ thống
          </h3>

          <form onSubmit={handleDoLogin} className="space-y-3.5">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Địa chỉ Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="name@studentapp.com"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Mật khẩu</label>
              <input
                type="password"
                value={loginPass}
                onChange={e => setLoginPass(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {loginError && (
              <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl text-sm transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
            >
              Đăng nhập (Log In)
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-slate-700/60">
            <p className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider text-center">
              Chọn nhanh vai trò (RBAC Demo)
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('admin@studentapp.com');
                  setLoginPass('admin123');
                  onLogin('admin@studentapp.com', 'admin');
                }}
                className="p-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-center text-xs text-indigo-300 font-medium transition cursor-pointer"
              >
                👑 Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('manager@studentapp.com');
                  setLoginPass('manager123');
                  onLogin('manager@studentapp.com', 'manager');
                }}
                className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-center text-xs text-emerald-300 font-medium transition cursor-pointer"
              >
                👔 Manager
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('employee@studentapp.com');
                  setLoginPass('employee123');
                  onLogin('employee@studentapp.com', 'employee');
                }}
                className="p-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-center text-xs text-amber-300 font-medium transition cursor-pointer"
              >
                👤 Employee
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-500 pb-2">
          Theo đề tài: Admin tích hợp sẵn • Nhân viên chỉ xem & đổi ảnh
        </div>
      </div>
    );
  }

  // Logged in UI - Jetpack Compose Shell
  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 overflow-hidden relative">
      {/* Top App Bar (Jetpack Compose TopAppBar) */}
      <header className="bg-slate-800/95 border-b border-slate-700/80 px-4 py-3 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-2.5">
          {currentScreen !== 'students' && (
            <button
              onClick={() => setCurrentScreen('students')}
              className="p-1.5 -ml-1 text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-lg transition cursor-pointer"
              title="Quay lại danh sách"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              {currentScreen === 'students' && 'Danh Sách Sinh Viên'}
              {currentScreen === 'detail' && 'Chi Tiết Sinh Viên'}
              {currentScreen === 'users' && 'Quản Lý Người Dùng'}
              {currentScreen === 'history' && 'Lịch Sử Đăng Nhập'}
              {currentScreen === 'import_export' && 'Xuất / Nhập Dữ Liệu'}
              {currentScreen === 'profile' && 'Hồ Sơ Của Tôi'}
            </h1>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="truncate max-w-[120px]">{currentUser.name}</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold uppercase tracking-wider ${
                isAdmin ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                isManager ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {currentUser.role}
              </span>
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          {currentScreen === 'students' && (
            <button
              onClick={() => setShowFilterModal(true)}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-lg transition cursor-pointer"
              title="Bộ lọc & Sắp xếp"
            >
              <Filter className="w-4 h-4" />
            </button>
          )}

          {isAdmin && (
            <button
              onClick={() => setCurrentScreen(currentScreen === 'users' ? 'students' : 'users')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${currentScreen === 'users' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-700/60'}`}
              title="Quản lý Người dùng (Admin)"
            >
              <Users className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setCurrentScreen(currentScreen === 'import_export' ? 'students' : 'import_export')}
            className={`p-1.5 rounded-lg transition cursor-pointer ${currentScreen === 'import_export' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-700/60'}`}
            title="Import/Export CSV"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentScreen('profile')}
            className="p-1 rounded-full border border-indigo-500/40 hover:ring-2 hover:ring-indigo-400 transition cursor-pointer overflow-hidden ml-1"
            title="Hồ sơ cá nhân"
          >
            <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-6 h-6 rounded-full object-cover" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-3.5 space-y-3 pb-20">
        {/* SCREEN 1: STUDENTS LIST */}
        {currentScreen === 'students' && (
          <>
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm MSSV, họ tên, email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick status counters */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>Hiển thị: <strong className="text-slate-200">{filteredStudents.length}</strong> sinh viên</span>
              <span className="flex items-center gap-1 text-indigo-400">
                <ArrowUpDown className="w-3 h-3" />
                {sortOption === 'name_asc' ? 'Tên (A-Z)' : sortOption === 'gpa_desc' ? 'GPA cao nhất' : 'Mã SV'}
              </span>
            </div>

            {/* Employee Notice */}
            {isEmployee && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 text-[11px] text-amber-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Vai trò <strong>Employee</strong>: Bạn chỉ có quyền XEM thông tin sinh viên và cập nhật ảnh đại diện của mình.</span>
              </div>
            )}

            {/* Student Cards List */}
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <GraduationCap className="w-12 h-12 mx-auto mb-2 text-slate-600" />
                <p className="text-sm font-medium">Không tìm thấy sinh viên nào</p>
                <p className="text-xs text-slate-500 mt-1">Thử thay đổi từ khóa hoặc bộ lọc tìm kiếm</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredStudents.map(student => {
                  const studentCerts = certificates.filter(c => c.studentId === student.id);
                  return (
                    <div
                      key={student.id}
                      onClick={() => {
                        setSelectedStudentId(student.id);
                        setCurrentScreen('detail');
                      }}
                      className="bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 rounded-2xl p-3 flex items-center gap-3 transition-all cursor-pointer shadow-sm group"
                    >
                      <img
                        src={student.avatarUrl}
                        alt={student.fullName}
                        className="w-13 h-13 rounded-full object-cover border border-slate-600 group-hover:border-indigo-400 transition shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-bold text-white truncate group-hover:text-indigo-300 transition">
                            {student.fullName}
                          </h3>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            student.gpa >= 3.6 ? 'bg-emerald-500/20 text-emerald-300' :
                            student.gpa >= 3.2 ? 'bg-indigo-500/20 text-indigo-300' :
                            'bg-amber-500/20 text-amber-300'
                          }`}>
                            GPA {student.gpa.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">
                          MSSV: <span className="font-mono text-slate-300">{student.studentCode}</span> • {student.major}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                          <span className="flex items-center gap-1 text-slate-400">
                            <Award className="w-3 h-3 text-amber-400" /> {studentCerts.length} chứng chỉ
                          </span>
                          <span>•</span>
                          <span className={`${
                            student.status === 'studying' ? 'text-emerald-400' :
                            student.status === 'graduated' ? 'text-blue-400' : 'text-rose-400'
                          }`}>
                            {student.status === 'studying' ? 'Đang học' : student.status === 'graduated' ? 'Đã tốt nghiệp' : 'Bảo lưu'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* SCREEN 2: STUDENT DETAILS & CERTIFICATE MANAGEMENT */}
        {currentScreen === 'detail' && activeStudent && (
          <div className="space-y-3.5">
            {/* Student Hero Card */}
            <div className="bg-gradient-to-b from-indigo-950/60 to-slate-800 border border-indigo-500/30 rounded-2xl p-4 text-center relative shadow-lg">
              {canEditStudents && (
                <div className="absolute right-3 top-3 flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingStudent(activeStudent);
                      setShowAddStudentModal(true);
                    }}
                    className="p-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition cursor-pointer"
                    title="Chỉnh sửa sinh viên"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Bạn có chắc chắn muốn xóa sinh viên ${activeStudent.fullName} và toàn bộ chứng chỉ liên quan?`)) {
                        onDeleteStudent(activeStudent.id);
                        setCurrentScreen('students');
                      }
                    }}
                    className="p-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg text-xs transition cursor-pointer"
                    title="Xóa sinh viên"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <img
                src={activeStudent.avatarUrl}
                alt={activeStudent.fullName}
                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-indigo-500 shadow-md mb-2"
              />
              <h2 className="text-base font-bold text-white">{activeStudent.fullName}</h2>
              <p className="text-xs text-indigo-300 font-mono">MSSV: {activeStudent.studentCode}</p>

              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-slate-900/60 rounded-full text-xs border border-slate-700">
                <span className="text-slate-400">Điểm GPA:</span>
                <span className="font-bold text-emerald-400">{activeStudent.gpa.toFixed(2)} / 4.0</span>
                <span className="text-slate-500">•</span>
                <span className="text-indigo-300">{activeStudent.major}</span>
              </div>
            </div>

            {/* Info Tabs / Sections */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-3.5 space-y-2 text-xs">
              <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Thông tin đào tạo & Liên hệ
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div className="bg-slate-900/50 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Ngày sinh:</span>
                  <span className="font-medium">{activeStudent.dateOfBirth}</span>
                </div>
                <div className="bg-slate-900/50 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Khóa nhập học:</span>
                  <span className="font-medium">{activeStudent.enrollmentYear}</span>
                </div>
                <div className="bg-slate-900/50 p-2 rounded-xl col-span-2">
                  <span className="text-[10px] text-slate-400 block">Email sinh viên:</span>
                  <span className="font-medium text-indigo-300 truncate block">{activeStudent.email}</span>
                </div>
                <div className="bg-slate-900/50 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Số điện thoại:</span>
                  <span className="font-medium">{activeStudent.phoneNumber}</span>
                </div>
                <div className="bg-slate-900/50 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Trạng thái:</span>
                  <span className="font-medium text-emerald-400">
                    {activeStudent.status === 'studying' ? 'Đang học' : activeStudent.status === 'graduated' ? 'Tốt nghiệp' : 'Bảo lưu'}
                  </span>
                </div>
                <div className="bg-slate-900/50 p-2 rounded-xl col-span-2">
                  <span className="text-[10px] text-slate-400 block">Địa chỉ:</span>
                  <span className="font-medium">{activeStudent.address}</span>
                </div>
              </div>
            </div>

            {/* Certificate Management Section (Key Assignment Requirement) */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    Chứng Chỉ Của Sinh Viên ({activeCertificates.length})
                  </h4>
                  <p className="text-[10px] text-slate-400">Theo dõi chứng chỉ quốc tế và chuyên môn</p>
                </div>
                {canEditStudents && (
                  <button
                    onClick={() => {
                      setEditingCert(null);
                      setShowAddCertModal(true);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-[11px] rounded-lg transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Thêm CC
                  </button>
                )}
              </div>

              {activeCertificates.length === 0 ? (
                <div className="text-center py-6 text-slate-500 border border-dashed border-slate-700/80 rounded-xl">
                  <Award className="w-8 h-8 mx-auto mb-1 text-slate-600" />
                  <p className="text-xs">Sinh viên chưa có chứng chỉ nào</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {activeCertificates.map(cert => (
                    <div
                      key={cert.id}
                      className="bg-slate-900/70 border border-slate-700 rounded-xl p-2.5 text-xs flex justify-between items-start gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                          {cert.certName}
                          {cert.score && (
                            <span className="bg-amber-400/20 text-amber-300 text-[10px] px-1.5 py-0.2 rounded font-medium">
                              {cert.score}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-300">Đơn vị cấp: {cert.issuer}</p>
                        <p className="text-[10px] text-slate-400">
                          Mã: <span className="font-mono">{cert.certCode}</span> • Ngày cấp: {cert.issueDate}
                          {cert.expiryDate ? ` • Hạn: ${cert.expiryDate}` : ''}
                        </p>
                      </div>

                      {canEditStudents && (
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => {
                              setEditingCert(cert);
                              setShowAddCertModal(true);
                            }}
                            className="p-1 hover:text-indigo-300 text-slate-400 transition cursor-pointer"
                            title="Sửa chứng chỉ"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Xóa chứng chỉ ${cert.certName}?`)) {
                                onDeleteCertificate(cert.id);
                              }
                            }}
                            className="p-1 hover:text-rose-400 text-slate-400 transition cursor-pointer"
                            title="Xóa chứng chỉ"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SCREEN 3: USER ACCOUNT MANAGEMENT (ADMIN ONLY) */}
        {currentScreen === 'users' && isAdmin && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Tài Khoản Hệ Thống</h3>
                <p className="text-[11px] text-slate-400">Tổng cộng {users.length} tài khoản</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentScreen('history')}
                  className="px-2.5 py-1 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 text-xs rounded-xl flex items-center gap-1 transition cursor-pointer"
                >
                  <History className="w-3.5 h-3.5 text-indigo-400" /> Lịch sử
                </button>
                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl flex items-center gap-1 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Thêm User
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {users.map(u => (
                <div
                  key={u.id}
                  className={`bg-slate-800/80 border rounded-2xl p-3 flex items-center justify-between gap-3 ${
                    u.status === 'locked' ? 'border-rose-500/40 bg-rose-950/10' : 'border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={u.avatarUrl} alt={u.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white truncate">{u.name}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          u.role === 'admin' ? 'bg-indigo-500/20 text-indigo-300' :
                          u.role === 'manager' ? 'bg-emerald-500/20 text-emerald-300' :
                          'bg-amber-500/20 text-amber-300'
                        }`}>
                          {u.role}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate">{u.email} • {u.phoneNumber}</p>
                      <p className="text-[10px] text-slate-500">Tuổi: {u.age} tuổi</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => onToggleUserStatus(u.id)}
                      className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                        u.status === 'locked'
                          ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                          : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                      }`}
                      title={u.status === 'locked' ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                    >
                      {u.status === 'locked' ? <Lock className="w-3.5 h-3.5 text-rose-400" /> : <Unlock className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                    {u.role !== 'admin' && (
                      <button
                        onClick={() => {
                          if (confirm(`Xác nhận xóa tài khoản ${u.name}?`)) {
                            onDeleteUser(u.id);
                          }
                        }}
                        className="p-1.5 bg-slate-700/40 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg text-xs transition cursor-pointer"
                        title="Xóa người dùng"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 4: LOGIN HISTORY (AUDIT LOGS) */}
        {currentScreen === 'history' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <History className="w-4 h-4 text-indigo-400" /> Lịch Sử Đăng Nhập Hệ Thống
              </h3>
            </div>
            <p className="text-[11px] text-slate-400">Theo dõi các lượt truy cập tài khoản thời gian thực trên Firestore.</p>

            <div className="space-y-2">
              {loginHistory.map(log => (
                <div key={log.id} className="bg-slate-800/80 border border-slate-700 rounded-xl p-2.5 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{log.userName}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                      log.status === 'success' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {log.status === 'success' ? 'Thành công' : 'Bị khóa/Thất bại'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{log.userEmail} ({log.userRole})</p>
                  <p className="text-[10px] text-slate-500 flex items-center justify-between">
                    <span>{new Date(log.timestamp).toLocaleString('vi-VN')}</span>
                    <span className="font-mono text-slate-400">{log.ipAddress}</span>
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">Thiết bị: {log.deviceInfo}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 5: DATA IMPORT / EXPORT (CSV / EXCEL) */}
        {currentScreen === 'import_export' && (
          <div className="space-y-3.5">
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400">
                <Download className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">Xuất Dữ Liệu Ra File CSV/Excel</h3>
              </div>
              <p className="text-xs text-slate-300">
                Xuất toàn bộ danh sách {students.length} sinh viên sang định dạng file chuẩn UTF-8 tương thích Microsoft Excel và Google Sheets.
              </p>
              <button
                onClick={onExportStudentsCsv}
                className="w-full mt-2 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Download className="w-4 h-4" /> Tải về File Students_Data.csv
              </button>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <Upload className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">Nhập Sinh Viên Từ File</h3>
              </div>
              <p className="text-xs text-slate-300">
                Thêm hàng loạt sinh viên từ file CSV hoặc JSON mẫu vào cơ sở dữ liệu Firestore.
              </p>

              <label className="block w-full border border-dashed border-slate-600 hover:border-emerald-500 rounded-xl p-4 text-center cursor-pointer transition">
                <Upload className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                <span className="text-xs text-emerald-300 font-medium block">Chọn file CSV / JSON</span>
                <span className="text-[10px] text-slate-500">Hỗ trợ định dạng CSV chuẩn</span>
                <input
                  type="file"
                  accept=".csv,.json"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = event => {
                        const content = event.target?.result as string;
                        if (content) {
                          // Quick simple CSV parse
                          const lines = content.split('\n').filter(l => l.trim().length > 0);
                          if (lines.length > 1) {
                            const newParsed: Partial<Student>[] = [];
                            for (let i = 1; i < lines.length; i++) {
                              const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
                              if (cols.length >= 3) {
                                newParsed.push({
                                  studentCode: cols[0] || `SV${Date.now().toString().slice(-4)}`,
                                  fullName: cols[1] || 'Sinh Viên Mới',
                                  dateOfBirth: cols[2] || '2003-01-01',
                                  email: cols[3] || 'student@edu.vn',
                                  phoneNumber: cols[4] || '0900000000',
                                  major: cols[5] || 'Công nghệ Thông tin',
                                  gpa: parseFloat(cols[6]) || 3.5,
                                  address: 'TP. Hồ Chí Minh',
                                  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
                                  status: 'studying',
                                  enrollmentYear: 2023
                                });
                              }
                            }
                            if (newParsed.length > 0) {
                              onImportStudents(newParsed);
                              alert(`Đã nhập thành công ${newParsed.length} sinh viên vào hệ thống!`);
                              setCurrentScreen('students');
                            }
                          }
                        }
                      };
                      reader.readAsText(file);
                    }
                  }}
                />
              </label>
            </div>
          </div>
        )}

        {/* SCREEN 6: USER PROFILE (FOR ALL ROLES, INCLUDING EMPLOYEE AVATAR CHANGE) */}
        {currentScreen === 'profile' && (
          <div className="space-y-4">
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 text-center space-y-3">
              <div className="relative inline-block">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-indigo-500 shadow-lg"
                />
                <button
                  onClick={() => setShowAvatarModal(true)}
                  className="absolute bottom-0 right-0 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-md transition cursor-pointer"
                  title="Đổi ảnh đại diện"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{currentUser.name}</h3>
                <p className="text-xs text-indigo-300">{currentUser.email}</p>
                <div className="mt-2 inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {currentUser.role}
                </div>
              </div>

              <button
                onClick={() => setShowAvatarModal(true)}
                className="w-full py-2 bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-indigo-400" /> Cập Nhật Ảnh Đại Diện Mới
              </button>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 space-y-2 text-xs">
              <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-2">Chi Tiết Tài Khoản</h4>
              <div className="space-y-1.5 text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-700/60">
                  <span className="text-slate-400">Độ tuổi:</span>
                  <span>{currentUser.age} tuổi</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/60">
                  <span className="text-slate-400">Số điện thoại:</span>
                  <span>{currentUser.phoneNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/60">
                  <span className="text-slate-400">Trạng thái:</span>
                  <span className="text-emerald-400 font-medium">Bình thường (Active)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Ngày tham gia:</span>
                  <span>{new Date(currentUser.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Đăng Xuất Khỏi Thiết Bị
            </button>
          </div>
        )}
      </main>

      {/* Floating Action Button (FAB) for adding new student */}
      {currentScreen === 'students' && canEditStudents && (
        <button
          onClick={() => {
            setEditingStudent(null);
            setShowAddStudentModal(true);
          }}
          className="absolute right-4 bottom-18 w-12 h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-600/40 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer z-10"
          title="Thêm sinh viên mới"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {/* Bottom Navigation Bar (Jetpack Compose NavigationBar) */}
      <nav className="absolute bottom-0 inset-x-0 bg-slate-800/95 border-t border-slate-700/80 px-2 py-1.5 flex items-center justify-around z-20">
        <button
          onClick={() => setCurrentScreen('students')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-medium transition cursor-pointer ${
            currentScreen === 'students' || currentScreen === 'detail' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <GraduationCap className="w-5 h-5 mb-0.5" />
          <span>Sinh Viên</span>
        </button>

        {isAdmin && (
          <button
            onClick={() => setCurrentScreen('users')}
            className={`flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-medium transition cursor-pointer ${
              currentScreen === 'users' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-5 h-5 mb-0.5" />
            <span>Người Dùng</span>
          </button>
        )}

        <button
          onClick={() => setCurrentScreen('import_export')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-medium transition cursor-pointer ${
            currentScreen === 'import_export' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Download className="w-5 h-5 mb-0.5" />
          <span>Xuất / Nhập</span>
        </button>

        <button
          onClick={() => setCurrentScreen('profile')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl text-[10px] font-medium transition cursor-pointer ${
            currentScreen === 'profile' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-500 mb-0.5">
            <img src={currentUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <span>Hồ Sơ</span>
        </button>
      </nav>

      {/* FILTER & SORT MODAL (Jetpack Compose ModalBottomSheet) */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-sm p-4 space-y-4 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2.5">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-indigo-400" /> Bộ Lọc & Sắp Xếp Đa Tiêu Chí
              </h3>
              <button onClick={() => setShowFilterModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Sắp xếp theo</label>
                <select
                  value={sortOption}
                  onChange={e => setSortOption(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="name_asc">Họ tên: A đến Z</option>
                  <option value="name_desc">Họ tên: Z đến A</option>
                  <option value="gpa_desc">Điểm GPA cao nhất</option>
                  <option value="code_asc">Mã số sinh viên (MSSV)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">Chuyên ngành đào tạo</label>
                <select
                  value={filterMajor}
                  onChange={e => setFilterMajor(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  {majors.map(m => (
                    <option key={m} value={m}>{m === 'All' ? 'Tất cả các ngành' : m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">Trạng thái học tập</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['All', 'studying', 'graduated'].map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFilterStatus(st)}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                        filterStatus === st ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {st === 'All' ? 'Tất cả' : st === 'studying' ? 'Đang học' : 'Tốt nghiệp'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowFilterModal(false)}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl transition cursor-pointer"
            >
              Áp Dụng
            </button>
          </div>
        </div>
      )}

      {/* ADD / EDIT STUDENT MODAL */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-sm p-4 space-y-3 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <h3 className="text-sm font-bold text-white">
                {editingStudent ? 'Cập Nhật Sinh Viên' : 'Thêm Sinh Viên Mới'}
              </h3>
              <button onClick={() => setShowAddStudentModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <StudentForm
              initialStudent={editingStudent}
              onSubmit={data => {
                if (editingStudent) {
                  onUpdateStudent({ ...editingStudent, ...data });
                } else {
                  onAddStudent(data);
                }
                setShowAddStudentModal(false);
              }}
              onCancel={() => setShowAddStudentModal(false)}
            />
          </div>
        </div>
      )}

      {/* ADD / EDIT CERTIFICATE MODAL */}
      {showAddCertModal && activeStudent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-sm p-4 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <h3 className="text-sm font-bold text-white">
                {editingCert ? 'Sửa Chứng Chỉ' : 'Thêm Chứng Chỉ Mới'}
              </h3>
              <button onClick={() => setShowAddCertModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <CertificateForm
              studentId={activeStudent.id}
              initialCert={editingCert}
              onSubmit={data => {
                if (editingCert) {
                  onUpdateCertificate({ ...editingCert, ...data });
                } else {
                  onAddCertificate(data);
                }
                setShowAddCertModal(false);
              }}
              onCancel={() => setShowAddCertModal(false)}
            />
          </div>
        </div>
      )}

      {/* ADD USER MODAL (ADMIN) */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-sm p-4 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <h3 className="text-sm font-bold text-white">Thêm Tài Khoản Hệ Thống Mới</h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <UserForm
              onSubmit={data => {
                onAddUser(data);
                setShowAddUserModal(false);
              }}
              onCancel={() => setShowAddUserModal(false)}
            />
          </div>
        </div>
      )}

      {/* AVATAR CHANGE MODAL */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-sm p-4 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-indigo-400" /> Cập Nhật Ảnh Đại Diện
              </h3>
              <button onClick={() => setShowAvatarModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Chọn ảnh có sẵn hoặc nhập đường dẫn URL ảnh mới (theo yêu cầu đề bài cho tất cả các user).
            </p>

            <div className="grid grid-cols-4 gap-2 py-2">
              {[
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200',
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
                'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200',
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200'
              ].map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onUpdateAvatar(url);
                    setShowAvatarModal(false);
                  }}
                  className="rounded-full overflow-hidden border-2 border-slate-700 hover:border-indigo-400 transition cursor-pointer hover:scale-105"
                >
                  <img src={url} alt="preset" className="w-12 h-12 object-cover" />
                </button>
              ))}
            </div>

            <AvatarUrlInput
              onSubmit={url => {
                onUpdateAvatar(url);
                setShowAvatarModal(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-components for forms
const StudentForm: React.FC<{
  initialStudent?: Student | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ initialStudent, onSubmit, onCancel }) => {
  const [studentCode, setStudentCode] = useState(initialStudent?.studentCode || `SV${Math.floor(1000 + Math.random() * 9000)}`);
  const [fullName, setFullName] = useState(initialStudent?.fullName || '');
  const [dateOfBirth, setDateOfBirth] = useState(initialStudent?.dateOfBirth || '2003-05-15');
  const [email, setEmail] = useState(initialStudent?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(initialStudent?.phoneNumber || '0901234567');
  const [major, setMajor] = useState(initialStudent?.major || 'Công nghệ Thông tin');
  const [gpa, setGpa] = useState(initialStudent?.gpa?.toString() || '3.50');
  const [address, setAddress] = useState(initialStudent?.address || 'TP. Hồ Chí Minh');
  const [status, setStatus] = useState<Student['status']>(initialStudent?.status || 'studying');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      studentCode,
      fullName,
      dateOfBirth,
      email: email || `${studentCode.toLowerCase()}@student.edu.vn`,
      phoneNumber,
      major,
      gpa: parseFloat(gpa) || 3.0,
      address,
      avatarUrl: initialStudent?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      status,
      enrollmentYear: 2023
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
      <div>
        <label className="text-slate-400 block mb-0.5">Mã số sinh viên (MSSV) *</label>
        <input
          type="text"
          value={studentCode}
          onChange={e => setStudentCode(e.target.value)}
          required
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500 font-mono"
        />
      </div>

      <div>
        <label className="text-slate-400 block mb-0.5">Họ và tên sinh viên *</label>
        <input
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          required
          placeholder="Nguyễn Văn A"
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-slate-400 block mb-0.5">Ngày sinh</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={e => setDateOfBirth(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-0.5">Điểm GPA (0 - 4.0)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="4"
            value={gpa}
            onChange={e => setGpa(e.target.value)}
            required
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="text-slate-400 block mb-0.5">Chuyên ngành đào tạo</label>
        <select
          value={major}
          onChange={e => setMajor(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="Công nghệ Thông tin">Công nghệ Thông tin</option>
          <option value="Kỹ thuật Phần mềm">Kỹ thuật Phần mềm</option>
          <option value="Khoa học Máy tính">Khoa học Máy tính</option>
          <option value="Hệ thống Thông tin">Hệ thống Thông tin</option>
          <option value="An toàn Thông tin">An toàn Thông tin</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-slate-400 block mb-0.5">Số điện thoại</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-0.5">Trạng thái</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value as any)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="studying">Đang học</option>
            <option value="graduated">Đã tốt nghiệp</option>
            <option value="suspended">Bảo lưu</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-slate-400 block mb-0.5">Địa chỉ</label>
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 bg-slate-700 text-slate-300 font-medium rounded-xl hover:bg-slate-600 transition cursor-pointer"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="flex-1 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-500 transition cursor-pointer"
        >
          {initialStudent ? 'Lưu Thay Đổi' : 'Thêm Mới'}
        </button>
      </div>
    </form>
  );
};

const CertificateForm: React.FC<{
  studentId: string;
  initialCert?: Certificate | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ studentId, initialCert, onSubmit, onCancel }) => {
  const [certName, setCertName] = useState(initialCert?.certName || 'IELTS Academic (7.5)');
  const [issuer, setIssuer] = useState(initialCert?.issuer || 'British Council / IDP');
  const [issueDate, setIssueDate] = useState(initialCert?.issueDate || '2023-06-20');
  const [expiryDate, setExpiryDate] = useState(initialCert?.expiryDate || '2025-06-20');
  const [certCode, setCertCode] = useState(initialCert?.certCode || `CERT-${Math.floor(100000 + Math.random() * 900000)}`);
  const [score, setScore] = useState(initialCert?.score || 'Band 7.5');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      studentId,
      certName,
      issuer,
      issueDate,
      expiryDate,
      certCode,
      score
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
      <div>
        <label className="text-slate-400 block mb-0.5">Tên chứng chỉ *</label>
        <input
          type="text"
          value={certName}
          onChange={e => setCertName(e.target.value)}
          required
          placeholder="IELTS, TOEIC, AWS Solution Architect..."
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="text-slate-400 block mb-0.5">Tổ chức / Đơn vị cấp *</label>
        <input
          type="text"
          value={issuer}
          onChange={e => setIssuer(e.target.value)}
          required
          placeholder="IDP, ETS, Microsoft, Google..."
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-slate-400 block mb-0.5">Số hiệu / Mã tra cứu</label>
          <input
            type="text"
            value={certCode}
            onChange={e => setCertCode(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-0.5">Điểm số / Kết quả</label>
          <input
            type="text"
            value={score}
            onChange={e => setScore(e.target.value)}
            placeholder="7.5 / Pass / 850"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-slate-400 block mb-0.5">Ngày cấp</label>
          <input
            type="date"
            value={issueDate}
            onChange={e => setIssueDate(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-0.5">Ngày hết hạn (nếu có)</label>
          <input
            type="date"
            value={expiryDate}
            onChange={e => setExpiryDate(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 bg-slate-700 text-slate-300 font-medium rounded-xl hover:bg-slate-600 transition cursor-pointer"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="flex-1 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition cursor-pointer"
        >
          {initialCert ? 'Lưu' : 'Thêm Chứng Chỉ'}
        </button>
      </div>
    </form>
  );
};

const UserForm: React.FC<{
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('24');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<UserRole>('employee');
  const [status, setStatus] = useState<'normal' | 'locked'>('normal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      email,
      age: parseInt(age) || 24,
      phoneNumber,
      role,
      status,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
      <div>
        <label className="text-slate-400 block mb-0.5">Họ và tên *</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="Lê Văn B"
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="text-slate-400 block mb-0.5">Email *</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="user@studentapp.com"
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-slate-400 block mb-0.5">Tuổi (Age)</label>
          <input
            type="number"
            value={age}
            onChange={e => setAge(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-0.5">Số điện thoại</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            placeholder="0912..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="text-slate-400 block mb-0.5">Vai trò (Role)</label>
        <select
          value={role}
          onChange={e => setRole(e.target.value as any)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500"
        >
          <option value="manager">Manager (Quản lý Sinh viên & Chứng chỉ)</option>
          <option value="employee">Employee (Nhân viên chỉ xem dữ liệu)</option>
          <option value="admin">Admin (Toàn quyền hệ thống)</option>
        </select>
      </div>

      <div>
        <label className="text-slate-400 block mb-0.5">Trạng thái (Status)</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setStatus('normal')}
            className={`py-1.5 rounded-lg text-xs font-medium cursor-pointer transition ${
              status === 'normal' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Normal (Bình thường)
          </button>
          <button
            type="button"
            onClick={() => setStatus('locked')}
            className={`py-1.5 rounded-lg text-xs font-medium cursor-pointer transition ${
              status === 'locked' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Locked (Khóa)
          </button>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 bg-slate-700 text-slate-300 font-medium rounded-xl hover:bg-slate-600 transition cursor-pointer"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="flex-1 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-500 transition cursor-pointer"
        >
          Thêm User
        </button>
      </div>
    </form>
  );
};

const AvatarUrlInput: React.FC<{ onSubmit: (url: string) => void }> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  return (
    <div className="space-y-2 pt-2 border-t border-slate-700">
      <label className="text-[11px] text-slate-400 block">Hoặc dán URL ảnh trực tiếp:</label>
      <div className="flex gap-1.5">
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
        />
        <button
          type="button"
          onClick={() => {
            if (url.trim()) onSubmit(url.trim());
          }}
          disabled={!url.trim()}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-medium rounded-xl transition cursor-pointer"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
};
