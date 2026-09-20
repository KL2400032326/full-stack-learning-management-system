const Input = ({ label, error, className = '', ...props }) => (
  <label className="block space-y-1">
    {label && <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{label}</span>}
    <input className={`input-base ${className}`} {...props} />
    {error && <span className="text-xs text-rose-500">{error}</span>}
  </label>
)

export default Input
