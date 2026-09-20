import axios from 'axios'
import api from './api'

const CURRENT_USER_STORAGE_KEY = 'currentUser'
const SELECTED_ROLE_STORAGE_KEY = 'selectedRole'
const TOKEN_STORAGE_KEY = 'lms-token'

const API =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000/api'

const BACKEND_ORIGIN = API.replace(/\/api$/, '')

export const dashboardByRole = {
  student: '/student-dashboard',
  instructor: '/instructor-dashboard',
  admin: '/admin-dashboard',
  creator: '/creator-dashboard'
}

const normalizeRole = role =>
  (role || '').toString().trim().toLowerCase()

const defaultAvatarByRole = {
  student: 'https://i.pravatar.cc/120?img=31',
  instructor: 'https://i.pravatar.cc/120?img=13',
  admin: 'https://i.pravatar.cc/120?img=14',
  creator: 'https://i.pravatar.cc/120?img=47'
}

export const getDefaultAvatar = role =>
  defaultAvatarByRole[normalizeRole(role)] ||
  'https://i.pravatar.cc/120?img=24'

const extractErrorMessage = error => {
  const payload = error.response?.data

  if (
    typeof payload?.message === 'string' &&
    payload.message.trim()
  ) {
    return payload.message
  }

  if (payload && typeof payload === 'object') {
    const firstFieldError = Object.values(payload).find(
      value =>
        typeof value === 'string' &&
        value.trim()
    )

    if (firstFieldError) {
      return firstFieldError
    }
  }

  return 'Something went wrong. Please try again.'
}

const getStoredAvatar = email => {
  const currentUser = getStoredUser()

  if (
    currentUser?.email?.toLowerCase() ===
    email?.toLowerCase()
  ) {
    return (
      currentUser.avatar ||
      currentUser.imageUrl ||
      ''
    )
  }

  return ''
}

const normalizeUser = user => ({
  ...user,

  role: normalizeRole(user.role),

  avatar:
    user.avatar ||
    user.imageUrl ||
    getStoredAvatar(user.email) ||
    getDefaultAvatar(user.role),

  imageUrl:
    user.imageUrl ||
    user.avatar ||
    getStoredAvatar(user.email) ||
    getDefaultAvatar(user.role),

  provider: user.provider || 'LOCAL'
})

const storeSession = ({ user, token }) => {
  const normalizedUser = normalizeUser(user)

  localStorage.setItem(
    CURRENT_USER_STORAGE_KEY,
    JSON.stringify(normalizedUser)
  )

  if (token) {
    localStorage.setItem('token', token)
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
    localStorage.setItem('userToken', token)
  }

  localStorage.setItem(
    'userName',
    normalizedUser.name || ''
  )

  localStorage.setItem(
    'userEmail',
    normalizedUser.email || ''
  )

  localStorage.setItem(
    'userRole',
    normalizedUser.role || ''
  )

  return normalizedUser
}

export const persistCurrentUser = user =>
  storeSession({
    user,
    token:
      localStorage.getItem(TOKEN_STORAGE_KEY) ||
      localStorage.getItem('userToken')
  })

export const getSelectedRole = () =>
  localStorage.getItem(SELECTED_ROLE_STORAGE_KEY) || ''

export const setSelectedRole = role => {
  localStorage.setItem(
    SELECTED_ROLE_STORAGE_KEY,
    normalizeRole(role)
  )
}

export const getStoredUser = () => {
  const rawCurrentUser = localStorage.getItem(
    CURRENT_USER_STORAGE_KEY
  )

  if (!rawCurrentUser) {
    return null
  }

  try {
    return normalizeUser(
      JSON.parse(rawCurrentUser)
    )
  } catch {
    localStorage.removeItem(
      CURRENT_USER_STORAGE_KEY
    )

    return null
  }
}

export const getDashboardRoute = role =>
  dashboardByRole[normalizeRole(role)] || '/'

