import RoleDashboardShell from '../components/lms/RoleDashboardShell'

const stats = [
  { label: 'My Courses', value: '18', color: '#118cff' },
  { label: 'Students', value: '3,420', color: '#0ea5e9' },
  { label: 'Earnings', value: '$47K', color: '#10b981' },
  { label: 'Avg Rating', value: '4.8', color: '#f59e0b' }
]

const chartData = [
  { name: 'Jan', value: 25 },
  { name: 'Feb', value: 38 },
  { name: 'Mar', value: 44 },
  { name: 'Apr', value: 58 },
  { name: 'May', value: 65 },
  { name: 'Jun', value: 72 }
]

const InstructorDashboard = () => (
  <RoleDashboardShell
    roleName="Instructor"
    title="Instructor Dashboard"
    stats={stats}
    lineData={chartData}
    areaData={chartData}
  />
)

export default InstructorDashboard
