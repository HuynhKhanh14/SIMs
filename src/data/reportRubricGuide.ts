export interface RubricItem {
  category: string;
  points: string;
  criteria: string;
  tips: string[];
}

export const RUBRIC_GUIDE: RubricItem[] = [
  {
    category: '1. Nội dung Báo cáo (Report Content)',
    points: '1.0 / 4.0 điểm',
    criteria: 'Nội dung rất đầy đủ, chi tiết, làm rõ các khía cạnh của đề tài Firebase Firestore & Quản lý sinh viên. Có phân tích, đánh giá, so sánh.',
    tips: [
      'Giới thiệu tổng quan về NoSQL và Firebase Firestore (Document, Collection, Subcollection).',
      'So sánh ưu nhược điểm của Firestore so với Firebase Realtime Database và SQL truyền thống.',
      'Mô tả kiến trúc MVVM (Model - View - ViewModel) kết hợp Jetpack Compose và Coroutines/Flow.',
      'Vẽ sơ đồ luồng dữ liệu (Data Flow Diagram) và cấu trúc các Collection trong Firestore.'
    ]
  },
  {
    category: '2. Tính chính xác & Tác phong học thuật (Correctness)',
    points: '0.75 / 4.0 điểm',
    criteria: 'Thông tin chọn lọc, có nguồn gốc rõ ràng, viết lại theo văn phong nhóm, không sao chép nguyên văn blog.',
    tips: [
      'Trích dẫn tài liệu chính thức từ Android Developers (developer.android.com) và Firebase Docs.',
      'Sử dụng thuật ngữ khoa học chính xác: SnapshotListener, StateFlow, Composable, Recomposition.',
      'Tuyệt đối không chép thô từ blog; tóm lược bằng văn phong khoa học của nhóm.'
    ]
  },
  {
    category: '3. Hình thức trình bày & Văn phong (Presentation Style)',
    points: '0.75 / 4.0 điểm',
    criteria: 'Bố cục sạch đẹp, canh lề chuẩn, font chữ đồng bộ, không lỗi chính tả, văn phong chuẩn mực.',
    tips: [
      'Sử dụng font Times New Roman hoặc Arial, cỡ chữ 13pt, giãn dòng 1.3 - 1.5 lines.',
      'Đánh số trang, mục lục tự động, căn đều 2 bên (Justify).',
      'Kiểm tra kỹ lưỡng lỗi chính tả và dấu câu trước khi xuất bản PDF.'
    ]
  },
  {
    category: '4. Hình ảnh, Bảng biểu, Sơ đồ (Pictures & Diagrams)',
    points: '0.75 / 4.0 điểm',
    criteria: 'Hình ảnh, biểu đồ tự vẽ/tự chụp rõ nét, có chú thích (Caption) đầy đủ cho từng hình.',
    tips: [
      'Chụp ảnh màn hình thực tế các chức năng ứng dụng trên Android Studio emulator.',
      'Chụp ảnh cấu trúc collections trên Firebase Console.',
      'Ghi chú thích rõ ràng: "Hình 1.1: Giao diện Đăng nhập với phân quyền RBAC".'
    ]
  },
  {
    category: '5. Trang bìa, Mục lục, Phụ lục, Tài liệu tham khảo',
    points: '0.75 / 4.0 điểm',
    criteria: 'Trang bìa đúng mẫu Khoa/Trường, đầy đủ họ tên, MSSV, giáo viên hướng dẫn, mục lục chi tiết.',
    tips: [
      'Điền đúng thông tin: Môn Học: PHÁT TRIỂN ỨNG DỤNG DI ĐỘNG (503074).',
      'Ghi rõ tỷ lệ đóng góp của từng thành viên trong nhóm (tránh bị trừ điểm chia việc không đều).',
      'Cung cấp tài khoản Admin mặc định (admin@studentapp.com / admin123) trong báo cáo để thầy cô chấm bài.'
    ]
  },
  {
    category: '6. Video Demo Sản Phẩm (Video Presentation)',
    points: 'Đánh giá kỹ năng & Thang điểm Sản phẩm',
    criteria: 'Tối đa 20 phút, chuẩn 720p/1080p, giọng nói to rõ, phong thái tự tin, demo rành mạch từng ca kiểm thử.',
    tips: [
      'Kịch bản demo: 1) Đăng nhập Admin -> Thêm user mới -> Khóa user -> Xem Login history.',
      '2) Đăng nhập Manager -> Thêm sinh viên -> Thêm chứng chỉ -> Tìm kiếm & Sắp xếp -> Xuất CSV.',
      '3) Đăng nhập Employee -> Thử xem sinh viên (chỉ xem, không có nút sửa/xóa) -> Đổi ảnh đại diện.'
    ]
  }
];
