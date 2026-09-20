import Card from '../../components/common/Card'

const VersionHistoryPage = () => (
  <div className="page">
    <h1 className="page-title">Version History</h1>
    <Card className="space-y-3">
      {[
        { version: 'v1.4.0', note: 'Added accessibility subtitles', date: '2026-02-14' },
        { version: 'v1.3.0', note: 'Updated lesson assets', date: '2026-02-01' },
        { version: 'v1.2.2', note: 'Fixed quiz typo and scoring', date: '2026-01-28' }
      ].map(item => (
        <div key={item.version} className="rounded-xl border p-3">
          <p className="font-medium">{item.version}</p>
          <p className="text-sm text-slate-500">{item.note}</p>
          <p className="text-xs text-slate-400">{item.date}</p>
        </div>
      ))}
    </Card>
  </div>
)

export default VersionHistoryPage
