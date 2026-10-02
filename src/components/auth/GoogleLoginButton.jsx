import { useEffect, useRef, useState } from 'react'
import { AlertCircle } from 'lucide-react'

const GOOGLE_SCRIPT_ID = 'google-identity-services'
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const decodeJwt = credential => {
  const [, payload] = credential.split('.')

  if (!payload) {
    throw new Error('Invalid Google credential.')
  }

  const normalizedPayload = payload
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const paddedPayload = normalizedPayload.padEnd(
    Math.ceil(normalizedPayload.length / 4) * 4,
    '='
  )

  const decodedPayload = window.atob(paddedPayload)

  return JSON.parse(decodedPayload)
}

const loadGoogleScript = () =>
  new Promise((resolve, reject) => {
    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID)

    if (existingScript) {
      existingScript.addEventListener('load', resolve, { once: true })
      existingScript.addEventListener('error', reject, { once: true })

      if (window.google?.accounts?.id) {
        resolve()
      }

      return
    }

    const script = document.createElement('script')

    script.id = GOOGLE_SCRIPT_ID
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true

    script.onload = resolve
    script.onerror = reject

    document.body.appendChild(script)
  })

const GoogleLoginButton = ({
  selectedRole,
  onSuccess,
  onError
}) => {
  const buttonRef = useRef(null)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!selectedRole || !GOOGLE_CLIENT_ID) {
      return undefined
    }

    let isActive = true

    loadGoogleScript()
      .then(() => {
        if (
          !isActive ||
          !window.google?.accounts?.id ||
          !buttonRef.current
        ) {
          return
        }

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,

          callback: response => {
            try {
              const profile = decodeJwt(response.credential)

              const user = {
                name: profile.name,
                email: profile.email,
                imageUrl: profile.picture,
                role: selectedRole
              }

              console.log('Google login successful:', {
                name: user.name,
                email: user.email,
                role: user.role
              })

              onSuccess(user)

            } catch (error) {
              console.error('Google login error:', error)

              onError(
                error.message || 'Google sign-in failed.'
              )
            }
          }
        })

        buttonRef.current.innerHTML = ''

        window.google.accounts.id.renderButton(
          buttonRef.current,
          {
            theme: 'outline',
            size: 'large',
            shape: 'pill',
            width: 320,
            text: 'continue_with'
          }
        )

        setStatus('ready')
      })
      .catch(error => {
        console.error(
          'Google script loading error:',
          error
        )

        if (isActive) {
          setStatus('error')

          onError(
            'Unable to load Google Sign-In. Please try again.'
          )
        }
      })

    return () => {
      isActive = false
    }
  }, [onError, onSuccess, selectedRole])

  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Set{' '}
        <code>VITE_GOOGLE_CLIENT_ID</code>{' '}
        in your environment to enable Google Sign-In.
      </div>
    )
  }

  return (
    <div className="space-y-3">

      <div
        ref={buttonRef}
        className={`flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 px-4 ${
          selectedRole
            ? ''
            : 'pointer-events-none opacity-50'
        }`}
      />

      {!selectedRole ? (
        <p className="text-sm text-slate-500">
          Select a role to continue with Google.
        </p>
      ) : null}

      {status === 'error' ? (
        <p className="inline-flex items-center gap-2 text-sm text-rose-600">
          <AlertCircle size={16} />
          Google Sign-In is temporarily unavailable.
        </p>
      ) : null}

    </div>
  )
}

export default GoogleLoginButton
