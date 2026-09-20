import { CheckCircle2 } from 'lucide-react'
import ProgressBar from './ProgressBar'

const CourseHeader = ({ course, currentTopic, completedTopics, totalTopics, progress, isCompleted }) => (
  <div className="card p-5">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="font-display text-2xl">{course.title}</h1>
        <p className="mt-1 text-sm text-slate-500">Instructor: {course.instructor}</p>
        <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">
          Now Playing: <span className="text-primary-600 dark:text-primary-300">{currentTopic}</span>
        </p>
      </div>

      {isCompleted ? (
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          <CheckCircle2 size={14} /> Course Completed
        </span>
      ) : null}
    </div>

    <div className="mt-4">
      <ProgressBar progress={progress} />
      <p className="mt-2 text-xs text-slate-500">Completed: {completedTopics} / {totalTopics} Topics Completed</p>
    </div>
  </div>
)

export default CourseHeader
