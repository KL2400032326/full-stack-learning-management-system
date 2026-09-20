const ProgressBar = ({ progress, completedVideos, totalVideos }) => {
  const safe = Math.max(0, Math.min(100, progress))

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-slate-500">Progress</span>
        <span className="font-semibold text-primary-600 dark:text-primary-300">{safe}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 transition-all duration-500" style={{ width: `${safe}%` }} />
      </div>
      {typeof completedVideos === 'number' && typeof totalVideos === 'number' ? (
        <p className="mt-1 text-[11px] text-slate-500">
          Completed Videos: {completedVideos} / {totalVideos}
        </p>
      ) : null}
    </div>
  )
}

export default ProgressBar
