import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

const AuthLayout = () => (
  <div className="grid min-h-screen place-items-center px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass w-full max-w-md rounded-3xl p-6 md:p-8"
    >
      <Outlet />
    </motion.div>
  </div>
)

export default AuthLayout
