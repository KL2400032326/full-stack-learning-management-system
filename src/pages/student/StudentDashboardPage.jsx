import { statCards, progressData, courseCatalog } from '../../data/dummyData'
import StatCard from '../../components/dashboard/StatCard'
import ProgressChart from '../../components/charts/ProgressChart'
import CourseCard from '../../components/cards/CourseCard'

const StudentDashboardPage = () => (
  <div className="page">
    <div>
      <h1 className="page-title">Student Dashboard</h1>
      <p className="page-subtitle">Track your performance and continue learning</p>
    </div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {statCards.student.map(item => <StatCard key={item.label} {...item} />)}
    </div>
    <ProgressChart data={progressData} title="Progress Graph" />
    <div>
      <h2 className="mb-3 font-display text-xl">Recommended courses</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {courseCatalog.map(course => <CourseCard key={course.id} course={course} />)}
      </div>
    </div>
  </div>
)

export default StudentDashboardPage
