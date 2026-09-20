import { motion } from 'framer-motion'
import Card from './Card'

const SkeletonCard = () => (
  <Card className="animate-pulse p-4">
    <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
    <div className="mt-3 h-8 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
    <div className="mt-2 h-3 w-2/3 rounded bg-slate-100 dark:bg-slate-800" />
  </Card>
)

export const SkeletonGrid = () => (
  <motion.div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    {Array.from({ length: 4 }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </motion.div>
)
