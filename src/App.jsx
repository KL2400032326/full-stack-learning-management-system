import { Navigate, Route, Routes } from 'react-router-dom'

import AdminLayout from './components/admin/AdminLayout'
import CreatorLayout from './components/creator/CreatorLayout'
import InstructorLayout from './components/instructor/InstructorLayout'
import StudentLayout from './components/student/StudentLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'

import Login from './pages/Login'
import OAuthSuccess from './pages/OAuthSuccess'
import Landing from './pages/Landing'
import RoleSelect from './pages/RoleSelect'
import Signup from './pages/Signup'

import AdminDashboard from './pages/admin/AdminDashboard'
import Analytics from './pages/admin/Analytics'
import ContentApproval from './pages/admin/ContentApproval'
import ManageCourses from './pages/admin/ManageCourses'
import ManageInstructors from './pages/admin/ManageInstructors'
import ManageStudents from './pages/admin/ManageStudents'
import ManageUsers from './pages/admin/ManageUsers'
import Profile from './pages/admin/Profile'
import Reports from './pages/admin/Reports'
import Settings from './pages/admin/Settings'

import CreatorAnalytics from './pages/creator/Analytics'
import CreatorDashboard from './pages/creator/CreatorDashboard'
import EditContent from './pages/creator/EditContent'
import MyContent from './pages/creator/MyContent'
import CreatorProfile from './pages/creator/Profile'
import UploadContent from './pages/creator/UploadContent'

import InstructorAnalytics from './pages/instructor/Analytics'
import CreateCourse from './pages/instructor/CreateCourse'
import InstructorDashboard from './pages/instructor/InstructorDashboard'
import MyInstructorCourses from './pages/instructor/MyCourses'
import InstructorProfile from './pages/instructor/Profile'
import Students from './pages/instructor/Students'
import UploadVideo from './pages/instructor/UploadVideo'

import Certificates from './pages/student/Certificates'
import CoursePlayer from './pages/student/CoursePlayer'
import MyCourses from './pages/student/MyCourses'
import Progress from './pages/student/Progress'
import StudentProfile from './pages/student/Profile'
import StudentDashboard from './pages/student/StudentDashboard'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/roles" element={<RoleSelect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />

      {/* ADMIN */}
      <Route
        element={
          <ProtectedRoute allowedRole="admin" />
        }
      >
        <Route
          element={<AdminLayout />}
        >
          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/users"
            element={<ManageUsers />}
          />

          <Route
            path="/admin/courses"
            element={<ManageCourses />}
          />

          <Route
            path="/admin/instructors"
            element={<ManageInstructors />}
          />

          <Route
            path="/admin/students"
            element={<ManageStudents />}
          />

          <Route
            path="/admin/content"
            element={<ContentApproval />}
          />

          <Route
            path="/admin/analytics"
            element={<Analytics />}
          />

          <Route
            path="/admin/reports"
            element={<Reports />}
          />

          <Route
            path="/admin/settings"
            element={<Settings />}
          />

          <Route
            path="/admin/profile"
            element={<Profile />}
          />
        </Route>
      </Route>

      {/* INSTRUCTOR */}
      <Route
        element={
          <ProtectedRoute allowedRole="instructor" />
        }
      >
        <Route
          element={<InstructorLayout />}
        >
          <Route
            path="/instructor-dashboard"
            element={<InstructorDashboard />}
          />

          <Route
            path="/instructor/courses"
            element={<MyInstructorCourses />}
          />

          <Route
            path="/instructor/create-course"
            element={<CreateCourse />}
          />

          <Route
            path="/instructor/upload-video/:courseId"
            element={<UploadVideo />}
          />

          <Route
            path="/instructor/students"
            element={<Students />}
          />

          <Route
            path="/instructor/analytics"
            element={<InstructorAnalytics />}
          />

          <Route
            path="/instructor/profile"
            element={<InstructorProfile />}
          />
        </Route>
      </Route>

      {/* STUDENT */}
      <Route
        element={
          <ProtectedRoute allowedRole="student" />
        }
      >
        <Route
          element={<StudentLayout />}
        >
          <Route
            path="/student-dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="/student/courses"
            element={<MyCourses />}
          />

          <Route
            path="/student/progress"
            element={<Progress />}
          />

          <Route
            path="/student/certificates"
            element={<Certificates />}
          />

          <Route
            path="/student/profile"
            element={<StudentProfile />}
          />

          <Route
            path="/student/course/:courseId"
            element={<CoursePlayer />}
          />
        </Route>
      </Route>

      {/* CREATOR */}
      <Route
        element={
          <ProtectedRoute allowedRole="creator" />
        }
      >
        <Route
          element={<CreatorLayout />}
        >
          <Route
            path="/creator-dashboard"
            element={<CreatorDashboard />}
          />

          <Route
            path="/creator/content"
            element={<MyContent />}
          />

          <Route
            path="/creator/upload"
            element={<UploadContent />}
          />

          <Route
            path="/creator/edit/:contentId"
            element={<EditContent />}
          />

          <Route
            path="/creator/analytics"
            element={<CreatorAnalytics />}
          />

          <Route
            path="/creator/profile"
            element={<CreatorProfile />}
          />
        </Route>
      </Route>

      {/* Old login routes */}
      <Route
        path="/admin-login"
        element={<Navigate to="/" replace />}
      />

      <Route
        path="/instructor-login"
        element={<Navigate to="/" replace />}
      />

      <Route
        path="/student-login"
        element={<Navigate to="/" replace />}
      />

      <Route
        path="/creator-login"
        element={<Navigate to="/" replace />}
      />

      {/* Unknown route */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  )
}

export default App