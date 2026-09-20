const InputField = ({
  label,
  icon: Icon,
  rightElement,
  error,
  className = '',
  inputClassName = '',
  ...props
}) => (
  <label className={`block ${className}`}>
    {label ? <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">{label}</span> : null}

    <div className="relative w-full">
      {Icon ? (
        <Icon
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400 pointer-events-none"
        />
      ) : null}

      <input
        className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${rightElement ? 'pr-12' : ''} ${inputClassName}`}
        {...props}
      />

      {rightElement ? <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightElement}</div> : null}
    </div>

    {error ? <span className="mt-1 block text-xs text-rose-500">{error}</span> : null}
  </label>
)

export default InputField
