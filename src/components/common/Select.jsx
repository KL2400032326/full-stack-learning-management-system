const Select = ({ label, options = [], error, className = '', ...props }) => (
  <label className="block space-y-1">
    {label && <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{label}</span>}
    <select className={`input-base ${className}`} {...props}>
      {options.map(option => (
        <option value={option.value} key={option.value}>{option.label}</option>
      ))}
    </select>
    {error && <span className="text-xs text-rose-500">{error}</span>}
  </label>
)

export default Select
