import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store'
import { flushSetupToSupabase } from '@/lib/profile.js'

function Root() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Get session once on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      useAuthStore.setState({
        isLoggedIn:   !!session,
        supabaseUser: session?.user ?? null,
      })
      setReady(true)
    })

    // Listen for auth changes — NO redirects here
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      useAuthStore.setState({
        isLoggedIn:   !!session,
        supabaseUser: session?.user ?? null,
      })

      // After email confirmed — flush setup data to Supabase
      // But don't redirect — let React Router handle navigation
      if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
        try {
          await flushSetupToSupabase()
        } catch (e) {
          console.error('flush error', e)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!ready) return (
    <div style={{
      minHeight: '100dvh',
      background: '#0D0B0B',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <img
        src="/winkr_logo.png"
        alt="Winkr"
        style={{ width: 56, height: 56, borderRadius: 16, opacity: 0.8 }}
      />
    </div>
  )

  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>
)