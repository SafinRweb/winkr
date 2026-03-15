import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Compass, Heart, MessageCircle, User } from 'lucide-react'
import { useAuthStore } from '@/store'

// Auth
import Welcome       from '@/screens/auth/Welcome'
import Login         from '@/screens/auth/Login'
import Register      from '@/screens/auth/Register'
import ForgotPassword from '@/screens/auth/ForgotPassword'

// Setup
import BasicInfo     from '@/screens/setup/BasicInfo'
import Personality   from '@/screens/setup/Personality'
import { Lifestyle, PhotoUpload } from '@/screens/setup/SetupScreens'

// App
import Home          from '@/screens/app/Home'
import MatchPreview  from '@/screens/app/MatchPreview'
import Approaches    from '@/screens/app/Approaches'
import Chats         from '@/screens/app/Chats'
import Chat          from '@/screens/app/Chat'
import WinkFlow      from '@/screens/app/WinkFlow'
import Notifications from '@/screens/app/Notifications'
import Premium       from '@/screens/app/Premium'

// Profile
import ProfileTab    from '@/screens/profile/ProfileTab'
import MyProfileView from '@/screens/profile/MyProfileView'
import EditProfile   from '@/screens/profile/EditProfile'
import {
  Preferences, Reviews, HelpSupport,
  PersonalInfo, Privacy, ChangePassword, BlockedUsers,
} from '@/screens/profile/ProfileScreens'

// ─────────────────────────────────────────────
// BOTTOM NAV
// ─────────────────────────────────────────────
const NAV_ITEMS = [
  { path: '/app/home',       Icon: Compass,       label: 'Discover'   },
  { path: '/app/approaches', Icon: Heart,          label: 'Approaches' },
  { path: '/app/chats',      Icon: MessageCircle,  label: 'Chats'      },
  { path: '/app/profile',    Icon: User,           label: 'Profile'    },
]

// Routes where the nav should be hidden
const HIDE_NAV = [
  '/welcome', '/login', '/register', '/forgot-password',
  '/setup/',
  '/app/chat/', '/app/match/', '/app/wink/',
  '/app/edit-profile', '/app/my-profile',
  '/app/preferences', '/app/premium',
  '/app/notifications', '/app/reviews', '/app/help',
]

function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const cur      = location.pathname

  if (HIDE_NAV.some((p) => cur === p || cur.startsWith(p))) return null

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pb-7 z-40 pointer-events-none">
      <div className="glass-nav rounded-[32px] h-[62px] flex pointer-events-auto">
        {NAV_ITEMS.map(({ path, Icon, label }) => {
          const active = cur === path || cur.startsWith(path + '/')
          return (
           <button
              key={path}
              onClick={() => navigate(path)}
              className="flex-1 flex flex-col items-center justify-center gap-[3px] relative"
            >
              <Icon
                size={21}
                className={`transition-colors ${active ? 'text-coral' : 'text-text-hint'}`}
                fill={active ? 'currentColor' : 'none'}
                strokeWidth={active ? 0 : 1.6}
              />
              <span className={`text-[10px] font-sans font-medium tracking-wide transition-colors ${active ? 'text-coral' : 'text-text-hint'}`}>
                {label}
              </span>
              <div className={`w-[5px] h-[5px] rounded-full transition-all ${active ? 'bg-coral' : 'bg-transparent'}`} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// PROTECTED ROUTE
// ─────────────────────────────────────────────
function Protected({ children }) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />

        {/* Auth */}
        <Route path="/welcome"          element={<Welcome />} />
        <Route path="/login"            element={<Login />} />
        <Route path="/register"         element={<Register />} />
        <Route path="/forgot-password"  element={<ForgotPassword />} />

        {/* Setup wizard */}
        <Route path="/setup/basic"        element={<BasicInfo />} />
        <Route path="/setup/personality"  element={<Personality />} />
        <Route path="/setup/lifestyle"    element={<Lifestyle />} />
        <Route path="/setup/photos"       element={<PhotoUpload />} />

        {/* Main app — protected */}
        <Route path="/app/home"          element={<Protected><Home /></Protected>} />
        <Route path="/app/approaches"    element={<Protected><Approaches /></Protected>} />
        <Route path="/app/chats"         element={<Protected><Chats /></Protected>} />
        <Route path="/app/chat/:id"      element={<Protected><Chat /></Protected>} />
        <Route path="/app/match/:id"     element={<Protected><MatchPreview /></Protected>} />
        <Route path="/app/wink/:id"      element={<Protected><WinkFlow /></Protected>} />
        <Route path="/app/notifications" element={<Protected><Notifications /></Protected>} />
        <Route path="/app/premium"       element={<Protected><Premium /></Protected>} />

        {/* Profile — protected */}
        <Route path="/app/profile"       element={<Protected><ProfileTab /></Protected>} />
        <Route path="/app/my-profile"    element={<Protected><MyProfileView /></Protected>} />
        <Route path="/app/edit-profile"  element={<Protected><EditProfile /></Protected>} />
        <Route path="/app/preferences"   element={<Protected><Preferences /></Protected>} />
        <Route path="/app/reviews"         element={<Protected><Reviews /></Protected>} />
        <Route path="/app/help"          element={<Protected><HelpSupport /></Protected>} />
        <Route path="/app/personal-info" element={<Protected><PersonalInfo /></Protected>} />
        <Route path="/app/privacy"       element={<Protected><Privacy /></Protected>} />
        <Route path="/app/change-password" element={<Protected><ChangePassword /></Protected>} />
        <Route path="/app/blocked-users" element={<Protected><BlockedUsers /></Protected>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>

      <BottomNav />
    </>
  )
}
