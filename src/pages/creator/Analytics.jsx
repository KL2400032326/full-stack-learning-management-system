import { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts'
import { getCreatorAnalytics } from '../../services/creatorApi'

const COLORS = ['#118cff', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

const Card = ({ title, children }) => (
  <div className="card h-[340px] p-4">
    <h3 className="mb-4 font-display text-lg">{title}</h3>
    <ResponsiveContainer width="100%" height="88%">{children}</ResponsiveContainer>
  </div>
)

const Analytics = () => {
  const [data, setData] = useState({ usageTrend: [], distribution: [] })

  useEffect(() => {
    const load = async () => {
      const next = await getCreatorAnalytics()
      setData(next)
    }

    load()
  }, [])

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Analytics</h1>
        <p className="page-subtitle">Content usage and course distribution insights</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card title="Content Usage Chart">
          <LineChart data={data.usageTrend}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line dataKey="usage" stroke="#118cff" strokeWidth={3} />
          </LineChart>
        </Card>

        <Card title="Course Content Distribution">
          <PieChart>
            <Pie data={data.distribution} dataKey="value" nameKey="course" innerRadius={65} outerRadius={95}>
              {data.distribution.map((entry, index) => (
                <Cell key={`${entry.course}-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Card>
      </div>
    </div>
  )
}

export default Analytics
