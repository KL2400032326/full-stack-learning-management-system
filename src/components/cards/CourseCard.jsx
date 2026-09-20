import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../common/Card'

const CourseCard = ({ course }) => (
  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
    <Card className="h-full p-4">
      <div className="mb-3 h-32 rounded-xl bg-gradient-to-br from-primary-300 to-cyan-300" />
      <p className="text-xs text-slate-500">{course.category}</p>
      <h3 className="mt-1 font-display text-lg">{course.title}</h3>
      <p className="text-sm text-slate-500">by {course.instructor}</p>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span>Rating {course.rating}</span>
        <span className="font-semibold">${course.price}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
        <div className="h-full rounded-full bg-primary-500" style={{ width: `${course.progress}%` }} />
      </div>
      <Link to={`/student/course/${course.id}`} className="mt-4 inline-block text-sm font-medium text-primary-600">View details</Link>
    </Card>
  </motion.div>
)

export default CourseCard
