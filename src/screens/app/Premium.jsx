import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { PHOTO_URLS } from '@/lib/mockData'

const BG_FRAMES = [
  { url: PHOTO_URLS[0], top: -20, left: -30,   rot: 12,  w: 110, h: 140, op: 0.30 },
  { url: PHOTO_URLS[1], top:  60, right: -20,  rot: -10, w:  90, h: 115, op: 0.25 },
  { url: PHOTO_URLS[2], bottom: 120, left: -10, rot: 6,  w:  80, h: 100, op: 0.20 },
]

const FEATURES = [
  { title: '10 Matches / Day',    sub: 'Double your daily chances to meet someone special.' },
  { title: '10 Approaches / Day', sub: "Don't hold back. Reach out to more people."         },
  { title: '12 Hour Refresh',     sub: 'New matches every 12 hours instead of 24.'          },
]

export default function Premium() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-dvh flex flex-col overflow-hidden relative"
      style={{ background: 'radial-gradient(ellipse 100% 45% at 50% 100%, rgba(212,168,68,0.08) 0%, transparent 60%), #0D0B0B' }}
    >
      {/* Background blurred photo frames */}
      {BG_FRAMES.map((f, i) => (
        <div
          key={i}
          className="photo-frame absolute pointer-events-none"
          style={{ width: f.w, height: f.h, top: f.top, bottom: f.bottom, left: f.left, right: f.right, transform: `rotate(${f.rot}deg)`, opacity: f.op, zIndex: 0 }}
        >
          <img
            src={f.url} alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'blur(18px)', transform: 'scale(1.1)' }}
            loading="eager"
          />
        </div>
      ))}

      <div className="relative z-10 flex flex-col flex-1 items-center px-6 pt-16 pb-10">

        {/* Winkr logo */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-coral-glow mb-4">
          <img src="/winkr-premium.png" alt="Winkr+" className="w-20 h-20 object-contain mb-4" />
        </div>

        <h2 className="font-fraunces text-[42px] font-bold text-gold mb-2">Winkr+</h2>
        <p className="text-text-second text-sm font-sans text-center mb-8">
          More matches. More connections. Real relationships.
        </p>

        {/* Features */}
        <div className="w-full flex flex-col gap-4 mb-8">
          {FEATURES.map(({ title, sub }) => (
            <div key={title} className="flex items-center gap-3.5">
              <div className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center shrink-0">
                <Check size={11} className="text-gold" />
              </div>
              <div>
                <p className="text-text-primary font-sans font-semibold text-sm">{title}</p>
                <p className="text-text-hint text-xs font-sans">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="w-full bg-bg-surface rounded-2xl border border-gold/25 px-5 py-4 flex items-center justify-between mb-auto">
          <p className="font-sans text-sm text-text-second">1 Month</p>
          <div className="flex items-baseline gap-0.5">
            <span className="text-gold text-lg font-sans">৳</span>
            <span className="font-fraunces text-4xl font-bold text-gold">299</span>
            <span className="text-text-hint text-sm font-sans">/mo</span>
          </div>
        </div>

        <div className="w-full mt-8">
          <button onClick={() => navigate(-1)} className="winkr-btn mb-3">Unlock Winkr+</button>
          <button onClick={() => navigate(-1)} className="w-full text-text-hint text-sm font-sans py-2 text-center">
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
