const Checkbox = ({ id, checked, onChange, label, className = '' }) => (
  <label htmlFor={id} className={`flex items-center gap-2 ${className}`}>
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 shrink-0 rounded border-slate-300 text-primary-600 focus:ring-2 focus:ring-primary-200 dark:border-slate-600"
    />
    <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">{label}</span>
  </label>
)

export default Checkbox
