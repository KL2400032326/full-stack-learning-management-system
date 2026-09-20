import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import VideoList from '../../components/instructor/VideoList'
import { deleteVideo, getInstructorCourseById, getInstructorCourses, getPrimaryInstructorCourseId, updateVideoAssignmentUrl, uploadVideo } from '../../services/instructorApi'

const UploadVideo = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'upload'

  const [allCourses, setAllCourses] = useState([])
  const [activeCourse, setActiveCourse] = useState(null)
  const [form, setForm] = useState({ title: '', topic: '', youtubeLink: '', assignmentUrl: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savingAssignmentId, setSavingAssignmentId] = useState(null)
  const [deletingVideoId, setDeletingVideoId] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const courses = await getInstructorCourses()
        setAllCourses(courses)

        const resolvedId = courseId === 'default' ? await getPrimaryInstructorCourseId() : courseId
        const course = resolvedId ? await getInstructorCourseById(resolvedId) : null

        if (courseId === 'default' && resolvedId) {
          navigate(`/instructor/upload-video/${resolvedId}`, { replace: true })
        }

        setActiveCourse(course)
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Unable to load courses.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [courseId, navigate])

  const videos = useMemo(() => activeCourse?.videos || [], [activeCourse])

  if (loading) {
    return (
      <div className="page">
        <p className="card">Loading course...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page">
        <p className="card text-rose-600">{error}</p>
        <Link className="btn-secondary inline-block" to="/instructor/courses">Back to My Courses</Link>
      </div>
    )
  }

  if (!activeCourse) {
    return (
      <div className="page">
        <p className="card">Course not found.</p>
        <Link className="btn-secondary inline-block" to="/instructor/courses">Back to My Courses</Link>
      </div>
    )
  }

  const submit = async e => {
    e.preventDefault()
    if (!form.topic.trim() || !form.youtubeLink.trim()) {
      setMessage('Please complete all video fields.')
      return
    }

    try {
      setLoading(true)
      const fallbackTitle = form.title.trim() || `Video - ${form.youtubeLink.trim()}`
      const nextForm = { ...form, title: fallbackTitle }
      setForm(nextForm)
      const updated = await uploadVideo(activeCourse.id, nextForm)
      setActiveCourse(updated)
      setMessage('Video uploaded successfully. It will be visible to students after admin approves this video.')
      setForm({ title: '', topic: '', youtubeLink: '', assignmentUrl: '' })
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || 'Unable to upload video.')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAssignment = async (videoId, assignmentUrl) => {
    try {
      setMessage('')
      setSavingAssignmentId(videoId)
      await updateVideoAssignmentUrl(videoId, assignmentUrl)
      const refreshed = await getInstructorCourseById(activeCourse.id)
      setActiveCourse(refreshed)
      setMessage('Assignment link saved.')
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || 'Unable to save assignment link.')
    } finally {
      setSavingAssignmentId(null)
    }
  }

  const handleDeleteVideo = async videoId => {
    try {
      setMessage('')
      setDeletingVideoId(videoId)
      const updatedCourse = await deleteVideo(activeCourse.id, videoId)
      setActiveCourse(updatedCourse)
      setMessage('Video deleted successfully.')
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || 'Unable to delete video.')
    } finally {
      setDeletingVideoId(null)
    }
  }

  return (
    <div className="page">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="page-title">{mode === 'view' ? 'Course Details' : 'Upload Video'}</h1>
          <p className="page-subtitle">{activeCourse.title}</p>
        </div>

        <select
          className="input-base w-72"
          value={activeCourse.id}
          onChange={e => navigate(`/instructor/upload-video/${e.target.value}`)}
          disabled={loading}
        >
          {allCourses.map(course => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
      </div>

      {mode !== 'view' ? (
        <form onSubmit={submit} className="card max-w-2xl space-y-4 p-5">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Video Title</span>
            <input className="input-base" value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} disabled={loading} />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Topic Name</span>
            <input className="input-base" value={form.topic} onChange={e => setForm(prev => ({ ...prev, topic: e.target.value }))} disabled={loading} />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">YouTube Link</span>
            <input
              className="input-base"
              value={form.youtubeLink}
              onChange={e =>
                setForm(prev => {
                  const youtubeLink = e.target.value
                  if (prev.title.trim()) {
                    return { ...prev, youtubeLink }
                  }

                  return {
                    ...prev,
                    youtubeLink,
                    title: youtubeLink.trim() ? `Video - ${youtubeLink.trim()}` : ''
                  }
                })
              }
              disabled={loading}
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Assignment Link (optional)</span>
            <input className="input-base" value={form.assignmentUrl} onChange={e => setForm(prev => ({ ...prev, assignmentUrl: e.target.value }))} disabled={loading} />
          </label>

          {message ? <p className="rounded-xl bg-emerald-100 px-3 py-2 text-sm text-emerald-700">{message}</p> : null}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      ) : null}

      <div className="card p-5">
        <h2 className="mb-3 font-display text-lg">Video List</h2>
        <VideoList
          videos={videos}
          deletingVideoId={deletingVideoId}
          onDeleteVideo={handleDeleteVideo}
          onSaveAssignment={handleSaveAssignment}
          savingAssignmentId={savingAssignmentId}
        />
      </div>
    </div>
  )
}

export default UploadVideo
