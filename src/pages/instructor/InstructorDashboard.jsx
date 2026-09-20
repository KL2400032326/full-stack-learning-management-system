import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getInstructorCourses, getInstructorMetrics } from '../../services/instructorApi'

const StatCard = ({ label, value }) => (
  <div className="card p-4">
    <p className="text-xs text-slate-500">{label}</p>
    <p className="mt-2 font-display text-2xl">{value}</p>
  </div>
)

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([])
  const [metrics, setMetrics] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalVideos: 0,
    completionRate: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [courseData, metricData] = await Promise.all([getInstructorCourses(), getInstructorMetrics()])
        setCourses(courseData)
        setMetrics(metricData)
      } catch {
        console.log('Error loading courses')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="page">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="page-title">Instructor Dashboard</h1>
          <p className="page-subtitle">Overview of backend course data</p>
        </div>
        <Link to="/instructor/create-course" className="btn-primary">Create Course</Link>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Courses" value={metrics.totalCourses} />
        <StatCard label="Total Students" value={metrics.totalStudents.toLocaleString()} />
        <StatCard label="Total Videos" value={metrics.totalVideos} />
        <StatCard label="Course Completion %" value={`${metrics.completionRate}%`} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
        <div className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg">Courses Overview</h2>
            <Link to="/instructor/courses" className="text-sm font-medium text-primary-600">Open My Courses</Link>
          </div>

          {loading ? <p className="text-sm text-slate-500">Loading courses...</p> : null}
          {!loading && courses.length === 0 ? <p className="text-sm text-slate-500">No courses available.</p> : null}

          <div className="space-y-3">
            {courses.slice(0, 3).map(course => (
              <motion.div key={course.id} whileHover={{ x: 3 }} className="rounded-xl border p-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <Link to={`/instructor/upload-video/${course.id}`} className="font-medium hover:text-primary-600">{course.title}</Link>
                    <p className="text-xs text-slate-500">{course.createdByName} | {course.videos?.length || 0} videos</p>
                    <p className="text-xs text-slate-500">{course.description || 'No description available.'}</p>
                  </div>
                  <Link to={`/instructor/upload-video/${course.id}`} className="btn-secondary">View</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <h2 className="mb-3 font-display text-lg">Course Feed</h2>
          <div className="space-y-3">
            {courses.slice(0, 4).map(course => (
              <div key={course.id} className="rounded-xl border p-3">
                <p className="text-sm font-medium">{course.title}</p>
                <p className="text-xs text-slate-500">{course.category}</p>
                <p className="text-[11px] text-slate-500">{course.createdByName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorDashboard
