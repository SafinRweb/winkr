import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function ForgotPassword() {
  const navigate       = useNavigate()
  const [email, setEmail] = useState('')
  const [sent,  setSent]  = useState(false)

  if (sent) return (
    <div className="min-h-dvh bg-bg-primary flex flex-col items-center justify-center px-8 text-center">
      <div className="w-16 h-16 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center mb-6">
        <span className="text-2xl">📬</span>
      </div>
      <h3 className="font-fraunces text-3xl font-bold text-text-primary mb-3">Check your inbox</h3>
      <p className="text-text-second text-sm font-sans mb-8">
        Reset link sent to <span className="text-coral">{email}</span>
      </p>
      <button onClick={() => navigate('/login')} className="winkr-btn max-w-xs w-full">
        Back to Sign In
      </button>
    </div>
  )

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col px-6 pt-14 pb-10">
      <button
        onClick={() => navigate('/login')}
        className="text-text-hint mb-8 self-start flex items-center gap-1.5 text-sm font-sans"
      >
        <ArrowLeft size={18} /> Back
      </button>
      <h2 className="font-fraunces text-4xl font-bold text-text-primary mb-2">
        Forgot password?
      </h2>
      <p className="text-text-second text-sm font-sans mb-8">
        Enter your email and we'll send a reset link.
      </p>
      <input
        type="email" value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="winkr-input mb-6"
      />
      <button
        onClick={() => email && setSent(true)}
        disabled={!email}
        className="winkr-btn"
      >
        Send Reset Link
      </button>
    </div>
  )
}
