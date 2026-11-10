import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  FileCode,
  Folder,
  Download,
  Copy,
  Check,
  Search,
  ExternalLink,
  Smartphone,
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { ANDROID_KOTLIN_FILES } from '../data/androidKotlinFiles';
import { AndroidFile } from '../types';

export const CodeHub: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<AndroidFile>(ANDROID_KOTLIN_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [searchCodeQuery, setSearchCodeQuery] = useState('');
  const [isZipping, setIsZipping] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(false);

  // Group files by category
  const categories = [
    { id: 'all', label: 'Tất cả file' },
    { id: 'config', label: 'Gradle & Manifest' },
    { id: 'model', label: 'Data Models' },
    { id: 'repository', label: 'Firebase Firestore' },
    { id: 'viewmodel', label: 'ViewModels (MVVM)' },
    { id: 'ui_screen', label: 'Giao diện Compose' },
    { id: 'navigation', label: 'MainActivity & Nav' },
    { id: 'docs', label: 'Tài liệu & Rules' }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFiles = ANDROID_KOTLIN_FILES.filter(f => {
    const matchesCategory = activeCategory === 'all' || f.category === activeCategory;
    const matchesSearch = !searchCodeQuery.trim() ||
      f.name.toLowerCase().includes(searchCodeQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchCodeQuery.toLowerCase()) ||
      f.content.toLowerCase().includes(searchCodeQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const rootFolder = zip.folder('StudentManagement_JetpackCompose');

      ANDROID_KOTLIN_FILES.forEach(file => {
        rootFolder?.file(file.path, file.content);
      });

      // Add a dummy google-services.json template
      rootFolder?.file('app/google-services.json', JSON.stringify({
        project_info: {
          project_number: "123456789012",
          project_id: "student-management-app",
          storage_bucket: "student-management-app.appspot.com"
        },
        client: [
          {
            client_info: {
              mobilesdk_app_id: "1:123456789012:android:abcdef0123456789",
              android_client_info: {
                package_name: "com.example.studentmanagement"
              }
            },
            api_key: [
              {
                current_key: "AIzaSyFakeKeyForAndroidTestingOnly"
              }
            ]
          }
        ],
        configuration_version: "1"
      }, null, 2));

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'StudentManagement_Kotlin_JetpackCompose.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 4000);
    } catch (err) {
      console.error('Lỗi khi tạo zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Code Hub Topbar */}
      <div className="bg-slate-900 border-b border-slate-800 px-5 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              Android Studio Ready
            </span>
            <span className="text-xs text-slate-400">Kotlin 1.9+ • Jetpack Compose BOM 2024 • Firebase BOM</span>
          </div>
          <h2 className="text-base font-bold text-white mt-1">
            Trung Tâm Mã Nguồn Kotlin & Jetpack Compose
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition cursor-pointer disabled:opacity-50"
          >
            {isZipping ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : zipSuccess ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{zipSuccess ? 'Đã tải thành công!' : 'Tải Về Trọn Bộ Dự Án (.ZIP)'}</span>
          </button>
        </div>
      </div>

      {/* Main split area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: File Tree & Filter Sidebar */}
        <aside className="w-full lg:w-80 bg-slate-900/70 border-r border-slate-800 flex flex-col shrink-0 overflow-hidden">
          {/* Search file box */}
          <div className="p-3 border-b border-slate-800">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm tên file hoặc nội dung..."
                value={searchCodeQuery}
                onChange={e => setSearchCodeQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="px-3 py-2 border-b border-slate-800/80 flex gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2 py-1 rounded-lg shrink-0 transition cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Files List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <div className="px-2 py-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Files ({filteredFiles.length})
            </div>
            {filteredFiles.map(file => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left p-2 rounded-xl transition flex items-start gap-2.5 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/20 border border-indigo-500/40 text-white'
                      : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                  }`}
                >
                  <FileCode className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-semibold truncate ${isSelected ? 'text-indigo-300' : 'text-slate-200'}`}>
                      {file.name}
                    </p>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {file.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick guide footer */}
          <div className="p-3 bg-slate-950/60 border-t border-slate-800 text-[11px] text-slate-400">
            <p className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> Cách dùng trong Android Studio:
            </p>
            <ol className="list-decimal list-inside space-y-0.5 mt-1.5 text-slate-400 text-[10px]">
              <li>Tải file .ZIP về máy</li>
              <li>Giải nén và mở bằng Android Studio</li>
              <li>Thêm file <code className="text-emerald-300">google-services.json</code> vào thư mục <code className="text-emerald-300">app/</code></li>
              <li>Bấm Run (Shift + F10) để khởi chạy</li>
            </ol>
          </div>
        </aside>

        {/* Right: Code Viewer */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-950">
          {/* File Header */}
          <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-1 bg-slate-800 border border-slate-700 rounded-md text-indigo-300">
                {selectedFile.path}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                {selectedFile.description}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sao chép mã (Copy)</span>
                </>
              )}
            </button>
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-200 bg-slate-950 leading-relaxed selection:bg-indigo-500/30 selection:text-white">
            <pre className="overflow-x-auto whitespace-pre">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </main>
      </div>
    </div>
  );
};
