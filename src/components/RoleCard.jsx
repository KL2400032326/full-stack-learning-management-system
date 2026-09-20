import { motion } from 'framer-motion'

const RoleCard = ({ role, selected, onClick }) => {
  const Icon = role.icon

  return (
    <motion.button
      type="button"
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`glass relative w-full rounded-3xl border p-5 text-left transition ${
        selected
          ? 'border-primary-400 bg-primary-100/60 shadow-glow dark:bg-primary-900/30'
          : 'border-white/40 hover:border-primary-300 hover:shadow-glow'
      }`}
    >
      <div className="mb-3 inline-flex rounded-2xl bg-primary-500 p-2 text-white">
        <Icon size={20} />
      </div>
      <h3 className="font-display text-xl">{role.name}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{role.description}</p>

      {selected ? <span className="absolute right-4 top-4 h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,.7)]" /> : null}
    </motion.button>
  )
}

export default RoleCard
