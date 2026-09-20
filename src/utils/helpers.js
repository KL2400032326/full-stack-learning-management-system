export const cn = (...classes) => classes.filter(Boolean).join(' ')

export const formatCurrency = value =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
