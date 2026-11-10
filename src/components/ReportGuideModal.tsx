import React, { useState } from 'react';
import {
  FileText,
  Video,
  Award,
  CheckCircle2,
  Copy,
  Check,
  Download,
  BookOpen,
  ListOrdered,
  AlertCircle
} from 'lucide-react';
import { RUBRIC_GUIDE } from '../data/reportRubricGuide';

export const ReportGuideModal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rubric' | 'report_template' | 'video_checklist'>('rubric');
  const [copiedSection, setCopiedSection] = useState(false);

  const reportOutlineMarkdown = `# FACULTY OF INFORMATION TECHNOLOGY
## COURSE: MOBILE APPS DEVELOPMENT (503074)
### MID-TERM PROJECT REPORT
**Topic:** Comprehensive Study of Google Firebase Firestore for Developing a Realtime App for Student Information Management

---

### I. INTRODUCTION & OBJECTIVES
1. Background and Motivation
2. Project Objectives
   - Research and apply Google Firebase Firestore in modern Android development.
   - Design a declarative UI with Jetpack Compose and Kotlin.
   - Implement strict Role-Based Access Control (Admin, Manager, Employee).
   - Provide multi-criteria search, certificate management, and data import/export.

### II. COMPREHENSIVE STUDY OF GOOGLE FIREBASE FIRESTORE
1. NoSQL Architecture vs Traditional SQL
   - Document-Collection data model.
   - Scalability, indexing, and query performance.
2. Real-Time Synchronization Mechanism
   - Firestore SnapshotListener and Kotlin Flow integration.
   - Offline persistence and optimistic UI updates.
3. Security Rules & RBAC
   - Enforcing role permissions at the database level.
   - Preventing unauthorized mutations on \`users\` and \`students\`.

### III. SYSTEM ARCHITECTURE & IMPLEMENTATION
1. Architecture Pattern: MVVM (Model - View - ViewModel)
   - Model Layer: User, Student, Certificate, LoginHistory.
   - Repository Layer: FirebaseRepository with coroutines and callbackFlow.
   - ViewModel Layer: AuthViewModel, StudentViewModel, UserViewModel with StateFlow.
   - UI Layer: 100% Jetpack Compose with Material 3.
2. Module Features Breakdown
   - Authentication & Profile picture update (allowed for all users).
   - User Account Management & Audit Login History (Admin exclusive).
   - Student CRUD & Multi-criteria Search (Name, Student ID, Major, GPA).
   - Student Certificate Management (Add, Edit, Delete certificates).
   - Data Import & Export (CSV format).

### IV. SYSTEM CREDENTIALS & TESTING INSTRUCTIONS
- Admin Account: admin@studentapp.com / admin123
- Manager Account: manager@studentapp.com / manager123
- Employee Account: employee@studentapp.com / employee123
- Locked User Account: locked@studentapp.com / password123

### V. CONCLUSION & FUTURE DEVELOPMENTS
`;

  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Hướng Dẫn Báo Cáo & Video Demo Đạt Điểm Tối Đa (Rubric 10/10)
            </h2>
            <p className="text-xs text-slate-400">
              Chi tiết tiêu chí chấm thi: 4.0 điểm Báo cáo (Report PDF) + 6.0 điểm Sản phẩm & Video Demo.
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('rubric')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'rubric' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Thang Điểm Chi Tiết (Rubric)</span>
          </button>
          <button
            onClick={() => setActiveTab('report_template')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'report_template' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Khung Báo Cáo Mẫu (PDF)</span>
          </button>
          <button
            onClick={() => setActiveTab('video_checklist')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'video_checklist' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Kịch Bản Video Demo (20p)</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeTab === 'rubric' && (
          <div className="space-y-4">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-xs text-amber-300 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <p className="font-bold text-amber-200">Lưu ý quan trọng từ Giảng viên (Đề cương chấm thi):</p>
                <p className="mt-1 leading-relaxed text-amber-300/90">
                  Không nộp video demo có thể bị trừ tới <strong>2.0 điểm</strong>! Không cung cấp tài khoản Admin hoặc không có hướng dẫn chạy source code sẽ bị trừ điểm trực tiếp. Đảm bảo nhóm phân chia công việc đồng đều.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RUBRIC_GUIDE.map((rubric, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-white">{rubric.category}</h3>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                      {rubric.points}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-400 font-medium">
                    Tiêu chuẩn điểm tối đa: {rubric.criteria}
                  </p>
                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Bí quyết thực hiện:</p>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {rubric.tips.map((tip, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <span className="text-indigo-400 mt-0.5">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'report_template' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  Mẫu Dàn Ý Báo Cáo Khoa Học (English / Tiếng Việt)
                </h3>
                <p className="text-xs text-slate-400">
                  Khung cấu trúc chuẩn giúp nhóm biên soạn báo cáo PDF nộp giảng viên đúng yêu cầu.
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(reportOutlineMarkdown);
                  setCopiedSection(true);
                  setTimeout(() => setCopiedSection(false), 2000);
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedSection ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection ? 'Đã sao chép!' : 'Sao chép Khung Báo Cáo'}</span>
              </button>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 leading-relaxed overflow-x-auto whitespace-pre">
              {reportOutlineMarkdown}
            </div>
          </div>
        )}

        {activeTab === 'video_checklist' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-emerald-400" />
                Kịch Bản Video Demo 20 Phút Đạt Điểm Tối Đa
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Đề bài quy định: Video demo tối đa 20 phút, âm thanh rõ ràng, độ phân giải tối thiểu 720p. Không nhất thiết dùng PowerPoint mà nên quay trực tiếp thao tác trên ứng dụng di động để chứng minh sản phẩm hoạt động ổn định.
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-300 mb-1">
                    <span>Phần 1: Giới thiệu nhóm & Mục tiêu đề tài</span>
                    <span className="font-mono text-slate-400">00:00 - 03:00 (3 phút)</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Chào hỏi, giới thiệu thành viên, giảng viên hướng dẫn. Tóm tắt mục tiêu nghiên cứu Firebase Firestore và Jetpack Compose trên Android.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-300 mb-1">
                    <span>Phần 2: Demo Chức năng Quản lý Tài khoản (User Account)</span>
                    <span className="font-mono text-slate-400">03:00 - 08:00 (5 phút)</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    - Đăng nhập bằng tài khoản Admin mặc định (<code className="text-emerald-300 font-mono">admin@studentapp.com</code>).<br />
                    - Thêm người dùng mới, sửa thông tin, khóa tài khoản (Locked) và thử đăng nhập tài khoản bị khóa để chứng minh hệ thống chặn thành công.<br />
                    - Xem danh sách Lịch sử đăng nhập (Login History) với thời gian và thiết bị ghi nhận trên Firestore.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-300 mb-1">
                    <span>Phần 3: Demo Chức năng Quản lý Sinh viên & Chứng chỉ</span>
                    <span className="font-mono text-slate-400">08:00 - 15:00 (7 phút)</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    - Tìm kiếm đa tiêu chí (theo MSSV, Tên, Ngành) và sắp xếp danh sách theo GPA/Tên.<br />
                    - Thêm sinh viên mới, cập nhật thông tin.<br />
                    - Vào màn hình Chi tiết Sinh viên: Thêm chứng chỉ (IELTS, TOEIC, AWS...), chỉnh sửa chứng chỉ và xóa chứng chỉ.<br />
                    - Mở đồng thời Firebase Console trên trình duyệt để thấy dữ liệu sinh viên và chứng chỉ nhảy realtime!
                  </p>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-300 mb-1">
                    <span>Phần 4: Demo Phân Quyền (RBAC) & Import / Export</span>
                    <span className="font-mono text-slate-400">15:00 - 19:00 (4 phút)</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    - Đăng nhập tài khoản <strong>Employee</strong>: Chứng minh nhân viên chỉ xem được danh sách sinh viên, không có nút thêm/sửa/xóa, và chỉ được phép cập nhật ảnh đại diện của mình.<br />
                    - Xuất file danh sách sinh viên ra CSV, mở file trên Excel.<br />
                    - Nhập (Import) sinh viên từ file mẫu.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-300 mb-1">
                    <span>Phần 5: Tổng kết & Bài học kinh nghiệm</span>
                    <span className="font-mono text-slate-400">19:00 - 20:00 (1 phút)</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Đánh giá ưu nhược điểm của Firebase Firestore, cảm ơn giảng viên đã theo dõi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
