import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, GraduationCap, KeyRound, Lock, Mail, ShieldCheck } from 'lucide-react'
import GoogleAuthButton from '../components/GoogleAuthButton'
import { useAuth } from '../context/AuthContext'
import {
  getDashboardRoute,
  getSelectedRole,
  loginUser,
  requestPasswordResetOtp,
  resetPasswordWithOtp,
  verifyPasswordResetOtp
} from '../services/authService'

const roleLabels = {
  student: 'Student',
  instructor: 'Instructor',
  admin: 'Admin',
  creator: 'Content Creator'
}

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, user, login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  const [forgotPasswordStep, setForgotPasswordStep] = useState('request')
  const [resetForm, setResetForm] = useState({ email: '', otp: '', newPassword: '' })

  const selectedRole = getSelectedRole()
  const roleLabel = useMemo(() => roleLabels[selectedRole] || '', [selectedRole])

  useEffect(() => {
    if (!selectedRole) {
      window.alert('Please select role first')
    }
  }, [selectedRole])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const oauthError = params.get('oauthError')
    if (oauthError) {
      setError(oauthError)
    }
  }, [location.search])

  if (!selectedRole) {
    return <Navigate to="/" replace />
  }

  if (isAuthenticated && user?.role) {
    return <Navigate to={getDashboardRoute(user.role)} replace />
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setInfo('')
    setLoading(true)

    const result = await loginUser(form.email, form.password, selectedRole)
    setLoading(false)

    if (!result.success) {
      setError(result.message)
      return
    }

    login(result.user)
    navigate(getDashboardRoute(result.user.role), { replace: true })
  }

  const handleRequestResetOtp = async () => {
    setError('')
    setInfo('')
    setLoading(true)

    const result = await requestPasswordResetOtp(resetForm.email)
    setLoading(false)

    if (!result.success) {
      setError(result.message)
      return
    }

    setForgotPasswordStep('verify')
    setResetForm(prev => ({ ...prev, otp: '' }))
    setInfo(result.message)
  }

  const handleVerifyOtp = async () => {
    setError('')
    setInfo('')
    setLoading(true)

    const result = await verifyPasswordResetOtp({ email: resetForm.email, otp: resetForm.otp })
    setLoading(false)

    if (!result.success) {
      setError(result.message)
      return
    }

    setForgotPasswordStep('reset')
    setInfo(result.message)
  }

  const handleResetPassword = async () => {
    setError('')
    setInfo('')
    setLoading(true)

    const result = await resetPasswordWithOtp({
      email: resetForm.email,
      newPassword: resetForm.newPassword
    })
    setLoading(false)

    if (!result.success) {
      setError(result.message)
      return
    }

    setInfo(result.message)
    setForgotPasswordOpen(false)
    setForgotPasswordStep('request')
    setForm(prev => ({ ...prev, email: resetForm.email }))
    setResetForm({ email: resetForm.email, otp: '', newPassword: '' })
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-primary-300/30 blur-3xl" />

      <form onSubmit={handleSubmit} className="glass w-full max-w-xl rounded-3xl p-6 shadow-glow md:p-8">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft size={16} /> Change role
        </button>

        <div className="mt-5 flex items-center gap-3">
          <span className="rounded-2xl bg-primary-500 p-3 text-white">
            <GraduationCap size={22} />
          </span>
          <div>
            <p className="text-sm font-medium text-primary-600 dark:text-primary-300">Login</p>
            <h1 className="font-display text-3xl font-semibold">{roleLabel} Portal</h1>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          Sign in with your email and password, use Google full-page redirect, or reset your password with email OTP.
        </p>

        <div className="mt-6 space-y-4">
          <GoogleAuthButton label="Continue with Google" selectedRole={selectedRole} />

          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-400">
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            <span>or</span>
            <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          </div>

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

          <button
            type="button"
            onClick={() => {
              setForgotPasswordOpen(prev => !prev)
              setForgotPasswordStep('request')
              setResetForm(prev => ({ ...prev, email: form.email || prev.email, otp: '', newPassword: '' }))
              setError('')
              setInfo('')
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <KeyRound size={16} /> Forgot password?
          </button>

          {forgotPasswordOpen ? (
            <div className="rounded-3xl border border-slate-200 bg-white/50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
              {forgotPasswordStep === 'request' ? (
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">Enter your email and we&apos;ll send a 6-digit OTP.</p>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Account Email</span>
                    <div className="relative">
                      <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={resetForm.email}
                        onChange={e => setResetForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full rounded-xl border border-slate-200 bg-white/80 py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/60"
                        required
                      />
                    </div>
                  </label>
                  <button type="button" onClick={handleRequestResetOtp} className="btn-secondary w-full" disabled={loading}>
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </div>
              ) : null}

              {forgotPasswordStep === 'verify' ? (
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">Enter OTP sent to your email.</p>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">OTP</span>
                    <div className="relative">
                      <ShieldCheck size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        autoComplete="off"
                        value={resetForm.otp}
                        onChange={e => setResetForm(prev => ({ ...prev, otp: e.target.value }))}
                        className="w-full rounded-xl border border-slate-200 bg-white/80 py-3 pl-12 pr-4 tracking-[0.35em] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/60"
                        required
                      />
                    </div>
                  </label>
                  <div className="flex gap-3">
                    <button type="button" onClick={handleVerifyOtp} className="btn-secondary w-full" disabled={loading}>
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                    <button type="button" onClick={handleRequestResetOtp} className="btn-secondary w-full" disabled={loading}>
                      Resend OTP
                    </button>
                  </div>
                </div>
              ) : null}

              {forgotPasswordStep === 'reset' ? (
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">OTP verified. Choose your new password.</p>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">New Password</span>
                    <div className="relative">
                      <Lock size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        value={resetForm.newPassword}
                        onChange={e => setResetForm(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full rounded-xl border border-slate-200 bg-white/80 py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900/60"
                        required
                      />
                    </div>
                  </label>
                  <button type="button" onClick={handleResetPassword} className="btn-secondary w-full" disabled={loading}>
                    {loading ? 'Updating...' : 'Reset Password'}
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}

          {info ? <p className="rounded-2xl bg-emerald-100 px-4 py-3 text-sm text-emerald-700">{info}</p> : null}
          {error ? <p className="rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Please wait...' : 'Login'}
          </button>

          <Link to="/signup" className="btn-secondary block w-full rounded-xl px-4 py-3 text-center">
            Go to Signup
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
