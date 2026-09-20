import Card from '../../components/common/Card'
import { calendarEvents } from '../../data/dummyData'

const CalendarPage = () => (
  <div className="page">
    <div>
      <h1 className="page-title">Calendar</h1>
      <p className="page-subtitle">Upcoming sessions, deadlines and meetings</p>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {calendarEvents.map(item => (
        <Card key={item.id} className="p-4">
          <p className="text-xs text-slate-400">{item.day}</p>
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-sm text-primary-600">{item.time}</p>
        </Card>
      ))}
    </div>
  </div>
)

export default CalendarPage
