import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAllCourses } from '../../services/api'

const StatCard = ({ label, value }) => (
  <div className="card p-4">
    <p className="text-xs text-slate-500">{label}</p>
    <p className="mt-2 font-display text-2xl">{value}</p>
  </div>
)

const CreatorDashboard = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAllCourses()
        setCourses(res.data || [])
      } catch {
        console.log('Error loading courses')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const stats = {
    totalContentsCreated: courses.length,
    totalCoursesUsingContent: courses.length,
    totalVideosUploaded: courses.reduce((sum, course) => sum + (course.videos?.length || 0), 0),
    contentUsage: courses.length ? 100 : 0
  }

  return (
    <div className="page">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="page-title">Content Creator Dashboard</h1>
          <p className="page-subtitle">Backend course catalog shared across dashboards</p>
        </div>
        <Link to="/creator/upload" className="btn-primary">Upload Content</Link>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Contents Created" value={stats.totalContentsCreated} />
        <StatCard label="Total Courses Using Content" value={stats.totalCoursesUsingContent} />
        <StatCard label="Total Videos Uploaded" value={stats.totalVideosUploaded} />
        <StatCard label="Content Usage %" value={`${stats.contentUsage}%`} />
      </div>

      <div className="card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg">Backend Courses</h2>
          <Link to="/creator/content" className="text-sm font-medium text-primary-600">Open My Content</Link>
        </div>

        {loading ? <p className="text-sm text-slate-500">Loading courses...</p> : null}
        {!loading && courses.length === 0 ? <p className="text-sm text-slate-500">No courses available.</p> : null}

        <div className="space-y-3">
          {courses.slice(0, 5).map(course => (
            <motion.div key={course.id} whileHover={{ x: 3 }} className="rounded-xl border p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{course.title}</p>
                  <p className="text-xs text-slate-500">{course.description || 'No description available.'}</p>
                  <p className="text-xs text-slate-500">{course.createdByName} | {course.category}</p>
                </div>
                <Link to={`/creator/edit/${course.id}`} className="btn-secondary">Open</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CreatorDashboard
