import { useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import RoleSelector from '../components/auth/RoleSelector'
import { useAuth } from '../context/AuthContext'
import { getDashboardRoute, getSelectedRole } from '../services/authService'

const RoleSelect = () => {
  const { isAuthenticated, user } = useAuth()
  const selectedRole = getSelectedRole()

  const selectedRoleValue = useMemo(() => selectedRole, [selectedRole])

  if (isAuthenticated && user?.role) {
    return <Navigate to={getDashboardRoute(user.role)} replace />
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -left-28 -top-20 h-80 w-80 rounded-full bg-cyan-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-violet-400/25 blur-3xl" />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-8 left-16 h-28 w-28 rounded-full bg-primary-300/25 blur-2xl"
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-4 py-1 text-xs font-medium text-slate-600 dark:bg-slate-900/40 dark:text-slate-300">
            <Sparkles size={14} /> Premium LMS Portal
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Welcome to Learning Management System
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Choose your role to continue to login or create an account.
          </p>
        </motion.div>

        <RoleSelector selectedRole={selectedRoleValue} />
      </div>
    </div>
  )
}

export default RoleSelect
