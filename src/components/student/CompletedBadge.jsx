import { CheckCircle2 } from 'lucide-react'

const CompletedBadge = () => (
  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">
    <CheckCircle2 size={12} /> Completed
  </span>
)

export default CompletedBadge
