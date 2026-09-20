import { BookOpenCheck, Clapperboard, GraduationCap, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import RoleCard from '../RoleCard'
import { setSelectedRole } from '../../services/authService'

const roleOptions = [
  {
    key: 'student',
    name: 'Student',
    icon: BookOpenCheck,
    description: 'Access your courses, progress, and certificates.'
  },
  {
    key: 'instructor',
    name: 'Instructor',
    icon: GraduationCap,
    description: 'Manage classes, students, and course delivery.'
  },
  {
    key: 'admin',
    name: 'Admin',
    icon: ShieldCheck,
    description: 'Oversee the platform, users, and operations.'
  },
  {
    key: 'creator',
    name: 'Content Creator',
    icon: Clapperboard,
    description: 'Build, upload, and maintain learning content.'
  }
]

const RoleSelector = ({ selectedRole }) => {
  const navigate = useNavigate()

  const handleRoleSelect = role => {
    setSelectedRole(role)
    navigate('/login')
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-semibold">Choose your workspace</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Select your role to continue to login or signup.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {roleOptions.map(role => (
          <RoleCard
            key={role.key}
            role={role}
            selected={selectedRole === role.key}
            onClick={() => handleRoleSelect(role.key)}
          />
        ))}
      </div>
    </div>
  )
}

export default RoleSelector
