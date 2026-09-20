import { useEffect, useState } from 'react'
import ContentCard from '../../components/creator/ContentCard'
import { deleteContent, getCreatorContent } from '../../services/creatorApi'

const MyContent = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await getCreatorContent()
        setItems(data)
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Unable to load content from the backend.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const handleDelete = async contentId => {
    try {
      await deleteContent(contentId)
      setItems(prev => prev.filter(item => item.id !== contentId))
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to delete content.')
    }
  }

  return (
    <div className="page">
      <div>
        <h1 className="page-title">My Content</h1>
        <p className="page-subtitle">View, edit, and manage all uploaded assets</p>
      </div>

      {loading ? <p className="card">Loading content...</p> : null}
      {error ? <p className="card text-rose-600">{error}</p> : null}
      {!loading && !error && items.length === 0 ? <p className="card">No backend video content found yet.</p> : null}

      {!loading && !error ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map(item => (
            <ContentCard key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default MyContent
