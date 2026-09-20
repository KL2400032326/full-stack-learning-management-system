import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, Pencil, Trash2 } from 'lucide-react'

const ContentCard = ({ item, onDelete }) => (
  <motion.article whileHover={{ y: -4 }} className="glass rounded-3xl p-4 shadow-glow">
    <img src={item.thumbnail} alt={item.title} className="h-36 w-full rounded-2xl object-cover" />

    <div className="mt-3 space-y-1">
      <h3 className="font-display text-lg leading-tight">{item.title}</h3>
      <p className="text-xs text-slate-500">Course: {item.courseName}</p>
      <p className="text-xs text-slate-500">Topic: {item.topicName}</p>
      <p className="text-xs text-slate-500">Uploaded: {item.uploadDate}</p>
    </div>

    <div className="mt-3 grid grid-cols-3 gap-2">
      <a className="btn-secondary inline-flex items-center justify-center gap-1" href={item.youtubeLink} target="_blank" rel="noreferrer">
        <Eye size={14} /> View
      </a>
      <Link className="btn-secondary inline-flex items-center justify-center gap-1" to={`/creator/edit/${item.id}`}>
        <Pencil size={14} /> Edit
      </Link>
      <button className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-100" type="button" onClick={() => onDelete(item.id)}>
        <Trash2 size={14} className="mx-auto" />
      </button>
    </div>
  </motion.article>
)

export default ContentCard