export const signupUser = async userData => {
  const normalizedEmail =
    userData.email.trim().toLowerCase()

  const role = normalizeRole(
    userData.role || getSelectedRole()
  )

  if (!role) {
    return {
      success: false,
      message: 'Please select role first.'
    }
  }

  try {
    const { data } = await api.post(
      '/auth/register',
      {
        name: userData.name.trim(),
        email: normalizedEmail,
        password: userData.password,
        role: role.toUpperCase()
      }
    )

    const user = storeSession({
      user: data.user,
      token: data.token
    })

    return {
      success: true,
      user,
      token: data.token,
      message: data.message
    }
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error)
    }
  }
}

export const requestPasswordResetOtp =
  async email => {
    try {
      const { data } = await api.post(
        '/auth/forgot-password',
        {
          email: email.trim().toLowerCase()
        }
      )

      return {
        success: true,
        message: data.message
      }
    } catch (error) {
      return {
        success: false,
        message: extractErrorMessage(error)
      }
    }
  }

export const verifyPasswordResetOtp =
  async ({ email, otp }) => {
    try {
      const { data } = await api.post(
        '/auth/verify-otp',
        {
          email: email.trim().toLowerCase(),
          otp: otp.trim()
        }
      )

      return {
        success: true,
        message: data.message
      }
    } catch (error) {
      return {
        success: false,
        message: extractErrorMessage(error)
      }
    }
  }

export const resetPasswordWithOtp =
  async ({ email, newPassword }) => {
    try {
      const { data } = await api.post(
        '/auth/reset-password',
        {
          email: email.trim().toLowerCase(),
          newPassword
        }
      )

      return {
        success: true,
        message: data.message
      }
    } catch (error) {
      return {
        success: false,
        message: extractErrorMessage(error)
      }
    }
  }

export const loginUser = async (
  emailOrPayload,
  passwordArg,
  roleArg
) => {
  const payload =
    typeof emailOrPayload === 'object'
      ? emailOrPayload
      : {
          email: emailOrPayload,
          password: passwordArg,
          role: roleArg
        }

  const selectedRole = normalizeRole(
    payload.role || getSelectedRole()
  )

  if (!selectedRole) {
    return {
      success: false,
      message: 'Please select role first.'
    }
  }

  try {
    const { data } = await axios.post(
      `${API}/auth/login`,
      {
        email: payload.email.trim().toLowerCase(),
        password: payload.password.trim()
      }
    )

    const authUser = data.user || data
    const authToken = data.token || null

    const backendRole =
      normalizeRole(authUser?.role)

    if (backendRole !== selectedRole) {
      return {
        success: false,
        message:
          `This account is registered as ${
            backendRole || 'another role'
          }. Please select the correct role.`
      }
    }

    const user = storeSession({
      user: authUser,
      token: authToken
    })

    return {
      success: true,
      user,
      token: authToken,
      message:
        data.message || 'Login successful.'
    }
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error)
    }
  }
}

export const redirectToGoogleLogin = role => {
  const normalizedRole = normalizeRole(
    role || getSelectedRole()
  )

  if (!normalizedRole) {
    window.alert('Please select role first')
    return
  }

  document.cookie =
    `oauth_role=${normalizedRole}; path=/; max-age=600`

  window.location.href =
    `${BACKEND_ORIGIN}/oauth2/authorization/google`
}

export const completeOAuthRedirect = params => {
  const token = params.get('token')
  const role = params.get('role')

  if (!token || !role) {
    return {
      success: false,
      message:
        params.get('error') ||
        'Google login failed.'
    }
  }

  const user = storeSession({
    token,
    user: {
      id: Number(params.get('id')),
      name: params.get('name') || '',
      email: params.get('email') || '',
      role,
      provider:
        params.get('provider') || 'GOOGLE'
    }
  })

  return {
    success: true,
    user,
    token
  }
}

export const updateCurrentUser = payload => {
  const currentUser = getStoredUser()

  if (!currentUser) {
    return null
  }

  const nextUser = normalizeUser({
    ...currentUser,
    ...payload
  })

  return persistCurrentUser(nextUser)
}

export const logoutUser = () => {
  localStorage.removeItem(
    CURRENT_USER_STORAGE_KEY
  )

  localStorage.removeItem('token')
  localStorage.removeItem(TOKEN_STORAGE_KEY)
  localStorage.removeItem('userToken')
  localStorage.removeItem('userName')
  localStorage.removeItem('userEmail')
  localStorage.removeItem('userRole')

  window.location.href = '/'
}