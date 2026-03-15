import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { Eye, EyeOff, ArrowLeft, Loader } from 'lucide-react'
import { PHOTO_URLS } from '@/lib/mockData'
import { signIn } from '@/lib/auth'
import { ErrorBanner, StepBar, LoadingDots } from '@/components/ui/index.jsx'

// Entry: 10 frames, non-overlapping rows
const ENTRY_FRAMES = [
  { url: PHOTO_URLS[0], w: 108, h: 138, blurred: false, top:  12, left: 212, rot: -6, op: 0.84, delay: '0s'   },
  { url: PHOTO_URLS[1], w:  95, h: 121, blurred: false, top:  18, left:  -8, rot:  8, op: 0.75, delay: '1.5s' },
  { url: PHOTO_URLS[2], w:  80, h: 102, blurred: false, top: 178, left:  60, rot: -4, op: 0.65, delay: '2.7s' },
  { url: PHOTO_URLS[3], w:  72, h:  92, blurred: false, top: 168, left: 308, rot:  7, op: 0.55, delay: '0.8s' },
  { url: PHOTO_URLS[4], w:  66, h:  84, blurred: true,  top: 335, left:  10, rot: -7, op: 0.25, delay: '2.0s' },
  { url: PHOTO_URLS[5], w:  70, h:  89, blurred: false, top: 330, left: 205, rot:  5, op: 0.50, delay: '3.5s' },
  { url: PHOTO_URLS[0], w:  58, h:  74, blurred: true,  top: 325, left: 348, rot: -5, op: 0.20, delay: '1.2s' },
  { url: PHOTO_URLS[1], w:  62, h:  79, blurred: true,  top: 478, left:  30, rot:  6, op: 0.18, delay: '3.8s' },
  { url: PHOTO_URLS[2], w:  55, h:  70, blurred: true,  top: 470, left: 200, rot: -4, op: 0.16, delay: '0.5s' },
  { url: PHOTO_URLS[3], w:  50, h:  64, blurred: true,  top: 465, left: 340, rot:  8, op: 0.14, delay: '2.5s' },
]

// Sign-in: frames peek from top + bottom, form area kept clear
const SIGNIN_FRAMES = [
  { url: PHOTO_URLS[4], w: 98, h: 125, blurred: false, top:   0, left: 285, rot: -6, op: 0.50, delay: '0s'   },
  { url: PHOTO_URLS[5], w: 85, h: 108, blurred: false, top:   8, left: -10, rot:  8, op: 0.42, delay: '1.4s' },
  { url: PHOTO_URLS[0], w: 68, h:  87, blurred: true,  top: 145, left: 330, rot: -4, op: 0.18, delay: '2.6s' },
  { url: PHOTO_URLS[1], w: 62, h:  79, blurred: true,  top: 148, left:  -5, rot:  6, op: 0.16, delay: '0.7s' },
  { url: PHOTO_URLS[2], w: 58, h:  74, blurred: true,  top: 620, left: 220, rot: -5, op: 0.16, delay: '3.0s' },
  { url: PHOTO_URLS[3], w: 55, h:  70, blurred: true,  top: 628, left:  25, rot:  7, op: 0.14, delay: '1.8s' },
  { url: PHOTO_URLS[4], w: 50, h:  64, blurred: true,  top: 625, left: 350, rot: -3, op: 0.12, delay: '4.2s' },
]

function BgFrames({ frames }) {
  return frames.map((f, i) => (
    <div key={i} className="photo-frame" style={{
      width: f.w, height: f.h, position: 'absolute', top: f.top, left: f.left,
      transform: `rotate(${f.rot}deg)`, opacity: f.op, zIndex: 0, background: '#1E1816',
      animation: `floatFrame 6s ease-in-out ${f.delay} infinite`,
    }}>
      <img src={f.url} alt="" className="w-full h-full object-cover" loading="eager"
        style={f.blurred ? { filter: 'blur(12px)', transform: 'scale(1.07)' } : {}} />
    </div>
  ))
}

