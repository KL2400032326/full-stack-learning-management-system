import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { useNotifications } from '../../context/NotificationContext'

const NotificationsPage = () => {
  const { notifications, markAllRead } = useNotifications()
  return (
    <div className="page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">Alerts, reminders and system updates</p>
        </div>
        <Button variant="secondary" onClick={markAllRead}>Mark all read</Button>
      </div>
      <div className="space-y-3">
        {notifications.map(item => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{item.title}</h3>
              <span className="text-xs text-slate-400">{item.time}</span>
            </div>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default NotificationsPage
