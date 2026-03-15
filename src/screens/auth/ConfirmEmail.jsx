import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { sendConfirmationEmail } from '@/lib/auth.js'
import { Loader } from 'lucide-react'

export default function ConfirmEmail() {
  const navigate      = useNavigate()
  const supabaseUser  = useAuthStore((s) => s.supabaseUser)
  const logout        = useAuthStore((s) => s.logout)
  const [resending, setResending] = useState(false)
  const [resent,    setResent]    = useState(false)
  const [error,     setError]     = useState('')

  const handleResend = async () => {
    setResending(true)
    setError('')
    try {
      await sendConfirmationEmail()
      setResent(true)
      setTimeout(() => setResent(false), 4000)
    } catch (err) {
      setError(err.message)
    } finally {
      setResending(false)
    }
  }

  const handleBackToLogin = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col items-center justify-center px-8 text-center"
      style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,93,74,0.07) 0%, transparent 70%), #0D0B0B' }}>

      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center mb-6">
        <span className="text-4xl">📬</span>
      </div>

      {/* Heading */}
      <h2 className="font-fraunces text-[34px] font-bold text-text-primary leading-tight mb-3">
        Check your inbox!
      </h2>

      <p className="text-text-second text-sm font-sans leading-relaxed mb-2 max-w-[280px]">
        We sent a confirmation link to
      </p>
      <p className="text-coral text-sm font-sans font-semibold mb-6">
        {supabaseUser?.email}
      </p>

      <p className="text-text-hint text-sm font-sans leading-relaxed max-w-[280px] mb-10">
        Click the link in the email to activate your account. Once confirmed you can log in and start matching.
      </p>

      {/* Divider */}
      <div className="w-full max-w-xs h-px bg-divider mb-8" />

      {error && (
        <div className="mb-5 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-400/20 w-full max-w-xs">
          <p className="text-red-400 text-sm font-sans">{error}</p>
        </div>
      )}

      {resent && (
        <div className="mb-5 px-4 py-3 rounded-2xl bg-coral/10 border border-coral/20 w-full max-w-xs">
          <p className="text-coral text-sm font-sans">Email resent successfully!</p>
        </div>
      )}

      {/* Resend button */}
      <button
        onClick={handleResend}
        disabled={resending}
        className="winkr-btn-outline max-w-xs w-full mb-4 relative"
      >
        {resending && (
          <Loader size={14} className="animate-spin absolute left-5 top-1/2 -translate-y-1/2" />
        )}
        {resending ? 'Sending...' : 'Resend confirmation email'}
      </button>

      {/* Back to login */}
      <button
        onClick={handleBackToLogin}
        className="text-text-hint text-sm font-sans hover:text-text-second transition-colors"
      >
        Back to Sign In
      </button>
    </div>
  )
}