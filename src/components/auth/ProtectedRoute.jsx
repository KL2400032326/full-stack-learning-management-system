import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ allowedRole }) => {
  const {
    user,
    isAuthenticated,
    isLoading
  } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg font-semibold text-slate-800">
          Loading...
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }

  const userRole = (user.role || '').toLowerCase()
  const requiredRole = (allowedRole || '').toLowerCase()

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute