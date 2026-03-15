import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const NOTIFICATIONS = [
  { id: 1, type: 'match',    text: 'You have a new match! Nadia Rahman liked your profile.',              time: '2m ago',    unread: true  },
  { id: 2, type: 'approach', text: 'Fahim sent you an approach.',                                         time: '18m ago',   unread: true  },
  { id: 3, type: 'wink',     text: 'Someone winked at you 💜',                                            time: '1h ago',    unread: false },
  { id: 4, type: 'match',    text: 'Priya Sen accepted your approach.',                                   time: '3h ago',    unread: false },
  { id: 5, type: 'system',   text: 'Your profile is looking great! Add one more photo to boost visibility.', time: 'Yesterday', unread: false },
]

const ICONS = { match: '💜', approach: '✉️', wink: '😉', system: '💡' }

export default function Notifications() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh bg-bg-primary">
      <div className="flex items-center gap-4 px-5 pt-12 pb-5 border-b border-divider">
        <button onClick={() => navigate(-1)} className="text-text-hint">
          <ArrowLeft size={22} />
        </button>
        <p className="font-sans text-base font-semibold text-text-primary">Notifications</p>
      </div>

      {NOTIFICATIONS.map((n) => (
        <div
          key={n.id}
          className={`flex items-start gap-4 px-5 py-4 border-b border-divider/40 ${n.unread ? 'bg-coral/[0.03]' : ''}`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-lg ${n.unread ? 'bg-coral/10' : 'bg-bg-surface'}`}>
            {ICONS[n.type]}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-sans text-sm leading-relaxed ${n.unread ? 'text-text-primary font-medium' : 'text-text-second'}`}>
              {n.text}
            </p>
            <p className="text-text-hint text-xs font-sans mt-1">{n.time}</p>
          </div>
          {n.unread && <div className="w-2 h-2 rounded-full bg-coral shrink-0 mt-1.5" />}
        </div>
      ))}
    </div>
  )
}
