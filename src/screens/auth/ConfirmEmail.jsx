import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { supabase } from '@/lib/supabase'

export default function ConfirmEmail() {
  const navigate     = useNavigate()
  const supabaseUser = useAuthStore((s) => s.supabaseUser)
  const logout       = useAuthStore((s) => s.logout)

  const [resending, setResending] = useState(false)
  const [resent,    setResent]    = useState(false)
  const [error,     setError]     = useState('')

  const handleResend = async () => {
    if (!supabaseUser?.email) {
      setError('No email found. Please go back and register again.')
      return
    }
    setResending(true)
    setError('')
    try {
      const { error: resendError } = await supabase.auth.resend({
        type:  'signup',
        email: supabaseUser.email,
      })
      if (resendError) throw resendError
      setResent(true)
      setTimeout(() => setResent(false), 5000)
    } catch (err) {
      setError(err.message || 'Failed to resend. Please try again.')
    } finally {
      setResending(false)
    }
  }

  const handleBackToLogin = () => {
    logout()
    navigate('/login')
  }

  return (
    <div
      className="min-h-dvh bg-bg-primary flex flex-col items-center justify-center px-8 text-center"
      style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,93,74,0.07) 0%, transparent 70%), #0D0B0B',
      }}
    >
      {/* Icon — SVG, no emoji */}
      <div className="w-20 h-20 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center mb-6">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#E85D4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>

      <h2 className="font-fraunces text-[34px] font-bold text-text-primary leading-tight mb-3">
        Check your inbox!
      </h2>

      <p className="text-text-second text-sm font-sans leading-relaxed mb-2 max-w-[280px]">
        We sent a confirmation link to
      </p>
      <p className="text-coral text-sm font-sans font-semibold mb-6">
        {supabaseUser?.email ?? 'your email'}
      </p>

      <p className="text-text-hint text-sm font-sans leading-relaxed max-w-[280px] mb-10">
        Click the link in the email to activate your account. Once confirmed you can log in and start matching.
      </p>

      <div className="w-full max-w-xs h-px bg-divider mb-8" />

      {/* Error */}
      {error && (
        <div className="mb-5 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-400/20 w-full max-w-xs">
          <p className="text-red-400 text-sm font-sans">{error}</p>
        </div>
      )}

      {/* Resent success */}
      {resent && (
        <div className="mb-5 px-4 py-3 rounded-2xl bg-coral/10 border border-coral/20 w-full max-w-xs">
          <p className="text-coral text-sm font-sans font-medium">
            Email resent! Check your inbox.
          </p>
        </div>
      )}

      {/* Resend button */}
      <button
        onClick={handleResend}
        disabled={resending}
        className="winkr-btn-outline max-w-xs w-full mb-4"
      >
        {resending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Sending...
          </span>
        ) : 'Resend confirmation email'}
      </button>

      <button
        onClick={handleBackToLogin}
        className="text-text-hint text-sm font-sans hover:text-text-second transition-colors py-2"
      >
        Back to Sign In
      </button>
    </div>
  )
}
