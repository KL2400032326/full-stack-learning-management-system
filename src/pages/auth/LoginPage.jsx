import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Button from '../../components/common/Button'
import { roleOptions } from '../../data/dummyData'
import { useAuth } from '../../context/AuthContext'
import { getDashboardRoute, loginUser, setSelectedRole } from '../../services/authService'

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'admin' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = async e => {
    e.preventDefault()
    if (!form.email.includes('@') || form.password.length < 6) {
      setError('Enter a valid email and minimum 6-character password.')
      setSuccess('')
      return
    }

    setSelectedRole(form.role)
    const result = await loginUser(form)
    if (!result.success) {
      setError(result.message)
      setSuccess('')
      return
    }

    login(result.user)
    setError('')
    setSuccess('Login successful. Redirecting...')
    navigate(getDashboardRoute(result.user.role))
  }

  return (
    <div>
      <h1 className="page-title text-center">Welcome back</h1>
      <p className="page-subtitle mb-6 text-center">Sign in to your LMS workspace</p>
      <form className="space-y-4" onSubmit={submit}>
        <Input label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <Input label="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <Select label="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} options={roleOptions} />
        {error && <p className="rounded-xl bg-rose-100 px-3 py-2 text-sm text-rose-700">{error}</p>}
        {success && <p className="rounded-xl bg-emerald-100 px-3 py-2 text-sm text-emerald-700">{success}</p>}
        <Button className="w-full" type="submit">Login</Button>
      </form>
      <div className="mt-4 flex justify-between text-sm">
        <Link to="/login" className="text-primary-600">Forgot password?</Link>
        <Link to="/register" className="text-primary-600">Create account</Link>
      </div>
    </div>
  )
}

export default LoginPage
