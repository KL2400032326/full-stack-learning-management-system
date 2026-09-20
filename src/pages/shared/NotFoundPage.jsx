import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div className="grid min-h-screen place-items-center px-4 text-center">
    <div>
      <h1 className="font-display text-5xl">404</h1>
      <p className="mt-2 text-slate-500">Page not found</p>
      <Link to="/" className="mt-4 inline-block text-primary-600">Go home</Link>
    </div>
  </div>
)

export default NotFoundPage
