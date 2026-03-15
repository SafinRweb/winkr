import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Heart } from 'lucide-react'
import { useChatStore } from '@/store'

const GRADIENTS = [
  'from-[#E85D4A] to-[#D4A844]',
  'from-[#6C63FF] to-[#E85D4A]',
  'from-[#11998e] to-[#38ef7d]',
  'from-[#D4A844] to-[#E85D4A]',
  'from-[#667eea] to-[#764ba2]',
]

export default function Chats() {
  const navigate                      = useNavigate()
  const chats                         = useChatStore((s) => s.chats)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredChats = chats.filter((c) =>
    c.matchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-dvh bg-bg-primary pb-nav">

      {/* Header */}
      <div className="px-5 pt-11 pb-5">
        <h2 className="font-fraunces text-2xl font-bold text-text-primary">Messages</h2>
        <p className="text-text-hint text-xs font-sans mt-0.5">
          {chats.length} conversation{chats.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Search bar */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-3 bg-bg-surface border border-divider rounded-2xl px-4 py-3 focus-within:border-coral/40 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B5C58" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="flex-1 bg-transparent text-text-primary text-sm font-sans outline-none placeholder:text-text-hint"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-text-hint hover:text-text-primary transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Chat rows */}
      <div className="px-5 flex flex-col gap-1.5">
        {filteredChats.map((chat, idx) => (
          <button
            key={chat.id}
            onClick={() => navigate(`/app/chat/${chat.id}`)}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl hover:bg-bg-surface/60 transition-colors text-left group"
          >
            {/* Avatar */}
            <div className="relative shrink-0 w-14 h-14">
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${GRADIENTS[idx % GRADIENTS.length]}`} />
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <img
                  src={chat.matchPhoto} alt=""
                  className="w-full h-full object-cover opacity-50"
                  style={{ filter: 'blur(10px)', transform: 'scale(1.12)' }}
                />
              </div>
              <div className="absolute inset-0 rounded-full flex items-center justify-center">
                <span className="font-fraunces text-xl font-bold text-white/90">
                  {chat.matchName[0]}
                </span>
              </div>
              {chat.isOnline && (
                <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-bg-primary" />
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <p className="font-sans font-semibold text-[14px] text-text-primary truncate group-hover:text-coral transition-colors">
                  {chat.matchName}
                </p>
                <span className={`text-[11px] font-sans shrink-0 ml-2 ${chat.unread > 0 ? 'text-coral font-semibold' : 'text-text-hint'}`}>
                  {chat.lastTime}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <p className={`text-[13px] font-sans truncate flex-1 ${chat.unread > 0 ? 'text-text-primary font-medium' : 'text-text-hint'}`}>
                  {chat.lastMessage}
                </p>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-coral flex items-center justify-center shrink-0">
                    <span className="text-white text-[10px] font-bold">{chat.unread}</span>
                  </div>
                )}
              </div>
              {chat.winkSent && !chat.mutualWink && (
                <p className="text-[11px] font-sans text-coral/60 mt-0.5 flex items-center gap-1">
                  <Heart size={9} fill="currentColor" /> Wink sent
                </p>
              )}
            </div>
          </button>
        ))}

        {/* No search results */}
        {filteredChats.length === 0 && searchQuery.length > 0 && (
          <div className="text-center py-12">
            <p className="text-text-hint text-sm font-sans">
              No conversations matching{' '}
              <span className="text-text-second">"{searchQuery}"</span>
            </p>
          </div>
        )}
      </div>

      {/* Empty state */}
      {chats.length === 0 && (
        <div className="text-center py-20 px-8">
          <div className="w-16 h-16 rounded-full bg-bg-surface border border-divider flex items-center justify-center mx-auto mb-4">
            <MessageCircle size={24} className="text-text-hint" />
          </div>
          <p className="font-fraunces text-xl text-text-primary mb-2">No messages yet</p>
          <p className="text-text-hint text-sm font-sans">Accept an approach to start chatting.</p>
        </div>
      )}
    </div>
  )
}
