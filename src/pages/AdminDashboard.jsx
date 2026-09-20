import RoleDashboardShell from '../components/lms/RoleDashboardShell'

const stats = [
  { label: 'Total Users', value: '24,891', color: '#118cff' },
  { label: 'Courses', value: '1,284', color: '#0ea5e9' },
  { label: 'Revenue', value: '$184K', color: '#10b981' },
  { label: 'Tickets', value: '42', color: '#f97316' }
]

const chartData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 52 },
  { name: 'Mar', value: 48 },
  { name: 'Apr', value: 61 },
  { name: 'May', value: 70 },
  { name: 'Jun', value: 78 }
]

const AdminDashboard = () => (
  <RoleDashboardShell
    roleName="Admin"
    title="Admin Dashboard"
    stats={stats}
    lineData={chartData}
    areaData={chartData}
  />
)

export default AdminDashboard
