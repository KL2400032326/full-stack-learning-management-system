import { useState } from 'react'
import { inboxSeed } from '../../data/adminDummyData'

const Messages = () => {
  const [inbox, setInbox] = useState(inboxSeed)
  const [selectedId, setSelectedId] = useState(inboxSeed[0]?.id || null)
  const [chat, setChat] = useState([
    { id: 1, sender: 'Support Team', text: 'Please review payment incident #8841.' },
    { id: 2, sender: 'Admin', text: 'Received. Escalating to finance ops.' }
  ])
  const [draft, setDraft] = useState('')

  const selected = inbox.find(item => item.id === selectedId)

  const send = () => {
    if (!draft.trim()) return
    setChat(prev => [...prev, { id: Date.now(), sender: 'Admin', text: draft }])
    setDraft('')
    setInbox(prev => prev.map(item => (item.id === selectedId ? { ...item, unread: false } : item)))
  }

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Messages</h1>
        <p className="page-subtitle">Inbox and chat window for admin communication</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[330px_1fr]">
        <div className="card p-0">
          <div className="border-b px-4 py-3 font-medium">Inbox</div>
          <div className="scrollbar max-h-[460px] overflow-y-auto">
            {inbox.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`w-full border-b px-4 py-3 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800 ${item.id === selectedId ? 'bg-slate-50 dark:bg-slate-800' : ''}`}
              >
                <p className="text-sm font-medium">{item.from}</p>
                <p className="text-xs text-slate-500">{item.subject}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="card p-0">
          <div className="border-b px-4 py-3 font-medium">Chat Window {selected ? `- ${selected.from}` : ''}</div>
          <div className="scrollbar max-h-[390px] space-y-2 overflow-y-auto px-4 py-3">
            {chat.map(msg => (
              <div key={msg.id} className={`max-w-[75%] rounded-xl p-3 text-sm ${msg.sender === 'Admin' ? 'ml-auto bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="border-t p-3">
            <div className="flex gap-2">
              <input className="input-base" placeholder="Type a message..." value={draft} onChange={e => setDraft(e.target.value)} />
              <button className="btn-primary" type="button" onClick={send}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
