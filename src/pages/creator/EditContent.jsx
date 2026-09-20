import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ContentForm from '../../components/creator/ContentForm'
import { editContent, getCreatorContent, getCreatorCourses } from '../../services/creatorApi'

const EditContent = () => {
  const { contentId } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [courseOptions, setCourseOptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [data, courses] = await Promise.all([getCreatorContent(), getCreatorCourses()])
        setCourseOptions(courses)

        if (contentId === 'default') {
          const firstId = data[0]?.id
          if (firstId) {
            navigate(`/creator/edit/${firstId}`, { replace: true })
          }
          return
        }

        const current = data.find(entry => String(entry.id) === String(contentId)) || null
        setItem(current)
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Unable to load content from the backend.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [contentId, navigate])

  if (loading) {
    return (
      <div className="page">
        <p className="card">Loading content...</p>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="page">
        <p className="card">{error || 'Content not found.'}</p>
        <Link to="/creator/content" className="btn-secondary inline-block">Back to My Content</Link>
      </div>
    )
  }

  const handleUpdate = async values => {
    try {
      await editContent(contentId, values)
      setTimeout(() => navigate('/creator/content'), 500)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to update content.')
    }
  }

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Edit Content</h1>
        <p className="page-subtitle">Update content title, topic, and link</p>
      </div>

      {error ? <p className="card max-w-2xl text-rose-600">{error}</p> : null}
      <ContentForm
        heading="Update Content"
        submitLabel="Save Changes"
        initialValues={item}
        onSubmit={handleUpdate}
        courseOptions={courseOptions}
      />
    </div>
  )
}

export default EditContent
