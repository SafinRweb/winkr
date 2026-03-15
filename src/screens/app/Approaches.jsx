import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useApproachStore, useChatStore } from '@/store'
import { BottomSheet, ConfirmDialog } from '@/components/ui/index.jsx'

export default function Approaches() {
  const navigate    = useNavigate()
  const approaches  = useApproachStore((s) => s.approaches)
  const accept      = useApproachStore((s) => s.accept)
  const pass        = useApproachStore((s) => s.pass)
  const addChat     = useChatStore((s) => s.addChatFromApproach)

  const [acceptSheet, setAcceptSheet] = useState(null)
  const [passDialog,  setPassDialog]  = useState(null)
  const [firstMsg,    setFirstMsg]    = useState('')

  const handleAcceptSend = () => {
    if (!firstMsg.trim() || !acceptSheet) return
    addChat(acceptSheet, firstMsg.trim())
    accept(acceptSheet.id)
    const chatId = acceptSheet.chatId
    setAcceptSheet(null)
    setFirstMsg('')
    navigate(`/app/chat/${chatId}`)
  }

  return (
    <div className="min-h-dvh bg-bg-primary pb-nav">

      {/* Header */}
      <div className="px-5 pt-11 pb-4">
        <div className="flex items-center gap-3">
          <h2 className="font-fraunces text-2xl font-bold text-text-primary">Approaches</h2>
          {approaches.length > 0 && (
            <span className="bg-coral text-white text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full">
              {approaches.length} new
            </span>
          )}
        </div>
        <p className="text-text-second text-sm font-sans mt-1">
          People who liked your profile and want to connect.
        </p>
      </div>

      {/* Cards */}
      <div className="px-5 flex flex-col gap-4">
        {approaches.map((a) => (
          <div key={a.id} className="winkr-card p-4">

            {/* Tappable avatar + name row → view profile */}
            <button
              onClick={() => navigate(`/app/match/${a.senderId}`)}
              className="flex items-center gap-3 mb-3 w-full text-left"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-bg-elevated shrink-0">
                <img
                  src={a.senderPhoto} alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: 'blur(14px)', transform: 'scale(1.1)' }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-text-primary font-sans font-semibold text-sm hover:text-coral transition-colors">
                  {a.senderName}
                </p>
                <p className="text-text-hint text-xs font-sans">{a.senderCity}, {a.senderAge}</p>
              </div>
              <span className="text-text-hint text-xs font-sans shrink-0">{a.time}</span>
            </button>

            {/* Message */}
            <p className="text-text-second text-sm font-sans italic leading-relaxed mb-4 pl-[60px]">
              "{a.message}"
            </p>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => { setAcceptSheet(a); setFirstMsg('') }}
                className="winkr-btn"
              >
                Accept
              </button>
              <button
                onClick={() => setPassDialog(a)}
                className="winkr-btn-outline"
              >
                Pass
              </button>
            </div>
          </div>
        ))}

        {approaches.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center mx-auto mb-4">
              <Heart size={24} className="text-coral" />
            </div>
            <p className="font-fraunces text-xl text-text-primary mb-2">All caught up!</p>
            <p className="text-text-hint text-sm font-sans">New approaches will appear here.</p>
          </div>
        )}
      </div>

      {/* Accept — first message sheet */}
      <BottomSheet open={!!acceptSheet} onClose={() => setAcceptSheet(null)}>
        <div className="p-6 pb-10">
          <h3 className="font-fraunces text-2xl font-bold text-text-primary mb-1">
            Say hello to {acceptSheet?.senderName}!
          </h3>
          <p className="text-text-second text-sm font-sans mb-5">
            Write your first message — they're excited to hear from you.
          </p>
          <textarea
            value={firstMsg}
            onChange={(e) => setFirstMsg(e.target.value)}
            rows={3}
            placeholder="Type your first message..."
            className="winkr-input resize-none"
          />
          <div className="mt-4">
            <button onClick={handleAcceptSend} disabled={!firstMsg.trim()} className="winkr-btn">
              Accept & Send
            </button>
          </div>
        </div>
      </BottomSheet>

      {/* Pass — confirmation dialog */}
      <ConfirmDialog
        open={!!passDialog}
        onClose={() => setPassDialog(null)}
        title={`Pass on ${passDialog?.senderName}?`}
        message="They won't be notified. You won't see this approach again."
        confirmLabel="Pass"
        confirmDanger
        onConfirm={() => { pass(passDialog.id); setPassDialog(null) }}
      />
    </div>
  )
}
