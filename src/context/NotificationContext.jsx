import { createContext, useContext, useMemo, useState } from 'react'
import { notificationsSeed } from '../data/dummyData'

const NotificationContext = createContext(null)

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(notificationsSeed)

  const markAllRead = () => setNotifications(prev => prev.map(item => ({ ...item, unread: false })))
  const unreadCount = notifications.filter(n => n.unread).length

  const value = useMemo(() => ({ notifications, setNotifications, unreadCount, markAllRead }), [notifications, unreadCount])

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotifications must be used inside NotificationProvider')
  return context
}
