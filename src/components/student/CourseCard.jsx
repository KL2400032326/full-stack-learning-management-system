import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlayCircle, CheckCircle2 } from 'lucide-react'
import ProgressBar from './ProgressBar'

const CourseCard = ({ course }) => {
  const progress = course.progress || {
    progress: 0,
    completedVideos: 0,
    totalVideos: course.playlist?.length || 0,
    lastWatchedTopic: ''
  }
  const completed = progress.progress === 100

  return (
    <motion.article whileHover={{ y: -5 }} className="glass rounded-3xl p-4 shadow-glow">
      <img src={course.imageUrl} alt={course.title} className="h-40 w-full rounded-2xl object-cover" />

      <div className="mt-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg leading-tight">{course.title}</h3>
            <p className="text-sm text-slate-500">Instructor: {course.instructor}</p>
          </div>
          {completed ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">
              <CheckCircle2 size={12} /> Completed
            </span>
          ) : null}
        </div>

        <ProgressBar progress={progress.progress} />

        <p className="text-xs text-slate-600 dark:text-slate-300">
          Completed Videos: <span className="font-medium">{progress.completedVideos} / {progress.totalVideos}</span>
        </p>

        <p className="text-xs text-slate-600 dark:text-slate-300">
          Last Watched Topic: <span className="font-medium">{progress.lastWatchedTopic || 'Not started'}</span>
        </p>

        <div className="rounded-2xl border border-slate-200/80 p-3 dark:border-slate-700/70">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Videos</p>
          <div className="space-y-1">
            {course.playlist?.slice(0, 3).map((video, index) => (
              <p key={`${course.id}-${video.videoId}-${index}`} className="text-xs text-slate-600 dark:text-slate-300">
                {index + 1}. {video.topic}
              </p>
            ))}
            {!course.playlist?.length ? <p className="text-xs text-slate-500">No videos available yet.</p> : null}
          </div>
        </div>

        <Link to={`/student/course/${course.id}`} className="btn-primary inline-flex w-full items-center justify-center gap-2">
          <PlayCircle size={16} /> {completed ? 'Review Course' : 'Continue Learning'}
        </Link>
      </div>
    </motion.article>
  )
}

export default CourseCard
