import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Star, ChevronRight,
  User, Bell, Lock, Shield, UserX, Flag,
  Eye, EyeOff,
} from 'lucide-react'
import { useAuthStore } from '@/store'
import { ConfirmDialog } from '@/components/ui/index.jsx'


// ─────────────────────────────────────────────
// PREFERENCES
// ─────────────────────────────────────────────
export function Preferences() {
  const navigate            = useNavigate()
  const [notifs, setNotifs] = useState(true)

  const SECTIONS = [
    {
      title: 'ACCOUNT',
      items: [
        { icon: <User size={17} />,   label: 'Personal Information', action: () => navigate('/app/personal-info') },
        { icon: <Bell size={17} />,   label: 'Notifications',        toggle: true, value: notifs, onToggle: () => setNotifs((v) => !v) },
        { icon: <Lock size={17} />,   label: 'Privacy',              action: () => navigate('/app/privacy') },
        { icon: <Shield size={17} />, label: 'Change Password',      action: () => navigate('/app/change-password') },
      ],
    },
    {
      title: 'BLOCKED ACCOUNTS',
      items: [
        { icon: <UserX size={17} />, label: 'Blocked Users', action: () => navigate('/app/blocked-users') },
      ],
    },
    {
      title: 'LEGAL',
      items: [
        { icon: <Flag size={17} />,   label: 'Terms of Service', action: () => {} },
        { icon: <Shield size={17} />, label: 'Privacy Policy',   action: () => {} },
      ],
    },
  ]

  return (
    <div className="min-h-dvh bg-bg-primary overflow-y-auto pb-10">
      <div className="flex items-center gap-4 px-5 pt-11 pb-5 border-b border-divider">
        <button onClick={() => navigate(-1)} className="text-text-hint">
          <ArrowLeft size={22} />
        </button>
        <p className="font-sans font-semibold text-text-primary">Preferences</p>
      </div>

      {SECTIONS.map(({ title, items }) => (
        <div key={title} className="mb-1">
          <p className="overline px-5 py-3">{title}</p>
          <div className="mx-5 bg-bg-surface rounded-2xl overflow-hidden">
            {items.map(({ icon, label, action, toggle, value, onToggle }) => (
              <div
                key={label}
                onClick={action}
                className="flex items-center gap-4 px-4 py-4 border-b border-divider/40 last:border-0 cursor-pointer hover:bg-bg-elevated/50 transition-colors"
              >
                <span className="text-text-second">{icon}</span>
                <span className="flex-1 font-sans text-sm text-text-primary">{label}</span>
                {toggle ? (
                  <div
                    onClick={(e) => { e.stopPropagation(); onToggle() }}
                    className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${value ? 'bg-coral' : 'bg-bg-elevated border border-divider'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm mt-0.5 transition-transform ${value ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'}`} />
                  </div>
                ) : (
                  <ChevronRight size={15} className="text-text-hint" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}


// ─────────────────────────────────────────────
// REVIEWS
// ─────────────────────────────────────────────
const REVIEWS = [
  { name: 'Tasnim A.', rating: 5, text: 'Winkr is unlike any other dating app. The blind reveal made everything feel so genuine.',  time: '2 weeks ago' },
  { name: 'Nadia R.',  rating: 5, text: 'I met someone special here. The approach system felt respectful and thoughtful.',           time: '1 month ago' },
  { name: 'Priya S.',  rating: 4, text: 'Love the concept. The UI is beautiful and dark mode is perfect.',                          time: '3 weeks ago' },
]

export function Reviews() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh bg-bg-primary pb-10">
      <div className="flex items-center gap-4 px-5 pt-11 pb-5 border-b border-divider">
        <button onClick={() => navigate(-1)} className="text-text-hint">
          <ArrowLeft size={22} />
        </button>
        <p className="font-sans font-semibold text-text-primary">Reviews</p>
      </div>

      <div className="px-5 py-6">
        <div className="flex items-center gap-4 mb-8">
          <p className="font-fraunces text-6xl font-bold text-text-primary">4.8</p>
          <div>
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} className="text-gold" fill="#D4A844" />
              ))}
            </div>
            <p className="text-text-hint text-xs font-sans">Based on 428 reviews</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-bg-surface rounded-2xl p-4 border border-divider">
              <div className="flex items-center justify-between mb-2">
                <p className="font-sans font-semibold text-sm text-text-primary">{r.name}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={12} className="text-gold" fill="#D4A844" />
                  ))}
                </div>
              </div>
              <p className="text-text-second text-sm font-sans leading-relaxed mb-2">{r.text}</p>
              <p className="text-text-hint text-xs font-sans">{r.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


// ─────────────────────────────────────────────
// HELP & SUPPORT
// ─────────────────────────────────────────────
const FAQS = [
  { q: 'How does the blur reveal work?', a: 'Photos stay blurred until both users send a mutual wink. Once matched, photos are revealed simultaneously.' },
  { q: 'How do I send an approach?',     a: "Browse Today's Matches, tap a profile, and press Send Approach. Write a genuine message to stand out."     },
  { q: 'What is a Wink?',                a: 'A Wink is a special signal — more than an approach. When both users wink, it triggers a photo reveal.'     },
  { q: 'How can I delete my account?',   a: 'Go to Preferences → Privacy → Delete Account. This is permanent and cannot be undone.'                     },
]

export function HelpSupport() {
  const navigate        = useNavigate()
  const [open, setOpen] = useState(null)

  return (
    <div className="min-h-dvh bg-bg-primary pb-10">
      <div className="flex items-center gap-4 px-5 pt-11 pb-5 border-b border-divider">
        <button onClick={() => navigate(-1)} className="text-text-hint">
          <ArrowLeft size={22} />
        </button>
        <p className="font-sans font-semibold text-text-primary">Help & Support</p>
      </div>

      <div className="px-5 py-6">
        <h3 className="font-fraunces text-2xl font-bold text-text-primary mb-6">How can we help?</h3>

        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <div key={i} className="bg-bg-surface rounded-2xl border border-divider overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-4 text-left"
              >
                <p className="font-sans text-sm font-medium text-text-primary pr-3">{f.q}</p>
                <ChevronRight
                  size={15}
                  className={`text-text-hint shrink-0 transition-transform ${open === i ? 'rotate-90' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-4 pb-4 border-t border-divider/50">
                  <p className="text-text-second text-sm font-sans leading-relaxed pt-3">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-coral/10 border border-coral/20 rounded-2xl p-5 text-center">
          <p className="font-sans text-sm text-text-primary font-medium mb-1">Still need help?</p>
          <p className="text-text-second text-xs font-sans mb-4">Our team usually replies within a few hours.</p>
          <button className="winkr-btn py-3 text-sm">Contact Support</button>
        </div>
      </div>
    </div>
  )
}


// ─────────────────────────────────────────────
// PERSONAL INFORMATION
// ─────────────────────────────────────────────
export function PersonalInfo() {
  const navigate = useNavigate()
  const user     = useAuthStore((s) => s.user)

  const INFO = [
    { label: 'Full Name',    value: user.name           },
    { label: 'Age',          value: String(user.age)    },
    { label: 'City',         value: user.city           },
    { label: 'Education',    value: user.education      },
    { label: 'Height',       value: user.heightDisplay  },
    { label: 'Email',        value: 'jubin@example.com' },
    { label: 'Member Since', value: 'March 2026'        },
    { label: 'Account ID',   value: user.id             },
  ]

  return (
    <div className="min-h-dvh bg-bg-primary pb-10">
      <div className="flex items-center gap-4 px-5 pt-11 pb-5 border-b border-divider">
        <button onClick={() => navigate(-1)} className="text-text-hint">
          <ArrowLeft size={22} />
        </button>
        <p className="font-sans font-semibold text-text-primary">Personal Information</p>
      </div>

      <div className="px-5 py-4">
        <p className="text-text-hint text-xs font-sans mb-5 leading-relaxed">
          This information was provided when you created your account. Contact support to update your email or account ID.
        </p>
        <div className="bg-bg-surface rounded-2xl overflow-hidden">
          {INFO.map(({ label, value }, i) => (
            <div
              key={label}
              className={`flex items-center justify-between px-4 py-4 ${i < INFO.length - 1 ? 'border-b border-divider/40' : ''}`}
            >
              <p className="text-text-hint text-sm font-sans">{label}</p>
              <p className="text-text-primary text-sm font-sans font-medium text-right max-w-[55%] truncate">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


// ─────────────────────────────────────────────
// PRIVACY
// ─────────────────────────────────────────────
export function Privacy() {
  const navigate                              = useNavigate()
  const [visible,      setVisible]            = useState(true)
  const [showActivity, setShowActivity]       = useState(true)
  const [showDistance, setShowDistance]       = useState(false)
  const [deleteOpen,   setDeleteOpen]         = useState(false)

  const TOGGLES = [
    { label: 'Profile Visibility', sub: 'Allow new people to find you in matches',   value: visible,      set: setVisible      },
    { label: 'Show Online Status', sub: 'Let matches see when you were last active', value: showActivity, set: setShowActivity },
    { label: 'Show Distance',      sub: 'Display approximate location to matches',   value: showDistance, set: setShowDistance },
  ]

  return (
    <div className="min-h-dvh bg-bg-primary pb-10">
      <div className="flex items-center gap-4 px-5 pt-11 pb-5 border-b border-divider">
        <button onClick={() => navigate(-1)} className="text-text-hint">
          <ArrowLeft size={22} />
        </button>
        <p className="font-sans font-semibold text-text-primary">Privacy</p>
      </div>

      <div className="px-5 py-4">
        <p className="text-text-hint text-xs font-sans mb-5 leading-relaxed">
          Control who can see your profile and how your information is used. Winkr never sells your data to third parties.
        </p>

        <div className="bg-bg-surface rounded-2xl overflow-hidden mb-4">
          {TOGGLES.map(({ label, sub, value, set }, i) => (
            <div
              key={label}
              className={`flex items-center gap-4 px-4 py-4 ${i < TOGGLES.length - 1 ? 'border-b border-divider/40' : ''}`}
            >
              <div className="flex-1">
                <p className="text-text-primary text-sm font-sans font-medium">{label}</p>
                <p className="text-text-hint text-xs font-sans mt-0.5">{sub}</p>
              </div>
              <div
                onClick={() => set((v) => !v)}
                className={`w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${value ? 'bg-coral' : 'bg-bg-elevated border border-divider'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm mt-0.5 transition-transform ${value ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Danger zone */}
        <div
          className="rounded-2xl p-4 border border-red-500/20"
          style={{ background: 'rgba(239,68,68,0.05)' }}
        >
          <p className="text-red-400 text-sm font-sans font-semibold mb-1">Danger Zone</p>
          <p className="text-text-hint text-xs font-sans mb-3 leading-relaxed">
            Deleting your account is permanent. All your matches, chats, and data will be lost forever.
          </p>
          <button
            onClick={() => setDeleteOpen(true)}
            className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 text-sm font-sans font-semibold"
            style={{ background: 'rgba(239,68,68,0.10)' }}
          >
            Delete My Account
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete account?"
        message="This is permanent. All your matches, chats, and data will be deleted and cannot be recovered."
        confirmLabel="Delete"
        confirmDanger
        onConfirm={() => { setDeleteOpen(false); navigate('/welcome') }}
      />
    </div>
  )
}


// ─────────────────────────────────────────────
// CHANGE PASSWORD
// ─────────────────────────────────────────────
export function ChangePassword() {
  const navigate                          = useNavigate()
  const [current, setCurrent]             = useState('')
  const [newPass, setNewPass]             = useState('')
  const [confirm, setConfirm]             = useState('')
  const [showC,   setShowC]               = useState(false)
  const [showN,   setShowN]               = useState(false)
  const [error,   setError]               = useState('')
  const [success, setSuccess]             = useState(false)

  const handleChange = () => {
    if (!current || !newPass || !confirm) { setError('Please fill in all fields'); return }
    if (newPass.length < 8)               { setError('New password must be at least 8 characters'); return }
    if (newPass !== confirm)              { setError('Passwords do not match'); return }
    setSuccess(true)
  }

  if (success) return (
    <div className="min-h-dvh bg-bg-primary flex flex-col items-center justify-center px-8 text-center">
      <div className="w-16 h-16 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center mb-6">
        <span className="text-coral text-2xl font-bold">✓</span>
      </div>
      <h3 className="font-fraunces text-2xl font-bold text-text-primary mb-2">Password changed!</h3>
      <p className="text-text-second text-sm font-sans mb-8">Your password has been updated successfully.</p>
      <button onClick={() => navigate(-1)} className="winkr-btn max-w-xs w-full">Done</button>
    </div>
  )

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col px-5 pb-10">
      <div className="flex items-center gap-4 pt-11 pb-5 border-b border-divider mb-6">
        <button onClick={() => navigate(-1)} className="text-text-hint">
          <ArrowLeft size={22} />
        </button>
        <p className="font-sans font-semibold text-text-primary">Change Password</p>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-400/20">
          <p className="text-red-400 text-sm font-sans">{error}</p>
        </div>
      )}

      <div className="flex flex-col gap-5">
        <div>
          <p className="text-text-second text-sm font-sans mb-2">Current Password</p>
          <div className="relative">
            <input
              type={showC ? 'text' : 'password'}
              value={current}
              onChange={(e) => { setCurrent(e.target.value); setError('') }}
              placeholder="Enter current password"
              className="winkr-input pr-12"
            />
            <button type="button" onClick={() => setShowC(!showC)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-hint">
              {showC ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        <div>
          <p className="text-text-second text-sm font-sans mb-2">New Password</p>
          <div className="relative">
            <input
              type={showN ? 'text' : 'password'}
              value={newPass}
              onChange={(e) => { setNewPass(e.target.value); setError('') }}
              placeholder="At least 8 characters"
              className="winkr-input pr-12"
            />
            <button type="button" onClick={() => setShowN(!showN)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-hint">
              {showN ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        <div>
          <p className="text-text-second text-sm font-sans mb-2">Confirm New Password</p>
          <input
            type="password"
            value={confirm}
            onChange={(e) => { setConfirm(e.target.value); setError('') }}
            placeholder="Repeat new password"
            className="winkr-input"
          />
        </div>
      </div>

      <button onClick={handleChange} className="winkr-btn mt-8">Update Password</button>
    </div>
  )
}


// ─────────────────────────────────────────────
// BLOCKED USERS
// ─────────────────────────────────────────────
export function BlockedUsers() {
  const navigate                    = useNavigate()
  const [blocked, setBlocked]       = useState([
    { id: 'b1', name: 'Anonymous User', blockedOn: 'March 10, 2026' },
  ])

  const unblock = (id) => setBlocked((prev) => prev.filter((u) => u.id !== id))

  return (
    <div className="min-h-dvh bg-bg-primary pb-10">
      <div className="flex items-center gap-4 px-5 pt-11 pb-5 border-b border-divider">
        <button onClick={() => navigate(-1)} className="text-text-hint">
          <ArrowLeft size={22} />
        </button>
        <p className="font-sans font-semibold text-text-primary">Blocked Users</p>
      </div>

      <div className="px-5 py-4">
        {blocked.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-fraunces text-xl text-text-primary mb-2">No blocked users</p>
            <p className="text-text-hint text-sm font-sans">Users you block will appear here.</p>
          </div>
        ) : (
          <div className="bg-bg-surface rounded-2xl overflow-hidden">
            {blocked.map((u, i) => (
              <div
                key={u.id}
                className={`flex items-center gap-3.5 px-4 py-4 ${i < blocked.length - 1 ? 'border-b border-divider/40' : ''}`}
              >
                <div className="w-10 h-10 rounded-full bg-bg-elevated flex items-center justify-center shrink-0">
                  <span className="text-text-hint text-sm font-sans font-bold">?</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary text-sm font-sans font-medium">{u.name}</p>
                  <p className="text-text-hint text-xs font-sans mt-0.5">Blocked on {u.blockedOn}</p>
                </div>
                <button
                  onClick={() => unblock(u.id)}
                  className="text-coral text-xs font-sans font-semibold border border-coral/30 px-3 py-1.5 rounded-full hover:bg-coral/10 transition-colors shrink-0"
                >
                  Unblock
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
