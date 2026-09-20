import Card from '../../components/common/Card'

const StudentListPage = () => (
  <div className="page">
    <h1 className="page-title">Student List</h1>
    <Card className="p-0 overflow-x-auto">
      <table className="w-full min-w-[600px] text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800/60">
          <tr>{['Student', 'Course', 'Progress', 'Status'].map(h => <th className="px-4 py-3 text-left" key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {[
            ['Emma Kim', 'Advanced React Patterns', '78%', 'On Track'],
            ['Leo Hart', 'UI Systems for Scale', '56%', 'Needs attention'],
            ['Nina Roy', 'Spring Boot Enterprise', '91%', 'Excellent']
          ].map(row => (
            <tr key={row[0]} className="border-t">
              {row.map(cell => <td key={cell} className="px-4 py-3">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
)

export default StudentListPage
