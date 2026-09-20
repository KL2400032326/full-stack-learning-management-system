import { AlertTriangle } from 'lucide-react'

const LogoutConfirmModal = ({ open, onCancel, onConfirm }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4" onClick={onCancel}>
      <div className="glass w-full max-w-md rounded-2xl p-5" onClick={e => e.stopPropagation()}>
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-lg bg-rose-100 p-2 text-rose-600"><AlertTriangle size={16} /></span>
          <h3 className="font-display text-lg">Confirm Logout</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">Are you sure you want to logout?</p>

        <div className="mt-5 flex justify-end gap-2">
          <button className="btn-secondary" type="button" onClick={onCancel}>Cancel</button>
          <button className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700" type="button" onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutConfirmModal
