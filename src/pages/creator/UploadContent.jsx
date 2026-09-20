import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContentForm from '../../components/creator/ContentForm'
import { getCreatorCourses, uploadContent } from '../../services/creatorApi'
import { saveCourseImage } from '../../utils/courseImage'

const UploadContent = () => {
  const navigate = useNavigate()
  const [courseOptions, setCourseOptions] = useState([])
  const [error, setError] = useState('')
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [courseImagePreview, setCourseImagePreview] = useState('')
  const [courseImageUrl, setCourseImageUrl] = useState('')
  const [savingImage, setSavingImage] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const courses = await getCreatorCourses()
        setCourseOptions(courses)
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Unable to load backend courses.')
      }
    }

    load()
  }, [])

  const handleCourseImageSave = async () => {
    if (!selectedCourseId) {
      setError('Please select a course before saving the course image URL.')
      return
    }

    try {
      setSavingImage(true)
      setError('')
      const updatedCourse = await saveCourseImage({ courseId: selectedCourseId, imageUrl: courseImageUrl })
      setCourseImagePreview(updatedCourse.imageUrl || '')
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to save course image URL.')
    } finally {
      setSavingImage(false)
    }
  }

  const handleUpload = async values => {
    try {
      await uploadContent(values)
      setTimeout(() => navigate('/creator/content'), 500)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to upload content.')
    }
  }

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Upload Content</h1>
        <p className="page-subtitle">Create reusable media for courses</p>
      </div>

      {error ? <p className="card max-w-2xl text-rose-600">{error}</p> : null}

      <div className="card max-w-2xl space-y-4 p-5">
        <div>
          <h2 className="font-display text-lg">Course Image Upload</h2>
          <p className="mt-1 text-sm text-slate-500">Content creators can save one image URL for any selected course.</p>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Select Course</span>
          <select className="input-base" value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)} disabled={savingImage}>
            <option value="">Select course</option>
            {courseOptions.map(course => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Course Image URL</span>
          <input className="input-base" value={courseImageUrl} onChange={e => setCourseImageUrl(e.target.value)} placeholder="Paste course image URL" disabled={savingImage} />
        </label>

        <button className="btn-primary" type="button" onClick={handleCourseImageSave} disabled={savingImage}>
          {savingImage ? 'Saving...' : 'Save Course Image URL'}
        </button>

        {courseImagePreview ? (
          <img src={courseImagePreview} alt="Selected course preview" className="h-48 w-full rounded-2xl object-cover" />
        ) : null}
      </div>

      <ContentForm heading="Upload New Content" submitLabel="Upload Content" onSubmit={handleUpload} courseOptions={courseOptions} />
    </div>
  )
}

export default UploadContent
