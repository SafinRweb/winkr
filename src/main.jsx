import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store'
import { flushSetupToSupabase } from '@/lib/profile.js'

async function loadProfile(userId) {
  try {
    const { data, error } = await supabase
      .from('users').select('*').eq('id', userId).single()
    if (error || !data) return
    useAuthStore.setState({
      user: {
        id:               data.id,
        name:             data.name              || '',
        age:              data.age               || 0,
        city:             data.city              || '',
        education:        data.education         || '',
        heightCm:         data.height_cm         || 0,
        heightDisplay:    data.height_cm
          ? `${Math.floor(data.height_cm / 30.48)} ft ${Math.round((data.height_cm / 2.54) % 12)} in`
          : '',
        bio:              data.bio               || '',
        relationshipGoal: data.relationship_goal || '',
        personalityType:  data.personality_type  || '',
        mbti:             data.mbti              || '',
        favoriteMusic:    data.favorite_music    || '',
        favoriteSinger:   data.favorite_singer   || '',
        favoriteBand:     data.favorite_band     || '',
        favoriteColor:    data.favorite_color    || '',
        hobbies:          data.hobbies           || [],
        interests:        data.interests         || [],
        lookingFor:       data.looking_for       || [],
        photoUrl:         data.photo_urls?.[0]   || '',
        photoUrls:        data.photo_urls        || [],
        isPremium:        data.is_premium        || false,
        isVisible:        data.is_visible        || true,
        profileStrength:  data.profile_strength  || 0,
      },
    })
  } catch (err) {
    console.error('loadProfile error:', err)
  }
}

// Set authReady immediately — no waiting
useAuthStore.setState({ authReady: true })

// Then check auth in background
supabase.auth.getSession().then(async ({ data: { session } }) => {
  if (session?.user) {
    useAuthStore.setState({ isLoggedIn: true, supabaseUser: session.user })
    await loadProfile(session.user.id)
  }
}).catch(console.error)

// Listen for future auth changes
supabase.auth.onAuthStateChange(async (event, session) => {
  useAuthStore.setState({
    isLoggedIn:   !!session,
    supabaseUser: session?.user ?? null,
  })
  if (event === 'SIGNED_IN' && session?.user) {
    await loadProfile(session.user.id)
    if (session.user.email_confirmed_at) {
      try { await flushSetupToSupabase() } catch (e) { console.error(e) }
    }
  }
  if (event === 'SIGNED_OUT') {
    useAuthStore.setState({ user: null })
  }
})

// Render immediately — no waiting for auth
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
