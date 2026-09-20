import { redirectToGoogleLogin } from '../services/authService'

const GoogleLogo = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
    <path fill="#4285F4" d="M21.81 12.23c0-.72-.06-1.25-.19-1.8H12.2v3.56h5.53c-.11.88-.72 2.2-2.08 3.09l-.02.12 3.02 2.29.21.02c1.94-1.76 3.05-4.35 3.05-7.28Z" />
    <path fill="#34A853" d="M12.2 22c2.71 0 4.99-.87 6.65-2.37l-3.21-2.43c-.86.59-2.01 1-3.44 1-2.65 0-4.9-1.72-5.71-4.1l-.11.01-3.14 2.38-.04.1A10.06 10.06 0 0 0 12.2 22Z" />
    <path fill="#FBBC05" d="M6.49 14.1A5.98 5.98 0 0 1 6.16 12c0-.73.13-1.43.32-2.1l-.01-.14-3.18-2.42-.1.05A9.85 9.85 0 0 0 2.1 12c0 1.59.39 3.08 1.08 4.39l3.31-2.29Z" />
    <path fill="#EA4335" d="M12.2 5.8c1.8 0 3.02.76 3.71 1.39l2.71-2.59C17.17 3.3 14.9 2 12.2 2a10.06 10.06 0 0 0-9 5.61l3.3 2.51c.82-2.38 3.07-4.32 5.7-4.32Z" />
  </svg>
)

const GoogleAuthButton = ({ label, selectedRole }) => {
  const handleClick = () => {
    if (!selectedRole) {
      window.alert('Please select role first')
      return
    }

    redirectToGoogleLogin(selectedRole)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      <GoogleLogo />
      <span>{label}</span>
    </button>
  )
}

export default GoogleAuthButton
