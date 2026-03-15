import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuthStore } from '@/store'
import { PersonalityCard } from '@/components/ui/index.jsx'

export default function MyProfileView() {
  const navigate = useNavigate()
  const user     = useAuthStore((s) => s.user)

  return (
    <div className="min-h-dvh bg-bg-primary overflow-y-auto pb-28">

      {/* Photo header */}
      <div className="relative" style={{ height: '48vh', minHeight: 280 }}>
        <img src={user.photoUrl} alt="" className="w-full h-full object-cover" />

        {/* Back button — fixed, z-50 */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(-1) }}
          className="absolute top-12 left-4 z-50 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white border border-white/10"
          style={{ touchAction: 'manipulation' }}
        >
          <ArrowLeft size={18} />
        </button>

        {/* Edit shortcut */}
        <button
          onClick={() => navigate('/app/edit-profile')}
          className="absolute top-12 right-4 z-50 bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-xl text-white text-xs font-sans"
        >
          Edit
        </button>

        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 38%, #0D0B0B 100%)' }}
        />

        <div className="absolute bottom-5 left-5 right-5">
          <h2 className="font-fraunces text-[38px] font-bold text-text-primary leading-tight">
            {user.name}, {user.age}
          </h2>
          <p className="text-text-second text-sm font-sans mt-1">📍 {user.city}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-5">
        <div className="flex gap-5 text-sm font-sans text-text-second mb-5">
          <span>🎓 {user.education}</span>
          <span>📏 {user.heightDisplay}</span>
        </div>

        <div className="h-px bg-divider mb-5" />

        <p className="overline mb-2">ABOUT ME</p>
        <p className="text-text-second text-sm font-sans leading-relaxed mb-6">{user.bio}</p>

        <p className="overline mb-3">HOBBIES</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {user.hobbies.map((h) => <span key={h} className="winkr-chip">{h}</span>)}
        </div>

        <p className="overline mb-3">INTERESTS</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {user.interests.map((i) => <span key={i} className="winkr-chip">{i}</span>)}
        </div>

        <div className="h-px bg-divider mb-5" />

        <p className="overline mb-3">PERSONALITY</p>
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <PersonalityCard emoji="🎵" label="Music"  value={user.favoriteMusic}  />
          <PersonalityCard emoji="🎤" label="Singer" value={user.favoriteSinger} />
          <PersonalityCard emoji="🎸" label="Band"   value={user.favoriteBand}   />
          <PersonalityCard emoji="🎨" label="Color"  value={user.favoriteColor}  />
        </div>
      </div>

      {/* Sticky Edit button */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pb-6 pt-4"
        style={{ background: 'linear-gradient(to top, #0D0B0B 70%, transparent)' }}
      >
        <button onClick={() => navigate('/app/edit-profile')} className="winkr-btn">
          Edit Profile
        </button>
      </div>
    </div>
  )
}
