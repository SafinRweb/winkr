import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Heart } from 'lucide-react'
import { useChatStore } from '@/store'

export default function WinkFlow() {
  const navigate  = useNavigate()
  const { id }    = useParams()
  const sendWink  = useChatStore((s) => s.sendWink)

  const [msg,  setMsg]  = useState('')
  const [sent, setSent] = useState(false)

  if (sent) return (
    <div className="min-h-dvh bg-bg-primary flex flex-col items-center justify-center px-8 text-center">
      <div className="w-20 h-20 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center mx-auto mb-5 wink-breathe">
        <img src="/winkr-transparent-pink.png" alt="" className="w-10 h-10 object-contain" />
      </div>
      <h2 className="font-fraunces text-3xl font-bold text-text-primary mb-3">Wink sent!</h2>
      <p className="text-text-second text-sm font-sans leading-relaxed mb-8 max-w-[260px]">
        She'll feel the same way soon. You'll be notified when she winks back.
      </p>
      <button onClick={() => navigate(-1)} className="winkr-btn max-w-xs w-full">
        Back to Chat
      </button>
    </div>
  )

  return (
    <div
      className="min-h-dvh flex flex-col px-6 pt-14 pb-10"
      style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,93,74,0.07) 0%, transparent 60%), #0D0B0B' }}
    >
      <button
        onClick={() => navigate(-1)}
        className="text-text-hint mb-10 self-start flex items-center gap-1.5 text-sm font-sans"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center mx-auto mb-5 animate-pulse-soft">
          <Heart size={36} className="text-coral" fill="currentColor" />
        </div>
        <h2 className="font-fraunces text-4xl font-bold text-text-primary mb-3 leading-tight">
          What makes you feel<br />she might be the one?
        </h2>
        <p className="text-text-second text-sm font-sans">
          She won't see this until she feels it too ❤️
        </p>
      </div>

      <textarea
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        rows={5}
        maxLength={300}
        placeholder="Write what you feel..."
        className="winkr-input resize-none"
      />
      <p className="text-text-hint text-xs text-right mt-1.5 font-sans">Min 10 characters</p>

      <div className="mt-auto pt-8">
        <button
          onClick={() => { if (msg.trim().length >= 10) { sendWink(id, msg); setSent(true) } }}
          disabled={msg.trim().length < 10}
          className="winkr-btn"
        >
          Send Wink
        </button>
      </div>
    </div>
  )
}
