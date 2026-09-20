import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getDefaultAvatar } from '../../services/authService'
import { getProfileUrl, updateProfileUrl } from '../../services/api'

const Profile = () => {
  const { user, login } = useAuth()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.name || 'Admin User')
  const [email, setEmail] = useState(user?.email || 'admin@lms.com')
  const [avatar, setAvatar] = useState(user?.avatar || '')

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return
      try {
        const { data } = await getProfileUrl(user.id)
        if (data?.profileUrl) {
          setAvatar(data.profileUrl)
        }
      } catch {
        // ignore missing profile
      }
    }
    load()
  }, [user])

  const save = async () => {
    if (user?.id && avatar.trim()) {
      await updateProfileUrl(user.id, { profileUrl: avatar.trim() })
    }
    login({ role: 'admin', name, email, avatar: avatar.trim() || user?.avatar })
    setEditing(false)
  }

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Admin profile and account preferences</p>
      </div>

      <div className="card max-w-2xl space-y-4">
        <div className="flex items-center gap-4">
          <img src={avatar || user?.avatar || getDefaultAvatar('admin')} alt="admin" className="h-20 w-20 rounded-2xl object-cover" />
          <div>
            <p className="font-display text-xl">{name}</p>
            <p className="text-sm text-slate-500">{email}</p>
          </div>
        </div>

        {editing ? (
          <div className="space-y-3">
            <input className="input-base" value={name} onChange={e => setName(e.target.value)} />
            <input className="input-base" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="input-base" value={avatar} onChange={e => setAvatar(e.target.value)} placeholder="Profile image URL" />
            <div className="flex gap-2">
              <button className="btn-primary" type="button" onClick={save}>Save</button>
              <button className="btn-secondary" type="button" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <button className="btn-secondary" type="button" onClick={() => setEditing(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  )
}

export default Profile
