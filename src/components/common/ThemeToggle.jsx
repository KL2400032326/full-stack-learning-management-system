import { SunMoon } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme} className="btn-secondary inline-flex items-center gap-2" type="button">
      <SunMoon size={16} />
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}

export default ThemeToggle
