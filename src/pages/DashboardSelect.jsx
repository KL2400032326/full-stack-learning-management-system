import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ShieldCheck, GraduationCap, BookOpenCheck, Clapperboard, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { ROLE_LIST } from '../utils/roleConfig'

const ICONS = {
  admin: ShieldCheck,
  instructor: GraduationCap,
  student: BookOpenCheck,
  creator: Clapperboard
}

const DashboardSelect = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [active, setActive] = useState(null)

  const cards = useMemo(() => ROLE_LIST, [])

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute -left-28 -top-24 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-primary-300/30 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-6xl"
      >
        <div className="mb-10 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
            <Sparkles size={14} /> Modern LMS Experience
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">Select Your Dashboard</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Choose your role workspace. Use Login for manual sign-in or Demo Login for instant access.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((item, index) => {
            const Icon = ICONS[item.role]
            return (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -6, scale: 1.01 }}
                onHoverStart={() => setActive(item.role)}
                onHoverEnd={() => setActive(null)}
                className="glass rounded-3xl p-5 shadow-glow"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-primary-500 p-2 text-white">
                  <Icon size={20} />
                </div>
                <h2 className="font-display text-xl">{item.name}</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                <div className="mt-6 flex gap-2">
                  <button className="btn-secondary flex-1" onClick={() => navigate(item.loginPath)} type="button">Login</button>
                  <button
                    className="btn-primary flex-1"
                    onClick={() => {
                      login({
                        role: item.role,
                        email: item.demoEmail,
                        name: `Demo ${item.role}`
                      })
                      navigate(item.dashboardPath)
                    }}
                    type="button"
                  >
                    Demo Login
                  </button>
                </div>
                <AnimatePresence>
                  {active === item.role ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 overflow-hidden text-xs text-primary-700 dark:text-primary-300"
                    >
                      Quick demo credential: {item.demoEmail}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

export default DashboardSelect
