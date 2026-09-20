import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { getStoredUser } from '../../services/authService'

const BASE_URL = 'http://localhost:2026'

const SummaryCard = ({ label, value }) => (
  <div className="card">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
  </div>
)

const Reports = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
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
        throw new Error('Admin access is required to view reports.')
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      const reportsRes = await axios.get(`${BASE_URL}/api/admin/reports`, { headers })
      setReports(Array.isArray(reportsRes.data) ? reportsRes.data : [])
      console.log('Reports:', reportsRes.data)
    } catch (err) {
      console.error('Admin Fetch Error:', err.response || err)
      setReports([])
      setError(err.response?.data?.message || err.message || 'Unable to load reports.')
    } finally {
      setLoading(false)
    }
  }

  const downloadExcel = async () => {
    try {
      setDownloading(true)

      const token = getToken()
      if (!token) {
        throw new Error('Your session has expired. Please log in again.')
      }

      const response = await fetch(`${BASE_URL}/api/admin/reports/download`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Unable to download reports.')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'reports.xlsx'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed', err)
      setError(err.message || 'Unable to download reports.')
    } finally {
      setDownloading(false)
    }
  }

  const report = useMemo(() => {
    const overview = reports.find(item => item.id === 'overview')
    const instructors = reports.find(item => item.id === 'instructors')
    const courses = reports.find(item => item.id === 'courses')
    const items = Array.isArray(overview?.items) ? overview.items : []
    const lookupValue = label => items.find(item => item.label === label)?.value || 0

    return {
      totalUsers: lookupValue('Total Users'),
      totalStudents: lookupValue('Total Students'),
      totalInstructors: lookupValue('Total Instructors'),
      totalCreators: lookupValue('Total Creators'),
      totalCourses: lookupValue('Total Courses'),
      approvedCourses: lookupValue('Approved Courses'),
      rejectedCourses: lookupValue('Rejected Courses'),
      pendingCourses: lookupValue('Pending Courses'),
      pendingVideos: lookupValue('Pending Videos'),
      totalVideos: lookupValue('Total Videos'),
      totalEnrollments: lookupValue('Total Enrollments'),
      pendingApprovals: lookupValue('Pending Approvals'),
      summaryItems: items,
      instructorRows: Array.isArray(instructors?.rows) ? instructors.rows : [],
      courseRows: Array.isArray(courses?.rows) ? courses.rows : []
    }
  }, [reports])

  return (
    <div className="page">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="page-title">Reports</h1>
          <p className="page-subtitle">Backend-driven admin report summary</p>
        </div>
        <button
          type="button"
          onClick={downloadExcel}
          disabled={downloading}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
        >
          {downloading ? 'Downloading...' : 'Download Excel'}
        </button>
      </div>

      {error ? <p className="card text-rose-600">{error}</p> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <SummaryCard label="Total Users" value={report.totalUsers} />
        <SummaryCard label="Total Courses" value={report.totalCourses} />
        <SummaryCard label="Total Videos" value={report.totalVideos} />
        <SummaryCard label="Total Enrollments" value={report.totalEnrollments} />
        <SummaryCard label="Pending Approvals" value={report.pendingApprovals} />
      </div>

      {loading ? <p className="card text-sm text-slate-500">Loading reports...</p> : null}

      {!loading ? (
        <>
          <div className="grid gap-4 xl:grid-cols-2">
            <div className="card overflow-x-auto p-0">
              <div className="border-b px-4 py-3">
                <h2 className="font-display text-lg">Platform Summary</h2>
              </div>
              <table className="w-full text-left text-sm">
                <tbody>
                  {[
                    ['Students', report.totalStudents],
                    ['Instructors', report.totalInstructors],
                    ['Creators', report.totalCreators],
                    ['Approved Courses', report.approvedCourses],
                    ['Rejected Courses', report.rejectedCourses],
                    ['Pending Courses', report.pendingCourses],
                    ['Pending Videos', report.pendingVideos]
                  ].map(([label, value]) => (
                    <tr key={label} className="border-t">
                      <td className="px-4 py-3 font-medium">{label}</td>
                      <td className="px-4 py-3">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card overflow-x-auto p-0">
              <div className="border-b px-4 py-3">
                <h2 className="font-display text-lg">Instructor Report</h2>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60">
                  <tr>{['Instructor', 'Courses', 'Videos', 'Enrollments'].map(label => <th key={label} className="px-4 py-3">{label}</th>)}</tr>
                </thead>
                <tbody>
                  {report.instructorRows.map(item => (
                    <tr key={item.id} className="border-t">
                      <td className="px-4 py-3">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.email}</p>
                      </td>
                      <td className="px-4 py-3">{item.courses}</td>
                      <td className="px-4 py-3">{item.videos}</td>
                      <td className="px-4 py-3">{item.enrollments}</td>
                    </tr>
                  ))}
                  {report.instructorRows.length === 0 ? (
                    <tr className="border-t">
                      <td className="px-4 py-3 text-slate-500" colSpan="4">No instructors found.</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card overflow-x-auto p-0">
            <div className="border-b px-4 py-3">
              <h2 className="font-display text-lg">Course Report</h2>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60">
                <tr>{['Course', 'Instructor', 'Status', 'Videos', 'Enrollments'].map(label => <th key={label} className="px-4 py-3">{label}</th>)}</tr>
              </thead>
              <tbody>
                {report.courseRows.map(item => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3 font-medium">{item.title}</td>
                    <td className="px-4 py-3">{item.instructor}</td>
                    <td className="px-4 py-3">{item.status}</td>
                    <td className="px-4 py-3">{item.videos}</td>
                    <td className="px-4 py-3">{item.enrollments}</td>
                  </tr>
                ))}
                {report.courseRows.length === 0 ? (
                  <tr className="border-t">
                    <td className="px-4 py-3 text-slate-500" colSpan="5">No courses found.</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Reports
