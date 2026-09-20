import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, FolderKanban, Upload, PencilLine, ChartColumnBig, UserCircle2, LogOut, Clapperboard } from 'lucide-react'
import { logoutUser } from '../../services/authService'

const menu = [
  { label: 'Dashboard', to: '/creator-dashboard', icon: LayoutDashboard },
  { label: 'My Content', to: '/creator/content', icon: FolderKanban },
  { label: 'Upload Content', to: '/creator/upload', icon: Upload },
  { label: 'Edit Content', to: '/creator/edit/default', icon: PencilLine },
  { label: 'Analytics', to: '/creator/analytics', icon: ChartColumnBig },
  { label: 'Profile', to: '/creator/profile', icon: UserCircle2 }
]

const navClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
    isActive
      ? 'bg-primary-500 text-white shadow-glow'
      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
  }`

const CreatorSidebar = ({ open, onClose }) => (
  <motion.aside
    initial={false}
    animate={{ x: open ? 0 : -320 }}
    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    className="glass fixed inset-y-3 left-3 z-40 flex w-72 flex-col rounded-2xl p-3 lg:static lg:translate-x-0"
  >
    <div className="mb-5 flex items-center gap-2 px-1">
      <div className="rounded-xl bg-primary-500 p-2 text-white"><Clapperboard size={18} /></div>
      <div>
        <p className="font-display text-lg">Creator Studio</p>
        <p className="text-xs text-slate-500">Content workspace</p>
      </div>
    </div>

    <nav className="scrollbar flex-1 space-y-1 overflow-y-auto pr-1">
      {menu.map(item => {
        const Icon = item.icon
        return (
          <NavLink key={item.to} to={item.to} className={navClass} onClick={onClose}>
            <Icon size={16} /> {item.label}
          </NavLink>
        )
      })}
    </nav>

    <button
      type="button"
      className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-100"
      onClick={logoutUser}
    >
      <LogOut size={16} /> Logout
    </button>
  </motion.aside>
)

export default CreatorSidebar
