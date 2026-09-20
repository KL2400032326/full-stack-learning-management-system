import { Bell, ChevronDown, LogOut, Menu, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getDefaultAvatar } from '../../services/authService'
import { useThemeContext } from '../../context/ThemeContext'

const StudentNavbar = ({ onMenuClick, onLogout }) => {
  const { user } = useAuth()
  const [openMenu, setOpenMenu] = useState(false)
  const { theme, toggleTheme } = useThemeContext()

  return (
    <header className="glass sticky top-0 z-20 mb-5 flex items-center gap-3 rounded-2xl p-3 md:px-5">
      <button type="button" className="btn-secondary lg:hidden" onClick={onMenuClick}>
        <Menu size={16} />
      </button>

      <div className="ml-auto flex items-center gap-3">
        <button type="button" className="btn-secondary px-3">
          <Bell size={16} />
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          className="btn-secondary px-3"
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenMenu(prev => !prev)}
            className="flex items-center gap-2 rounded-xl border bg-white/80 px-3 py-2 text-xs dark:bg-slate-900/70"
          >
            <img
              src={user?.avatar || getDefaultAvatar('student')}
              alt="profile"
              className="h-5 w-5 rounded-full object-cover"
            />
            <span className="hidden sm:inline">{user?.name || 'Student'}</span>
            <ChevronDown size={14} />
          </button>

          {openMenu ? (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border bg-white p-2 shadow-xl dark:bg-slate-900">
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(false)
                  onLogout()
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-600 transition hover:bg-rose-50 dark:hover:bg-rose-900/20"
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default StudentNavbar
