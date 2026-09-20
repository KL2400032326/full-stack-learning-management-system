import { LogOut, Menu, Moon, Sun } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { getDefaultAvatar, logoutUser } from '../../services/authService'
import { useThemeContext } from '../../context/ThemeContext'

const AdminNavbar = ({ onMenuClick, search, setSearch }) => {
  const { user } = useAuth()
  const { theme, toggleTheme } = useThemeContext()

  return (
    <header className="glass sticky top-0 z-20 mb-5 flex items-center gap-3 rounded-2xl p-3 md:px-5">
      <button className="btn-secondary px-3 lg:hidden" onClick={onMenuClick} type="button">
        <Menu size={16} />
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-xs transition hover:-translate-y-0.5 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900/70"
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <button
          type="button"
          onClick={logoutUser}
          className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600 transition hover:bg-rose-100"
        >
          <LogOut size={14} /> Logout
        </button>
        <div className="hidden items-center gap-2 rounded-xl border bg-white/80 px-3 py-1 text-xs dark:bg-slate-900/70 sm:flex">
          <img
            src={user?.avatar || getDefaultAvatar('admin')}
            alt="profile"
            className="h-7 w-7 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{user?.name || 'Admin'}</p>
            <p className="text-[11px] text-slate-500">{user?.email || 'admin@lms.com'}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar
