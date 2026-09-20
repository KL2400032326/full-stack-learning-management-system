import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

import {
  completeOAuthRedirect,
  getDashboardRoute
} from '../services/authService'

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams()
  const { login } = useAuth()

  const [message, setMessage] = useState(
    'Completing Google login...'
  )

  const processedRef = useRef(false)

  useEffect(() => {
    if (processedRef.current) {
      return
    }

    processedRef.current = true

    const result = completeOAuthRedirect(searchParams)

    if (!result.success) {
      window.location.replace(
        `/login?oauthError=${encodeURIComponent(
          result.message
        )}`
      )

      return
    }

    const loggedInUser = login(result.user)

    if (!loggedInUser) {
      window.location.replace(
        `/login?oauthError=${encodeURIComponent(
          'Unable to save login information.'
        )}`
      )

      return
    }

    setMessage('Redirecting to your dashboard...')

    const dashboardRoute = getDashboardRoute(
      loggedInUser.role
    )

    setTimeout(() => {
      window.location.replace(dashboardRoute)
    }, 300)
  }, [searchParams, login])

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass w-full max-w-md rounded-3xl p-8 text-center shadow-glow">
        <p className="text-lg font-semibold text-slate-800">
          {message}
        </p>
      </div>
    </div>
  )
}

export default OAuthSuccess