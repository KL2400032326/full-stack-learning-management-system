import { useEffect, useState } from 'react'
import { Eye, Trash2 } from 'lucide-react'
import { deleteUser, getAllUsers } from '../../services/api'

const ManageInstructors = () => {
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    getAllUsers()
      .then(res => {
        const backendInstructors = (res.data || []).filter(user => user.role?.toLowerCase() === 'instructor')
        setInstructors(backendInstructors)
      })
      .catch(() => setMessage('Error fetching instructors'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async id => {
    try {
      await deleteUser(id)
      setInstructors(prev => prev.filter(user => user.id !== id))
      setMessage('Instructor deleted')
    } catch {
      setMessage('Error deleting instructor')
    }
  }

  return (
    <div className="page">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="page-title">Manage Instructors</h1>
          <p className="page-subtitle">Backend instructor records only</p>
        </div>
      </div>

      {message ? <p className="rounded-xl bg-sky-100 px-3 py-2 text-sm text-sky-700">{message}</p> : null}

      <div className="card overflow-x-auto p-0">
        {loading ? <p className="p-4 text-sm text-slate-500">Loading instructors...</p> : null}

        {!loading ? (
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60">
              <tr>{['Name', 'Email', 'Role', 'Actions'].map(h => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {instructors.map(item => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="px-4 py-3 capitalize">{item.role?.toLowerCase()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="btn-secondary px-2" onClick={() => setMessage(`Viewing ${item.name}`)} type="button"><Eye size={14} /></button>
                      <button className="btn-secondary px-2 text-rose-600" onClick={() => handleDelete(item.id)} type="button"><Trash2 size={14} /></button>
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

export default ManageInstructors
