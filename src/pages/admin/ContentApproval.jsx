import axios from 'axios'
import { useEffect, useState } from 'react'
import { getStoredUser } from '../../services/authService'

const BASE_URL = 'http://localhost:2026'

const ContentApproval = () => {
  const [pendingContent, setPendingContent] = useState([])
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [loading, setLoading] = useState(true)
  const [actingKey, setActingKey] = useState('')
  const admin = getStoredUser()

  useEffect(() => {
    fetchAdminData()
  }, [])

  const getToken = () =>
    localStorage.getItem('token') ||
    localStorage.getItem('lms-token') ||
    localStorage.getItem('userToken')

  const getAuthHeaders = () => {
    const token = getToken()
    if (!token) {
      throw new Error('Your session has expired. Please log in again.')
    }

    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }

  const ensureAdmin = () => {
    if ((admin?.role || '').toUpperCase() !== 'ADMIN') {
      throw new Error('Admin access is required to manage content approval.')
    }
  }

  const fetchAdminData = async () => {
    try {
      setLoading(true)
      ensureAdmin()
      setMessage('')
      setMessageType('success')

      const headers = getAuthHeaders()
      const contentRes = await axios.get(`${BASE_URL}/api/admin/pending-content`, { headers })

      setPendingContent(Array.isArray(contentRes.data) ? contentRes.data : [])
      console.log('Content:', contentRes.data)
    } catch (err) {
      console.error('Admin Fetch Error:', err.response || err)
      setPendingContent([])
      setMessageType('error')
      setMessage(err.response?.data?.message || err.message || 'Unable to load pending content.')
    } finally {
      setLoading(false)
      setActingKey('')
    }
  }

  const approveContent = async id => {
    try {
      ensureAdmin()
      setActingKey(id)
      await axios.post(`${BASE_URL}/api/admin/approve/${encodeURIComponent(id)}`, {}, { headers: getAuthHeaders() })
      await fetchAdminData()
      setMessageType('success')
      setMessage('Content approved successfully.')
    } catch (err) {
      setMessageType('error')
      setMessage(err.response?.data?.message || err.message || 'Unable to approve content.')
    } finally {
      setActingKey('')
    }
  }

  const rejectContent = async id => {
    try {
      ensureAdmin()
      setActingKey(id)
      await axios.post(`${BASE_URL}/api/admin/reject/${encodeURIComponent(id)}`, {}, { headers: getAuthHeaders() })
      await fetchAdminData()
      setMessageType('success')
      setMessage('Content rejected successfully.')
    } catch (err) {
      setMessageType('error')
      setMessage(err.response?.data?.message || err.message || 'Unable to reject content.')
    } finally {
      setActingKey('')
    }
  }

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Content Approval</h1>
        <p className="page-subtitle">Review pending courses and newly uploaded videos</p>
      </div>

      {message ? (
        <p className={`rounded-xl px-3 py-2 text-sm ${messageType === 'error' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-100 text-emerald-700'}`}>
          {message}
        </p>
      ) : null}

      <div className="space-y-3">
        {loading ? <p className="card text-sm text-slate-500">Loading pending content...</p> : null}

        {!loading && pendingContent.length > 0 ? (
          pendingContent.map(item => (
            <div key={item.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <div className="mb-1 inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                  {item.type || 'CONTENT'}
                </div>
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.subtitle || 'Pending review'}</p>
                <p className="text-xs text-amber-600">Status: {item.approvalStatus || 'PENDING'}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-primary" type="button" disabled={actingKey === item.id} onClick={() => approveContent(item.id)}>
                  {actingKey === item.id ? 'Saving...' : 'Approve'}
                </button>
                <button className="btn-secondary text-rose-600" type="button" disabled={actingKey === item.id} onClick={() => rejectContent(item.id)}>
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : null}

        {!loading && pendingContent.length === 0 ? <p className="card text-sm text-slate-500">No pending content</p> : null}
      </div>
    </div>
  )
}

export default ContentApproval
