import { useEffect, useMemo, useState } from 'react'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { deleteUser, getAllUsers } from '../../services/api'

const emptyForm = { name: '', email: '', role: 'student', status: 'Active' }

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [modal, setModal] = useState({ open: false, mode: 'view', user: emptyForm })

  useEffect(() => {
    getAllUsers()
      .then(res => {
        setUsers((res.data || []).map(user => ({ ...user, status: 'Active' })))
      })
      .catch(() => console.log('Error fetching users'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return users.filter(user => {
      const text = `${user.name} ${user.email} ${user.role}`.toLowerCase()
      const matchText = text.includes(query.toLowerCase())
      const matchFilter = filter === 'all' ? true : user.role?.toLowerCase() === filter
      return matchText && matchFilter
    })
  }, [users, query, filter])

  const openModal = (mode, user = emptyForm) => setModal({ open: true, mode, user })

  const handleDelete = async id => {
    try {
      setDeletingId(id)
      await deleteUser(id)
      setUsers(prev => prev.filter(user => user.id !== id))
      window.alert('User deleted')
    } catch {
      window.alert('Error deleting user')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="page">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="page-title">Manage Users</h1>
          <p className="page-subtitle">Backend users from MySQL only</p>
        </div>
      </div>

      <div className="card flex flex-wrap gap-3 p-4">
        <input
          className="input-base max-w-sm"
          placeholder="Search users..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select className="input-base w-48" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="instructor">Instructor</option>
          <option value="student">Student</option>
          <option value="creator">Content Creator</option>
        </select>
      </div>

      <div className="card overflow-x-auto p-0">
        {loading ? <p className="p-4 text-sm text-slate-500">Loading users...</p> : null}

        {!loading ? (
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60">
              <tr>
                {['Name', 'Email', 'Role', 'Status', 'Actions'].map(head => (
                  <th key={head} className="px-4 py-3">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">{user.role?.toLowerCase()}</td>
                  <td className="px-4 py-3">{user.status}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="btn-secondary px-2" type="button" onClick={() => openModal('view', user)}><Eye size={14} /></button>
                      <button className="btn-secondary px-2" type="button" onClick={() => openModal('edit', user)}><Pencil size={14} /></button>
                      <button
                        className="btn-secondary px-2 text-rose-600"
                        type="button"
                        disabled={deletingId === user.id}
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4" onClick={() => setModal({ open: false, mode: 'view', user: emptyForm })}>
          <div className="card w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <h3 className="font-display text-xl capitalize">{modal.mode} User</h3>
            <div className="mt-4 grid gap-3">
              <input className="input-base" value={modal.user.name || ''} disabled />
              <input className="input-base" value={modal.user.email || ''} disabled />
              <input className="input-base" value={modal.user.role || ''} disabled />
              <input className="input-base" value={modal.user.status || 'Active'} disabled />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button className="btn-secondary" type="button" onClick={() => setModal({ open: false, mode: 'view', user: emptyForm })}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageUsers
