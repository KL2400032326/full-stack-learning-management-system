import { LayoutDashboard, Users, BookOpen, GraduationCap, UserSquare2, ClipboardCheck, LineChart, FileText, Settings, User, LogOut, Shield } from 'lucide-react'

export const adminMenu = [
  { label: 'Dashboard', path: '/admin-dashboard', icon: LayoutDashboard },
  { label: 'Manage Users', path: '/admin/users', icon: Users },
  { label: 'Manage Courses', path: '/admin/courses', icon: BookOpen },
  { label: 'Manage Instructors', path: '/admin/instructors', icon: GraduationCap },
  { label: 'Manage Students', path: '/admin/students', icon: UserSquare2 },
  { label: 'Content Approval', path: '/admin/content', icon: ClipboardCheck },
  { label: 'Analytics', path: '/admin/analytics', icon: LineChart },
  { label: 'Reports', path: '/admin/reports', icon: FileText },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
  { label: 'Profile', path: '/admin/profile', icon: User },
  { label: 'Logout', path: '/admin-login', icon: LogOut, isLogout: true }
]

export const sidebarBrand = {
  name: 'LMS Control',
  subtitle: 'Admin Command Center',
  icon: Shield
}
