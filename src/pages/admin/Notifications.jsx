import { Bell } from 'lucide-react'
import { notificationsSeed } from '../../data/adminDummyData'

const Notifications = () => (
  <div className="page">
    <div>
      <h1 className="page-title">Notifications</h1>
      <p className="page-subtitle">System, moderation and report alerts</p>
    </div>

    <div className="space-y-3">
      {notificationsSeed.map(item => (
        <div key={item.id} className="card flex items-center gap-3 p-4">
          <span className="rounded-xl bg-primary-500/10 p-2 text-primary-600 dark:bg-primary-500/20"><Bell size={16} /></span>
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-xs text-slate-500">{item.type} | {item.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default Notifications
