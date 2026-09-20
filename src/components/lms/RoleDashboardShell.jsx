import { useNavigate } from 'react-router-dom'
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts'
import { motion } from 'framer-motion'
import { Menu, Bell, Search, UserCircle2, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Sidebar = ({ title }) => (
  <aside className="glass rounded-2xl p-4 lg:w-64">
    <h2 className="font-display text-xl">{title}</h2>
    <p className="mt-1 text-xs text-slate-500">Workspace navigation</p>
    <nav className="mt-5 space-y-2 text-sm">
      {['Overview', 'Analytics', 'Tasks', 'Messages', 'Profile'].map(item => (
        <button key={item} className="w-full rounded-xl px-3 py-2 text-left text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800" type="button">
          {item}
        </button>
      ))}
    </nav>
  </aside>
)

const Navbar = ({ roleName }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="glass mb-4 flex flex-wrap items-center gap-3 rounded-2xl p-3">
      <button className="btn-secondary px-3" type="button"><Menu size={16} /></button>
      <div className="relative min-w-[220px] flex-1">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input className="input-base pl-9" placeholder={`Search ${roleName} data`} />
      </div>
      <button className="btn-secondary px-3" type="button"><Bell size={16} /></button>
      <div className="rounded-xl border bg-white/80 px-3 py-2 text-xs dark:bg-slate-900/60">
        {user?.email}
      </div>
      <button
        className="btn-secondary inline-flex items-center gap-2"
        onClick={() => {
          logout()
          navigate('/')
        }}
        type="button"
      >
        <LogOut size={15} /> Logout
      </button>
    </header>
  )
}

const StatCard = ({ label, value, color }) => (
  <motion.div whileHover={{ y: -4 }} className="glass rounded-2xl p-4">
    <p className="text-xs text-slate-500">{label}</p>
    <p className="mt-2 font-display text-2xl" style={{ color }}>{value}</p>
  </motion.div>
)

const RoleDashboardShell = ({ roleName, title, stats, lineData, areaData }) => {
  return (
    <div className="min-h-screen p-3 md:p-4">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-3 lg:flex-row">
        <Sidebar title={roleName} />

        <section className="min-w-0 flex-1">
          <Navbar roleName={roleName} />

          <div className="mb-4">
            <h1 className="font-display text-3xl font-semibold">{title}</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">Dashboard cards, analytics charts and profile overview</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(item => (
              <StatCard key={item.label} {...item} />
            ))}
          </div>

          <div className="mt-4 grid gap-3 xl:grid-cols-[1.4fr_1fr]">
            <div className="glass h-[320px] rounded-2xl p-4">
              <h3 className="font-display text-lg">Performance Trend</h3>
              <ResponsiveContainer width="100%" height="88%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="value" stroke="#118cff" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="glass h-[320px] rounded-2xl p-4">
              <h3 className="font-display text-lg">Growth Analytics</h3>
              <ResponsiveContainer width="100%" height="88%">
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="fillGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#06b6d4" fill="url(#fillGrowth)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <aside className="glass h-fit rounded-2xl p-4 lg:w-80">
          <div className="mb-3 flex items-center gap-2">
            <UserCircle2 className="text-primary-500" size={22} />
            <h3 className="font-display text-lg">Profile Section</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="rounded-xl border p-3">
              <p className="text-xs text-slate-500">Name</p>
              <p className="font-medium">Alex Morgan</p>
            </div>
            <div className="rounded-xl border p-3">
              <p className="text-xs text-slate-500">Plan</p>
              <p className="font-medium">Premium Workspace</p>
            </div>
            <div className="rounded-xl border p-3">
              <p className="text-xs text-slate-500">Status</p>
              <p className="font-medium text-emerald-600">Active</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default RoleDashboardShell
