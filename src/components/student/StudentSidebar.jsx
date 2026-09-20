import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, LineChart, Award, UserCircle2, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'

const items = [
  { label: 'Dashboard', to: '/student-dashboard', icon: LayoutDashboard },
  { label: 'My Courses', to: '/student/courses', icon: BookOpen },
  { label: 'Progress', to: '/student/progress', icon: LineChart },
  { label: 'Certificates', to: '/student/certificates', icon: Award },
  { label: 'Profile', to: '/student/profile', icon: UserCircle2 }
]

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
    isActive
      ? 'bg-primary-500 text-white shadow-glow'
      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
  }`

const StudentSidebar = ({ open, onClose, onLogout }) => (
  <motion.aside
    initial={false}
    animate={{ x: open ? 0 : -320 }}
    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    className="glass fixed inset-y-3 left-3 z-40 flex w-72 flex-col rounded-2xl p-3 lg:static lg:translate-x-0"
  >
    <div className="mb-5 px-1">
      <h2 className="font-display text-lg">Student Workspace</h2>
      <p className="text-xs text-slate-500">Learning hub</p>
    </div>

    <nav className="scrollbar flex-1 space-y-1 overflow-y-auto pr-1">
      {items.map(item => {
        const Icon = item.icon
        return (
          <NavLink key={item.to} to={item.to} className={linkClass} onClick={onClose}>
            <Icon size={16} /> {item.label}
          </NavLink>
        )
      })}
    </nav>

    <button
      type="button"
      onClick={onLogout}
      className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600 transition hover:border-rose-300 hover:bg-rose-100"
    >
      <LogOut size={16} /> Logout
    </button>
  </motion.aside>
)

export default StudentSidebar
