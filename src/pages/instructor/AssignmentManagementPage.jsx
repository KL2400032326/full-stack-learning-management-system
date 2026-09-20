import Card from '../../components/common/Card'
import Button from '../../components/common/Button'

const AssignmentManagementPage = () => (
  <div className="page">
    <h1 className="page-title">Assignment Management</h1>
    <Card className="space-y-3 p-4">
      {['UI Heuristics Report', 'React Performance Audit', 'Data Dashboard Build'].map(item => (
        <div key={item} className="flex items-center justify-between rounded-xl border p-3">
          <p>{item}</p>
          <Button variant="secondary">Review Submissions</Button>
        </div>
      ))}
    </Card>
  </div>
)

export default AssignmentManagementPage
