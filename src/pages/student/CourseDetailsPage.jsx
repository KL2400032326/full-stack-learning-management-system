import { useParams } from 'react-router-dom'
import Card from '../../components/common/Card'
import { courseCatalog, lessons } from '../../data/dummyData'

const CourseDetailsPage = () => {
  const { courseId } = useParams()
  const course = courseCatalog.find(item => item.id === courseId) || courseCatalog[0]

  return (
    <div className="page">
      <h1 className="page-title">{course.title}</h1>
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card className="p-4">
          <div className="mb-4 aspect-video rounded-2xl bg-slate-900/90 grid place-items-center text-white">
            Video Player UI
          </div>
          <p className="text-sm text-slate-500">Instructor: {course.instructor}</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-full bg-primary-500" style={{ width: `${course.progress}%` }} />
          </div>
          <p className="mt-1 text-xs text-slate-500">Progress {course.progress}%</p>
        </Card>
        <Card className="p-4">
          <h2 className="font-display text-lg">Lessons</h2>
          <div className="mt-3 space-y-2">
            {lessons.map(lesson => (
              <div key={lesson.id} className="rounded-xl border p-3 text-sm">
                <p className="font-medium">{lesson.title}</p>
                <p className="text-xs text-slate-500">{lesson.duration}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default CourseDetailsPage
