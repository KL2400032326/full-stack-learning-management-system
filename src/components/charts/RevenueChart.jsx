import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import Card from '../common/Card'

const RevenueChart = ({ data, title = 'Revenue Analytics', valueKey = 'value' }) => (
  <Card className="h-[320px]">
    <h3 className="mb-4 font-display text-lg">{title}</h3>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ left: -20, right: 8 }}>
        <defs>
          <linearGradient id="paintRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#118cff" stopOpacity={0.55} />
            <stop offset="95%" stopColor="#118cff" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey={valueKey} stroke="#118cff" fillOpacity={1} fill="url(#paintRevenue)" />
      </AreaChart>
    </ResponsiveContainer>
  </Card>
)

export default RevenueChart
