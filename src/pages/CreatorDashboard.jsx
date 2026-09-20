import RoleDashboardShell from '../components/lms/RoleDashboardShell'

const stats = [
  { label: 'Uploaded Assets', value: '94', color: '#118cff' },
  { label: 'Published', value: '66', color: '#0ea5e9' },
  { label: 'Views', value: '128K', color: '#10b981' },
  { label: 'Engagement', value: '74%', color: '#f59e0b' }
]

const chartData = [
  { name: 'Jan', value: 22 },
  { name: 'Feb', value: 30 },
  { name: 'Mar', value: 42 },
  { name: 'Apr', value: 55 },
  { name: 'May', value: 68 },
  { name: 'Jun', value: 81 }
]

const CreatorDashboard = () => (
  <RoleDashboardShell
    roleName="Content Creator"
    title="Content Creator Dashboard"
    stats={stats}
    lineData={chartData}
    areaData={chartData}
  />
)

export default CreatorDashboard
