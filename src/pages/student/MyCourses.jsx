import { useEffect, useState } from 'react'
import CourseCard from '../../components/student/CourseCard'
import { getStudentCourses } from '../../services/studentApi'
import { subscribeToCourseSync } from '../../utils/courseSync'

const MyCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await getStudentCourses()
        setCourses(data)
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Unable to load enrolled courses.')
      } finally {
        setLoading(false)
      }
    }

    load()
    const unsubscribe = subscribeToCourseSync(() => {
      load()
    })

    return unsubscribe
  }, [])

  return (
    <div className="page">
      <div>
        <h1 className="page-title">My Courses</h1>
        <p className="page-subtitle">Continue your enrolled courses</p>
      </div>

      {loading ? <p className="card">Loading enrolled courses...</p> : null}
      {error ? <p className="card text-rose-600">{error}</p> : null}
      {!loading && !error && courses.length === 0 ? <p className="card">Enroll in a course from the dashboard to see it here.</p> : null}

      {!loading && !error ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courses.map(course => <CourseCard key={course.id} course={course} />)}
        </div>
      ) : null}
    </div>
  )
}

export default MyCourses
