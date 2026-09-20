import ProgressChart from '../../components/charts/ProgressChart'
import Card from '../../components/common/Card'
import { progressData } from '../../data/dummyData'

const MyProgressPage = () => (
  <div className="page">
    <h1 className="page-title">My Progress</h1>
    <ProgressChart data={progressData} />
    <Card className="p-4">
      <h3 className="font-medium">Milestones</h3>
      <ul className="mt-2 space-y-2 text-sm text-slate-500">
        <li>Completed 6 courses</li>
        <li>Maintained 91% average score</li>
        <li>Learning streak: 26 days</li>
      </ul>
    </Card>
  </div>
)

export default MyProgressPage
