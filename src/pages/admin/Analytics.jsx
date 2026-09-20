import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
import { getStoredUser } from '../../services/authService'

const STATUS_COLORS = ['#118cff', '#f59e0b', '#ef4444', '#10b981']
const BASE_URL = 'http://localhost:2026'

const ChartCard = ({ title, children }) => (
  <div className="card h-[340px] p-4">
    <h3 className="mb-3 font-display text-lg">{title}</h3>
    <ResponsiveContainer width="100%" height="88%">{children}</ResponsiveContainer>
  </div>
)

const MetricCard = ({ label, value }) => (
  <div className="card">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
  </div>
)

const Analytics = () => {
  const [analytics, setAnalytics] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAdminData()
  }, [])

  const getToken = () =>
    localStorage.getItem('token') ||
    localStorage.getItem('lms-token') ||
    localStorage.getItem('userToken')

  const fetchAdminData = async () => {
    try {
      setLoading(true)
      setError('')

      const token = getToken()
      const role = (getStoredUser()?.role || localStorage.getItem('userRole') || '').toUpperCase()

      if (!token) {
        throw new Error('Your session has expired. Please log in again.')
      }

      if (role !== 'ADMIN') {
        throw new Error('Admin access is required to view analytics.')
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      const analyticsRes = await axios.get(`${BASE_URL}/api/admin/analytics`, { headers })
      setAnalytics(analyticsRes.data || {})
      console.log('Analytics:', analyticsRes.data)
    } catch (err) {
      console.error('Admin Fetch Error:', err.response || err)
      setAnalytics({})
      setError(err.response?.data?.message || err.message || 'Unable to load analytics.')
    } finally {
      setLoading(false)
    }
  }

  const chartData = useMemo(() => ({
    roleBuckets: Array.isArray(analytics.roleBuckets) ? analytics.roleBuckets : [],
    courseStatusBuckets: Array.isArray(analytics.courseStatusBuckets) ? analytics.courseStatusBuckets : [],
    videoStatusBuckets: Array.isArray(analytics.videoStatusBuckets) ? analytics.videoStatusBuckets : [],
    topCourses: Array.isArray(analytics.topCourses) ? analytics.topCourses : []
  }), [analytics])

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Analytics</h1>
        <p className="page-subtitle">Live backend analytics for users, courses, videos and approval queues</p>
      </div>

      {error ? <p className="card text-rose-600">{error}</p> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total Users" value={analytics.totalUsers || 0} />
        <MetricCard label="Total Courses" value={analytics.totalCourses || 0} />
        <MetricCard label="Total Videos" value={analytics.totalVideos || 0} />
        <MetricCard label="Pending Approvals" value={analytics.pendingApprovals || 0} />
      </div>

      {loading ? <p className="card text-sm text-slate-500">Loading analytics...</p> : null}

      {!loading ? (
        <div className="grid gap-4 xl:grid-cols-3">
          <ChartCard title="Users By Role">
            <BarChart data={chartData.roleBuckets}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#118cff" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartCard>

          <ChartCard title="Courses By Approval Status">
            <PieChart>
              <Pie data={chartData.courseStatusBuckets} dataKey="value" nameKey="name" outerRadius={100} label>
                {chartData.courseStatusBuckets.map((entry, index) => <Cell key={entry.name} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ChartCard>

          <ChartCard title="Videos By Approval Status">
            <BarChart data={chartData.videoStatusBuckets}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartCard>

          <div className="xl:col-span-3">
            <ChartCard title="Top Courses By Videos And Enrollments">
              <AreaChart data={chartData.topCourses}>
                <defs>
                  <linearGradient id="videosGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.08} />
                  </linearGradient>
                  <linearGradient id="studentsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.08} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="course" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area type="monotone" dataKey="videos" stroke="#06b6d4" fill="url(#videosGrad)" />
                <Area type="monotone" dataKey="students" stroke="#f59e0b" fill="url(#studentsGrad)" />
              </AreaChart>
            </ChartCard>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Analytics
