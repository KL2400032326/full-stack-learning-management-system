import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Trash2, Users } from 'lucide-react'
import { getStoredUser } from '../../services/authService'

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:2026/api').replace(/\/api$/, '')

const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])
  const [instructors, setInstructors] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const adminName = getStoredUser()?.name || 'Admin'

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      setLoading(true)
      setErrorMessage('')

      const token =
        localStorage.getItem('token') ||
        localStorage.getItem('lms-token') ||
        localStorage.getItem('userToken')

      if (!token) {
        setUsers([])
        setCourses([])
        setInstructors([])
        setStudents([])
        setErrorMessage('Your session has expired. Please log in again.')
        window.location.href = '/login'
        return
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }

      const [usersRes, coursesRes, instructorsRes, studentsRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/admin/users`, { headers }),
        axios.get(`${BASE_URL}/api/admin/courses`, { headers }),
        axios.get(`${BASE_URL}/api/admin/instructors`, { headers }),
        axios.get(`${BASE_URL}/api/admin/students`, { headers })
      ])

      console.log('Users:', usersRes.data)
      console.log('Courses:', coursesRes.data)
      console.log('Instructors:', instructorsRes.data)
      console.log('Students:', studentsRes.data)
      console.log('Admin Data Loaded Successfully')

      console.log('Admin instructors:', instructorsRes.data)
      console.log('Admin students:', studentsRes.data)

      setUsers(Array.isArray(usersRes.data) ? usersRes.data : [])
      setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : [])
      setInstructors(Array.isArray(instructorsRes.data) ? instructorsRes.data : [])
      setStudents(Array.isArray(studentsRes.data) ? studentsRes.data : [])
    } catch (error) {
      console.error('Admin Fetch Error:', error.response || error)
      setUsers([])
      setCourses([])
      setInstructors([])
      setStudents([])
      setErrorMessage('Unable to load admin dashboard data.')
    } finally {
      setLoading(false)
    }
  }

  const roleCounts = useMemo(() => {
    return users.reduce(
      (acc, user) => {
        const role = (user.role || '').toLowerCase()
        acc.total += 1
        if (role === 'student') acc.students += 1
        if (role === 'instructor') acc.instructors += 1
        if (role === 'creator') acc.creators += 1
        return acc
      },
      { total: 0, students: 0, instructors: 0, creators: 0 }
    )
  }, [users])

  const handleDelete = async id => {
    try {
      setDeletingId(id)
      const token =
        localStorage.getItem('token') ||
        localStorage.getItem('lms-token') ||
        localStorage.getItem('userToken')

      await axios.delete(`${BASE_URL}/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      setUsers(prev => prev.filter(user => user.id !== id))
      window.alert('User deleted')
    } catch {
      window.alert('Error deleting user')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Welcome {adminName}</h1>
        <p className="page-subtitle">Admin Dashboard</p>
      </div>

      {errorMessage ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{errorMessage}</p> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="card">
          <p className="text-sm text-slate-500">Total Users</p>
          <p className="mt-2 font-display text-3xl font-semibold">{roleCounts.total}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Students</p>
          <p className="mt-2 font-display text-3xl font-semibold">{students.length || roleCounts.students}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Instructors</p>
          <p className="mt-2 font-display text-3xl font-semibold">{instructors.length || roleCounts.instructors}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Total Courses</p>
          <p className="mt-2 font-display text-3xl font-semibold">{courses.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Creators</p>
          <p className="mt-2 font-display text-3xl font-semibold">{roleCounts.creators}</p>
        </div>
      </div>

      <div className="card">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen size={18} className="text-primary-600" />
          <h2 className="font-display text-xl">Backend Courses</h2>
        </div>

        {loading ? <p className="text-sm text-slate-500">Loading courses...</p> : null}
        {!loading && courses.length === 0 ? <p className="text-sm text-slate-500">No courses found.</p> : null}

        <div className="space-y-3">
          {courses && courses.length > 0
            ? courses.slice(0, 6).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="rounded-2xl border p-4"
              >
                <p className="font-medium">{course.title || 'Untitled course'}</p>
                <p className="text-sm text-slate-500">{course.description || 'No description available.'}</p>
                <p className="text-xs uppercase tracking-wide text-slate-400">{course.createdByName || 'No instructor assigned'}</p>
              </motion.div>
            ))
            : !loading
              ? <p className="text-sm text-slate-500">No courses found.</p>
              : null}
        </div>
      </div>

      <div className="card">
        <div className="mb-4 flex items-center gap-2">
          <Users size={18} className="text-primary-600" />
          <h2 className="font-display text-xl">All Users</h2>
        </div>

        {loading ? <p className="text-sm text-slate-500">Loading users...</p> : null}
        {!loading && users.length === 0 ? <p className="text-sm text-slate-500">No users found.</p> : null}

        <div className="space-y-3">
          {users && users.length > 0
            ? users.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4"
              >
                <div>
                  <p className="font-medium">{user.name || 'Unnamed user'}</p>
                  <p className="text-sm text-slate-500">{user.email || 'No email available'}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">{user.role || 'Unknown role'}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(user.id)}
                  disabled={deletingId === user.id}
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Trash2 size={14} />
                  {deletingId === user.id ? 'Deleting...' : 'Delete'}
                </button>
              </motion.div>
            ))
            : !loading
              ? <p className="text-sm text-slate-500">No users found.</p>
              : null}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
