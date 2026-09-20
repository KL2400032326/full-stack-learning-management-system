import { useState } from 'react'

const VideoList = ({ videos = [], onDeleteVideo, deletingVideoId, onSaveAssignment, savingAssignmentId }) => {
  const [drafts, setDrafts] = useState({})
  const [editingId, setEditingId] = useState(null)

  const updateDraft = (videoId, value) => {
    setDrafts(prev => ({ ...prev, [videoId]: value }))
  }

  const startEdit = (videoId, currentValue) => {
    setEditingId(videoId)
    setDrafts(prev => ({ ...prev, [videoId]: currentValue || '' }))
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const saveAssignment = videoId => {
    const value = (drafts[videoId] || '').trim()
    if (!value) return
    onSaveAssignment?.(videoId, value)
  }

  const handleDeleteVideo = videoId => {
    if (!window.confirm('Are you sure you want to delete this video?')) {
      return
    }

    onDeleteVideo?.(videoId)
  }

  return (
    <div className="space-y-2">
      {videos.length === 0 ? (
        <p className="rounded-xl border p-3 text-sm text-slate-500">No videos uploaded yet.</p>
      ) : (
        videos.map(video => (
          <div key={video.id} className="rounded-xl border p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">{video.title}</p>
              <span className={video.approvalStatus === 'APPROVED' ? 'text-xs text-emerald-600' : video.approvalStatus === 'PENDING' ? 'text-xs text-amber-600' : 'text-xs text-rose-600'}>
                {video.approvalStatus || 'APPROVED'}
              </span>
            </div>
            <p className="text-xs text-slate-500">Topic: {video.topic}</p>
            <a href={video.youtubeLink} target="_blank" rel="noreferrer" className="text-xs text-primary-600">Open Video</a>
            {video.assignmentUrl ? (
              <>
                <a href={video.assignmentUrl} className="ml-3 text-xs text-primary-600">
                  Open Assignment
                </a>
                <button type="button" className="ml-3 text-xs text-primary-600" onClick={() => startEdit(video.id, video.assignmentUrl)}>
                  Update Assignment
                </button>
              </>
            ) : (
              <button type="button" className="ml-3 text-xs text-primary-600" onClick={() => startEdit(video.id, '')}>
                Add Assignment
              </button>
            )}

            <button
              type="button"
              className="ml-3 rounded-lg bg-rose-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={deletingVideoId === video.id}
              onClick={() => handleDeleteVideo(video.id)}
            >
              {deletingVideoId === video.id ? 'Deleting...' : 'Delete Video'}
            </button>

            {editingId === video.id ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <input
                  className="input-base flex-1"
                  placeholder="Paste assignment link"
                  value={drafts[video.id] || ''}
                  onChange={e => updateDraft(video.id, e.target.value)}
                />
                <button
                  type="button"
                  className="btn-primary"
                  disabled={savingAssignmentId === video.id || !(drafts[video.id] || '').trim()}
                  onClick={() => saveAssignment(video.id)}
                >
                  {savingAssignmentId === video.id ? 'Saving...' : 'Save'}
                </button>
                <button type="button" className="btn-secondary" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            ) : null}
          </div>
        ))
      )}
    </div>
  )
}

export default VideoList
