export const ROLE_CONFIG = {
  admin: {
    role: 'admin',
    name: 'Admin Dashboard',
    description: 'Manage users, courses, roles and platform settings.',
    loginPath: '/admin-login',
    dashboardPath: '/admin-dashboard',
    demoEmail: 'admin@lms.com'
  },
  instructor: {
    role: 'instructor',
    name: 'Instructor Dashboard',
    description: 'Create courses, review assignments and track students.',
    loginPath: '/instructor-login',
    dashboardPath: '/instructor-dashboard',
    demoEmail: 'instructor@lms.com'
  },
  student: {
    role: 'student',
    name: 'Student Dashboard',
    description: 'Track learning progress and manage enrolled courses.',
    loginPath: '/student-login',
    dashboardPath: '/student-dashboard',
    demoEmail: 'student@lms.com'
  },
  creator: {
    role: 'creator',
    name: 'Content Creator Dashboard',
    description: 'Upload and maintain premium course media assets.',
    loginPath: '/creator-login',
    dashboardPath: '/creator-dashboard',
    demoEmail: 'creator@lms.com'
  }
}

export const ROLE_LIST = [ROLE_CONFIG.admin, ROLE_CONFIG.instructor, ROLE_CONFIG.student, ROLE_CONFIG.creator]
