import { Navigate } from 'react-router-dom'
import { getStoredUser } from '../services/authService'

const ProtectedRoute = ({ allowedRole, children }) => {
  const user = getStoredUser()

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
