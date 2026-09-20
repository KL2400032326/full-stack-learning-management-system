import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import Checkbox from '../Checkbox'

const LoginForm = ({ onSubmit, loading, error, roleLabel, welcomeName, initialEmail, initialPassword }) => {
  const [form, setForm] = useState({
    email: initialEmail || '',
    password: initialPassword || '',
    rememberMe: true
  })
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      email: initialEmail || '',
      password: initialPassword || ''
    }))
  }, [initialEmail, initialPassword])

  const submit = e => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={submit}
      className="glass w-full max-w-md rounded-3xl p-6 shadow-glow"
    >
      <h1 className="font-display text-3xl">LMS Login</h1>
      <p className="mt-2 text-sm font-medium text-primary-600 dark:text-primary-300">Welcome {welcomeName}</p>
      <p className="text-sm text-slate-500">{roleLabel} Login</p>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Email</span>
          <div className="relative">
            <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              className="input-base h-10 w-full py-2 pl-10 pr-4"
              required
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Password</span>
          <div className="relative">
            <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
              className="input-base h-10 w-full py-2 pl-10 pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </label>

        <Checkbox
          id="remember-me"
          checked={form.rememberMe}
          onChange={e => setForm(prev => ({ ...prev, rememberMe: e.target.checked }))}
          label="Remember Me"
        />

        {error ? <p className="rounded-xl bg-rose-100 px-3 py-2 text-sm text-rose-700">{error}</p> : null}

        <button type="submit" className="btn-primary inline-flex w-full items-center justify-center gap-2" disabled={loading}>
          <LogIn size={16} /> {loading ? 'Signing in...' : 'Login'}
        </button>
      </div>
    </motion.form>
  )
}

export default LoginForm
