import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fallbackImage =
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'

const CourseCard = ({ course, onDelete, deleting }) => {
  const totalStudents = Array.isArray(course.enrolledStudentIds) ? course.enrolledStudentIds.length : course.totalStudents || 0
  const totalVideos = Array.isArray(course.videos) ? course.videos.length : 0
  const imageUrl = course.imageUrl || fallbackImage

  const handleDelete = () => {
    if (!window.confirm(`Are you sure you want to delete "${course.title}"? This will remove all videos and enrollments.`)) {
      return
    }

    onDelete?.(course.id)
  }

  return (
    <motion.article whileHover={{ y: -4 }} className="glass rounded-3xl p-4 shadow-glow">
      <Link to={`/instructor/upload-video/${course.id}`}>
        <img src={imageUrl} alt={course.title} className="h-40 w-full rounded-2xl object-cover" />
      </Link>

      <div className="mt-4 space-y-2">
        <Link to={`/instructor/upload-video/${course.id}`} className="block font-display text-lg leading-tight hover:text-primary-600">
          {course.title}
        </Link>
        <p className="text-sm text-slate-500">Students: {totalStudents}</p>
        <p className="text-sm text-slate-500">Videos: {totalVideos}</p>
        <p className="line-clamp-2 text-sm text-slate-500">{course.description || 'No description available yet.'}</p>

        <div className="rounded-2xl border border-slate-200/80 p-3 dark:border-slate-700/70">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Uploaded Videos</p>
          <div className="space-y-1">
            {course.videos?.slice(0, 3).map((video, index) => (
              <p key={`${course.id}-${video.id}-${index}`} className="text-xs text-slate-600 dark:text-slate-300">
                {index + 1}. {video.topic || video.title}
              </p>
            ))}
            {!course.videos?.length ? <p className="text-xs text-slate-500">No videos uploaded yet.</p> : null}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-3">
          <Link to={`/instructor/upload-video/${course.id}?mode=view`} className="btn-secondary text-center">View Course</Link>
          <Link to={`/instructor/create-course?edit=${course.id}`} className="btn-secondary text-center">Edit Course</Link>
          <Link to={`/instructor/upload-video/${course.id}`} className="btn-primary text-center">Upload Video</Link>
        </div>

        <button
          type="button"
          className="mt-2 w-full rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={deleting}
          onClick={handleDelete}
        >
          {deleting ? 'Deleting Course...' : 'Delete Course'}
        </button>
      </div>
    </motion.article>
  )
}

export default CourseCard
