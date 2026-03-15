import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Info, Heart, Send, Smile, User, Trash2, UserX } from 'lucide-react'
import { useChatStore } from '@/store'
import { BottomSheet } from '@/components/ui/index.jsx'
import { toBDT } from '@/lib/time'

const GRADIENTS = [
  'from-[#E85D4A] to-[#D4A844]',
  'from-[#6C63FF] to-[#E85D4A]',
  'from-[#11998e] to-[#38ef7d]',
  'from-[#D4A844] to-[#E85D4A]',
  'from-[#667eea] to-[#764ba2]',
]

export default function Chat() {
  const navigate  = useNavigate()
  const { id }    = useParams()
  const chats     = useChatStore((s) => s.chats)
  const sendMsg   = useChatStore((s) => s.sendMessage)

  const chat      = chats.find((c) => c.id === id) || chats[0]
  const chatIndex = chats.indexOf(chat)

  const [text,      setText]      = useState('')
  const [infoOpen,  setInfoOpen]  = useState(false)
  const bottomRef = useRef(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat?.messages?.length])

  if (!chat) return null

  const gradient = GRADIENTS[chatIndex % GRADIENTS.length]

  const handleSend = () => {
    if (!text.trim()) return
    sendMsg(chat.id, text.trim())
    setText('')
  }

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col">

      {/* ── AppBar ── */}
      <div className="flex items-center gap-3 px-4 pt-11 pb-3 border-b border-divider/50 bg-bg-primary">

        <button
          onClick={() => navigate('/app/chats')}
          className="text-text-hint hover:text-text-primary transition-colors shrink-0"
        >
          <ArrowLeft size={22} />
        </button>

        {/* Tappable name + avatar → match profile */}
        <button
          onClick={() => navigate(`/app/match/${chat.matchId}`)}
          className="flex items-center gap-2.5 flex-1 min-w-0 text-left"
        >
          <div className="relative shrink-0 w-9 h-9">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient}`} />
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <img
                src={chat.matchPhoto} alt=""
                className="w-full h-full object-cover opacity-50"
                style={{ filter: 'blur(10px)', transform: 'scale(1.12)' }}
              />
            </div>
            <div className="absolute inset-0 rounded-full flex items-center justify-center">
              <span className="font-fraunces text-sm font-bold text-white/90">
                {chat.matchName[0]}
              </span>
            </div>
            {chat.isOnline && (
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-[1.5px] border-bg-primary" />
            )}
          </div>
          <div className="min-w-0">
            <p className="font-sans font-semibold text-[14px] text-text-primary truncate hover:text-coral transition-colors">
              {chat.matchName}
            </p>
            <p className={`text-[11px] font-sans ${chat.isOnline ? 'text-green-400' : 'text-text-hint'}`}>
              {chat.isOnline ? 'Online' : 'Last seen recently'}
            </p>
          </div>
        </button>

        {/* Info + Wink — always visible */}
        <div className="flex gap-0.5 shrink-0">
          <button
            onClick={() => setInfoOpen(true)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-text-hint hover:text-text-primary hover:bg-bg-surface transition-all"
          >
            <Info size={18} />
          </button>
          <button
            onClick={() => navigate(`/app/wink/${chat.id}`)}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-coral/10 border border-coral/20 wink-breathe"
          >
            <img
              src="/winkr-transparent-pink.png"
              alt="Wink"
              className="w-5 h-5 object-contain"
              style={{ opacity: chat.winkSent ? 1 : 0.65 }}
            />
          </button>
        </div>
      </div>

      {/* ── Messages ── */}
      <div
        className="flex-1 px-4 py-5 overflow-y-auto flex flex-col gap-3"
        style={{ background: 'radial-gradient(ellipse 80% 35% at 50% 100%, rgba(232,93,74,0.03) 0%, transparent 70%), #0D0B0B' }}
      >
        {/* Date pill */}
        <div className="flex justify-center mb-1">
          <span className="text-[11px] font-sans text-text-hint bg-bg-surface border border-divider px-3 py-1 rounded-full">
            Today
          </span>
        </div>

        {chat.messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'} items-end gap-2`}>

            {/* Other person's avatar */}
            {!msg.isMine && (
              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 mb-0.5`}>
                <span className="text-white text-[10px] font-bold">{chat.matchName[0]}</span>
              </div>
            )}

            <div className="max-w-[72%]">
              <div className={`px-4 py-2.5 rounded-2xl ${
                msg.isMine
                  ? 'bg-coral text-white rounded-br-sm'
                  : 'bg-bg-elevated border border-divider text-text-primary rounded-bl-sm'
              }`}>
                <p className="font-sans text-[14px] leading-relaxed">{msg.text}</p>
              </div>
              <p className={`text-[10px] font-sans mt-1 ${msg.isMine ? 'text-right text-coral/50' : 'text-left text-text-hint'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ── */}
      <div className="px-4 pt-2 pb-6 border-t border-divider/50 bg-bg-primary">
        <div className="flex items-center gap-2.5">
          <div className="flex-1 flex items-center gap-3 bg-bg-surface border border-divider rounded-2xl px-4 py-2.5 focus-within:border-coral/50 transition-colors">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-text-primary text-[14px] font-sans outline-none placeholder:text-text-hint"
            />
            <button className="text-text-hint hover:text-text-second transition-colors shrink-0">
              <Smile size={18} />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className="w-11 h-11 rounded-2xl bg-coral flex items-center justify-center shadow-coral-sm disabled:opacity-35 active:scale-95 transition-all shrink-0"
          >
            <Send size={16} className="text-white translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* ── Chat Info sheet ── */}
      <BottomSheet open={infoOpen} onClose={() => setInfoOpen(false)}>
        <div className="p-6 pb-10">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-20 h-20 mb-3">
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient}`} />
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <img src={chat.matchPhoto} alt=""
                  className="w-full h-full object-cover opacity-50"
                  style={{ filter: 'blur(12px)', transform: 'scale(1.1)' }} />
              </div>
              <div className="absolute inset-0 rounded-full flex items-center justify-center">
                <span className="font-fraunces text-3xl font-bold text-white">{chat.matchName[0]}</span>
              </div>
            </div>
            <p className="font-fraunces text-xl font-bold text-text-primary">{chat.matchName}</p>
            <p className="text-text-hint text-sm font-sans">{chat.matchCity}</p>
          </div>

          {/* Actions */}
          {[
            { icon: <User size={18} />,    label: 'View Profile',  danger: false, action: () => { setInfoOpen(false); navigate(`/app/match/${chat.matchId}`) } },
            {
              icon: <img src="/winkr-transparent-pink.png" alt="" className="w-[18px] h-[18px] object-contain" />,
              label: 'Send a Wink',
              danger: false,
              action: () => { setInfoOpen(false); navigate(`/app/wink/${chat.id}`) }
            },
            { icon: <UserX size={18} />,   label: 'Block User',    danger: true,  action: () => setInfoOpen(false) },
            { icon: <Trash2 size={18} />,  label: 'Delete Chat',   danger: true,  action: () => setInfoOpen(false) },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center gap-4 py-4 border-b border-divider/40 last:border-0 hover:bg-bg-elevated/50 transition-colors rounded-xl px-2
                ${item.danger ? 'text-red-400' : 'text-text-primary'}`}
            >
              <span className={item.danger ? 'text-red-400' : 'text-text-second'}>{item.icon}</span>
              <span className="font-sans text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  )
}
