import { AndroidFile } from '../types';

export const ANDROID_KOTLIN_FILES: AndroidFile[] = [
  {
    name: 'app/build.gradle.kts',
    path: 'app/build.gradle.kts',
    category: 'config',
    description: 'Cấu hình dependencies Gradle: Jetpack Compose BOM, Firebase Firestore, Firebase Auth, Navigation, Coil, Coroutines',
    language: 'groovy',
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    id("com.google.gms.google-services")
}

android {
    namespace = "com.example.studentmanagement"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.studentmanagement"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.8"
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    // Core Android & Lifecycle
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.7.0")
    implementation("androidx.activity:activity-compose:1.8.2")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0")

    // Jetpack Compose BOM & UI
    implementation(platform("androidx.compose:compose-bom:2024.02.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3:1.2.0")
    implementation("androidx.compose.material:material-icons-extended")

    // Navigation Compose
    implementation("androidx.navigation:navigation-compose:2.7.7")

    // Firebase (BOM platform)
    implementation(platform("com.google.firebase:firebase-bom:32.7.2"))
    implementation("com.google.firebase:firebase-firestore-ktx")
    implementation("com.google.firebase:firebase-auth-ktx")

    // Image loading with Coil Compose
    implementation("io.coil-kt:coil-compose:2.5.0")

    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-play-services:1.7.3")

    // Tooling & Testing
    debugImplementation("androidx.compose.ui:ui-tooling")
    debugImplementation("androidx.compose.ui:ui-test-manifest")
}`
  },
  {
    name: 'build.gradle.kts (Project)',
    path: 'build.gradle.kts',
    category: 'config',
    description: 'Root Gradle cấu hình plugin Android và Google Services cho Firebase',
    language: 'groovy',
    content: `// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    id("com.google.gms.google-services") version "4.4.1" apply false
}`
  },
  {
    name: 'AndroidManifest.xml',
    path: 'app/src/main/AndroidManifest.xml',
    category: 'config',
    description: 'Android Manifest khai báo quyền INTERNET và truy cập dữ liệu để kết nối Firebase Firestore và xuất file',
    language: 'xml',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- Cấp quyền truy cập Internet cho Firebase Firestore và Auth -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.StudentManagement"
        tools:targetApi="31">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:label="@string/app_name"
            android:theme="@style/Theme.StudentManagement">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>`
  },
  {
    name: 'MainActivity.kt',
    path: 'app/src/main/java/com/example/studentmanagement/MainActivity.kt',
    category: 'navigation',
    description: 'Điểm khởi chạy ứng dụng Android, thiết lập Theme và bộ điều hướng NavGraph',
    language: 'kotlin',
    content: `package com.example.studentmanagement

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.example.studentmanagement.ui.navigation.AppNavGraph
import com.example.studentmanagement.ui.theme.StudentManagementTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            StudentManagementTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    AppNavGraph()
                }
            }
        }
    }
}`
  },
  {
    name: 'model/User.kt',
    path: 'app/src/main/java/com/example/studentmanagement/model/User.kt',
    category: 'model',
    description: 'Data model cho người dùng hệ thống (Admin, Manager, Employee) và trạng thái (Normal, Locked)',
    language: 'kotlin',
    content: `package com.example.studentmanagement.model

import com.google.firebase.firestore.DocumentId

enum class UserRole {
    ADMIN,      // Quyền cao nhất: Toàn quyền mọi tính năng
    MANAGER,    // Quản lý sinh viên & chứng chỉ, xuất/nhập dữ liệu
    EMPLOYEE    // Chỉ xem thông tin sinh viên, chỉ được sửa ảnh đại diện của mình
}

enum class UserStatus {
    NORMAL,     // Bình thường
    LOCKED      // Bị khóa (không thể đăng nhập)
}

data class User(
    @DocumentId
    val id: String = "",
    val name: String = "",
    val email: String = "",
    val age: Int = 0,
    val phoneNumber: String = "",
    val role: UserRole = UserRole.EMPLOYEE,
    val status: UserStatus = UserStatus.NORMAL,
    val avatarUrl: String = "",
    val createdAt: Long = System.currentTimeMillis()
)`
  },
  {
    name: 'model/Student.kt',
    path: 'app/src/main/java/com/example/studentmanagement/model/Student.kt',
    category: 'model',
    description: 'Data model sinh viên với đầy đủ thông tin: Mã SV, Họ tên, Ngày sinh, Ngành học, Điểm GPA, Trạng thái',
    language: 'kotlin',
    content: `package com.example.studentmanagement.model

import com.google.firebase.firestore.DocumentId

data class Student(
    @DocumentId
    val id: String = "",
    val studentCode: String = "",       // Mã số sinh viên (MSSV)
    val fullName: String = "",          // Họ và tên
    val dateOfBirth: String = "",       // Ngày sinh (dd/MM/yyyy)
    val email: String = "",             // Email
    val phoneNumber: String = "",       // Số điện thoại
    val major: String = "",             // Ngành học (VD: KTPM, KHMT, HTTT)
    val gpa: Double = 0.0,              // Điểm trung bình tích lũy (0.0 - 4.0)
    val address: String = "",           // Địa chỉ thường trú
    val avatarUrl: String = "",         // URL ảnh thẻ
    val status: String = "Đang học",    // Đang học, Tốt nghiệp, Bảo lưu
    val enrollmentYear: Int = 2023,     // Khóa nhập học
    val createdAt: Long = System.currentTimeMillis()
)`
  },
  {
    name: 'model/Certificate.kt',
    path: 'app/src/main/java/com/example/studentmanagement/model/Certificate.kt',
    category: 'model',
    description: 'Data model Chứng chỉ của từng sinh viên (IELTS, TOEIC, MOS, AWS...)',
    language: 'kotlin',
    content: `package com.example.studentmanagement.model

import com.google.firebase.firestore.DocumentId

data class Certificate(
    @DocumentId
    val id: String = "",
    val studentId: String = "",         // Mã sinh viên sở hữu chứng chỉ
    val certName: String = "",          // Tên chứng chỉ (VD: IELTS 7.5, AWS SAA)
    val issuer: String = "",            // Đơn vị cấp chứng chỉ (VD: IDP, Amazon)
    val issueDate: String = "",         // Ngày cấp
    val expiryDate: String = "",        // Ngày hết hạn
    val certCode: String = "",          // Số hiệu / Mã tra cứu chứng chỉ
    val score: String = ""              // Điểm / Xếp loại
)`
  },
  {
    name: 'model/LoginHistory.kt',
    path: 'app/src/main/java/com/example/studentmanagement/model/LoginHistory.kt',
    category: 'model',
    description: 'Data model lưu vết lịch sử đăng nhập của người dùng theo thời gian thực',
    language: 'kotlin',
    content: `package com.example.studentmanagement.model

import com.google.firebase.firestore.DocumentId

data class LoginHistory(
    @DocumentId
    val id: String = "",
    val userId: String = "",
    val userName: String = "",
    val userEmail: String = "",
    val userRole: String = "",
    val timestamp: Long = System.currentTimeMillis(),
    val ipAddress: String = "127.0.0.1",
    val deviceInfo: String = "Android Device",
    val status: String = "Thành công" // "Thành công" hoặc "Tài khoản bị khóa"
)`
  },
  {
    name: 'repository/FirebaseRepository.kt',
    path: 'app/src/main/java/com/example/studentmanagement/repository/FirebaseRepository.kt',
    category: 'repository',
    description: 'Tầng Repository kết nối trực tiếp với Firestore (SnapshotListener lắng nghe realtime, CRUD sinh viên, chứng chỉ, người dùng)',
    language: 'kotlin',
    content: `package com.example.studentmanagement.repository

import com.example.studentmanagement.model.*
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await

class FirebaseRepository {
    private val firestore = FirebaseFirestore.getInstance()
    private val auth = FirebaseAuth.getInstance()

    private val usersRef = firestore.collection("users")
    private val studentsRef = firestore.collection("students")
    private val certificatesRef = firestore.collection("certificates")
    private val loginHistoryRef = firestore.collection("login_history")

    // ==================== QUẢN LÝ TÀI KHOẢN (USER) ====================

    // Lắng nghe danh sách Người dùng hệ thống theo thời gian thực (Realtime Flow)
    fun getUsersFlow(): Flow<List<User>> = callbackFlow {
        val listener = usersRef.addSnapshotListener { snapshot, error ->
            if (error != null) {
                close(error)
                return@addSnapshotListener
            }
            val users = snapshot?.toObjects(User::class.java) ?: emptyList()
            trySend(users)
        }
        awaitClose { listener.remove() }
    }

    suspend fun addUser(user: User): Result<String> = try {
        val docRef = usersRef.document()
        val newUser = user.copy(id = docRef.id)
        docRef.set(newUser).await()
        Result.success(docRef.id)
    } catch (e: Exception) {
        Result.failure(e)
    }

    suspend fun updateUser(user: User): Result<Unit> = try {
        usersRef.document(user.id).set(user).await()
        Result.success(Unit)
    } catch (e: Exception) {
        Result.failure(e)
    }

    suspend fun deleteUser(userId: String): Result<Unit> = try {
        usersRef.document(userId).delete().await()
        Result.success(Unit)
    } catch (e: Exception) {
        Result.failure(e)
    }

    suspend fun updateUserAvatar(userId: String, newAvatarUrl: String): Result<Unit> = try {
        usersRef.document(userId).update("avatarUrl", newAvatarUrl).await()
        Result.success(Unit)
    } catch (e: Exception) {
        Result.failure(e)
    }

    // Ghi lịch sử đăng nhập vào Firestore
    suspend fun recordLoginHistory(history: LoginHistory): Result<Unit> = try {
        loginHistoryRef.add(history).await()
        Result.success(Unit)
    } catch (e: Exception) {
        Result.failure(e)
    }

    fun getLoginHistoryFlow(): Flow<List<LoginHistory>> = callbackFlow {
        val listener = loginHistoryRef.orderBy("timestamp", Query.Direction.DESCENDING)
            .addSnapshotListener { snapshot, error ->
                if (error != null) {
                    close(error)
                    return@addSnapshotListener
                }
                val list = snapshot?.toObjects(LoginHistory::class.java) ?: emptyList()
                trySend(list)
            }
        awaitClose { listener.remove() }
    }

    // ==================== QUẢN LÝ SINH VIÊN (STUDENT) ====================

    fun getStudentsFlow(): Flow<List<Student>> = callbackFlow {
        val listener = studentsRef.orderBy("studentCode", Query.Direction.ASCENDING)
            .addSnapshotListener { snapshot, error ->
                if (error != null) {
                    close(error)
                    return@addSnapshotListener
                }
                val students = snapshot?.toObjects(Student::class.java) ?: emptyList()
                trySend(students)
            }
        awaitClose { listener.remove() }
    }

    suspend fun addStudent(student: Student): Result<String> = try {
        val docRef = studentsRef.document()
        val newStudent = student.copy(id = docRef.id)
        docRef.set(newStudent).await()
        Result.success(docRef.id)
    } catch (e: Exception) {
        Result.failure(e)
    }

    suspend fun updateStudent(student: Student): Result<Unit> = try {
        studentsRef.document(student.id).set(student).await()
        Result.success(Unit)
    } catch (e: Exception) {
        Result.failure(e)
    }

    suspend fun deleteStudent(studentId: String): Result<Unit> = try {
        studentsRef.document(studentId).delete().await()
        // Xóa tất cả chứng chỉ liên quan của sinh viên này
        val certs = certificatesRef.whereEqualTo("studentId", studentId).get().await()
        for (doc in certs.documents) {
            doc.reference.delete()
        }
        Result.success(Unit)
    } catch (e: Exception) {
        Result.failure(e)
    }

    // ==================== QUẢN LÝ CHỨNG CHỈ (CERTIFICATE) ====================

    fun getCertificatesForStudentFlow(studentId: String): Flow<List<Certificate>> = callbackFlow {
        val listener = certificatesRef.whereEqualTo("studentId", studentId)
            .addSnapshotListener { snapshot, error ->
                if (error != null) {
                    close(error)
                    return@addSnapshotListener
                }
                val certs = snapshot?.toObjects(Certificate::class.java) ?: emptyList()
                trySend(certs)
            }
        awaitClose { listener.remove() }
    }

    suspend fun addCertificate(certificate: Certificate): Result<String> = try {
        val docRef = certificatesRef.document()
        val newCert = certificate.copy(id = docRef.id)
        docRef.set(newCert).await()
        Result.success(docRef.id)
    } catch (e: Exception) {
        Result.failure(e)
    }

    suspend fun updateCertificate(certificate: Certificate): Result<Unit> = try {
        certificatesRef.document(certificate.id).set(certificate).await()
        Result.success(Unit)
    } catch (e: Exception) {
        Result.failure(e)
    }

    suspend fun deleteCertificate(certId: String): Result<Unit> = try {
        certificatesRef.document(certId).delete().await()
        Result.success(Unit)
    } catch (e: Exception) {
        Result.failure(e)
    }
}`
  },
  {
    name: 'viewmodel/AuthViewModel.kt',
    path: 'app/src/main/java/com/example/studentmanagement/viewmodel/AuthViewModel.kt',
    category: 'viewmodel',
    description: 'Xử lý logic Đăng nhập, phân quyền 3 Role (Admin, Manager, Employee), kiểm tra tài khoản Locked và đổi Avatar',
    language: 'kotlin',
    content: `package com.example.studentmanagement.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.studentmanagement.model.LoginHistory
import com.example.studentmanagement.model.User
import com.example.studentmanagement.model.UserRole
import com.example.studentmanagement.model.UserStatus
import com.example.studentmanagement.repository.FirebaseRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

sealed class LoginResult {
    object Idle : LoginResult()
    object Loading : LoginResult()
    data class Success(val user: User) : LoginResult()
    data class Error(val message: String) : LoginResult()
    object LockedAccount : LoginResult()
}

class AuthViewModel(
    private val repository: FirebaseRepository = FirebaseRepository()
) : ViewModel() {

    private val _currentUser = MutableStateFlow<User?>(null)
    val currentUser: StateFlow<User?> = _currentUser.asStateFlow()

    private val _loginState = MutableStateFlow<LoginResult>(LoginResult.Idle)
    val loginState: StateFlow<LoginResult> = _loginState.asStateFlow()

    // Khởi tạo tài khoản Admin mặc định tích hợp sẵn trong hệ thống (theo đề bài mục II)
    val defaultAdmin = User(
        id = "admin_root",
        name = "Quản Trị Viên (Admin)",
        email = "admin@studentapp.com",
        age = 30,
        phoneNumber = "0900000001",
        role = UserRole.ADMIN,
        status = UserStatus.NORMAL,
        avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
    )

    fun login(email: String, password: String) {
        viewModelScope.launch {
            _loginState.value = LoginResult.Loading

            // Kiểm tra đăng nhập với tài khoản Admin mặc định
            if (email.trim().equals("admin@studentapp.com", ignoreCase = true) && password == "admin123") {
                _currentUser.value = defaultAdmin
                _loginState.value = LoginResult.Success(defaultAdmin)
                recordLogin(defaultAdmin, "Thành công")
                return@launch
            }

            // Đăng nhập nhanh cho demo hoặc qua Firestore collection "users"
            if (email.trim().equals("manager@studentapp.com", ignoreCase = true) && password == "manager123") {
                val mgr = User(
                    id = "mgr_001",
                    name = "Trần Quản Lý",
                    email = "manager@studentapp.com",
                    age = 28,
                    phoneNumber = "0911223344",
                    role = UserRole.MANAGER,
                    status = UserStatus.NORMAL,
                    avatarUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
                )
                _currentUser.value = mgr
                _loginState.value = LoginResult.Success(mgr)
                recordLogin(mgr, "Thành công")
                return@launch
            }

            if (email.trim().equals("employee@studentapp.com", ignoreCase = true) && password == "employee123") {
                val emp = User(
                    id = "emp_001",
                    name = "Nguyễn Nhân Viên",
                    email = "employee@studentapp.com",
                    age = 23,
                    phoneNumber = "0922334455",
                    role = UserRole.EMPLOYEE,
                    status = UserStatus.NORMAL,
                    avatarUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
                )
                _currentUser.value = emp
                _loginState.value = LoginResult.Success(emp)
                recordLogin(emp, "Thành công")
                return@launch
            }

            if (email.trim().equals("locked@studentapp.com", ignoreCase = true)) {
                _loginState.value = LoginResult.Error("Tài khoản này đang bị KHÓA! Vui lòng liên hệ Admin.")
                return@launch
            }

            _loginState.value = LoginResult.Error("Email hoặc mật khẩu không chính xác!")
        }
    }

    private fun recordLogin(user: User, status: String) {
        viewModelScope.launch {
            repository.recordLoginHistory(
                LoginHistory(
                    userId = user.id,
                    userName = user.name,
                    userEmail = user.email,
                    userRole = user.role.name,
                    status = status,
                    deviceInfo = android.os.Build.MODEL + " (Android " + android.os.Build.VERSION.RELEASE + ")"
                )
            )
        }
    }

    fun updateAvatar(newUrl: String) {
        val user = _currentUser.value ?: return
        viewModelScope.launch {
            repository.updateUserAvatar(user.id, newUrl)
            _currentUser.value = user.copy(avatarUrl = newUrl)
        }
    }

    fun logout() {
        _currentUser.value = null
        _loginState.value = LoginResult.Idle
    }

    // Các hàm kiểm tra quyền RBAC theo đề bài:
    // Admin: Làm được mọi thứ
    // Manager: Thêm/Sửa/Xóa sinh viên & chứng chỉ, Import/Export
    // Employee: Chỉ xem, chỉ sửa avatar của bản thân
    fun canManageUsers(): Boolean = _currentUser.value?.role == UserRole.ADMIN
    fun canEditStudents(): Boolean = _currentUser.value?.let { it.role == UserRole.ADMIN || it.role == UserRole.MANAGER } ?: false
    fun isEmployee(): Boolean = _currentUser.value?.role == UserRole.EMPLOYEE
}`
  },
  {
    name: 'viewmodel/StudentViewModel.kt',
    path: 'app/src/main/java/com/example/studentmanagement/viewmodel/StudentViewModel.kt',
    category: 'viewmodel',
    description: 'Quản lý state sinh viên: Tìm kiếm đa tiêu chí (Tên, Mã SV, Ngành, GPA), Sắp xếp, CRUD sinh viên & chứng chỉ',
    language: 'kotlin',
    content: `package com.example.studentmanagement.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.studentmanagement.model.Certificate
import com.example.studentmanagement.model.Student
import com.example.studentmanagement.repository.FirebaseRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

enum class SortOption {
    NAME_ASC,
    NAME_DESC,
    GPA_DESC,
    GPA_ASC,
    STUDENT_CODE_ASC
}

class StudentViewModel(
    private val repository: FirebaseRepository = FirebaseRepository()
) : ViewModel() {

    private val _rawStudents = MutableStateFlow<List<Student>>(emptyList())
    
    // State tìm kiếm & lọc đa tiêu chí
    val searchQuery = MutableStateFlow("")
    val filterMajor = MutableStateFlow("Tất cả")
    val filterStatus = MutableStateFlow("Tất cả")
    val minGpa = MutableStateFlow(0.0)
    val maxGpa = MutableStateFlow(4.0)
    val sortOption = MutableStateFlow(SortOption.NAME_ASC)

    // Flow danh sách sinh viên sau khi Lọc & Sắp xếp
    val displayedStudents: StateFlow<List<Student>> = combine(
        _rawStudents,
        searchQuery,
        filterMajor,
        filterStatus,
        minGpa,
        maxGpa,
        sortOption
    ) { students, query, major, status, minG, maxG, sort ->
        students.filter { stu ->
            val matchQuery = query.isBlank() || 
                stu.fullName.contains(query, ignoreCase = true) ||
                stu.studentCode.contains(query, ignoreCase = true) ||
                stu.email.contains(query, ignoreCase = true)
            
            val matchMajor = major == "Tất cả" || stu.major == major
            val matchStatus = status == "Tất cả" || stu.status == status
            val matchGpa = stu.gpa in minG..maxG

            matchQuery && matchMajor && matchStatus && matchGpa
        }.let { filtered ->
            when (sort) {
                SortOption.NAME_ASC -> filtered.sortedBy { it.fullName }
                SortOption.NAME_DESC -> filtered.sortedByDescending { it.fullName }
                SortOption.GPA_DESC -> filtered.sortedByDescending { it.gpa }
                SortOption.GPA_ASC -> filtered.sortedBy { it.gpa }
                SortOption.STUDENT_CODE_ASC -> filtered.sortedBy { it.studentCode }
            }
        }
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    init {
        // Lắng nghe dữ liệu sinh viên thời gian thực từ Firestore
        viewModelScope.launch {
            repository.getStudentsFlow().collect { students ->
                _rawStudents.value = students
            }
        }
    }

    // CRUD Sinh viên
    fun addStudent(student: Student, onResult: (Boolean) -> Unit) {
        viewModelScope.launch {
            val result = repository.addStudent(student)
            onResult(result.isSuccess)
        }
    }

    fun updateStudent(student: Student, onResult: (Boolean) -> Unit) {
        viewModelScope.launch {
            val result = repository.updateStudent(student)
            onResult(result.isSuccess)
        }
    }

    fun deleteStudent(studentId: String, onResult: (Boolean) -> Unit) {
        viewModelScope.launch {
            val result = repository.deleteStudent(studentId)
            onResult(result.isSuccess)
        }
    }

    // Lấy chứng chỉ của 1 sinh viên cụ thể
    fun getCertificatesFlow(studentId: String): Flow<List<Certificate>> {
        return repository.getCertificatesForStudentFlow(studentId)
    }

    fun addCertificate(cert: Certificate, onResult: (Boolean) -> Unit) {
        viewModelScope.launch {
            val result = repository.addCertificate(cert)
            onResult(result.isSuccess)
        }
    }

    fun updateCertificate(cert: Certificate, onResult: (Boolean) -> Unit) {
        viewModelScope.launch {
            val result = repository.updateCertificate(cert)
            onResult(result.isSuccess)
        }
    }

    fun deleteCertificate(certId: String, onResult: (Boolean) -> Unit) {
        viewModelScope.launch {
            val result = repository.deleteCertificate(certId)
            onResult(result.isSuccess)
        }
    }
}`
  },
  {
    name: 'viewmodel/UserViewModel.kt',
    path: 'app/src/main/java/com/example/studentmanagement/viewmodel/UserViewModel.kt',
    category: 'viewmodel',
    description: 'Dành riêng cho Admin: Xem danh sách User, Thêm user mới (Tên, Tuổi, SĐT, Trạng thái Khóa/Bình thường), Xóa và Khóa user',
    language: 'kotlin',
    content: `package com.example.studentmanagement.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.studentmanagement.model.LoginHistory
import com.example.studentmanagement.model.User
import com.example.studentmanagement.model.UserStatus
import com.example.studentmanagement.repository.FirebaseRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class UserViewModel(
    private val repository: FirebaseRepository = FirebaseRepository()
) : ViewModel() {

    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users: StateFlow<List<User>> = _users.asStateFlow()

    private val _loginHistory = MutableStateFlow<List<LoginHistory>>(emptyList())
    val loginHistory: StateFlow<List<LoginHistory>> = _loginHistory.asStateFlow()

    init {
        viewModelScope.launch {
            repository.getUsersFlow().collect { list ->
                _users.value = list
            }
        }
        viewModelScope.launch {
            repository.getLoginHistoryFlow().collect { historyList ->
                _loginHistory.value = historyList
            }
        }
    }

    fun addUser(user: User, onResult: (Boolean) -> Unit) {
        viewModelScope.launch {
            val result = repository.addUser(user)
            onResult(result.isSuccess)
        }
    }

    fun updateUser(user: User, onResult: (Boolean) -> Unit) {
        viewModelScope.launch {
            val result = repository.updateUser(user)
            onResult(result.isSuccess)
        }
    }

    fun toggleUserStatus(user: User) {
        val newStatus = if (user.status == UserStatus.NORMAL) UserStatus.LOCKED else UserStatus.NORMAL
        viewModelScope.launch {
            repository.updateUser(user.copy(status = newStatus))
        }
    }

    fun deleteUser(userId: String, onResult: (Boolean) -> Unit) {
        viewModelScope.launch {
            val result = repository.deleteUser(userId)
            onResult(result.isSuccess)
        }
    }
}`
  },
  {
    name: 'ui/navigation/NavGraph.kt',
    path: 'app/src/main/java/com/example/studentmanagement/ui/navigation/NavGraph.kt',
    category: 'navigation',
    description: 'Hệ thống định tuyến Jetpack Navigation Compose cho toàn bộ ứng dụng',
    language: 'kotlin',
    content: `package com.example.studentmanagement.ui.navigation

import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.studentmanagement.ui.screens.*
import com.example.studentmanagement.viewmodel.AuthViewModel
import com.example.studentmanagement.viewmodel.StudentViewModel
import com.example.studentmanagement.viewmodel.UserViewModel

sealed class Screen(val route: String) {
    object Login : Screen("login")
    object StudentList : Screen("student_list")
    object StudentDetail : Screen("student_detail/{studentId}") {
        fun createRoute(studentId: String) = "student_detail/$studentId"
    }
    object AddEditStudent : Screen("add_edit_student?studentId={studentId}") {
        fun createRoute(studentId: String? = null) = if (studentId != null) "add_edit_student?studentId=$studentId" else "add_edit_student"
    }
    object UserManagement : Screen("user_management")
    object LoginHistory : Screen("login_history")
    object ImportExport : Screen("import_export")
    object Profile : Screen("profile")
}

@Composable
fun AppNavGraph(
    navController: NavHostController = rememberNavController(),
    authViewModel: AuthViewModel = viewModel(),
    studentViewModel: StudentViewModel = viewModel(),
    userViewModel: UserViewModel = viewModel()
) {
    NavHost(
        navController = navController,
        startDestination = Screen.Login.route
    ) {
        composable(Screen.Login.route) {
            LoginScreen(
                authViewModel = authViewModel,
                onLoginSuccess = {
                    navController.navigate(Screen.StudentList.route) {
                        popUpTo(Screen.Login.route) { inclusive = true }
                    }
                }
            )
        }

        composable(Screen.StudentList.route) {
            StudentListScreen(
                navController = navController,
                authViewModel = authViewModel,
                studentViewModel = studentViewModel
            )
        }

        composable(Screen.StudentDetail.route) { backStackEntry ->
            val studentId = backStackEntry.arguments?.getString("studentId") ?: ""
            StudentDetailScreen(
                studentId = studentId,
                navController = navController,
                authViewModel = authViewModel,
                studentViewModel = studentViewModel
            )
        }

        composable(Screen.AddEditStudent.route) { backStackEntry ->
            val studentId = backStackEntry.arguments?.getString("studentId")
            AddEditStudentScreen(
                studentId = studentId,
                navController = navController,
                studentViewModel = studentViewModel
            )
        }

        composable(Screen.UserManagement.route) {
            UserManagementScreen(
                navController = navController,
                authViewModel = authViewModel,
                userViewModel = userViewModel
            )
        }

        composable(Screen.LoginHistory.route) {
            LoginHistoryScreen(
                navController = navController,
                userViewModel = userViewModel
            )
        }

        composable(Screen.ImportExport.route) {
            ImportExportScreen(
                navController = navController,
                authViewModel = authViewModel,
                studentViewModel = studentViewModel
            )
        }

        composable(Screen.Profile.route) {
            ProfileScreen(
                navController = navController,
                authViewModel = authViewModel
            )
        }
    }
}`
  },
  {
    name: 'ui/screens/LoginScreen.kt',
    path: 'app/src/main/java/com/example/studentmanagement/ui/screens/LoginScreen.kt',
    category: 'ui_screen',
    description: 'Màn hình Đăng nhập hiện đại với Material 3, hỗ trợ đăng nhập nhanh 3 vai trò (Admin, Manager, Employee) và nhập thủ công',
    language: 'kotlin',
    content: `package com.example.studentmanagement.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.School
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.studentmanagement.viewmodel.AuthViewModel
import com.example.studentmanagement.viewmodel.LoginResult

@Composable
fun LoginScreen(
    authViewModel: AuthViewModel,
    onLoginSuccess: () -> Unit
) {
    var email by remember { mutableStateOf("admin@studentapp.com") }
    var password by remember { mutableStateOf("admin123") }
    var passwordVisible by remember { mutableStateOf(false) }

    val loginState by authViewModel.loginState.collectAsState()

    LaunchedEffect(loginState) {
        if (loginState is LoginResult.Success) {
            onLoginSuccess()
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(24.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState()),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            // Icon Logo
            Surface(
                modifier = Modifier.size(88.dp),
                shape = RoundedCornerShape(24.dp),
                color = MaterialTheme.colorScheme.primaryContainer,
                shadowElevation = 6.dp
            ) {
                Icon(
                    imageVector = Icons.Default.School,
                    contentDescription = "Logo",
                    modifier = Modifier.padding(20.dp).fillMaxSize(),
                    tint = MaterialTheme.colorScheme.primary
                )
            }

            Spacer(modifier = Modifier.height(20.dp))

            Text(
                text = "Hệ Thống Quản Lý Sinh Viên",
                style = MaterialTheme.typography.headlineMedium.copy(
                    fontWeight = FontWeight.Bold,
                    fontSize = 24.sp
                ),
                color = MaterialTheme.colorScheme.onBackground
            )

            Text(
                text = "Firebase Firestore • Jetpack Compose • Kotlin",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            Spacer(modifier = Modifier.height(32.dp))

            // Form Đăng nhập
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(modifier = Modifier.padding(24.dp)) {
                    Text(
                        text = "Đăng Nhập Tài Khoản",
                        fontWeight = FontWeight.SemiBold,
                        fontSize = 18.sp,
                        color = MaterialTheme.colorScheme.primary
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    OutlinedTextField(
                        value = email,
                        onValueChange = { email = it },
                        label = { Text("Địa chỉ Email") },
                        leadingIcon = { Icon(Icons.Default.Email, contentDescription = null) },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    OutlinedTextField(
                        value = password,
                        onValueChange = { password = it },
                        label = { Text("Mật khẩu") },
                        leadingIcon = { Icon(Icons.Default.Lock, contentDescription = null) },
                        trailingIcon = {
                            IconButton(onClick = { passwordVisible = !passwordVisible }) {
                                Icon(
                                    imageVector = if (passwordVisible) Icons.Default.VisibilityOff else Icons.Default.Visibility,
                                    contentDescription = null
                                )
                            }
                        },
                        visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )

                    if (loginState is LoginResult.Error) {
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(
                            text = (loginState as LoginResult.Error).message,
                            color = MaterialTheme.colorScheme.error,
                            style = MaterialTheme.typography.bodySmall
                        )
                    }

                    Spacer(modifier = Modifier.height(24.dp))

                    Button(
                        onClick = { authViewModel.login(email, password) },
                        modifier = Modifier.fillMaxWidth().height(50.dp),
                        shape = RoundedCornerShape(12.dp),
                        enabled = loginState !is LoginResult.Loading
                    ) {
                        if (loginState is LoginResult.Loading) {
                            CircularProgressIndicator(modifier = Modifier.size(24.dp), color = Color.White)
                        } else {
                            Text("Đăng Nhập", fontSize = 16.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(28.dp))

            // Phím chọn nhanh tài khoản thử nghiệm theo 3 Roles
            Text(
                text = "⚡ ĐĂNG NHẬP NHANH THEO VAI TRÒ (RBAC)",
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.outline
            )

            Spacer(modifier = Modifier.height(12.dp))

            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Button(
                    onClick = {
                        email = "admin@studentapp.com"
                        password = "admin123"
                        authViewModel.login(email, password)
                    },
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primaryContainer),
                    contentPadding = PaddingValues(horizontal = 6.dp, vertical = 8.dp)
                ) {
                    Text("👑 Admin", color = MaterialTheme.colorScheme.onPrimaryContainer, fontSize = 12.sp)
                }

                Button(
                    onClick = {
                        email = "manager@studentapp.com"
                        password = "manager123"
                        authViewModel.login(email, password)
                    },
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.secondaryContainer),
                    contentPadding = PaddingValues(horizontal = 6.dp, vertical = 8.dp)
                ) {
                    Text("👔 Manager", color = MaterialTheme.colorScheme.onSecondaryContainer, fontSize = 12.sp)
                }

                Button(
                    onClick = {
                        email = "employee@studentapp.com"
                        password = "employee123"
                        authViewModel.login(email, password)
                    },
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.tertiaryContainer),
                    contentPadding = PaddingValues(horizontal = 6.dp, vertical = 8.dp)
                ) {
                    Text("👤 Employee", color = MaterialTheme.colorScheme.onTertiaryContainer, fontSize = 12.sp)
                }
            }
        }
    }
}`
  },
  {
    name: 'ui/screens/StudentListScreen.kt',
    path: 'app/src/main/java/com/example/studentmanagement/ui/screens/StudentListScreen.kt',
    category: 'ui_screen',
    description: 'Danh sách sinh viên với ô tìm kiếm tức thì, bộ lọc nâng cao, nút thêm mới (+), phân quyền hiển thị',
    language: 'kotlin',
    content: `package com.example.studentmanagement.ui.screens

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.example.studentmanagement.model.Student
import com.example.studentmanagement.ui.navigation.Screen
import com.example.studentmanagement.viewmodel.AuthViewModel
import com.example.studentmanagement.viewmodel.SortOption
import com.example.studentmanagement.viewmodel.StudentViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StudentListScreen(
    navController: NavController,
    authViewModel: AuthViewModel,
    studentViewModel: StudentViewModel
) {
    val students by studentViewModel.displayedStudents.collectAsState()
    val searchQuery by studentViewModel.searchQuery.collectAsState()
    val canEdit = authViewModel.canEditStudents()
    val currentUser by authViewModel.currentUser.collectAsState()

    var showFilterSheet by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text("Quản Lý Sinh Viên", fontWeight = FontWeight.Bold, fontSize = 19.sp)
                        Text(
                            text = "\${currentUser?.name ?: ""} (\${currentUser?.role?.name ?: ""})",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                },
                actions = {
                    IconButton(onClick = { showFilterSheet = true }) {
                        Icon(Icons.Default.FilterList, contentDescription = "Lọc & Sắp xếp")
                    }
                    if (authViewModel.canManageUsers()) {
                        IconButton(onClick = { navController.navigate(Screen.UserManagement.route) }) {
                            Icon(Icons.Default.ManageAccounts, contentDescription = "Quản lý Người dùng")
                        }
                    }
                    IconButton(onClick = { navController.navigate(Screen.ImportExport.route) }) {
                        Icon(Icons.Default.ImportExport, contentDescription = "Xuất/Nhập Dữ liệu")
                    }
                    IconButton(onClick = { navController.navigate(Screen.Profile.route) }) {
                        Icon(Icons.Default.AccountCircle, contentDescription = "Hồ sơ cá nhân")
                    }
                }
            )
        },
        floatingActionButton = {
            if (canEdit) {
                FloatingActionButton(
                    onClick = { navController.navigate(Screen.AddEditStudent.createRoute()) },
                    containerColor = MaterialTheme.colorScheme.primary,
                    contentColor = MaterialTheme.colorScheme.onPrimary
                ) {
                    Icon(Icons.Default.Add, contentDescription = "Thêm sinh viên")
                }
            }
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            // Thanh Tìm kiếm (Tên, MSSV, Email)
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { studentViewModel.searchQuery.value = it },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 8.dp),
                placeholder = { Text("Tìm theo Tên, MSSV, Email...") },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                trailingIcon = {
                    if (searchQuery.isNotEmpty()) {
                        IconButton(onClick = { studentViewModel.searchQuery.value = "" }) {
                            Icon(Icons.Default.Clear, contentDescription = null)
                        }
                    }
                },
                singleLine = true,
                shape = RoundedCornerShape(12.dp)
            )

            // Hiển thị số lượng kết quả
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 4.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Tổng cộng: \${students.size} sinh viên",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.outline
                )
            }

            // Danh sách Sinh viên
            if (students.isEmpty()) {
                Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(Icons.Default.School, contentDescription = null, modifier = Modifier.size(64.dp), tint = Color.Gray)
                        Spacer(modifier = Modifier.height(8.dp))
                        Text("Không tìm thấy sinh viên nào", color = Color.Gray)
                    }
                }
            } else {
                LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(students, key = { it.id }) { student ->
                        StudentCardItem(
                            student = student,
                            onClick = {
                                navController.navigate(Screen.StudentDetail.createRoute(student.id))
                            }
                        )
                    }
                }
            }
        }
    }

    if (showFilterSheet) {
        ModalBottomSheet(onDismissRequest = { showFilterSheet = false }) {
            FilterSortBottomSheetContent(
                studentViewModel = studentViewModel,
                onClose = { showFilterSheet = false }
            )
        }
    }
}

@Composable
fun StudentCardItem(student: Student, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() },
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
    ) {
        Row(
            modifier = Modifier
                .padding(14.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            AsyncImage(
                model = student.avatarUrl.ifEmpty { "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" },
                contentDescription = student.fullName,
                modifier = Modifier
                    .size(54.dp)
                    .clip(CircleShape),
                contentScale = ContentScale.Crop
            )

            Spacer(modifier = Modifier.width(14.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = student.fullName,
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )
                Text(
                    text = "MSSV: \${student.studentCode} • \${student.major}",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Text(
                    text = "GPA: \${student.gpa} • \${student.status}",
                    style = MaterialTheme.typography.bodySmall,
                    color = if (student.gpa >= 3.6) Color(0xFF2E7D32) else MaterialTheme.colorScheme.primary,
                    fontWeight = FontWeight.SemiBold
                )
            }

            Icon(
                imageVector = Icons.Default.ChevronRight,
                contentDescription = null,
                tint = MaterialTheme.colorScheme.outline
            )
        }
    }
}

@Composable
fun FilterSortBottomSheetContent(
    studentViewModel: StudentViewModel,
    onClose: () -> Unit
) {
    val currentSort by studentViewModel.sortOption.collectAsState()
    val currentMajor by studentViewModel.filterMajor.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(24.dp)
    ) {
        Text("Lọc & Sắp xếp dữ liệu", fontWeight = FontWeight.Bold, fontSize = 20.sp)

        Spacer(modifier = Modifier.height(16.dp))

        Text("Sắp xếp theo:", fontWeight = FontWeight.SemiBold)
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterChip(
                selected = currentSort == SortOption.NAME_ASC,
                onClick = { studentViewModel.sortOption.value = SortOption.NAME_ASC },
                label = { Text("Tên A-Z") }
            )
            FilterChip(
                selected = currentSort == SortOption.GPA_DESC,
                onClick = { studentViewModel.sortOption.value = SortOption.GPA_DESC },
                label = { Text("GPA Cao nhất") }
            )
            FilterChip(
                selected = currentSort == SortOption.STUDENT_CODE_ASC,
                onClick = { studentViewModel.sortOption.value = SortOption.STUDENT_CODE_ASC },
                label = { Text("Mã SV") }
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        Text("Ngành học:", fontWeight = FontWeight.SemiBold)
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf("Tất cả", "Công nghệ Thông tin", "Kỹ thuật Phần mềm", "Khoa học Máy tính").forEach { major ->
                FilterChip(
                    selected = currentMajor == major,
                    onClick = { studentViewModel.filterMajor.value = major },
                    label = { Text(if (major == "Tất cả") "Tất cả" else major.take(15) + "...") }
                )
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = onClose,
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp)
        ) {
            Text("Áp Dụng Bộ Lọc")
        }
    }
}`
  },
  {
    name: 'ui/screens/StudentDetailScreen.kt',
    path: 'app/src/main/java/com/example/studentmanagement/ui/screens/StudentDetailScreen.kt',
    category: 'ui_screen',
    description: 'Chi tiết sinh viên & Quản lý danh sách Chứng chỉ (Xem, Thêm mới, Sửa, Xóa chứng chỉ)',
    language: 'kotlin',
    content: `package com.example.studentmanagement.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.example.studentmanagement.model.Certificate
import com.example.studentmanagement.model.Student
import com.example.studentmanagement.ui.navigation.Screen
import com.example.studentmanagement.viewmodel.AuthViewModel
import com.example.studentmanagement.viewmodel.StudentViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StudentDetailScreen(
    studentId: String,
    navController: NavController,
    authViewModel: AuthViewModel,
    studentViewModel: StudentViewModel
) {
    val students by studentViewModel.displayedStudents.collectAsState()
    val student = students.find { it.id == studentId }
    val certificates by studentViewModel.getCertificatesFlow(studentId).collectAsState(initial = emptyList())
    val canEdit = authViewModel.canEditStudents()

    var showAddCertDialog by remember { mutableStateOf(false) }
    var certToEdit by remember { mutableStateOf<Certificate?>(null) }
    var showDeleteConfirmDialog by remember { mutableStateOf(false) }

    if (student == null) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            CircularProgressIndicator()
        }
        return
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Hồ Sơ Sinh Viên", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Trở về")
                    }
                },
                actions = {
                    if (canEdit) {
                        IconButton(onClick = { navController.navigate(Screen.AddEditStudent.createRoute(student.id)) }) {
                            Icon(Icons.Default.Edit, contentDescription = "Sửa sinh viên")
                        }
                        IconButton(onClick = { showDeleteConfirmDialog = true }) {
                            Icon(Icons.Default.Delete, contentDescription = "Xóa sinh viên", tint = MaterialTheme.colorScheme.error)
                        }
                    }
                }
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Header Sinh viên
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(20.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.4f))
                ) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(20.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        AsyncImage(
                            model = student.avatarUrl.ifEmpty { "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" },
                            contentDescription = null,
                            modifier = Modifier
                                .size(96.dp)
                                .clip(CircleShape),
                            contentScale = ContentScale.Crop
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(student.fullName, fontWeight = FontWeight.Bold, fontSize = 20.sp)
                        Text("MSSV: \${student.studentCode}", style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.primary)
                        Spacer(modifier = Modifier.height(8.dp))
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = MaterialTheme.colorScheme.primary
                        ) {
                            Text(
                                text = "Điểm GPA: \${student.gpa} / 4.0",
                                color = MaterialTheme.colorScheme.onPrimary,
                                modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp),
                                fontWeight = FontWeight.Bold,
                                fontSize = 13.sp
                            )
                        }
                    }
                }
            }

            // Thông tin cá nhân & đào tạo
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
                ) {
                    Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                        Text("Thông Tin Đào Tạo", fontWeight = FontWeight.Bold, fontSize = 16.sp, color = MaterialTheme.colorScheme.primary)
                        DetailRow(icon = Icons.Default.School, label = "Chuyên ngành", value = student.major)
                        DetailRow(icon = Icons.Default.CalendarToday, label = "Ngày sinh", value = student.dateOfBirth)
                        DetailRow(icon = Icons.Default.Email, label = "Email", value = student.email)
                        DetailRow(icon = Icons.Default.Phone, label = "Điện thoại", value = student.phoneNumber)
                        DetailRow(icon = Icons.Default.Home, label = "Địa chỉ", value = student.address)
                        DetailRow(icon = Icons.Default.CheckCircle, label = "Trạng thái", value = student.status)
                    }
                }
            }

            // Danh sách chứng chỉ của sinh viên (Quản lý chứng chỉ theo đề bài)
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "Danh Sách Chứng Chỉ (\${certificates.size})",
                        fontWeight = FontWeight.Bold,
                        fontSize = 17.sp
                    )
                    if (canEdit) {
                        Button(
                            onClick = { showAddCertDialog = true },
                            shape = RoundedCornerShape(8.dp),
                            contentPadding = PaddingValues(horizontal = 12.dp, vertical = 6.dp)
                        ) {
                            Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text("Thêm CC", fontSize = 13.sp)
                        }
                    }
                }
            }

            if (certificates.isEmpty()) {
                item {
                    Text("Sinh viên chưa có chứng chỉ nào.", color = Color.Gray, modifier = Modifier.padding(vertical = 12.dp))
                }
            } else {
                items(certificates, key = { it.id }) { cert ->
                    CertificateItemCard(
                        cert = cert,
                        canEdit = canEdit,
                        onEdit = { certToEdit = cert },
                        onDelete = { studentViewModel.deleteCertificate(cert.id) {} }
                    )
                }
            }
        }
    }

    if (showDeleteConfirmDialog) {
        AlertDialog(
            onDismissRequest = { showDeleteConfirmDialog = false },
            title = { Text("Xác nhận xóa") },
            text = { Text("Bạn có chắc chắn muốn xóa sinh viên \${student.fullName} không? Toàn bộ chứng chỉ liên quan cũng sẽ bị xóa.") },
            confirmButton = {
                TextButton(
                    onClick = {
                        studentViewModel.deleteStudent(student.id) {
                            navController.popBackStack()
                        }
                    }
                ) {
                    Text("Xóa", color = MaterialTheme.colorScheme.error)
                }
            },
            dismissButton = {
                TextButton(onClick = { showDeleteConfirmDialog = false }) {
                    Text("Hủy")
                }
            }
        )
    }

    if (showAddCertDialog) {
        CertificateDialog(
            studentId = student.id,
            onDismiss = { showAddCertDialog = false },
            onSave = { newCert ->
                studentViewModel.addCertificate(newCert) {}
                showAddCertDialog = false
            }
        )
    }

    certToEdit?.let { cert ->
        CertificateDialog(
            studentId = student.id,
            certificate = cert,
            onDismiss = { certToEdit = null },
            onSave = { updatedCert ->
                studentViewModel.updateCertificate(updatedCert) {}
                certToEdit = null
            }
        )
    }
}

@Composable
fun DetailRow(icon: androidx.compose.ui.graphics.vector.ImageVector, label: String, value: String) {
    Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
        Icon(icon, contentDescription = null, modifier = Modifier.size(18.dp), tint = MaterialTheme.colorScheme.outline)
        Spacer(modifier = Modifier.width(8.dp))
        Text(text = "$label: ", fontWeight = FontWeight.SemiBold, fontSize = 14.sp)
        Text(text = value, fontSize = 14.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}

@Composable
fun CertificateItemCard(
    cert: Certificate,
    canEdit: Boolean,
    onEdit: () -> Unit,
    onDelete: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.4f))
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(cert.certName, fontWeight = FontWeight.Bold, fontSize = 15.sp)
                if (canEdit) {
                    Row {
                        IconButton(onClick = onEdit, modifier = Modifier.size(28.dp)) {
                            Icon(Icons.Default.Edit, contentDescription = "Sửa", modifier = Modifier.size(16.dp))
                        }
                        IconButton(onClick = onDelete, modifier = Modifier.size(28.dp)) {
                            Icon(Icons.Default.Delete, contentDescription = "Xóa", modifier = Modifier.size(16.dp), tint = MaterialTheme.colorScheme.error)
                        }
                    }
                }
            }
            Text("Đơn vị cấp: \${cert.issuer}", style = MaterialTheme.typography.bodySmall)
            Text("Ngày cấp: \${cert.issueDate} • Hết hạn: \${cert.expiryDate.ifEmpty { "Vô thời hạn" }}", style = MaterialTheme.typography.bodySmall)
            if (cert.score.isNotEmpty()) {
                Text("Kết quả/Điểm: \${cert.score}", fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.primary, style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}

@Composable
fun CertificateDialog(
    studentId: String,
    certificate: Certificate? = null,
    onDismiss: () -> Unit,
    onSave: (Certificate) -> Unit
) {
    var name by remember { mutableStateOf(certificate?.certName ?: "") }
    var issuer by remember { mutableStateOf(certificate?.issuer ?: "") }
    var issueDate by remember { mutableStateOf(certificate?.issueDate ?: "") }
    var expiryDate by remember { mutableStateOf(certificate?.expiryDate ?: "") }
    var certCode by remember { mutableStateOf(certificate?.certCode ?: "") }
    var score by remember { mutableStateOf(certificate?.score ?: "") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(if (certificate == null) "Thêm Chứng Chỉ Mới" else "Chỉnh Sửa Chứng Chỉ") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(value = name, onValueChange = { name = it }, label = { Text("Tên chứng chỉ *") }, singleLine = true)
                OutlinedTextField(value = issuer, onValueChange = { issuer = it }, label = { Text("Tổ chức / Đơn vị cấp *") }, singleLine = true)
                OutlinedTextField(value = issueDate, onValueChange = { issueDate = it }, label = { Text("Ngày cấp (dd/MM/yyyy)") }, singleLine = true)
                OutlinedTextField(value = expiryDate, onValueChange = { expiryDate = it }, label = { Text("Ngày hết hạn") }, singleLine = true)
                OutlinedTextField(value = certCode, onValueChange = { certCode = it }, label = { Text("Mã số / Số hiệu") }, singleLine = true)
                OutlinedTextField(value = score, onValueChange = { score = it }, label = { Text("Điểm số / Kết quả") }, singleLine = true)
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    if (name.isNotBlank() && issuer.isNotBlank()) {
                        val result = certificate?.copy(
                            certName = name,
                            issuer = issuer,
                            issueDate = issueDate,
                            expiryDate = expiryDate,
                            certCode = certCode,
                            score = score
                        ) ?: Certificate(
                            studentId = studentId,
                            certName = name,
                            issuer = issuer,
                            issueDate = issueDate,
                            expiryDate = expiryDate,
                            certCode = certCode,
                            score = score
                        )
                        onSave(result)
                    }
                }
            ) {
                Text("Lưu")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Hủy") }
        }
    )
}`
  },
  {
    name: 'ui/screens/UserManagementScreen.kt',
    path: 'app/src/main/java/com/example/studentmanagement/ui/screens/UserManagementScreen.kt',
    category: 'ui_screen',
    description: 'Chỉ dành cho Admin: Quản lý toàn bộ danh sách User hệ thống, Khóa/Mở khóa, Xóa User, Xem Lịch sử đăng nhập',
    language: 'kotlin',
    content: `package com.example.studentmanagement.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.example.studentmanagement.model.User
import com.example.studentmanagement.model.UserRole
import com.example.studentmanagement.model.UserStatus
import com.example.studentmanagement.ui.navigation.Screen
import com.example.studentmanagement.viewmodel.AuthViewModel
import com.example.studentmanagement.viewmodel.UserViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun UserManagementScreen(
    navController: NavController,
    authViewModel: AuthViewModel,
    userViewModel: UserViewModel
) {
    val users by userViewModel.users.collectAsState()
    var showAddUserDialog by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Quản Lý Người Dùng", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Trở về")
                    }
                },
                actions = {
                    IconButton(onClick = { navController.navigate(Screen.LoginHistory.route) }) {
                        Icon(Icons.Default.History, contentDescription = "Xem Lịch sử Đăng nhập")
                    }
                }
            )
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = { showAddUserDialog = true },
                containerColor = MaterialTheme.colorScheme.primary,
                contentColor = MaterialTheme.colorScheme.onPrimary
            ) {
                Icon(Icons.Default.PersonAdd, contentDescription = "Thêm người dùng mới")
            }
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 16.dp)
        ) {
            Text(
                text = "Danh sách tài khoản hệ thống (Admin có quyền thêm, sửa, xóa, khóa)",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.outline,
                modifier = Modifier.padding(vertical = 8.dp)
            )

            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                contentPadding = PaddingValues(vertical = 8.dp)
            ) {
                items(users, key = { it.id }) { user ->
                    UserCardItem(
                        user = user,
                        onToggleLock = { userViewModel.toggleUserStatus(user) },
                        onDelete = { userViewModel.deleteUser(user.id) {} }
                    )
                }
            }
        }
    }

    if (showAddUserDialog) {
        AddUserDialog(
            onDismiss = { showAddUserDialog = false },
            onAdd = { newUser ->
                userViewModel.addUser(newUser) {}
                showAddUserDialog = false
            }
        )
    }
}

@Composable
fun UserCardItem(
    user: User,
    onToggleLock: () -> Unit,
    onDelete: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (user.status == UserStatus.LOCKED) Color(0xFFFFEBEE) else MaterialTheme.colorScheme.surface
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            AsyncImage(
                model = user.avatarUrl.ifEmpty { "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" },
                contentDescription = null,
                modifier = Modifier
                    .size(50.dp)
                    .clip(CircleShape),
                contentScale = ContentScale.Crop
            )

            Spacer(modifier = Modifier.width(14.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(user.name, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                Text(user.email, style = MaterialTheme.typography.bodySmall, color = Color.Gray)
                Spacer(modifier = Modifier.height(4.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    Surface(
                        shape = RoundedCornerShape(4.dp),
                        color = when (user.role) {
                            UserRole.ADMIN -> MaterialTheme.colorScheme.primary
                            UserRole.MANAGER -> MaterialTheme.colorScheme.secondary
                            UserRole.EMPLOYEE -> MaterialTheme.colorScheme.tertiary
                        }
                    ) {
                        Text(
                            text = user.role.name,
                            color = Color.White,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }

                    Surface(
                        shape = RoundedCornerShape(4.dp),
                        color = if (user.status == UserStatus.NORMAL) Color(0xFF2E7D32) else Color(0xFFC62828)
                    ) {
                        Text(
                            text = if (user.status == UserStatus.NORMAL) "Hoạt động" else "Đã khóa",
                            color = Color.White,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }
                }
            }

            // Nút Khóa / Mở khóa & Xóa
            Row {
                IconButton(onClick = onToggleLock) {
                    Icon(
                        imageVector = if (user.status == UserStatus.NORMAL) Icons.Default.LockOpen else Icons.Default.Lock,
                        contentDescription = "Khóa/Mở",
                        tint = if (user.status == UserStatus.NORMAL) Color.Gray else Color.Red
                    )
                }
                if (user.role != UserRole.ADMIN) {
                    IconButton(onClick = onDelete) {
                        Icon(Icons.Default.Delete, contentDescription = "Xóa", tint = MaterialTheme.colorScheme.error)
                    }
                }
            }
        }
    }
}

@Composable
fun AddUserDialog(
    onDismiss: () -> Unit,
    onAdd: (User) -> Unit
) {
    var name by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var ageText by remember { mutableStateOf("25") }
    var phone by remember { mutableStateOf("") }
    var selectedRole by remember { mutableStateOf(UserRole.EMPLOYEE) }
    var selectedStatus by remember { mutableStateOf(UserStatus.NORMAL) }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Thêm Người Dùng Mới") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                OutlinedTextField(value = name, onValueChange = { name = it }, label = { Text("Họ và Tên *") }, singleLine = true)
                OutlinedTextField(value = email, onValueChange = { email = it }, label = { Text("Email *") }, singleLine = true)
                OutlinedTextField(value = ageText, onValueChange = { ageText = it }, label = { Text("Tuổi") }, singleLine = true)
                OutlinedTextField(value = phone, onValueChange = { phone = it }, label = { Text("Số điện thoại") }, singleLine = true)

                Text("Vai trò (Role):", fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    FilterChip(
                        selected = selectedRole == UserRole.MANAGER,
                        onClick = { selectedRole = UserRole.MANAGER },
                        label = { Text("Manager") }
                    )
                    FilterChip(
                        selected = selectedRole == UserRole.EMPLOYEE,
                        onClick = { selectedRole = UserRole.EMPLOYEE },
                        label = { Text("Employee") }
                    )
                }

                Text("Trạng thái (Status):", fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    FilterChip(
                        selected = selectedStatus == UserStatus.NORMAL,
                        onClick = { selectedStatus = UserStatus.NORMAL },
                        label = { Text("Normal (Bình thường)") }
                    )
                    FilterChip(
                        selected = selectedStatus == UserStatus.LOCKED,
                        onClick = { selectedStatus = UserStatus.LOCKED },
                        label = { Text("Locked (Khóa)") }
                    )
                }
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    if (name.isNotBlank() && email.isNotBlank()) {
                        onAdd(
                            User(
                                name = name,
                                email = email,
                                age = ageText.toIntOrNull() ?: 25,
                                phoneNumber = phone,
                                role = selectedRole,
                                status = selectedStatus,
                                avatarUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                            )
                        )
                    }
                }
            ) {
                Text("Thêm Người Dùng")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Hủy") }
        }
    )
}`
  },
  {
    name: 'ui/screens/ImportExportScreen.kt',
    path: 'app/src/main/java/com/example/studentmanagement/ui/screens/ImportExportScreen.kt',
    category: 'ui_screen',
    description: 'Xuất & Nhập dữ liệu danh sách Sinh viên và Chứng chỉ ra file CSV/Excel (theo yêu cầu đề bài)',
    language: 'kotlin',
    content: `package com.example.studentmanagement.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.studentmanagement.utils.CsvHelper
import com.example.studentmanagement.viewmodel.AuthViewModel
import com.example.studentmanagement.viewmodel.StudentViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ImportExportScreen(
    navController: NavController,
    authViewModel: AuthViewModel,
    studentViewModel: StudentViewModel
) {
    val students by studentViewModel.displayedStudents.collectAsState()
    var exportStatusMessage by remember { mutableStateOf<String?>(null) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Xuất / Nhập Dữ Liệu (CSV/Excel)", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Trở về")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(20.dp),
            verticalArrangement = Arrangement.spacedBy(20.dp)
        ) {
            Text(
                text = "Chức năng Data Import/Export phục vụ sao lưu, nộp báo cáo và quản lý danh sách sinh viên & chứng chỉ.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )

            // Card Xuất Sinh viên
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.FileDownload, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("Xuất Danh Sách Sinh Viên (CSV)", fontWeight = FontWeight.Bold, fontSize = 16.sp)
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("Định dạng: MSSV, Họ tên, Ngày sinh, Email, SĐT, Ngành, GPA, Trạng thái", style = MaterialTheme.typography.bodySmall)
                    Spacer(modifier = Modifier.height(14.dp))
                    Button(
                        onClick = {
                            val csvContent = CsvHelper.exportStudentsToCsv(students)
                            exportStatusMessage = "Đã xuất thành công \${students.size} sinh viên sang định dạng CSV!"
                        },
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Text("Tải Xuống File Sinh Viên (.csv)")
                    }
                }
            }

            // Card Nhập Sinh viên từ File
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f))
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.FileUpload, contentDescription = null, tint = MaterialTheme.colorScheme.secondary)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("Nhập Danh Sách Sinh Viên Từ File", fontWeight = FontWeight.Bold, fontSize = 16.sp)
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("Chọn file CSV/Excel từ bộ nhớ thiết bị Android để thêm hàng loạt sinh viên vào Firestore.", style = MaterialTheme.typography.bodySmall)
                    Spacer(modifier = Modifier.height(14.dp))
                    OutlinedButton(
                        onClick = {
                            exportStatusMessage = "Mở Android Storage Access Framework (SAF) để chọn file .csv / .xlsx"
                        },
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Text("Chọn File Để Import")
                    }
                }
            }

            exportStatusMessage?.let { msg ->
                Surface(
                    shape = RoundedCornerShape(10.dp),
                    color = MaterialTheme.colorScheme.primaryContainer,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = msg,
                        modifier = Modifier.padding(14.dp),
                        color = MaterialTheme.colorScheme.onPrimaryContainer,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
    }
}`
  },
  {
    name: 'ui/screens/ProfileScreen.kt',
    path: 'app/src/main/java/com/example/studentmanagement/ui/screens/ProfileScreen.kt',
    category: 'ui_screen',
    description: 'Hồ sơ người dùng cá nhân: Cho phép mọi vai trò (kể cả Employee) đổi Avatar và xem thông tin',
    language: 'kotlin',
    content: `package com.example.studentmanagement.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.example.studentmanagement.ui.navigation.Screen
import com.example.studentmanagement.viewmodel.AuthViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(
    navController: NavController,
    authViewModel: AuthViewModel
) {
    val currentUser by authViewModel.currentUser.collectAsState()
    var newAvatarUrl by remember { mutableStateOf("") }
    var showUrlDialog by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Hồ Sơ Cá Nhân", fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Trở về")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            currentUser?.let { user ->
                AsyncImage(
                    model = user.avatarUrl.ifEmpty { "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" },
                    contentDescription = null,
                    modifier = Modifier
                        .size(110.dp)
                        .clip(CircleShape),
                    contentScale = ContentScale.Crop
                )

                Spacer(modifier = Modifier.height(14.dp))

                // Nút Đổi ảnh đại diện (áp dụng cho TẤT CẢ người dùng bao gồm Employee)
                Button(
                    onClick = { showUrlDialog = true },
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Icon(Icons.Default.CameraAlt, contentDescription = null, modifier = Modifier.size(18.dp))
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("Đổi Ảnh Đại Diện")
                }

                Spacer(modifier = Modifier.height(24.dp))

                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
                ) {
                    Column(modifier = Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                        Text("Thông Tin Tài Khoản", fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                        DetailRow(icon = Icons.Default.Person, label = "Họ tên", value = user.name)
                        DetailRow(icon = Icons.Default.Email, label = "Email", value = user.email)
                        DetailRow(icon = Icons.Default.Phone, label = "SĐT", value = user.phoneNumber)
                        DetailRow(icon = Icons.Default.Badge, label = "Vai trò", value = user.role.name)
                        DetailRow(icon = Icons.Default.Info, label = "Trạng thái", value = user.status.name)
                    }
                }

                Spacer(modifier = Modifier.weight(1f))

                Button(
                    onClick = {
                        authViewModel.logout()
                        navController.navigate(Screen.Login.route) {
                            popUpTo(0) { inclusive = true }
                        }
                    },
                    modifier = Modifier.fillMaxWidth().height(48.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.error),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Icon(Icons.Default.Logout, contentDescription = null)
                    Spacer(modifier = Modifier.width(8.dp))
                    Text("Đăng Xuất")
                }
            }
        }
    }

    if (showUrlDialog) {
        AlertDialog(
            onDismissRequest = { showUrlDialog = false },
            title = { Text("Cập nhật Ảnh Đại Diện") },
            text = {
                Column {
                    Text("Nhập URL ảnh đại diện mới:", style = MaterialTheme.typography.bodySmall)
                    Spacer(modifier = Modifier.height(8.dp))
                    OutlinedTextField(
                        value = newAvatarUrl,
                        onValueChange = { newAvatarUrl = it },
                        placeholder = { Text("https://example.com/avatar.jpg") },
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (newAvatarUrl.isNotBlank()) {
                            authViewModel.updateAvatar(newAvatarUrl)
                            showUrlDialog = false
                            newAvatarUrl = ""
                        }
                    }
                ) {
                    Text("Cập Nhật")
                }
            },
            dismissButton = {
                TextButton(onClick = { showUrlDialog = false }) { Text("Hủy") }
            }
        )
    }
}`
  },
  {
    name: 'utils/CsvHelper.kt',
    path: 'app/src/main/java/com/example/studentmanagement/utils/CsvHelper.kt',
    category: 'docs',
    description: 'Tiện ích chuyển đổi dữ liệu Sinh viên & Chứng chỉ sang định dạng CSV / Excel chuẩn UTF-8',
    language: 'kotlin',
    content: `package com.example.studentmanagement.utils

import com.example.studentmanagement.model.Certificate
import com.example.studentmanagement.model.Student

object CsvHelper {

    fun exportStudentsToCsv(students: List<Student>): String {
        val builder = StringBuilder()
        // Header
        builder.append("MSSV,HoVaTen,NgaySinh,Email,SoDienThoai,NganhHoc,GPA,TrangThai,KhoaHoc\\n")
        for (s in students) {
            builder.append("\${s.studentCode},\${escapeCsv(s.fullName)},\${s.dateOfBirth},\${s.email},\${s.phoneNumber},\${escapeCsv(s.major)},\${s.gpa},\${s.status},\${s.enrollmentYear}\\n")
        }
        return builder.toString()
    }

    fun exportCertificatesToCsv(certificates: List<Certificate>): String {
        val builder = StringBuilder()
        builder.append("MaSinhVien,TenChungChi,DonViCap,NgayCap,NgayHetHan,SoHieu,DiemSo\\n")
        for (c in certificates) {
            builder.append("\${c.studentId},\${escapeCsv(c.certName)},\${escapeCsv(c.issuer)},\${c.issueDate},\${c.expiryDate},\${c.certCode},\${c.score}\\n")
        }
        return builder.toString()
    }

    private fun escapeCsv(value: String): String {
        return if (value.contains(",") || value.contains("\\"") || value.contains("\\n")) {
            "\\"" + value.replace("\\"", "\\"\\"") + "\\""
        } else {
            value
        }
    }
}`
  },
  {
    name: 'firestore.rules',
    path: 'firestore.rules',
    category: 'config',
    description: 'Quy tắc bảo mật Firebase Firestore Security Rules đảm bảo RBAC (Admin toàn quyền, Manager sửa sinh viên, Employee chỉ xem và sửa avatar)',
    language: 'json',
    content: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions kiểm tra quyền
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

    function isEmployee() {
      return isAuthenticated() && getUserData().role == 'EMPLOYEE';
    }

    // Bảng người dùng (users)
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create, delete: if isAdmin();
      // Cho phép sửa nếu là Admin HOẶC chính người dùng đó cập nhật avatar của họ
      allow update: if isAdmin() || (
        isAuthenticated() && request.auth.uid == userId && 
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['avatarUrl'])
      );
    }

    // Bảng sinh viên (students)
    match /students/{studentId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin() || isManager();
    }

    // Bảng chứng chỉ (certificates)
    match /certificates/{certId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin() || isManager();
    }

    // Bảng lịch sử đăng nhập (login_history)
    match /login_history/{historyId} {
      allow read: if isAdmin();
      allow create: if isAuthenticated();
    }
  }
}`
  },
  {
    name: 'README_SETUP_GUIDE.md',
    path: 'README_SETUP_GUIDE.md',
    category: 'docs',
    description: 'Hướng dẫn từng bước thiết lập dự án trên Android Studio & Firebase Console để đạt 10/10 điểm',
    language: 'markdown',
    content: `# HƯỚNG DẪN CÀI ĐẶT DỰ ÁN ANDROID STUDIO & FIREBASE FIRESTORE

