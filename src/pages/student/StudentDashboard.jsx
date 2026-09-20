import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, CircleCheckBig, Clock3, TrendingUp } from 'lucide-react'
import SummaryCard from '../../components/student/SummaryCard'
import { getRecentActivity } from '../../services/studentApi'
import { getStoredUser } from '../../services/authService'
import { enrollCourse, getPublishedCourses } from '../../services/api'
import { subscribeToCourseSync } from '../../utils/courseSync'

const normalizeCourse = course => ({
  id: course.id,
  title: course.title,
  description: course.description || 'Course available from LMS catalog.',
  category: course.category || 'General',
  imageUrl: course.imageUrl || '',
  createdByName: course.createdByName || 'Instructor',
  videos: course.videos || [],
  enrolledStudentIds: course.enrolledStudentIds || []
})

const StudentDashboard = () => {
  const [courses, setCourses] = useState([])
  const [activity, setActivity] = useState([])
  const [loadingCourses, setLoadingCourses] = useState(true)

  const currentUser = getStoredUser()
  const studentName = currentUser?.name || 'Student'

  useEffect(() => {
    const load = async () => {
      try {
        const [backendCourses, recent] = await Promise.all([getPublishedCourses(), getRecentActivity()])
        setCourses((backendCourses.data || []).map(normalizeCourse))
        setActivity(recent)
      } catch {
        console.log('Error loading courses')
      } finally {
        setLoadingCourses(false)
      }
    }

    load()
    const unsubscribe = subscribeToCourseSync(() => {
      load()
    })

    return unsubscribe
  }, [])

  const isEnrolled = course => Boolean(currentUser?.id && (course.enrolledStudentIds || []).includes(currentUser.id))

  const handleEnroll = async courseId => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    const token = localStorage.getItem('token') || localStorage.getItem('lms-token') || localStorage.getItem('userToken')

    console.log('Token:', localStorage.getItem('token'))

    if (!user?.id) {
      window.alert('Please login with a student account stored in the backend first.')
      return
    }

    if (!token) {
      window.alert('Please login first')
      return
    }

    try {
      await enrollCourse(courseId)
      setCourses(prev =>
        prev.map(course =>
          course.id === courseId
            ? {
                ...course,
                enrolledStudentIds: Array.from(new Set([...(course.enrolledStudentIds || []), user.id]))
              }
            : course
        )
      )
      window.alert('Enrolled Successfully')
    } catch (error) {
      window.alert(error.response?.data?.message || 'Error enrolling')
    }
  }

  const metrics = useMemo(() => {
    const total = courses.length
    const enrolled = courses.filter(isEnrolled).length
    const available = total - enrolled
    const overallProgress = total ? Math.round((enrolled / total) * 100) : 0

    return { total, enrolled, available, overallProgress }
  }, [courses, currentUser])

  const visibleCourses = useMemo(() => courses.slice(0, 6), [courses])

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Welcome {studentName}</h1>
        <p className="page-subtitle">Student Dashboard</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total Courses" value={metrics.total} icon={BookOpen} tone="primary" />
        <SummaryCard label="Enrolled Courses" value={metrics.enrolled} icon={CircleCheckBig} tone="success" />
        <SummaryCard label="Available Courses" value={metrics.available} icon={Clock3} tone="warning" />
        <SummaryCard label="Enrollment %" value={`${metrics.overallProgress}%`} icon={TrendingUp} tone="info" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <div className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg">Course Catalog</h2>
            <Link to="/student/courses" className="text-sm font-medium text-primary-600">
              View All
            </Link>
          </div>

          {loadingCourses ? <p className="text-sm text-slate-500">Loading courses...</p> : null}
          {!loadingCourses && visibleCourses.length === 0 ? <p className="text-sm text-slate-500">No courses available.</p> : null}

          <div className="space-y-3">
            {visibleCourses.map(course => (
              <div key={course.id} className="rounded-xl border p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{course.title}</p>
                    <p className="text-xs text-slate-500">{course.category}</p>
                    <p className="text-xs text-slate-500">Instructor: {course.createdByName}</p>
                    <p className="text-xs text-slate-500">Topics: {course.videos.length}</p>
                    {isEnrolled(course) ? (
                      <div className="mt-2 space-y-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">Course Videos</p>
                        {course.videos.slice(0, 3).map(video => (
                          <p key={video.id} className="text-xs text-slate-600">
                            {video.topic || video.title}
                          </p>
                        ))}
                        {!course.videos.length ? <p className="text-xs text-slate-500">No videos uploaded yet.</p> : null}
                      </div>
                    ) : (
                      <p className="mt-2 text-xs text-slate-500">Enroll to view the course videos.</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEnroll(course.id)}
                      disabled={isEnrolled(course)}
                      className={isEnrolled(course) ? 'btn-secondary opacity-80' : 'btn-primary'}
                    >
                      {isEnrolled(course) ? 'Enrolled' : 'Enroll'}
                    </button>

                    {isEnrolled(course) ? (
                      <Link to={`/student/course/${course.id}`} className="btn-secondary">
                        Open
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <h2 className="mb-3 font-display text-lg">Recent Activity</h2>
          <div className="space-y-3">
            {activity.map(item => (
              <div key={item.id} className="rounded-xl border p-3">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-slate-500">{item.text}</p>
                <p className="text-[11px] text-slate-400">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
