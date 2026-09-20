import { useState } from 'react'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Select from '../../components/common/Select'
import { roleOptions } from '../../data/dummyData'
import { useAuth } from '../../context/AuthContext'

const ProfilePage = () => {
  const { user, updateProfile } = useAuth()
  const [form, setForm] = useState(user)

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Manage profile details and avatar</p>
      </div>
      <Card className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="space-y-3 text-center">
          <img src={form.avatar} alt="avatar" className="mx-auto h-28 w-28 rounded-2xl object-cover" />
          <Input type="url" label="Avatar URL" value={form.avatar} onChange={e => setForm({ ...form, avatar: e.target.value })} />
        </div>
        <div className="space-y-3">
          <Input label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <Select label="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} options={roleOptions} />
          <Button onClick={() => updateProfile(form)}>Save profile</Button>
        </div>
      </Card>
    </div>
  )
}

export default ProfilePage
