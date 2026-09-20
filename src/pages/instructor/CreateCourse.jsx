import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { createCourse, getInstructorCourseById, updateCourse } from '../../services/instructorApi'

const CreateCourse = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')

  const [form, setForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'Frontend Development'
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadForEdit = async () => {
      if (!editId) return
      try {
        setLoading(true)
        const course = await getInstructorCourseById(editId)
        if (!course) {
          setMessage('Course not found in the database.')
          return
        }
        setForm({
          title: course.title,
          description: course.description,
          imageUrl: course.imageUrl || '',
          category: course.category
        })
      } catch (err) {
        setMessage(err.response?.data?.message || err.message || 'Unable to load course.')
      } finally {
        setLoading(false)
      }
    }

    loadForEdit()
  }, [editId])

  const submit = async e => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) {
      setMessage('Please fill in course title and description.')
      return
    }

    try {
      setLoading(true)

      if (editId) {
        await updateCourse(editId, form)
        setMessage('Course updated successfully.')
      } else {
        await createCourse(form)
        setMessage('Course created successfully.')
      }

      setTimeout(() => navigate('/instructor/courses'), 700)
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || 'Unable to save course.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div>
        <h1 className="page-title">{editId ? 'Edit Course' : 'Create Course'}</h1>
        <p className="page-subtitle">Create or update course metadata</p>
      </div>

      {loading && editId ? <p className="card max-w-2xl">Loading course...</p> : null}

      <form onSubmit={submit} className="card max-w-2xl space-y-4 p-5">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Course Title</span>
          <input className="input-base" value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} disabled={loading} />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Course Description</span>
          <textarea className="input-base min-h-28" value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} disabled={loading} />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Course Image URL</span>
          <input className="input-base" placeholder="Paste course image URL" value={form.imageUrl} onChange={e => setForm(prev => ({ ...prev, imageUrl: e.target.value }))} disabled={loading} />
        </label>

        {form.imageUrl ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/60">
            <img src={form.imageUrl} alt="Course preview" className="h-48 w-full rounded-xl object-cover" />
          </div>
        ) : null}

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Category</span>
          <select className="input-base" value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))} disabled={loading}>
            <option>Frontend Development</option>
            <option>Backend Development</option>
            <option>Design</option>
            <option>Data Science</option>
          </select>
        </label>

        {message ? <p className="rounded-xl bg-sky-100 px-3 py-2 text-sm text-sky-700">{message}</p> : null}

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : editId ? 'Update Course' : 'Create Course'}
        </button>
      </form>
    </div>
  )
}

export default CreateCourse
