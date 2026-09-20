import { Bell } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNotifications } from '../../context/NotificationContext'
import Card from './Card'
import Button from './Button'

const NotificationDrawer = ({ open, onClose }) => {
  const { notifications, markAllRead } = useNotifications()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 bg-black/35" onClick={onClose}>
      <motion.div
        initial={{ x: 340 }}
        animate={{ x: 0 }}
        exit={{ x: 340 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="absolute right-0 top-0 h-full w-full max-w-sm p-4"
        onClick={e => e.stopPropagation()}
      >
        <Card className="flex h-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Bell size={16} /> Notifications
            </div>
            <Button variant="secondary" onClick={markAllRead}>Mark all read</Button>
          </div>
          <div className="scrollbar space-y-3 overflow-y-auto pr-1">
            {notifications.map(item => (
              <div key={item.id} className="rounded-xl border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{item.title}</p>
                  {item.unread && <span className="h-2 w-2 rounded-full bg-primary-500" />}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                <p className="mt-1 text-[11px] text-slate-400">{item.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default NotificationDrawer
