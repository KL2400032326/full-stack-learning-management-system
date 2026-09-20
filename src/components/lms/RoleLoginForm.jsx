import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const RoleLoginForm = ({ title, role, dashboardPath }) => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    if (!email.includes('@') || password.length < 6) {
      setError('Please enter a valid email and a 6+ character password.')
      return
    }

    login({ role, email, name: email.split('@')[0] })
    navigate(dashboardPath)
  }

  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={onSubmit}
        className="glass w-full max-w-md rounded-3xl p-6 md:p-8"
      >
        <h1 className="font-display text-3xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Sign in to continue to your dashboard</p>

        <div className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Email</span>
            <input className="input-base" value={email} onChange={e => setEmail(e.target.value)} type="email" />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Password</span>
            <input className="input-base" value={password} onChange={e => setPassword(e.target.value)} type="password" />
          </label>
        </div>

        {error ? <p className="mt-3 rounded-xl bg-rose-100 px-3 py-2 text-sm text-rose-700">{error}</p> : null}

        <div className="mt-6 flex gap-2">
          <button className="btn-secondary inline-flex flex-1 items-center justify-center gap-2" onClick={() => navigate('/')} type="button">
            <ArrowLeft size={16} /> Back
          </button>
          <button className="btn-primary flex-1" type="submit">Login</button>
        </div>
      </motion.form>
    </div>
  )
}

export default RoleLoginForm
