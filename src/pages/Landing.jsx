import { Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useThemeContext } from '../context/ThemeContext'

const Landing = () => {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-14 text-slate-900 dark:bg-slate-900 dark:text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
      <div className="mb-6 flex w-full items-center justify-end">
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <h1 className="font-display text-4xl font-semibold md:text-5xl">Learning Management System</h1>
      <p className="mt-4 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
        A simple portal for students, instructors, admins, and content creators to learn, manage courses,
        approve content, and track progress in one place.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link to="/roles" className="btn-primary">Get Started</Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Courses</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Build structured learning paths with videos, assignments, and approvals.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Progress</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Track completion, certificates, and learner activity in real time.
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Landing
