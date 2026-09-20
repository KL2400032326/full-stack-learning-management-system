export const adminStats = [
  { key: 'users', title: 'Total Users', value: '24,891', route: '/admin/users', color: 'from-sky-500 to-blue-600' },
  { key: 'courses', title: 'Total Courses', value: '1,284', route: '/admin/courses', color: 'from-indigo-500 to-blue-600' },
  { key: 'students', title: 'Total Students', value: '19,530', route: '/admin/students', color: 'from-emerald-500 to-teal-600' },
  { key: 'instructors', title: 'Total Instructors', value: '332', route: '/admin/instructors', color: 'from-cyan-500 to-sky-600' },
  { key: 'revenue', title: 'Revenue', value: '$184,900', route: '/admin/analytics', color: 'from-amber-500 to-orange-600' },
  { key: 'pending', title: 'Pending Approvals', value: '28', route: '/admin/content', color: 'from-rose-500 to-red-600' }
]

export const usersSeed = [
  { id: 1, name: 'Ava Stewart', email: 'ava@lms.com', role: 'admin', status: 'Active' },
  { id: 2, name: 'Noah Flores', email: 'noah@lms.com', role: 'instructor', status: 'Active' },
  { id: 3, name: 'Emma Kim', email: 'emma@lms.com', role: 'student', status: 'Inactive' },
  { id: 4, name: 'Liam Woods', email: 'liam@lms.com', role: 'creator', status: 'Active' },
  { id: 5, name: 'Olivia Lane', email: 'olivia@lms.com', role: 'student', status: 'Active' },
  { id: 6, name: 'Mason Cole', email: 'mason@lms.com', role: 'instructor', status: 'Active' }
]

export const coursesSeed = [
  { id: 1, name: 'Advanced React Architecture', instructor: 'Noah Flores', students: 430, status: 'Published' },
  { id: 2, name: 'Spring Boot Enterprise APIs', instructor: 'Mason Cole', students: 370, status: 'Pending' },
  { id: 3, name: 'Data Analytics with Python', instructor: 'Mia Fox', students: 520, status: 'Published' },
  { id: 4, name: 'UX Design Systems', instructor: 'Ava Stewart', students: 310, status: 'Draft' }
]

export const instructorsSeed = [
  { id: 1, name: 'Noah Flores', expertise: 'Frontend Systems', courses: 8, status: 'Active' },
  { id: 2, name: 'Mason Cole', expertise: 'Backend Architecture', courses: 6, status: 'Active' },
  { id: 3, name: 'Mia Fox', expertise: 'Data Science', courses: 4, status: 'Inactive' }
]

export const studentsSeed = [
  { id: 1, name: 'Emma Kim', enrolled: 6, progress: '72%', status: 'Active' },
  { id: 2, name: 'Leo Hart', enrolled: 4, progress: '49%', status: 'Active' },
  { id: 3, name: 'Nina Roy', enrolled: 8, progress: '88%', status: 'Active' },
  { id: 4, name: 'Aria Blake', enrolled: 2, progress: '15%', status: 'Inactive' }
]

export const pendingContentSeed = [
  { id: 1, course: 'Cloud Security Foundations', instructor: 'Chris Hall', submittedAt: '2026-02-18' },
  { id: 2, course: 'Product Analytics Masterclass', instructor: 'Dana Cruz', submittedAt: '2026-02-17' },
  { id: 3, course: 'Advanced SQL Performance', instructor: 'Mason Cole', submittedAt: '2026-02-15' }
]

export const analyticsGrowth = [
  { month: 'Jan', users: 2200, courses: 80, revenue: 32000 },
  { month: 'Feb', users: 2700, courses: 110, revenue: 45000 },
  { month: 'Mar', users: 3400, courses: 150, revenue: 61000 },
  { month: 'Apr', users: 3900, courses: 180, revenue: 74000 },
  { month: 'May', users: 4600, courses: 230, revenue: 91000 },
  { month: 'Jun', users: 5100, courses: 280, revenue: 108000 }
]

export const notificationsSeed = [
  { id: 1, title: 'New instructor onboarding request', time: '5m ago', type: 'Action Required' },
  { id: 2, title: '28 courses waiting for approval', time: '40m ago', type: 'System' },
  { id: 3, title: 'Daily report generated successfully', time: '2h ago', type: 'Report' }
]

export const inboxSeed = [
  { id: 1, from: 'Support Team', subject: 'Escalated payment ticket', unread: true },
  { id: 2, from: 'Instructor Noah', subject: 'Course launch request', unread: false },
  { id: 3, from: 'Security Bot', subject: 'Weekly access audit', unread: true }
]

export const reportSeed = [
  { id: 1, name: 'Monthly Revenue Report', format: 'PDF', generated: '2026-02-19' },
  { id: 2, name: 'User Activity Report', format: 'CSV', generated: '2026-02-19' },
  { id: 3, name: 'Course Completion Summary', format: 'XLSX', generated: '2026-02-18' }
]