export default function Login() {
  const navigate                = useNavigate()
  const login                   = useAuthStore((s) => s.login)
  const [mode, setMode]         = useState('entry')
  const [email, setEmail]       = useState('')
  const [pass, setPass]         = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleLogin = async () => {
    if (!email.trim() || !pass.trim()) { setError('Please fill in all fields'); return }
    setLoading(true)
    setError('')
    try {
      await signIn(email, pass)
      login()
      navigate('/app/home')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (mode === 'signin') return (
    <div className="relative min-h-dvh overflow-hidden flex flex-col px-6" style={{ background: '#0D0B0B' }}>
      <BgFrames frames={SIGNIN_FRAMES} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `linear-gradient(to bottom, rgba(13,11,11,0.32) 0%, rgba(13,11,11,0.72) 22%, rgba(13,11,11,0.82) 72%, rgba(13,11,11,0.42) 100%)`,
        zIndex: 1,
      }} />
      <div className="relative z-10 flex flex-col flex-1 justify-center">
        <button onClick={() => setMode('entry')} className="text-text-hint mb-10 self-start flex items-center gap-2 text-sm font-sans">
          <ArrowLeft size={18} /> Back
        </button>
        <h2 className="font-fraunces text-[38px] font-bold text-text-primary leading-tight mb-1">Welcome back.</h2>
        <p className="font-fraunces text-xl italic text-text-second mb-9">Your matches are waiting.</p>
        {error && <div className="mb-5 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-400/20"><p className="text-red-400 text-sm font-sans">{error}</p></div>}
        <div className="flex flex-col gap-3.5 mb-2">
          <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError('') }} placeholder="Email address" className="winkr-input" />
          <div className="relative">
            <input type={showPass ? 'text' : 'password'} value={pass} onChange={(e) => { setPass(e.target.value); setError('') }} placeholder="Password" className="winkr-input pr-12" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-hint">
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <button onClick={() => navigate('/forgot-password')} className="text-coral text-sm font-sans mb-8 text-right block w-full">Forgot password?</button>
        <button onClick={handleLogin} disabled={loading} className="winkr-btn mb-5">
          {loading ? <LoadingDots /> : 'Sign In'}
        </button>
        <p className="text-text-hint text-sm font-sans text-center">
          New here? <button onClick={() => navigate('/register')} className="text-coral font-medium">Create account</button>
        </p>
      </div>
    </div>
  )

  return (
    <div className="relative min-h-dvh overflow-hidden flex flex-col" style={{ background: '#0D0B0B' }}>
      <BgFrames frames={ENTRY_FRAMES} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `linear-gradient(to bottom, rgba(13,11,11,0.10) 0%, rgba(13,11,11,0.42) 32%, rgba(13,11,11,0.88) 62%, #0D0B0B 100%)`,
        zIndex: 1,
      }} />
      <div className="relative z-10 flex flex-col flex-1 items-center justify-end px-8 pb-14 text-center">
        <div className="mb-8 animate-fade-in">
          <img src="/winkr_logo.png" alt="Winkr" className="w-16 h-16 object-cover rounded-2xl mx-auto" />
        </div>
        <h1 className="font-fraunces font-bold text-text-primary mb-4 animate-fade-up"
          style={{ fontSize: '42px', lineHeight: '1.07', letterSpacing: '-0.02em' }}>
          Are you ready<br />for the{' '}
          <em className="not-italic" style={{ background: 'linear-gradient(135deg, #E85D4A, #F4A5A0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>adventure?</em>
        </h1>
        <p className="font-sans text-text-hint text-sm leading-relaxed max-w-[260px] mb-8 animate-fade-up delay-100">
          Find someone who makes every ordinary moment feel like a story worth telling.
        </p>
        <div className="w-full flex flex-col gap-3 mb-8 animate-fade-up delay-200">
          <button onClick={() => setMode('signin')} className="winkr-btn">Sign In</button>
          <button onClick={() => navigate('/register')} className="winkr-btn-outline">Create Account</button>
        </div>
        <div className="flex gap-6 animate-fade-in delay-300">
          <div className="text-center"><p className="font-fraunces text-2xl font-bold text-coral">12K+</p><p className="font-sans text-text-hint text-xs mt-0.5">Matches made</p></div>
          <div className="w-px bg-divider" />
          <div className="text-center"><p className="font-fraunces text-2xl font-bold text-coral">98%</p><p className="font-sans text-text-hint text-xs mt-0.5">Satisfaction</p></div>
          <div className="w-px bg-divider" />
          <div className="text-center"><p className="font-fraunces text-2xl font-bold text-coral">BD</p><p className="font-sans text-text-hint text-xs mt-0.5">Bangladesh</p></div>
        </div>
      </div>
    </div>
  )
}
