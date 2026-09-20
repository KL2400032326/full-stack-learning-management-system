import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import AdminSidebar from './AdminSidebar'
import AdminNavbar from './AdminNavbar'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <div className="mx-auto flex max-w-[1700px] gap-3 p-3">
      <AdminSidebar open={sidebarOpen || window.innerWidth >= 1024} onClose={() => setSidebarOpen(false)} />

      <main className="min-w-0 flex-1">
        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} search={search} setSearch={setSearch} />
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Outlet context={{ search }} />
        </motion.section>
      </main>
    </div>
  )
}

export default AdminLayout
