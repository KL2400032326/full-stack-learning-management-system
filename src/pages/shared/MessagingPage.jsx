import { useState } from 'react'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { messages } from '../../data/dummyData'

const MessagingPage = () => {
  const [chat, setChat] = useState(messages)
  const [text, setText] = useState('')

  const send = () => {
    if (!text.trim()) return
    setChat(prev => [...prev, { id: Date.now(), from: 'You', to: 'Instructor', text, time: 'Now' }])
    setText('')
  }

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Messaging</h1>
        <p className="page-subtitle">Instructor and student collaboration thread</p>
      </div>
      <Card className="space-y-4">
        <div className="scrollbar max-h-[420px] space-y-2 overflow-y-auto pr-1">
          {chat.map(item => (
            <div key={item.id} className="rounded-xl border p-3">
              <p className="text-xs text-slate-500">{item.from} {'->'} {item.to}</p>
              <p className="text-sm">{item.text}</p>
              <p className="text-[11px] text-slate-400">{item.time}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Type a message..." value={text} onChange={e => setText(e.target.value)} />
          <Button onClick={send}>Send</Button>
        </div>
      </Card>
    </div>
  )
}

export default MessagingPage
