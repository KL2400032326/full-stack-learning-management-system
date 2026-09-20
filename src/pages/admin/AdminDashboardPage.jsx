import { useEffect, useState } from 'react'
import StatCard from '../../components/dashboard/StatCard'
import RevenueChart from '../../components/charts/RevenueChart'
import Card from '../../components/common/Card'
import { SkeletonGrid } from '../../components/common/Skeleton'
import { statCards, revenueData, activityFeed } from '../../data/dummyData'

const AdminDashboardPage = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Platform overview and operational analytics</p>
      </div>
      {loading ? (
        <SkeletonGrid />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.admin.map(item => <StatCard key={item.label} {...item} />)}
        </div>
      )}
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2"><RevenueChart data={revenueData} /></div>
        <Card className="p-4">
          <h3 className="font-display text-lg">Recent activity</h3>
          <div className="mt-3 space-y-3">
            {activityFeed.map(item => (
              <div key={item.id} className="rounded-xl border p-3">
                <p className="text-sm"><span className="font-medium">{item.actor}</span> {item.message}</p>
                <p className="text-xs text-slate-500">{item.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboardPage
