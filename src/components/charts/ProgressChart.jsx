import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import Card from '../common/Card'

const ProgressChart = ({ data, dataKey = 'progress', xKey = 'week', title = 'Progress' }) => (
  <Card className="h-[300px]">
    <h3 className="mb-4 font-display text-lg">{title}</h3>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  </Card>
)

export default ProgressChart
