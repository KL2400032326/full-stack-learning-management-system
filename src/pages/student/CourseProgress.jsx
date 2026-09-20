import ProgressBar from './ProgressBar'

const CourseProgress = ({ completedVideos, totalVideos, progress }) => (
  <div className="card p-4">
    <h2 className="font-display text-lg">Course Progress</h2>
    <div className="mt-3">
      <ProgressBar progress={progress} />
      <p className="mt-2 text-xs text-slate-500">
        Completed Videos: {completedVideos} / {totalVideos}
      </p>
    </div>
  </div>
)

export default CourseProgress
