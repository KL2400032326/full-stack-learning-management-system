import { demoUsers } from '../data/demoUsers'

const delay = (ms = 120) => new Promise(resolve => setTimeout(resolve, ms))

export const loginUser = async ({ role, email, password }) => {
  await delay()

  const selectedRole = localStorage.getItem('selectedRole')
  if (!selectedRole || !demoUsers[selectedRole]) {
    return { success: false, message: 'Please select a role first.' }
  }

  if (role !== selectedRole) {
    return { success: false, message: 'Role mismatch. Please return and select role again.' }
  }

  const account = demoUsers[selectedRole]

  if (email !== account.email || password !== account.password) {
    return { success: false, message: 'Invalid demo credentials for selected role.' }
  }

  const token = 'dummy-token'

  localStorage.setItem('userName', account.name)
  localStorage.setItem('userEmail', account.email)
  localStorage.setItem('userRole', account.role)
  localStorage.setItem('userToken', token)

  return {
    success: true,
    token,
    user: {
      role: account.role,
      email: account.email,
      name: account.name,
      avatar: 'https://i.pravatar.cc/120?img=24'
    }
  }
}

export const logoutUser = async () => {
  await delay(50)
  localStorage.clear()
  return { success: true }
}
