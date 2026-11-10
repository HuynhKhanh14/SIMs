import React, { useState } from 'react';
import { Database, Shield, FileText, CheckCircle, Copy, Check, Table, Eye, Layers } from 'lucide-react';
import { User, Student, Certificate, LoginHistory } from '../types';

interface FirestoreInspectorProps {
  users: User[];
  students: Student[];
  certificates: Certificate[];
  loginHistory: LoginHistory[];
}

export const FirestoreInspector: React.FC<FirestoreInspectorProps> = ({
  users,
  students,
  certificates,
  loginHistory
}) => {
  const [activeCollection, setActiveCollection] = useState<'students' | 'certificates' | 'users' | 'login_history' | 'rules'>('students');
  const [copiedRules, setCopiedRules] = useState(false);

  const collections = [
    { id: 'students', name: 'students', count: students.length, desc: 'Dữ liệu thông tin sinh viên' },
    { id: 'certificates', name: 'certificates', count: certificates.length, desc: 'Chứng chỉ của từng sinh viên' },
    { id: 'users', name: 'users', count: users.length, desc: 'Tài khoản người dùng (Admin, Manager, Employee)' },
    { id: 'login_history', name: 'login_history', count: loginHistory.length, desc: 'Audit log lịch sử đăng nhập' },
    { id: 'rules', name: 'firestore.rules', count: 'RBAC', desc: 'Quy tắc phân quyền bảo mật' }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Banner */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Firebase Firestore Live Inspector & Architecture
              <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                Real-Time Synchronized
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Cơ sở dữ liệu đám mây NoSQL Firestore lưu trữ theo Document - Collection phục vụ đề tài nghiên cứu.
            </p>
          </div>
        </div>

        {/* Collection Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {collections.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCollection(c.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
                activeCollection === c.id
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{c.name}</span>
              <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">
                {c.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Firestore Architecture Explainer Card */}
        <div className="bg-gradient-to-r from-amber-950/20 via-slate-900 to-indigo-950/20 border border-amber-500/20 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-amber-400" />
            Cấu Trúc Lưu Trữ Dữ Liệu NoSQL Firestore Trong Dự Án
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Hệ thống áp dụng mô hình <strong>Root Collections</strong> độc lập: mỗi sinh viên có ID riêng trong collection <code className="text-amber-300 font-mono">students</code>, và các chứng chỉ liên kết qua trường <code className="text-amber-300 font-mono">studentId</code> trong collection <code className="text-amber-300 font-mono">certificates</code>. Thiết kế này giúp truy vấn chứng chỉ nhanh chóng, dễ dàng xuất báo cáo tổng hợp và mở rộng quy mô.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-amber-400 font-bold block mb-1 font-mono">/users/{'{userId}'}</span>
              <span className="text-[11px] text-slate-400">Tài khoản & phân quyền 3 Role (ADMIN, MANAGER, EMPLOYEE)</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-amber-400 font-bold block mb-1 font-mono">/students/{'{studentId}'}</span>
              <span className="text-[11px] text-slate-400">Thông tin sinh viên, MSSV, GPA, ngành, địa chỉ</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-amber-400 font-bold block mb-1 font-mono">/certificates/{'{certId}'}</span>
              <span className="text-[11px] text-slate-400">Chứng chỉ liên kết qua trường studentId</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <span className="text-amber-400 font-bold block mb-1 font-mono">/login_history/{'{logId}'}</span>
              <span className="text-[11px] text-slate-400">Lịch sử đăng nhập realtime, thiết bị & địa chỉ IP</span>
            </div>
          </div>
        </div>

        {/* Dynamic Display based on activeCollection */}
        {activeCollection === 'students' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-5 py-3 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-bold text-white font-mono">Collection: students</h4>
                <p className="text-xs text-slate-400">{students.length} documents</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Doc ID</th>
                    <th className="p-3">studentCode</th>
                    <th className="p-3">fullName</th>
                    <th className="p-3">major</th>
                    <th className="p-3">gpa</th>
                    <th className="p-3">status</th>
                    <th className="p-3">email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {students.map(s => (
                    <tr key={s.id} className="hover:bg-slate-800/40">
                      <td className="p-3 text-indigo-400">{s.id}</td>
                      <td className="p-3 text-amber-300 font-bold">{s.studentCode}</td>
                      <td className="p-3 text-slate-200 font-sans font-medium">{s.fullName}</td>
                      <td className="p-3 text-slate-400 font-sans">{s.major}</td>
                      <td className="p-3 text-emerald-400 font-bold">{s.gpa.toFixed(2)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          s.status === 'studying' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400">{s.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeCollection === 'certificates' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-5 py-3 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-bold text-white font-mono">Collection: certificates</h4>
                <p className="text-xs text-slate-400">{certificates.length} documents</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Doc ID</th>
                    <th className="p-3">studentId</th>
                    <th className="p-3">certName</th>
                    <th className="p-3">issuer</th>
                    <th className="p-3">certCode</th>
                    <th className="p-3">score</th>
                    <th className="p-3">issueDate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {certificates.map(c => (
                    <tr key={c.id} className="hover:bg-slate-800/40">
                      <td className="p-3 text-indigo-400">{c.id}</td>
                      <td className="p-3 text-amber-300">{c.studentId}</td>
                      <td className="p-3 text-slate-200 font-sans font-bold">{c.certName}</td>
                      <td className="p-3 text-slate-400 font-sans">{c.issuer}</td>
                      <td className="p-3 text-slate-400">{c.certCode}</td>
                      <td className="p-3 text-emerald-400 font-bold">{c.score || '-'}</td>
                      <td className="p-3 text-slate-400">{c.issueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeCollection === 'users' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-5 py-3 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-bold text-white font-mono">Collection: users</h4>
                <p className="text-xs text-slate-400">{users.length} documents</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Doc ID</th>
                    <th className="p-3">name</th>
                    <th className="p-3">email</th>
                    <th className="p-3">role</th>
                    <th className="p-3">status</th>
                    <th className="p-3">age</th>
                    <th className="p-3">phoneNumber</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-800/40">
                      <td className="p-3 text-indigo-400">{u.id}</td>
                      <td className="p-3 text-slate-200 font-sans font-medium">{u.name}</td>
                      <td className="p-3 text-slate-400">{u.email}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          u.role === 'admin' ? 'bg-indigo-500/20 text-indigo-300' :
                          u.role === 'manager' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          u.status === 'normal' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400">{u.age}</td>
                      <td className="p-3 text-slate-400">{u.phoneNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeCollection === 'login_history' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-5 py-3 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-bold text-white font-mono">Collection: login_history</h4>
                <p className="text-xs text-slate-400">{loginHistory.length} documents</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">userName</th>
                    <th className="p-3">userRole</th>
                    <th className="p-3">status</th>
                    <th className="p-3">ipAddress</th>
                    <th className="p-3">deviceInfo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {loginHistory.map(l => (
                    <tr key={l.id} className="hover:bg-slate-800/40">
                      <td className="p-3 text-slate-400">{new Date(l.timestamp).toLocaleString('vi-VN')}</td>
                      <td className="p-3 text-slate-200 font-sans font-medium">{l.userName}</td>
                      <td className="p-3 text-indigo-400">{l.userRole}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          l.status === 'success' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="p-3 text-amber-300">{l.ipAddress}</td>
                      <td className="p-3 text-slate-400 font-sans truncate max-w-xs">{l.deviceInfo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeCollection === 'rules' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  Quy Tắc Bảo Mật Firestore Security Rules (RBAC)
                </h4>
                <p className="text-xs text-slate-400">
                  Đảm bảo Admin toàn quyền, Manager chỉ quản lý sinh viên/chứng chỉ, Employee chỉ xem và chỉ sửa avatar của bản thân.
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() { return request.auth != null; }
    function getUserData() { return get(/databases/$(database)/documents/users/$(request.auth.uid)).data; }
    function isAdmin() { return isAuthenticated() && (getUserData().role == 'ADMIN' || request.auth.token.email == 'admin@studentapp.com'); }
    function isManager() { return isAuthenticated() && getUserData().role == 'MANAGER'; }

    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create, delete: if isAdmin();
      allow update: if isAdmin() || (isAuthenticated() && request.auth.uid == userId && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['avatarUrl']));
    }
    match /students/{studentId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin() || isManager();
    }
    match /certificates/{certId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin() || isManager();
    }
    match /login_history/{historyId} {
      allow read: if isAdmin();
      allow create: if isAuthenticated();
    }
  }
}`);
                  setCopiedRules(true);
                  setTimeout(() => setCopiedRules(false), 2000);
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedRules ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedRules ? 'Đã sao chép!' : 'Sao chép Rules'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAuthenticated() {
      return request.auth != null;
    }

    function getUserData() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
    }

    function isAdmin() {
      return isAuthenticated() && (
        getUserData().role == 'ADMIN' || 
        request.auth.token.email == 'admin@studentapp.com'
      );
    }

    function isManager() {
      return isAuthenticated() && getUserData().role == 'MANAGER';
    }

    // 1. Phân quyền Người dùng: Admin toàn quyền, người dùng chỉ được đổi avatar của chính họ
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create, delete: if isAdmin();
      allow update: if isAdmin() || (
        isAuthenticated() && request.auth.uid == userId && 
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['avatarUrl'])
      );
    }

    // 2. Phân quyền Sinh viên: Admin & Manager được thêm/sửa/xóa, Employee chỉ đọc
    match /students/{studentId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin() || isManager();
    }

    // 3. Phân quyền Chứng chỉ: Admin & Manager được quản lý
    match /certificates/{certId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin() || isManager();
    }

    // 4. Lịch sử đăng nhập: Mọi user ghi log, chỉ Admin được xem
    match /login_history/{historyId} {
      allow read: if isAdmin();
      allow create: if isAuthenticated();
    }
  }
}`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
