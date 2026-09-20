import { cn } from '../../utils/helpers'

const Button = ({ className, variant = 'primary', type = 'button', ...props }) => (
  <button type={type} className={cn(variant === 'primary' ? 'btn-primary' : 'btn-secondary', className)} {...props} />
)

export default Button
