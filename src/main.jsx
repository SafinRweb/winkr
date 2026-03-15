import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store'

function Root() {
  useEffect(() => {
    // Restore session on page load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        useAuthStore.setState({ isLoggedIn: true, supabaseUser: session.user })
      }
    })

    // Listen for login/logout changes
    supabase.auth.onAuthStateChange((_event, session) => {
      useAuthStore.setState({
        isLoggedIn:   !!session,
        supabaseUser: session?.user ?? null,
      })
    })
  }, [])

  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>
)