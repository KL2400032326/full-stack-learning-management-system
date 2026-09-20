import { useOutletContext } from 'react-router-dom'
import CourseCard from '../../components/cards/CourseCard'
import { courseCatalog } from '../../data/dummyData'

const CourseCatalogPage = () => {
  const { search } = useOutletContext()
  const filtered = courseCatalog.filter(course =>
    [course.title, course.instructor, course.category].join(' ').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Course Catalog</h1>
        <p className="page-subtitle">Discover premium learning tracks</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filtered.map(course => <CourseCard key={course.id} course={course} />)}
      </div>
    </div>
  )
}

export default CourseCatalogPage
