import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'

const Settings = () => {
  const { theme, toggleTheme } = useTheme()
  const [platformName, setPlatformName] = useState('NovaLMS')
  const [emailSetting, setEmailSetting] = useState('support@novalms.com')
  const [saved, setSaved] = useState('')

  const save = () => {
    setSaved('Settings saved successfully.')
    setTimeout(() => setSaved(''), 1800)
  }

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Change theme, platform name and email settings</p>
      </div>

      {saved ? <p className="rounded-xl bg-emerald-100 px-3 py-2 text-sm text-emerald-700">{saved}</p> : null}

      <div className="card max-w-2xl space-y-4">
        <div className="flex items-center justify-between rounded-xl border p-3">
          <div>
            <p className="font-medium">Theme</p>
            <p className="text-xs text-slate-500">Current: {theme}</p>
          </div>
          <button className="btn-secondary" type="button" onClick={toggleTheme}>Change Theme</button>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Platform Name</span>
          <input className="input-base" value={platformName} onChange={e => setPlatformName(e.target.value)} />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Email Settings</span>
          <input className="input-base" value={emailSetting} onChange={e => setEmailSetting(e.target.value)} />
        </label>

        <button className="btn-primary" type="button" onClick={save}>Save Settings</button>
      </div>
    </div>
  )
}

export default Settings
