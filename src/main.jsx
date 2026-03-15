import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store'

function Root() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Get session once on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      useAuthStore.setState({
        isLoggedIn:   !!session,
        supabaseUser: session?.user ?? null,
      })
      setReady(true) // only render app after auth is known
    })

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      useAuthStore.setState({
        isLoggedIn:   !!session,
        supabaseUser: session?.user ?? null,
      })
    })

    return () => subscription.unsubscribe()
  }, [])

  // Show nothing until we know if user is logged in
  if (!ready) return (
    <div style={{
      minHeight: '100dvh',
      background: '#0D0B0B',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <img src="/winkr_logo.png" alt="Winkr"
        style={{ width: 56, height: 56, borderRadius: 16, animation: 'pulseSoft 1.5s ease-in-out infinite' }} />
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
