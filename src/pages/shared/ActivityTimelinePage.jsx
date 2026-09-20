import Card from '../../components/common/Card'
import { activityFeed } from '../../data/dummyData'

const ActivityTimelinePage = () => (
  <div className="page">
    <div>
      <h1 className="page-title">Activity timeline</h1>
      <p className="page-subtitle">Track platform and learning actions</p>
    </div>
    <div className="space-y-3">
      {activityFeed.map(item => (
        <Card key={item.id} className="relative p-4 pl-8">
          <span className="absolute left-4 top-6 h-2 w-2 rounded-full bg-primary-500" />
          <p className="text-sm"><span className="font-semibold">{item.actor}</span> {item.message}</p>
          <p className="text-xs text-slate-500">{item.time}</p>
        </Card>
      ))}
    </div>
  </div>
)

export default ActivityTimelinePage
