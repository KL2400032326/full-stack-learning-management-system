import { useEffect, useState } from 'react'
import CourseCard from '../../components/instructor/CourseCard'
import { deleteCourse, getInstructorCourses } from '../../services/instructorApi'

const MyCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [deletingCourseId, setDeletingCourseId] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        setMessage('')
        const data = await getInstructorCourses()
        setCourses(data)
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Unable to load courses.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const handleDeleteCourse = async courseId => {
    try {
      setDeletingCourseId(courseId)
      setError('')
      setMessage('')
      await deleteCourse(courseId)
      setCourses(prev => prev.filter(course => course.id !== courseId))
      setMessage('Course deleted successfully.')
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to delete course.')
    } finally {
      setDeletingCourseId(null)
    }
  }

  return (
    <div className="page">
      <div>
        <h1 className="page-title">My Courses</h1>
        <p className="page-subtitle">Manage your published and draft courses</p>
      </div>

      {loading ? <p className="card">Loading courses...</p> : null}
      {error ? <p className="card text-rose-600">{error}</p> : null}
      {message ? <p className="card text-emerald-700">{message}</p> : null}
      {!loading && !error && courses.length === 0 ? <p className="card">No courses found in the database for this instructor yet.</p> : null}

      {!loading && !error ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              deleting={deletingCourseId === course.id}
              onDelete={handleDeleteCourse}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default MyCourses
