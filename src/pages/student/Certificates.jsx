import { useEffect, useState } from 'react'
import { Award } from 'lucide-react'
import { getCertificates } from '../../services/studentApi'

const Certificates = () => {
  const [completedCourses, setCompletedCourses] = useState([])

  useEffect(() => {
    const load = async () => {
      const data = await getCertificates()
      setCompletedCourses(data)
    }
    load()
  }, [])

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Certificates</h1>
        <p className="page-subtitle">Completed courses eligible for certificate download</p>
      </div>

      <div className="space-y-3">
        {completedCourses.length === 0 ? (
          <div className="card p-4 text-sm text-slate-500">Complete courses to unlock certificates.</div>
        ) : (
          completedCourses.map(course => (
            <div key={course.id} className="card flex items-center justify-between gap-3 p-4">
              <div>
                <p className="font-medium">{course.title}</p>
                <p className="text-xs text-slate-500">Instructor: {course.instructor}</p>
              </div>
              <button type="button" className="btn-secondary inline-flex items-center gap-2">
                <Award size={15} /> Certificate
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Certificates
