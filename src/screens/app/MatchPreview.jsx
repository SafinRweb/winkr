import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Flag, Heart } from 'lucide-react'
import { useMatchStore } from '@/store'
import { PersonalityCard, BottomSheet } from '@/components/ui/index.jsx'

export default function MatchPreview() {
  const navigate    = useNavigate()
  const { id }      = useParams()
  const matches     = useMatchStore((s) => s.matches)
  const addApproach = useMatchStore((s) => s.addApproach)

  const match = matches.find((m) => m.id === id) || matches[0]

  const [sheetOpen, setSheetOpen] = useState(false)
  const [msg,       setMsg]       = useState('')
  const [sent,      setSent]      = useState(false)

  if (!match) return null

  // ── Success state ──
  if (sent) return (
    <div className="min-h-dvh bg-bg-primary flex flex-col items-center justify-center px-8 text-center">
      <div className="w-16 h-16 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center mb-6 animate-pulse-soft">
        <Heart size={28} className="text-coral" fill="currentColor" />
      </div>
      <h2 className="font-fraunces text-3xl font-bold text-text-primary mb-3">Approach sent!</h2>
      <p className="text-text-second text-sm font-sans mb-8">
        {match.name.split(' ')[0]} will receive your message. We'll notify you when she responds.
      </p>
      <button onClick={() => navigate('/app/home')} className="winkr-btn max-w-xs w-full">
        Back to Discover
      </button>
    </div>
  )

  return (
    <div className="min-h-dvh bg-bg-primary overflow-y-auto">

      {/* ── Photo header ── */}
      <div className="relative" style={{ height: '48vh', minHeight: 280 }}>
        <img
          src={match.photoUrl} alt=""
          className="w-full h-full object-cover photo-blur"
        />

        {/* Back button — z-50 so it's always on top */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(-1) }}
          className="absolute top-12 left-4 z-50 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm
                     flex items-center justify-center text-white border border-white/10"
          style={{ touchAction: 'manipulation' }}
        >
          <ArrowLeft size={18} />
        </button>

        {/* Gradient */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 45%, rgba(13,11,11,0.85) 75%, #0D0B0B 100%)' }}
        />

        {/* Name overlay */}
        <div className="absolute bottom-5 left-5 right-5">
          <h2 className="font-fraunces text-[38px] font-bold text-text-primary leading-tight">
            {match.name}, {match.age}
          </h2>
          <p className="text-text-second text-sm font-sans mt-1">📍 {match.city}</p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="px-5 pt-5 pb-32">

        {/* Quick stats */}
        <div className="flex gap-5 text-sm font-sans text-text-second mb-6">
          <span>🎓 {match.education}</span>
          <span>📏 {match.heightDisplay}</span>
        </div>

        <div className="h-px bg-divider mb-5" />

        <p className="overline mb-2">ABOUT HER</p>
        <p className="text-text-second text-sm font-sans leading-relaxed mb-6">{match.bio}</p>

        <div className="h-px bg-divider mb-5" />

        <p className="overline mb-3">HOBBIES</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {match.hobbies.map((h) => <span key={h} className="winkr-chip">{h}</span>)}
        </div>

        <p className="overline mb-3">INTERESTS</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {match.interests.map((i) => <span key={i} className="winkr-chip">{i}</span>)}
        </div>

        <div className="h-px bg-divider mb-5" />

        <p className="overline mb-3">PERSONALITY</p>
        <div className="grid grid-cols-2 gap-2.5 mb-8">
          <PersonalityCard emoji="🎵" label="Music"  value={match.favoriteMusic}  />
          <PersonalityCard emoji="🎤" label="Singer" value={match.favoriteSinger} />
          <PersonalityCard emoji="🎸" label="Band"   value={match.favoriteBand}   />
          <PersonalityCard emoji="🎨" label="Colour" value={match.favoriteColor}  />
        </div>

        {/* Report / block */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-divider text-text-hint text-xs font-sans hover:border-red-400/40 hover:text-red-400 transition-colors">
            <Flag size={13} />
            Report or block {match.name.split(' ')[0]}
          </button>
        </div>
      </div>

      {/* ── Sticky CTA ── */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pb-6 pt-4"
        style={{ background: 'linear-gradient(to top, #0D0B0B 70%, transparent)' }}
      >
        <button onClick={() => setSheetOpen(true)} className="winkr-btn">Send Approach</button>
      </div>

      {/* ── Approach sheet ── */}
      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <div className="p-6 pb-10">
          <h3 className="font-fraunces text-2xl font-bold text-text-primary mb-1">
            Send an approach to {match.name.split(' ')[0]}
          </h3>
          <p className="text-text-second text-sm font-sans mb-5">
            Make it genuine — she'll feel the difference.
          </p>
          <textarea
            value={msg} onChange={(e) => setMsg(e.target.value)}
            rows={4} maxLength={300}
            placeholder="Write your approach message..."
            className="winkr-input resize-none"
          />
          <p className="text-text-hint text-xs text-right mt-1.5 mb-4">{msg.length}/300</p>
          <button
            onClick={() => { if (msg.trim()) { addApproach(match.id); setSent(true); setSheetOpen(false) } }}
            disabled={!msg.trim()}
            className="winkr-btn"
          >
            Send Approach
          </button>
        </div>
      </BottomSheet>
    </div>
  )
}
