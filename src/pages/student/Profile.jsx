import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getStudentProfile, updateStudentProfile } from '../../services/studentApi'
import { getProfileUrl, updateProfileUrl } from '../../services/api'

const Profile = () => {
  const { user, login } = useAuth()
  const [profile, setProfile] = useState({ name: '', email: '', avatar: '' })
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const load = async () => {
      const data = await getStudentProfile()
      let backendAvatar = ''
      if (user?.id) {
        try {
          const { data: profileData } = await getProfileUrl(user.id)
          backendAvatar = profileData?.profileUrl || ''
        } catch {
          backendAvatar = ''
        }
      }
      setProfile({
        name: user?.name || data.name,
        email: user?.email || data.email,
        avatar: backendAvatar || user?.avatar || data.avatar
      })
    }
    load()
  }, [user])

  const save = async () => {
    if (user?.id && profile.avatar.trim()) {
      await updateProfileUrl(user.id, { profileUrl: profile.avatar.trim() })
    }
    const updated = await updateStudentProfile(profile)
    login({ role: 'student', name: updated.name, email: updated.email, avatar: profile.avatar.trim() || updated.avatar || user?.avatar })
    setEditing(false)
  }

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Manage your student account details</p>
      </div>

      <div className="card max-w-xl space-y-4">
        <div className="flex items-center gap-4">
          <img src={profile.avatar || user?.avatar || 'https://i.pravatar.cc/120?img=31'} alt="student" className="h-20 w-20 rounded-2xl object-cover" />
          <div>
            <p className="font-display text-xl">{profile.name || user?.name || 'Student'}</p>
            <p className="text-sm text-slate-500">{profile.email || user?.email || 'student@lms.com'}</p>
          </div>
        </div>

        {editing ? (
          <div className="space-y-3">
            <input className="input-base" value={profile.name} onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))} />
            <input className="input-base" value={profile.email} onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))} />
            <input className="input-base" value={profile.avatar} onChange={e => setProfile(prev => ({ ...prev, avatar: e.target.value }))} placeholder="Avatar URL" />
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
