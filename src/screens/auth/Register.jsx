import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { ErrorBanner } from '@/components/ui/index.jsx'
import { PHOTO_URLS } from '@/lib/mockData'
import { signUp } from '@/lib/auth.js'
import { useAuthStore } from '@/store'
import { LoadingDots } from '@/components/ui/index.jsx'

const REG_FRAMES = [
  { url: PHOTO_URLS[1], w: 98, h: 125, blurred: false, top:   0, left: 278, rot: -7, op: 0.50, delay: '0s'   },
  { url: PHOTO_URLS[3], w: 85, h: 108, blurred: false, top:  12, left: -12, rot:  9, op: 0.42, delay: '1.4s' },
  { url: PHOTO_URLS[5], w: 75, h:  96, blurred: false, top: 690, left: 250, rot: -5, op: 0.38, delay: '2.8s' },
  { url: PHOTO_URLS[0], w: 68, h:  87, blurred: false, top: 700, left:   8, rot:  7, op: 0.32, delay: '4.0s' },
  { url: PHOTO_URLS[2], w: 60, h:  77, blurred: true,  top: 148, left: 340, rot: -5, op: 0.18, delay: '0.6s' },
  { url: PHOTO_URLS[4], w: 56, h:  71, blurred: true,  top: 145, left:  -6, rot:  7, op: 0.16, delay: '2.0s' },
  { url: PHOTO_URLS[1], w: 52, h:  66, blurred: true,  top: 315, left: 170, rot: -4, op: 0.14, delay: '3.2s' },
  { url: PHOTO_URLS[3], w: 48, h:  61, blurred: true,  top: 420, left: 340, rot:  6, op: 0.12, delay: '1.0s' },
  { url: PHOTO_URLS[5], w: 46, h:  59, blurred: true,  top: 500, left:  40, rot: -6, op: 0.11, delay: '2.4s' },
  { url: PHOTO_URLS[0], w: 44, h:  56, blurred: true,  top: 580, left: 180, rot:  5, op: 0.10, delay: '3.8s' },
]

export default function Register() {
  const navigate = useNavigate()
  const login    = useAuthStore((s) => s.login)

  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [pass,    setPass]    = useState('')
  const [confirm, setConfirm] = useState('')
  const [showP,   setShowP]   = useState(false)
  const [showC,   setShowC]   = useState(false)
  const [agreed,  setAgreed]  = useState(false)
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  // Button is enabled only when ALL fields are filled AND terms accepted
  const canSubmit = name.trim() && email.trim() && pass.trim() && confirm.trim() && agreed && !loading

  const handleSubmit = async () => {
    if (!canSubmit) return

    // Validation
    if (pass.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (pass !== confirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError('')
    try {
      await signUp(name, email, pass)
      login()
      navigate('/setup/basic')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-dvh bg-bg-primary overflow-hidden flex flex-col px-6 pt-14 pb-10">

      {/* Background frames */}
      {REG_FRAMES.map((f, i) => (
        <div key={i} className="photo-frame" style={{
          width: f.w, height: f.h, position: 'absolute', top: f.top, left: f.left,
          transform: `rotate(${f.rot}deg)`, opacity: f.op, zIndex: 0, background: '#1E1816',
          animation: `floatFrame 6s ease-in-out ${f.delay} infinite`,
        }}>
          <img src={f.url} alt="" className="w-full h-full object-cover" loading="eager"
            style={f.blurred ? { filter: 'blur(12px)', transform: 'scale(1.07)' } : {}} />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `linear-gradient(to bottom, rgba(13,11,11,0.40) 0%, rgba(13,11,11,0.72) 16%, rgba(13,11,11,0.80) 78%, rgba(13,11,11,0.42) 100%)`,
        zIndex: 1,
      }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">
        <button onClick={() => navigate('/login')}
          className="text-text-hint mb-8 self-start flex items-center gap-1.5 text-sm font-sans"
          disabled={loading}>
          <ArrowLeft size={18} /> Back
        </button>

        <h2 className="font-fraunces text-[38px] font-bold text-text-primary leading-tight mb-1">
          Your story<br />starts here.
        </h2>
        <p className="text-text-second font-sans text-sm mb-8">Create your free account.</p>

        <ErrorBanner message={error} onDismiss={() => setError('')} />

        <div className="flex flex-col gap-3.5 mb-6">
          {/* Name */}
          <input
            type="text" value={name}
            onChange={(e) => { setName(e.target.value); setError('') }}
            placeholder="Full name"
            className="winkr-input" disabled={loading}
          />

          {/* Email */}
          <input
            type="email" value={email}
            onChange={(e) => { setEmail(e.target.value); setError('') }}
            placeholder="Email address"
            className="winkr-input" disabled={loading}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showP ? 'text' : 'password'} value={pass}
              onChange={(e) => { setPass(e.target.value); setError('') }}
              placeholder="Password (min 6 characters)"
              className="winkr-input pr-12" disabled={loading}
            />
            <button type="button" onClick={() => setShowP(!showP)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-hint"
              disabled={loading}>
              {showP ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showC ? 'text' : 'password'} value={confirm}
              onChange={(e) => { setConfirm(e.target.value); setError('') }}
              placeholder="Confirm password"
              className={`winkr-input pr-12 ${
                confirm && pass !== confirm ? 'border-red-400/60' : ''
              }`}
              disabled={loading}
            />
            <button type="button" onClick={() => setShowC(!showC)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-hint"
              disabled={loading}>
              {showC ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          {/* Password mismatch hint */}
          {confirm && pass !== confirm && (
            <p className="text-red-400 text-xs font-sans -mt-2 ml-1">
              Passwords do not match
            </p>
          )}
        </div>

        {/* Terms */}
        <label className="flex items-start gap-3 mb-8 cursor-pointer">
          <div
            onClick={() => !loading && setAgreed(!agreed)}
            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors cursor-pointer
              ${agreed ? 'bg-coral border-coral' : 'border-divider'}`}
          >
            {agreed && <Check size={12} className="text-white" />}
          </div>
          <p className="text-text-second text-sm font-sans leading-relaxed">
            I agree to the <span className="text-coral">Terms of Service</span> and{' '}
            <span className="text-coral">Privacy Policy</span>
          </p>
        </label>

        {/* Submit button */}
        <button onClick={handleSubmit} disabled={!canSubmit} className="winkr-btn mb-5">
          {loading ? <LoadingDots /> : 'Create Account'}
        </button>

        <p className="text-text-hint text-sm font-sans text-center">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-coral font-medium" disabled={loading}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}
