import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useAuthStore } from '@/store'
import { useMatchStore } from '@/store'

export default function Home() {
  const navigate = useNavigate()
  const user     = useAuthStore((s) => s.user)
  const matches  = useMatchStore((s) => s.matches)
  const [visible, setVisible] = useState(true)

  return (
    <div className="min-h-dvh bg-bg-primary pb-nav overflow-y-auto">

      {/* ── Header ── */}
      <div className="px-5 pt-11 pb-4">
        <div className="flex items-center justify-between">
          {/* User greeting */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-coral/25">
              <img src={user.photoUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-text-primary font-sans font-semibold text-sm">
                Hello, {user.name.split(' ')[0]} 👋
              </p>
              <p className="text-text-hint font-sans text-xs">{user.city}</p>
            </div>
          </div>

          {/* Notification bell — navigates to /app/notifications */}
          <button
            onClick={() => navigate('/app/notifications')}
            className="relative w-9 h-9 rounded-full bg-bg-surface border border-divider flex items-center justify-center"
          >
            <Bell size={17} className="text-text-second" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-coral border border-bg-primary" />
          </button>
        </div>

        {/* Visibility toggle */}
        <div className="flex items-center gap-2.5 mt-4">
          <div className="flex rounded-full border border-divider overflow-hidden text-xs">
            {['Visible', 'Hidden'].map((opt) => (
              <button
                key={opt}
                onClick={() => setVisible(opt === 'Visible')}
                className={`px-3 py-1.5 font-sans font-medium transition-colors
                  ${(opt === 'Visible') === visible ? 'bg-coral text-white' : 'text-text-hint'}`}
              >
                {opt === 'Visible' && <span className="mr-1 text-[10px]">●</span>}
                {opt}
              </button>
            ))}
          </div>
          <p className="text-text-hint text-xs font-sans">
            {visible ? 'Visible to new matches' : 'Profile hidden'}
          </p>
        </div>
      </div>

      {/* ── Section title ── */}
      <div className="flex items-end justify-between px-5 mb-4">
        <div>
          <h2 className="font-fraunces text-2xl font-bold text-text-primary">Today's Matches</h2>
          <p className="text-text-hint text-xs font-sans">{matches.length} profiles</p>
        </div>
        <div className="text-right">
          <p className="text-text-hint text-xs font-sans mb-0.5">New matches in</p>
          <p className="font-fraunces text-xl font-bold text-coral">23:59:04</p>
        </div>
      </div>

      {/* ── Match cards ── */}
      <div className="px-5 flex flex-col gap-4">
        {matches.map((match) => (
          <div key={match.id} className="winkr-card">

            {/* Blurred photo */}
            <div
              className="relative h-80 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/app/match/${match.id}`)}
            >
              <img
                src={match.photoUrl}
                alt=""
                className="w-full h-full object-cover photo-blur"
              />
              {/* Score badge */}
              <div className="absolute top-3.5 left-3.5 bg-coral text-white text-[12px] font-sans font-bold px-3 py-1.5 rounded-full">
                {match.score}% match
              </div>
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, transparent 38%, rgba(13,11,11,0.97) 100%)' }}
              />
              {/* Name */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-fraunces text-[28px] font-bold text-text-primary leading-tight">
                  {match.name}, {match.age}
                </h3>
                <p className="text-text-second text-sm font-sans mt-1">
                  📍 {match.city}
                </p>
              </div>
            </div>

            {/* Card body */}
            <div className="p-4">
              <div className="flex gap-2 flex-wrap mb-3">
                {match.hobbies.slice(0, 3).map((h) => (
                  <span key={h} className="winkr-chip">{h}</span>
                ))}
              </div>
              <p className="text-text-second font-sans text-sm leading-relaxed line-clamp-2 mb-4">
                {match.bio}
              </p>
              <button
                onClick={() => navigate(`/app/match/${match.id}`)}
                className="winkr-btn"
              >
                Send Approach
              </button>
            </div>
          </div>
        ))}
        {/* ── Limit explanation ── */}
        <div className="mt-4 mb-2 text-center">
          <p className="text-text-hint text-xs font-sans">
            Showing {matches.length} of 5 daily profiles · Resets in{' '}
            <span className="text-coral font-medium">23:59:04</span>
          </p>
        </div>

        {/* ── Winkr+ promo banner ── */}
        <button
          onClick={() => navigate('/app/premium')}
          className="w-full rounded-2xl p-4 mb-6 text-left border border-gold/30 overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, rgba(212,168,68,0.08) 0%, rgba(232,93,74,0.06) 100%)' }}
        >
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
            style={{ background: '#D4A844', transform: 'translate(30%, -30%)' }} />

          <div className="flex items-start justify-between relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <img src="/winkr-premium.png" alt="" className="w-5 h-5 object-contain" />
                <span className="text-gold text-xs font-sans font-bold tracking-wide">WINKR+</span>
              </div>
              <p className="font-fraunces text-lg font-bold text-text-primary mb-1">
                See 10 profiles a day
              </p>
              <p className="text-text-second text-xs font-sans leading-relaxed">
                Free: 5 profiles · 3 approaches · 24h refresh<br />
                <span className="text-gold">Plus: 10 profiles · 5 approaches · 12h refresh</span>
              </p>
            </div>
            <div className="bg-gold text-bg-primary text-xs font-sans font-bold px-3 py-1.5 rounded-full shrink-0 ml-3 mt-1">
              Upgrade
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
