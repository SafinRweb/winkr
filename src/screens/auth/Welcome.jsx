import { useNavigate } from 'react-router-dom'
import { PHOTO_URLS } from '@/lib/mockData'

const FRAMES = [
  { url: PHOTO_URLS[0], w: 115, h: 148, blurred: false, top:  20, left:  10, rot: -5, op: 0.88, delay: '0s'   },
  { url: PHOTO_URLS[1], w: 100, h: 128, blurred: false, top:  10, left: 290, rot:  7, op: 0.80, delay: '1.2s' },
  { url: PHOTO_URLS[2], w:  75, h:  96, blurred: false, top: 180, left:  -5, rot:  8, op: 0.68, delay: '2.4s' },
  { url: PHOTO_URLS[3], w:  90, h: 115, blurred: false, top: 210, left: 155, rot: -6, op: 0.62, delay: '3.6s' },
  { url: PHOTO_URLS[4], w:  72, h:  92, blurred: true,  top: 178, left: 315, rot: -4, op: 0.30, delay: '1.8s' },
  { url: PHOTO_URLS[5], w:  80, h: 102, blurred: false, top: 335, left:  15, rot:  6, op: 0.55, delay: '0.6s' },
  { url: PHOTO_URLS[0], w:  70, h:  89, blurred: true,  top: 345, left: 175, rot: -7, op: 0.26, delay: '2.8s' },
  { url: PHOTO_URLS[1], w:  62, h:  79, blurred: true,  top: 325, left: 325, rot:  5, op: 0.22, delay: '4.0s' },
  { url: PHOTO_URLS[2], w:  68, h:  87, blurred: true,  top: 465, left:   5, rot: -6, op: 0.18, delay: '1.4s' },
  { url: PHOTO_URLS[3], w:  72, h:  92, blurred: false, top: 455, left: 175, rot:  4, op: 0.48, delay: '3.0s' },
  { url: PHOTO_URLS[4], w:  58, h:  74, blurred: true,  top: 460, left: 330, rot: -5, op: 0.16, delay: '0.4s' },
  { url: PHOTO_URLS[5], w:  55, h:  70, blurred: true,  top: 585, left:  20, rot:  7, op: 0.14, delay: '2.2s' },
  { url: PHOTO_URLS[0], w:  52, h:  66, blurred: true,  top: 580, left: 160, rot: -4, op: 0.12, delay: '3.5s' },
  { url: PHOTO_URLS[1], w:  50, h:  64, blurred: true,  top: 575, left: 295, rot:  6, op: 0.12, delay: '1.0s' },
  { url: PHOTO_URLS[2], w:  48, h:  61, blurred: true,  top: 672, left:  55, rot: -7, op: 0.10, delay: '4.2s' },
  { url: PHOTO_URLS[3], w:  46, h:  59, blurred: true,  top: 668, left: 240, rot:  5, op: 0.09, delay: '2.6s' },
]

export default function Welcome() {
  const navigate = useNavigate()
  return (
    <div className="relative min-h-dvh bg-bg-primary overflow-hidden flex flex-col">
      {FRAMES.map((f, i) => (
        <div key={i} className="photo-frame" style={{
          width: f.w, height: f.h, position: 'absolute', top: f.top, left: f.left,
          transform: `rotate(${f.rot}deg)`, opacity: f.op, zIndex: 0, background: '#1E1816',
          animation: `floatFrame 6s ease-in-out ${f.delay} infinite`,
        }}>
          <img src={f.url} alt="" className="w-full h-full object-cover" loading="eager"
            style={f.blurred ? { filter: 'blur(12px)', transform: 'scale(1.07)' } : {}} />
        </div>
      ))}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `linear-gradient(to bottom, rgba(13,11,11,0.08) 0%, rgba(13,11,11,0.28) 25%, rgba(13,11,11,0.72) 54%, #0D0B0B 80%)`,
        zIndex: 1,
      }} />
      <div className="relative z-10 flex flex-col flex-1 px-7 pt-14 pb-12">
        <div className="flex-1" />
        <div className="animate-fade-up">
          <h1 className="font-fraunces font-bold text-text-primary mb-4"
            style={{ fontSize: '50px', lineHeight: '1.04', letterSpacing: '-0.02em' }}>
            Love doesn't<br />look for <em className="not-italic text-coral">faces.</em>
          </h1>
          <p className="font-sans text-text-second text-[15px] leading-relaxed mb-8 max-w-[300px]">
            The person who makes your heart race might be just a message away.
          </p>
          <div className="flex gap-2.5 mb-9 animate-fade-up delay-100">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-bg-surface/80 border border-divider">
              <div className="w-1.5 h-1.5 rounded-full bg-coral" />
              <span className="font-sans text-text-second text-xs font-medium">12K+ matches made</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-bg-surface/80 border border-divider">
              <div className="w-1.5 h-1.5 rounded-full bg-coral" />
              <span className="font-sans text-text-second text-xs font-medium">Bangladesh</span>
            </div>
          </div>
          <div className="animate-fade-up delay-200">
            <button onClick={() => navigate('/login')} className="winkr-btn">Get Started →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
