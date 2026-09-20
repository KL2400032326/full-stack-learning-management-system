import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import {
  getStoredUser,
  logoutUser,
  persistCurrentUser,
  updateCurrentUser
} from '../services/authService'

import { getProfileUrl } from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hydrateUser = async () => {
      try {
        const storedUser = getStoredUser()

        if (!storedUser?.id) {
          setUser(null)
          return
        }

        setUser(storedUser)

        try {
          const { data } = await getProfileUrl(storedUser.id)

          if (
            data?.profileUrl &&
            data.profileUrl !== storedUser.avatar
          ) {
            const nextUser = updateCurrentUser({
              avatar: data.profileUrl
            })

            if (nextUser) {
              setUser(nextUser)
            }
          }
        } catch {
          // Profile image is optional
        }
      } finally {
        setIsLoading(false)
      }
    }

    hydrateUser()
  }, [])

  // IMPORTANT:
  // useCallback keeps the same login function between renders.
  const login = useCallback((payload) => {
    const nextUser = persistCurrentUser(payload)

    if (nextUser) {
      setUser(nextUser)
    }

    return nextUser
  }, [])

  const updateProfile = useCallback((payload) => {
    const nextUser = updateCurrentUser(payload)

    if (nextUser) {
      setUser(nextUser)
    }

    return nextUser
  }, [])

  const logout = useCallback(() => {
    logoutUser()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
      updateProfile
    }),
    [
      user,
      isLoading,
      login,
      logout,
      updateProfile
    ]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    )
  }

  return context
}