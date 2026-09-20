import { cn } from '../../utils/helpers'

const Card = ({ className, children }) => <div className={cn('card', className)}>{children}</div>

export default Card
