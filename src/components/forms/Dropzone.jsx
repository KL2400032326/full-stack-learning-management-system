import { UploadCloud } from 'lucide-react'
import { useState } from 'react'

const Dropzone = ({ label = 'Drag and drop files here', accept = '*' }) => {
  const [dragging, setDragging] = useState(false)
  const [fileName, setFileName] = useState('')

  return (
    <label
      className={`block cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition ${dragging ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30' : 'border-slate-300 dark:border-slate-600'}`}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDrop={() => setDragging(false)}
    >
      <input type="file" className="hidden" accept={accept} onChange={e => setFileName(e.target.files?.[0]?.name || '')} />
      <UploadCloud className="mx-auto mb-2 text-primary-500" />
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-1 text-xs text-slate-500">{fileName || 'No file selected'}</p>
    </label>
  )
}

export default Dropzone
