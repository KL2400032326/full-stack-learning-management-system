import YouTube from 'react-youtube'
import { motion } from 'framer-motion'

const VideoPlayer = ({ isPlaylist, playlistId, activeVideoId, activeIndex, onReady, onEnd, onStateChange }) => {
  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      rel: 0,
      modestbranding: 1,
      autoplay: 0,
      ...(isPlaylist
        ? {
            listType: 'playlist',
            list: playlistId,
            index: activeIndex
          }
        : {})
    }
  }

  return (
    <motion.section initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-3xl p-4">
      <div className="aspect-video overflow-hidden rounded-2xl bg-black">
        <YouTube
          videoId={isPlaylist ? '' : activeVideoId}
          opts={opts}
          className="h-full w-full"
          iframeClassName="h-full w-full"
          onReady={onReady}
          onEnd={onEnd}
          onStateChange={onStateChange}
        />
      </div>
    </motion.section>
  )
}

export default VideoPlayer