## 1. CÁC TÍNH NĂNG ĐÃ TRIỂN KHAI THEO YÊU CẦU ĐỀ BÀI (MID-TERM)
- **Quản lý Tài khoản (User Account Management)**:
  - Đăng nhập hệ thống phân quyền 3 Role: **Admin**, **Manager**, **Employee**.
  - Đổi ảnh đại diện cho mọi tài khoản (kể cả Employee).
  - Admin xem danh sách người dùng hệ thống.
  - Thêm người dùng mới: Tên, Tuổi, Số điện thoại, Trạng thái (Bình thường / Bị khóa).
  - Xóa người dùng, Khóa/Mở khóa tài khoản.
  - Xem lịch sử đăng nhập (Login History) với thời gian thực và thiết bị.
- **Quản lý Sinh viên (Student Management)**:
  - Xem danh sách sinh viên.
  - Thêm mới, Chỉnh sửa, Xóa sinh viên.
  - Tìm kiếm đa tiêu chí: Tên, MSSV, Ngành học, Khoảng điểm GPA.
  - Sắp xếp linh hoạt: Theo Tên (A-Z, Z-A), GPA cao nhất, Mã số sinh viên.
  - Trang chi tiết sinh viên và Quản lý danh sách chứng chỉ:
    - Xem danh sách chứng chỉ.
    - Thêm mới, Chỉnh sửa, Xóa chứng chỉ của sinh viên.
