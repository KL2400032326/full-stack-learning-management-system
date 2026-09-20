import { useState } from 'react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import { users, roleOptions } from '../../data/dummyData'

const ManageUsersPage = () => {
  const [list, setList] = useState(users)
  const [form, setForm] = useState({ name: '', email: '', role: 'student' })

  const add = () => {
    if (!form.name || !form.email) return
    setList(prev => [...prev, { ...form, id: Date.now(), status: 'Active' }])
    setForm({ name: '', email: '', role: 'student' })
  }

  const removeUser = id => setList(prev => prev.filter(user => user.id !== id))

  return (
    <div className="page">
      <h1 className="page-title">Manage Users</h1>
      <Card className="grid gap-3 md:grid-cols-4">
        <Input label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <Select label="Role" options={roleOptions} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
        <Button className="self-end" onClick={add}>Add User</Button>
      </Card>
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/60">
            <tr>{['Name', 'Email', 'Role', 'Status', 'Action'].map(h => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
          </thead>
          <tbody>
            {list.map(user => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3">{user.status}</td>
                <td className="px-4 py-3">
                  <button type="button" className="text-rose-600" onClick={() => removeUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export default ManageUsersPage
