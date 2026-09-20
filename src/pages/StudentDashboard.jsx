import RoleDashboardShell from '../components/lms/RoleDashboardShell'

const stats = [
  { label: 'Enrolled Courses', value: '12', color: '#118cff' },
  { label: 'Completed', value: '6', color: '#0ea5e9' },
  { label: 'Learning Hours', value: '248h', color: '#10b981' },
  { label: 'Streak', value: '26 days', color: '#f97316' }
]

const chartData = [
  { name: 'Jan', value: 18 },
  { name: 'Feb', value: 26 },
  { name: 'Mar', value: 35 },
  { name: 'Apr', value: 47 },
  { name: 'May', value: 62 },
  { name: 'Jun', value: 74 }
]

const StudentDashboard = () => (
  <RoleDashboardShell
    roleName="Student"
    title="Student Dashboard"
    stats={stats}
    lineData={chartData}
    areaData={chartData}
  />
)

export default StudentDashboard
