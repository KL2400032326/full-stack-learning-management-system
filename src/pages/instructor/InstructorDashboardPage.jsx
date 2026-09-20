import { statCards, revenueData, progressData } from '../../data/dummyData'
import StatCard from '../../components/dashboard/StatCard'
import RevenueChart from '../../components/charts/RevenueChart'
import ProgressChart from '../../components/charts/ProgressChart'

const InstructorDashboardPage = () => (
  <div className="page">
    <div>
      <h1 className="page-title">Instructor Dashboard</h1>
      <p className="page-subtitle">Courses, student growth and earnings</p>
    </div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {statCards.instructor.map(item => <StatCard key={item.label} {...item} />)}
    </div>
    <div className="grid gap-4 xl:grid-cols-2">
      <RevenueChart data={revenueData} title="Revenue Graph" />
      <ProgressChart data={progressData} title="Performance Graph" />
    </div>
  </div>
)

export default InstructorDashboardPage
