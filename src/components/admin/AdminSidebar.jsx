import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { adminMenu, sidebarBrand } from './menuConfig'
import { logoutUser } from '../../services/authService'

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
    isActive
      ? 'bg-primary-500 text-white shadow-glow'
      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
  }`

const AdminSidebar = ({ open, onClose }) => {
  const BrandIcon = sidebarBrand.icon

  return (
    <motion.aside
      initial={false}
      animate={{ x: open ? 0 : -320 }}
      transition={{ type: 'spring', stiffness: 280, damping: 25 }}
      className="glass fixed inset-y-3 left-3 z-40 flex w-72 flex-col rounded-2xl p-3 lg:static lg:translate-x-0"
    >
      <div className="mb-5 flex items-center gap-3 px-1">
        <div className="rounded-xl bg-primary-500 p-2 text-white"><BrandIcon size={18} /></div>
        <div>
          <p className="font-display text-lg">{sidebarBrand.name}</p>
          <p className="text-xs text-slate-500">{sidebarBrand.subtitle}</p>
        </div>
      </div>

      <nav className="scrollbar flex-1 space-y-1 overflow-y-auto pr-1">
        {adminMenu.map(item => {
          const Icon = item.icon
          if (item.isLogout) {
            return (
              <button
                key={item.label}
                onClick={logoutUser}
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-rose-600 transition hover:bg-rose-50 dark:hover:bg-rose-900/20"
              >
                <Icon size={16} /> {item.label}
              </button>
            )
          }

          return (
            <NavLink key={item.path} to={item.path} className={linkClass} onClick={onClose}>
              <Icon size={16} /> {item.label}
            </NavLink>
          )
        })}
      </nav>
    </motion.aside>
  )
}

export default AdminSidebar
