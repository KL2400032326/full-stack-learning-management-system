import { Menu, Bell } from 'lucide-react'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import SearchInput from './SearchInput'
import NotificationDrawer from './NotificationDrawer'
import { useNotifications } from '../../context/NotificationContext'
import { useAuth } from '../../context/AuthContext'
import { getDefaultAvatar } from '../../services/authService'

const Topbar = ({ onMenuClick, search, setSearch }) => {
  const [openNotifications, setOpenNotifications] = useState(false)
  const { unreadCount } = useNotifications()
  const { user } = useAuth()

  return (
    <>
      <header className="glass sticky top-0 z-30 mb-5 flex items-center gap-3 rounded-2xl p-3 md:px-5">
        <button type="button" className="btn-secondary lg:hidden" onClick={onMenuClick}>
          <Menu size={17} />
        </button>
        <SearchInput value={search} onChange={setSearch} />
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <button type="button" onClick={() => setOpenNotifications(true)} className="btn-secondary relative px-3">
            <Bell size={16} />
            {unreadCount > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500" />}
          </button>
          <div className="hidden items-center gap-2 rounded-xl border bg-white/80 px-2 py-1 text-sm dark:bg-slate-900/70 sm:flex">
            <img src={user?.avatar || getDefaultAvatar(user?.role)} alt="avatar" className="h-8 w-8 rounded-lg object-cover" />
            <div>
              <p className="text-xs font-semibold">{user?.name || 'User'}</p>
              <p className="text-[11px] text-slate-500 capitalize">{user?.role || 'member'}</p>
            </div>
          </div>
        </div>
      </header>
      <NotificationDrawer open={openNotifications} onClose={() => setOpenNotifications(false)} />
    </>
  )
}

export default Topbar
