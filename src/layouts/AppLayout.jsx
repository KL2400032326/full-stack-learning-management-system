import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '../components/common/Sidebar'
import Topbar from '../components/common/Topbar'

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <div className="mx-auto flex max-w-[1600px] gap-3 p-3">
      <Sidebar open={sidebarOpen || window.innerWidth >= 1024} onClose={() => setSidebarOpen(false)} />
      <main className="min-w-0 flex-1">
        <Topbar onMenuClick={() => setSidebarOpen(true)} search={search} setSearch={setSearch} />
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <Outlet context={{ search }} />
        </motion.section>
      </main>
    </div>
  )
}

export default AppLayout
