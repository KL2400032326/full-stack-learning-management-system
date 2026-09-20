import { Home, ShieldCheck, BookOpen, Users, Settings, LayoutDashboard, Upload, ClipboardList, UserSquare2, FileVideo, Bell, MessageCircle, CalendarDays, LineChart, UserCog } from 'lucide-react'

export const menuByRole = {
  admin: [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Manage Users', icon: Users },
    { to: '/admin/courses', label: 'Manage Courses', icon: BookOpen },
    { to: '/admin/roles', label: 'Manage Roles', icon: ShieldCheck },
    { to: '/admin/settings', label: 'Platform Settings', icon: Settings }
  ],
  instructor: [
    { to: '/instructor', label: 'Dashboard', icon: Home },
    { to: '/instructor/create-course', label: 'Create Course', icon: BookOpen },
    { to: '/instructor/course-management', label: 'Course Management', icon: ClipboardList },
    { to: '/instructor/assignments', label: 'Assignments', icon: FileVideo },
    { to: '/instructor/students', label: 'Student List', icon: Users }
  ],
  student: [
    { to: '/student', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/student/catalog', label: 'Course Catalog', icon: BookOpen },
    { to: '/student/submission', label: 'Assignment Submission', icon: Upload },
    { to: '/student/progress', label: 'My Progress', icon: LineChart }
  ],
  creator: [
    { to: '/creator', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/creator/upload', label: 'Upload Content', icon: Upload },
    { to: '/creator/edit', label: 'Edit Content', icon: UserCog },
    { to: '/creator/versions', label: 'Version History', icon: ClipboardList }
  ]
}

export const sharedMenu = [
  { to: '/profile', label: 'Profile', icon: UserSquare2 },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/messages', label: 'Messages', icon: MessageCircle },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/timeline', label: 'Timeline', icon: LineChart }
]
