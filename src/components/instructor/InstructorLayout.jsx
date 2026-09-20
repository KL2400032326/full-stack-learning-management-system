import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import InstructorSidebar from './InstructorSidebar'
import InstructorNavbar from './InstructorNavbar'

const InstructorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="mx-auto flex max-w-[1700px] gap-3 p-3">
      <InstructorSidebar open={sidebarOpen || window.innerWidth >= 1024} onClose={() => setSidebarOpen(false)} />

      <main className="min-w-0 flex-1">
        <InstructorNavbar onMenuClick={() => setSidebarOpen(true)} />
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Outlet />
        </motion.section>
      </main>
    </div>
  )
}

export default InstructorLayout
