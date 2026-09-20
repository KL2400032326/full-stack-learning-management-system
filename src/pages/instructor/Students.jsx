import { useEffect, useState } from 'react'
import { getInstructorStudents } from '../../services/instructorApi'

const Students = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await getInstructorStudents()
        setStudents(data)
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Unable to load students from the database.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Students</h1>
        <p className="page-subtitle">Track student enrollments and progress</p>
      </div>

      {loading ? <p className="card">Loading students...</p> : null}
      {error ? <p className="card text-rose-600">{error}</p> : null}
      {!loading && !error && students.length === 0 ? <p className="card">No enrolled students found in the database yet.</p> : null}

      {!loading && !error ? (
        <div className="card overflow-x-auto p-0">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60">
              <tr>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Course Enrolled</th>
                <th className="px-4 py-3">Progress %</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={`${student.id}-${student.course}-${index}`} className="border-t">
                  <td className="px-4 py-3">{student.name}</td>
                  <td className="px-4 py-3">{student.email}</td>
                  <td className="px-4 py-3">{student.course}</td>
                  <td className="px-4 py-3">{student.progress}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
}

export default Students
