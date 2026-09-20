import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import StudentSidebar from './StudentSidebar'
import StudentNavbar from './StudentNavbar'
import LogoutConfirmModal from './LogoutConfirmModal'
import { logoutUser } from '../../services/authService'

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleLogout = () => {
    logoutUser()
  }

  return (
    <>
      <div className="mx-auto flex max-w-[1700px] gap-3 p-3">
        <StudentSidebar open={sidebarOpen || window.innerWidth >= 1024} onClose={() => setSidebarOpen(false)} onLogout={() => setShowConfirm(true)} />

        <main className="min-w-0 flex-1">
          <StudentNavbar onMenuClick={() => setSidebarOpen(true)} onLogout={() => setShowConfirm(true)} />
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Outlet />
          </motion.section>
        </main>
      </div>

      <LogoutConfirmModal
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleLogout}
      />
    </>
  )
}

export default StudentLayout
