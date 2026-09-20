import { useEffect, useState } from 'react'
import { getStudentCourses, getStudentProgress } from '../../services/studentApi'

const Progress = () => {
  const [rows, setRows] = useState([])

  useEffect(() => {
    const load = async () => {
      const [courses, progress] = await Promise.all([getStudentCourses(), getStudentProgress()])
      const merged = courses.map(course => {
        const record = progress.find(item => item.courseId === course.id)
        return {
          courseName: course.title,
          totalVideos: record?.totalVideos || course.playlist.length,
          completedVideos: record?.completedVideos || 0,
          progress: record?.progress || 0,
          status: (record?.progress || 0) === 100 ? 'Completed ✅' : 'In Progress'
        }
      })
      setRows(merged)
    }
    load()
  }, [])

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Progress</h1>
        <p className="page-subtitle">Detailed progress across all enrolled courses</p>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/60">
            <tr>
              <th className="px-4 py-3">Course Name</th>
              <th className="px-4 py-3">Total Videos</th>
              <th className="px-4 py-3">Completed Videos</th>
              <th className="px-4 py-3">Progress %</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(item => (
              <tr key={item.courseName} className="border-t">
                <td className="px-4 py-3">{item.courseName}</td>
                <td className="px-4 py-3">{item.totalVideos}</td>
                <td className="px-4 py-3">{item.completedVideos}</td>
                <td className="px-4 py-3">{item.progress}%</td>
                <td className="px-4 py-3">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Progress
