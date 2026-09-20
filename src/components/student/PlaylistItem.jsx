import { PlayCircle, CheckCircle2 } from 'lucide-react'

const PlaylistItem = ({ videoId, topic, duration, assignmentUrl, index, isActive, isCompleted, onSelect }) => (
  <div className="space-y-2">
    <button
      type="button"
      onClick={onSelect}
      data-video-id={videoId}
      className={`group w-full rounded-xl border px-3 py-3 text-left transition ${
        isActive
          ? 'border-primary-400 bg-primary-100/80 dark:border-primary-500 dark:bg-primary-900/30'
          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 rounded-lg p-1 ${isActive ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
          <PlayCircle size={15} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">
            {index + 1}. {topic}
          </p>
          <p className="text-[11px] text-slate-500">{duration}</p>
        </div>

        <div className="min-w-5 text-right">
          {isCompleted ? <CheckCircle2 size={16} className="text-emerald-500" /> : null}
        </div>
      </div>
    </button>

    {assignmentUrl?.trim() ? (
      <a href={assignmentUrl.trim()} className="inline-flex text-xs text-primary-600">
        Open Assignment
      </a>
    ) : null}
  </div>
)

export default PlaylistItem
