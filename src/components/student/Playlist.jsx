import { motion } from 'framer-motion'
import PlaylistItem from './PlaylistItem'

const Playlist = ({ items, activeIndex, completedVideos, onSelectTopic }) => (
  <motion.aside initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-3xl p-4">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="font-display text-lg">Topics Playlist</h3>
      <p className="text-xs text-slate-500">
        {completedVideos.length} / {items.length} completed
      </p>
    </div>

    <div className="scrollbar max-h-[66vh] space-y-2 overflow-y-auto pr-1">
      {items.map((item, index) => (
        <PlaylistItem
          key={`${item.videoId}-${index}`}
          videoId={item.videoId}
          topic={item.topic}
          duration={item.duration}
          assignmentUrl={item.assignmentUrl}
          index={index}
          isActive={activeIndex === index}
          isCompleted={completedVideos.includes(item.videoId)}
          onSelect={() => onSelectTopic(index)}
        />
      ))}
    </div>
  </motion.aside>
)

export default Playlist
