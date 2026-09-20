import { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const submit = e => {
    e.preventDefault()
    setMessage(email.includes('@') ? 'Reset link sent to your email.' : 'Please enter a valid email.')
  }

  return (
    <div>
      <h1 className="page-title text-center">Forgot password</h1>
      <p className="page-subtitle mb-6 text-center">We will send reset instructions</p>
      <form className="space-y-4" onSubmit={submit}>
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        {message && <p className="rounded-xl bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800">{message}</p>}
        <Button className="w-full" type="submit">Send reset link</Button>
      </form>
      <p className="mt-4 text-sm"><Link to="/login" className="text-primary-600">Back to login</Link></p>
    </div>
  )
}

export default ForgotPasswordPage
