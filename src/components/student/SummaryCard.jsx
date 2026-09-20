import { motion } from 'framer-motion'

const SummaryCard = ({ label, value, icon: Icon, tone = 'primary' }) => {
  const tones = {
    primary: 'bg-primary-500/10 text-primary-600 dark:bg-primary-500/20',
    success: 'bg-emerald-500/10 text-emerald-600',
    warning: 'bg-amber-500/10 text-amber-600',
    info: 'bg-cyan-500/10 text-cyan-600'
  }

  return (
    <motion.div whileHover={{ y: -3 }} className="card flex items-center gap-3 p-4">
      <span className={`rounded-xl p-2 ${tones[tone]}`}><Icon size={18} /></span>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-display text-2xl">{value}</p>
      </div>
    </motion.div>
  )
}

export default SummaryCard
