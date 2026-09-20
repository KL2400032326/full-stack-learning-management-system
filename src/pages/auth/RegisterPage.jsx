import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Button from '../../components/common/Button'
import { roleOptions } from '../../data/dummyData'
import { signupUser } from '../../services/authService'

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' })
  const [alert, setAlert] = useState({ type: '', message: '' })
  const navigate = useNavigate()

  const submit = async e => {
    e.preventDefault()
    if (!form.name || !form.email.includes('@') || form.password.length < 6) {
      setAlert({ type: 'error', message: 'Please complete all fields with valid data.' })
      return
    }

    const result = await signupUser(form)
    if (!result.success) {
      setAlert({ type: 'error', message: result.message })
      return
    }

    setAlert({ type: 'success', message: result.message || 'OTP sent to your email. Please verify from the main signup page.' })
    setTimeout(() => navigate('/login'), 800)
  }

  return (
    <div>
      <h1 className="page-title text-center">Create account</h1>
      <p className="page-subtitle mb-6 text-center">Join the premium LMS experience</p>
      <form className="space-y-4" onSubmit={submit}>
        <Input label="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Input label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <Input label="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <Select label="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} options={roleOptions} />
        {alert.message && (
          <p className={`rounded-xl px-3 py-2 text-sm ${alert.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {alert.message}
          </p>
        )}
        <Button className="w-full" type="submit">Register</Button>
      </form>
      <p className="mt-4 text-sm">Already have an account? <Link to="/login" className="text-primary-600">Login</Link></p>
    </div>
  )
}

export default RegisterPage
