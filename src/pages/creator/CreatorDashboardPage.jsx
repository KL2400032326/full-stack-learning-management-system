import { statCards } from '../../data/dummyData'
import StatCard from '../../components/dashboard/StatCard'
import Card from '../../components/common/Card'

const CreatorDashboardPage = () => (
  <div className="page">
    <div>
      <h1 className="page-title">Content Creator Dashboard</h1>
      <p className="page-subtitle">Manage your content assets and publishing pipeline</p>
    </div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {statCards.creator.map(item => <StatCard key={item.label} {...item} />)}
    </div>
    <Card>
      <h3 className="font-display text-lg">Created content list</h3>
      <div className="mt-3 space-y-2 text-sm">
        {['JavaScript Intro Clips', 'UX Icon Pack', 'Data Visualization Templates'].map(item => (
          <div key={item} className="rounded-xl border p-3">{item}</div>
        ))}
      </div>
    </Card>
  </div>
)

export default CreatorDashboardPage
