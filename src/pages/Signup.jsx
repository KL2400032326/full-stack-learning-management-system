import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, GraduationCap, Lock, Mail, User } from 'lucide-react'
import GoogleAuthButton from '../components/GoogleAuthButton'
import { useAuth } from '../context/AuthContext'
import { getDashboardRoute, getSelectedRole, signupUser } from '../services/authService'

const roleLabels = {
  student: 'Student',
  instructor: 'Instructor',
  admin: 'Admin',
  creator: 'Content Creator'
}

const Signup = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user, login } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const selectedRole = getSelectedRole()
  const roleLabel = useMemo(() => roleLabels[selectedRole] || '', [selectedRole])

  useEffect(() => {
    if (!selectedRole) {
      window.alert('Please select role first')
    }
  }, [selectedRole])

  if (!selectedRole) {
    return <Navigate to="/" replace />
  }

  if (isAuthenticated && user?.role) {
    return <Navigate to={getDashboardRoute(user.role)} replace />
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signupUser({
      ...form,
      role: selectedRole
    })

    setLoading(false)

    if (!result.success) {
      setError(result.message)
      return
    }

    login(result.user)
    navigate(getDashboardRoute(result.user.role), { replace: true })
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-primary-300/30 blur-3xl" />

      <form onSubmit={handleSubmit} className="glass w-full max-w-xl rounded-3xl p-6 shadow-glow md:p-8">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft size={16} /> Back to login
        </button>

        <div className="mt-5 flex items-center gap-3">
          <span className="rounded-2xl bg-primary-500 p-3 text-white">
            <GraduationCap size={22} />
          </span>
          <div>
            <p className="text-sm font-medium text-primary-600 dark:text-primary-300">Signup</p>
            <h1 className="font-display text-3xl font-semibold">Create {roleLabel} Account</h1>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          Create your LMS account with email and password, or continue with Google using a full-page redirect.
        </p>

        <div className="mt-6 space-y-4">
          <GoogleAuthButton label="Continue with Google" selectedRole={selectedRole} />

          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-400">
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            <span>or</span>
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          </div>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Name</span>
            <div className="relative">
              <User size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-white/80 py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/60"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Email</span>
            <div className="relative">
              <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-white/80 py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/60"
                required
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Password</span>
            <div className="relative">
              <Lock size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-white/80 py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/60"
                required
              />
            </div>
          </label>

          {error ? <p className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Signup'}
          </button>

          <Link to="/login" className="btn-secondary block w-full rounded-xl px-4 py-3 text-center">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signup
