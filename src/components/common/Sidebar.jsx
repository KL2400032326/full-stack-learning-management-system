import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { menuByRole, sharedMenu } from '../../utils/menuByRole'
import { useAuth } from '../../context/AuthContext'

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
    isActive
      ? 'bg-primary-500 text-white shadow-glow'
      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
  }`

const Sidebar = ({ open, onClose }) => {
  const { user, logout } = useAuth()
  const roleLinks = menuByRole[user.role] || []

  return (
    <motion.aside
      initial={false}
      animate={{ x: open ? 0 : -320 }}
      className="glass fixed inset-y-3 left-3 z-40 flex w-72 flex-col rounded-2xl p-3 lg:static lg:inset-auto lg:z-0 lg:h-[calc(100vh-1.5rem)] lg:translate-x-0"
    >
      <div className="mb-5 flex items-center gap-2 px-2">
        <div className="rounded-xl bg-white p-1">
          <img
            src="https://static.vecteezy.com/system/resources/previews/029/898/304/non_2x/flat-web-template-with-lms-for-concept-design-concept-of-learning-management-system-vector.jpg"
            alt="LMS"
            className="h-8 w-12 rounded-lg object-cover"
          />
        </div>
        <div>
          <p className="font-display text-lg">NovaLMS</p>
          <p className="text-xs text-slate-500">Premium learning suite</p>
        </div>
      </div>

      <nav className="scrollbar flex-1 space-y-5 overflow-y-auto">
        <div className="space-y-1">
          <p className="px-3 text-[11px] uppercase tracking-wider text-slate-400">Role Workspace</p>
          {roleLinks.map(item => {
            const Icon = item.icon
            return (
              <NavLink key={item.to} to={item.to} className={linkClass} onClick={onClose}>
                <Icon size={16} /> {item.label}
              </NavLink>
            )
          })}
        </div>

        <div className="space-y-1">
          <p className="px-3 text-[11px] uppercase tracking-wider text-slate-400">General</p>
          {sharedMenu.map(item => {
            const Icon = item.icon
            return (
              <NavLink key={item.to} to={item.to} className={linkClass} onClick={onClose}>
                <Icon size={16} /> {item.label}
              </NavLink>
            )
          })}
        </div>
      </nav>

      <button type="button" className="btn-secondary mt-4 w-full" onClick={logout}>Sign out</button>
    </motion.aside>
  )
}

export default Sidebar
