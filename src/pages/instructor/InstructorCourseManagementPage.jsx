import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { courseCatalog } from '../../data/dummyData'

const InstructorCourseManagementPage = () => (
  <div className="page">
    <h1 className="page-title">Course Management</h1>
    <div className="grid gap-4 md:grid-cols-2">
      {courseCatalog.map(course => (
        <Card key={course.id} className="p-4">
          <h3 className="font-medium">{course.title}</h3>
          <p className="text-sm text-slate-500">{course.progress}% average completion</p>
          <div className="mt-3 flex gap-2">
            <Button variant="secondary">Edit</Button>
            <Button variant="secondary">View Insights</Button>
          </div>
        </Card>
      ))}
    </div>
  </div>
)

export default InstructorCourseManagementPage
