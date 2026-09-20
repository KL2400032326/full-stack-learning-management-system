const Textarea = ({ label, className = '', ...props }) => (
  <label className="block space-y-1">
    {label && <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{label}</span>}
    <textarea className={`input-base min-h-24 resize-y ${className}`} {...props} />
  </label>
)

export default Textarea
