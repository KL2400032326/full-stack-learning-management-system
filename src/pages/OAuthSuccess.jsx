import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const OAuthSuccess = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true })
      return
    }

    const role = user.role?.toLowerCase()

    if (role === 'student') {
      navigate('/student-dashboard', { replace: true })
    } else if (role === 'instructor') {
      navigate('/instructor-dashboard', { replace: true })
    } else if (role === 'admin') {
      navigate('/admin-dashboard', { replace: true })
    } else if (role === 'creator') {
      navigate('/creator-dashboard', { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }, [user, navigate])

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass w-full max-w-md rounded-3xl p-8 text-center shadow-glow">
        <p className="text-lg font-semibold text-slate-800">
          Logging you in...
        </p>
      </div>
    </div>
  )
}

export default OAuthSuccess
