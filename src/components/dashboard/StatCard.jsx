import Card from '../common/Card'

const StatCard = ({ label, value, trend }) => (
  <Card className="p-4">
    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
    <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
    <p className="mt-1 text-xs text-emerald-500">{trend}</p>
  </Card>
)

export default StatCard
