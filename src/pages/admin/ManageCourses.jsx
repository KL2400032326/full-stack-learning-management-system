import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import { getAllCourses } from '../../services/api'
import { saveCourseImage } from '../../utils/courseImage'

const ManageCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [savingCourseId, setSavingCourseId] = useState(null)
  const [draftImageUrls, setDraftImageUrls] = useState({})

  useEffect(() => {
    getAllCourses()
      .then(res => setCourses(res.data || []))
      .catch(() => setMessage('Error fetching courses'))
      .finally(() => setLoading(false))
  }, [])

  const handleImageSave = async courseId => {
    try {
      setSavingCourseId(courseId)
      const updatedCourse = await saveCourseImage({
        courseId,
        imageUrl: draftImageUrls[courseId] ?? ''
      })
      setCourses(prev => prev.map(course => (course.id === courseId ? updatedCourse : course)))
      setDraftImageUrls(prev => ({ ...prev, [courseId]: updatedCourse.imageUrl || '' }))
      setMessage('Course image updated successfully.')
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || 'Unable to update course image.')
    } finally {
      setSavingCourseId(null)
    }
  }

  return (
    <div className="page">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="page-title">Manage Courses</h1>
          <p className="page-subtitle">Backend course catalog only</p>
        </div>
      </div>

      {message ? <p className="rounded-xl bg-emerald-100 px-3 py-2 text-sm text-emerald-700">{message}</p> : null}

      <div className="card overflow-x-auto p-0">
        {loading ? <p className="p-4 text-sm text-slate-500">Loading courses...</p> : null}

        {!loading ? (
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60">
              <tr>{['Course Name', 'Image', 'Instructor', 'Videos', 'Category', 'Status', 'Actions'].map(h => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id} className="border-t">
                  <td className="px-4 py-3">{course.title}</td>
                  <td className="px-4 py-3">
                    {course.imageUrl ? <img src={course.imageUrl} alt={course.title} className="h-14 w-24 rounded-xl object-cover" /> : <span className="text-xs text-slate-500">No image</span>}
                  </td>
                  <td className="px-4 py-3">{course.createdByName}</td>
                  <td className="px-4 py-3">{course.videos?.length || 0}</td>
                  <td className="px-4 py-3">{course.category}</td>
                  <td className="px-4 py-3">
                    <span className={course.approvalStatus === 'APPROVED' ? 'text-emerald-600' : course.approvalStatus === 'PENDING' ? 'text-amber-600' : 'text-rose-600'}>
                      {course.approvalStatus || 'PENDING'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button className="btn-secondary px-2" onClick={() => setMessage(`Viewing ${course.title}`)} type="button"><Eye size={14} /></button>
                      <input
                        className="input-base min-w-[220px]"
                        placeholder="Paste course image URL"
                        value={draftImageUrls[course.id] ?? course.imageUrl ?? ''}
                        onChange={e => setDraftImageUrls(prev => ({ ...prev, [course.id]: e.target.value }))}
                        disabled={savingCourseId === course.id}
                      />
                      <button className="btn-secondary px-3" onClick={() => handleImageSave(course.id)} type="button" disabled={savingCourseId === course.id}>
                        {savingCourseId === course.id ? 'Saving...' : 'Save Image URL'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  )
}

export default ManageCourses
