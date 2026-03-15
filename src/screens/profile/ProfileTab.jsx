import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings, Star, HelpCircle, LogOut, ChevronRight } from 'lucide-react'
import { useAuthStore } from '@/store'
import { ConfirmDialog } from '@/components/ui/index.jsx'

const MENU_ITEMS = [
  { icon: Settings,    label: 'Preferences',   path: '/app/preferences', gold: false },
  { icon: Star,        label: 'Winkr+',        path: '/app/premium',     gold: true  },
  { icon: Star,        label: 'Reviews',       path: '/app/reviews',     gold: false },
  { icon: HelpCircle,  label: 'Help & Support', path: '/app/help',       gold: false },
]

export default function ProfileTab() {
  const navigate   = useNavigate()
  const user       = useAuthStore((s) => s.user)
  const logout     = useAuthStore((s) => s.logout)
  const [logoutOpen, setLogoutOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-bg-primary pb-nav overflow-y-auto">
      <div className="px-5 pt-11 pb-5">
        <h2 className="font-fraunces text-2xl font-bold text-text-primary mb-5">Profile</h2>

        {/* ── Profile card — magazine style ── */}
        <button
          onClick={() => navigate('/app/my-profile')}
          className="w-full text-left mb-3 group"
        >
          <div className="relative rounded-3xl overflow-hidden" style={{ height: 260 }}>
            <img
              src={user.photoUrl} alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Diagonal gradient — top-right transparent, bottom-left dark */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(160deg, transparent 25%, rgba(13,11,11,0.97) 80%)' }}
            />

            {/* Active badge — top right */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-white/75 text-[11px] font-sans font-medium">Active</span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              {/* Profile strength bar */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${user.profileStrength}%`,
                      background: 'linear-gradient(to right, #E85D4A, #F4A5A0)',
                    }}
                  />
                </div>
                <span className="text-coral text-xs font-sans font-semibold shrink-0">
                  {user.profileStrength}%
                </span>
              </div>

              <h3 className="font-fraunces text-[28px] font-bold text-white leading-tight">
                {user.name}, {user.age}
              </h3>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-white/55 text-xs font-sans">📍 {user.city}</span>
                <span className="text-white/30 text-xs">·</span>
                <span className="text-white/55 text-xs font-sans">{user.relationshipGoal}</span>
              </div>
            </div>
          </div>
        </button>

        {/* Hobbies quick-glance row */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-hide">
          {user.hobbies.map((h) => (
            <span key={h} className="winkr-chip shrink-0 text-xs">{h}</span>
          ))}
        </div>

        {/* ── Menu ── */}
        <div className="bg-bg-surface rounded-2xl overflow-hidden mb-3">
          {MENU_ITEMS.map(({ icon: Icon, label, path, gold }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="w-full flex items-center gap-4 px-4 py-4 border-b border-divider/50 last:border-0 hover:bg-bg-elevated/60 transition-colors text-left"
            >
              <Icon size={18} className={gold ? 'text-gold' : 'text-text-second'} />
              <span className={`flex-1 font-sans text-sm ${gold ? 'text-gold font-medium' : 'text-text-primary'}`}>
                {label}
              </span>
              {gold ? (
                <span className="text-[10px] font-sans font-bold text-gold border border-gold/40 px-2 py-0.5 rounded-full bg-gold-faint">
                  UPGRADE
                </span>
              ) : (
                <ChevronRight size={15} className="text-text-hint" />
              )}
            </button>
          ))}
        </div>

        {/* Log out — separate card */}
        <div className="bg-bg-surface rounded-2xl overflow-hidden">
          <button
            onClick={() => setLogoutOpen(true)}
            className="w-full flex items-center gap-4 px-4 py-4 hover:bg-bg-elevated/60 transition-colors text-left"
          >
            <LogOut size={18} className="text-red-400" />
            <span className="font-sans text-sm text-red-400">Log Out</span>
          </button>
        </div>
      </div>

      {/* Logout confirmation */}
      <ConfirmDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="Log out?"
        message="You'll need to sign back in to see your matches."
        confirmLabel="Log Out"
        confirmDanger
        onConfirm={() => {
          setLogoutOpen(false)
          // Small delay so dialog fully closes before navigation
          setTimeout(() => { logout(); navigate('/login') }, 80)
        }}
      />
    </div>
  )
}