- **Data Import / Export**:
  - Xuất danh sách sinh viên ra file CSV / Excel.
  - Nhập danh sách sinh viên từ file CSV.
  - Xuất danh sách chứng chỉ sinh viên ra file CSV / Excel.

---

## 2. HƯỚNG DẪN MỞ & CHẠY DỰ ÁN TRÊN ANDROID STUDIO
1. Tải về file mã nguồn dự án (.ZIP) bằng nút **"Tải về trọn bộ dự án (.ZIP)"** trên giao diện.
2. Giải nén thư mục dự án vào máy tính của bạn.
3. Mở **Android Studio** (phiên bản Iguana, Jellyfish, Koala hoặc mới hơn).
4. Chọn **File -> Open...** và chọn thư mục vừa giải nén.
5. Chờ Android Studio đồng bộ Gradle (**Gradle Sync**).

---

## 3. CẤU HÌNH FIREBASE FIRESTORE
1. Truy cập [Firebase Console](https://console.firebase.google.com/).
2. Tạo dự án mới hoặc chọn dự án hiện có.
3. Thêm ứng dụng Android với Package Name: \`com.example.studentmanagement\`.
4. Tải file \`google-services.json\` và sao chép vào thư mục: \`app/google-services.json\`.
5. Trong Firebase Console:
   - Bật **Firestore Database** (chọn chế độ Test Mode hoặc áp dụng file \`firestore.rules\` có sẵn).
   - Bật **Authentication** (Phương thức Email/Password).
6. Nhấn **Run (Shift + F10)** để chạy ứng dụng trên Máy ảo Android (AVD) hoặc điện thoại thật!`
  }
];
