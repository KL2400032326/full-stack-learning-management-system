import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

import {
  completeOAuthRedirect,
  getDashboardRoute
} from '../services/authService'

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
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

    // Read Google OAuth response from URL
    const result = completeOAuthRedirect(searchParams)

    // Google login failed
    if (!result.success) {
      console.error(
        'Google OAuth failed:',
        result.message
      )

      navigate(
        `/login?oauthError=${encodeURIComponent(
          result.message
        )}`,
        { replace: true }
      )

      return
    }

    // Save Google user into AuthContext + localStorage
    const loggedInUser = login(result.user)

    if (!loggedInUser) {
      console.error(
        'Unable to save Google login'
      )

      navigate(
        `/login?oauthError=${encodeURIComponent(
          'Unable to save login information.'
        )}`,
        { replace: true }
      )

      return
    }

    // Login successful
    setMessage(
      'Google login successful. Redirecting...'
    )

    // Get dashboard based on role
    const dashboardRoute =
      getDashboardRoute(
        loggedInUser.role
      )

    console.log(
      'Google user:',
      loggedInUser
    )

    console.log(
      'Dashboard:',
      dashboardRoute
    )

    // Redirect to correct dashboard
    setTimeout(() => {
      navigate(dashboardRoute, {
        replace: true
      })
    }, 500)

  }, [searchParams, login, navigate])

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
