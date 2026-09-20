export const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'instructor', label: 'Instructor' },
  { value: 'student', label: 'Student' },
  { value: 'creator', label: 'Content Creator' }
]

export const statCards = {
  admin: [
    { label: 'Total Users', value: '24,891', trend: '+12.4%' },
    { label: 'Total Courses', value: '1,284', trend: '+4.1%' },
    { label: 'Monthly Revenue', value: '$184,900', trend: '+9.6%' },
    { label: 'Active Instructors', value: '332', trend: '+2.0%' }
  ],
  instructor: [
    { label: 'My Courses', value: '18', trend: '+3' },
    { label: 'Total Students', value: '3,420', trend: '+8.3%' },
    { label: 'Revenue', value: '$47,210', trend: '+5.1%' },
    { label: 'Completion Rate', value: '87%', trend: '+1.8%' }
  ],
  student: [
    { label: 'Enrolled Courses', value: '12', trend: '+2' },
    { label: 'Completed', value: '6', trend: '+1' },
    { label: 'Average Score', value: '91%', trend: '+2.4%' },
    { label: 'Learning Hours', value: '248h', trend: '+11h' }
  ],
  creator: [
    { label: 'Created Assets', value: '94', trend: '+14' },
    { label: 'Published Content', value: '66', trend: '+8' },
    { label: 'Views', value: '128k', trend: '+16.2%' },
    { label: 'Engagement', value: '74%', trend: '+3.2%' }
  ]
}

export const revenueData = [
  { month: 'Jan', value: 12000, learners: 410 },
  { month: 'Feb', value: 18000, learners: 520 },
  { month: 'Mar', value: 26000, learners: 760 },
  { month: 'Apr', value: 22000, learners: 680 },
  { month: 'May', value: 30000, learners: 880 },
  { month: 'Jun', value: 35800, learners: 960 },
  { month: 'Jul', value: 41800, learners: 1110 }
]

export const progressData = [
  { week: 'W1', progress: 32 },
  { week: 'W2', progress: 48 },
  { week: 'W3', progress: 57 },
  { week: 'W4', progress: 68 },
  { week: 'W5', progress: 78 },
  { week: 'W6', progress: 86 }
]

export const activityFeed = [
  { id: 1, actor: 'Maya Green', message: 'Published "React Architecture Mastery"', time: '2 mins ago' },
  { id: 2, actor: 'System', message: '30 new students enrolled in Data Analytics', time: '25 mins ago' },
  { id: 3, actor: 'Admin', message: 'Approved 4 pending courses', time: '1 hour ago' },
  { id: 4, actor: 'Leo Hart', message: 'Submitted assignment in UX Prototyping', time: '2 hours ago' }
]

export const users = [
  { id: 1, name: 'Ava Stewart', email: 'ava@lms.com', role: 'admin', status: 'Active' },
  { id: 2, name: 'Noah Flores', email: 'noah@lms.com', role: 'instructor', status: 'Active' },
  { id: 3, name: 'Emma Kim', email: 'emma@lms.com', role: 'student', status: 'Inactive' },
  { id: 4, name: 'Liam Woods', email: 'liam@lms.com', role: 'creator', status: 'Active' }
]

export const courseCatalog = [
  { id: 'c1', title: 'Advanced React Patterns', instructor: 'Noah Flores', rating: 4.9, price: 89, category: 'Development', progress: 64 },
  { id: 'c2', title: 'UI Systems for Scale', instructor: 'Ava Stewart', rating: 4.8, price: 99, category: 'Design', progress: 26 },
  { id: 'c3', title: 'Python for Data Science', instructor: 'Mia Fox', rating: 4.7, price: 79, category: 'Data', progress: 12 },
  { id: 'c4', title: 'Spring Boot Enterprise', instructor: 'Chris Ray', rating: 4.9, price: 119, category: 'Backend', progress: 0 }
]

export const lessons = [
  { id: 'l1', title: 'Course Welcome', duration: '08:22', completed: true },
  { id: 'l2', title: 'High-level Architecture', duration: '14:40', completed: true },
  { id: 'l3', title: 'State Boundaries', duration: '21:08', completed: false },
  { id: 'l4', title: 'Reusable Patterns', duration: '18:12', completed: false }
]

export const notificationsSeed = [
  { id: 1, title: 'New Course Approved', desc: 'Your course was approved by admin.', time: '10m', unread: true },
  { id: 2, title: 'Assignment Due', desc: 'UI Design assignment due tomorrow.', time: '1h', unread: true },
  { id: 3, title: 'Weekly Summary', desc: 'Your weekly analytics report is ready.', time: '3h', unread: false }
]

export const messages = [
  { id: 1, from: 'Instructor Noah', to: 'Emma Kim', text: 'Please update your assignment section 3.', time: '09:10' },
  { id: 2, from: 'Emma Kim', to: 'Instructor Noah', text: 'Updated and re-submitted. Kindly review.', time: '09:20' }
]

export const calendarEvents = [
  { id: 1, day: 'Mon', title: 'Live Session - React', time: '10:00 AM' },
  { id: 2, day: 'Tue', title: 'Assignment Deadline', time: '05:00 PM' },
  { id: 3, day: 'Thu', title: 'Mentor 1:1', time: '12:30 PM' }
]

export const roleLabels = {
  admin: 'Admin',
  instructor: 'Instructor',
  student: 'Student',
  creator: 'Content Creator'
}
