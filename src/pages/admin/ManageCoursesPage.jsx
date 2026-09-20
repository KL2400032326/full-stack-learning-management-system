import { useState } from 'react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { courseCatalog } from '../../data/dummyData'

const ManageCoursesPage = () => {
  const [courses, setCourses] = useState(courseCatalog)

  return (
    <div className="page">
      <h1 className="page-title">Manage Courses</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {courses.map(course => (
          <Card key={course.id} className="p-4">
            <h3 className="font-medium">{course.title}</h3>
            <p className="text-sm text-slate-500">Instructor: {course.instructor}</p>
            <div className="mt-3 flex gap-2">
              <Button variant="secondary">Approve</Button>
              <Button variant="secondary" className="text-rose-600" onClick={() => setCourses(prev => prev.filter(c => c.id !== course.id))}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ManageCoursesPage
