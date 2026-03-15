import { supabase } from './supabase'

// ── SIGN UP ──
export async function signUp(name, email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error

  // Try to insert profile — silently ignore errors
  // (RLS may block before email confirmation, that's ok)
  try {
    await supabase.from('users').insert({
      id:    data.user.id,
      name,
      email,
      age:   0,
      city:  '',
    })
  } catch (e) {
    console.log('Profile insert skipped:', e.message)
  }

  return data.user
}

// ── SIGN IN ──
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data.user
}

// ── SIGN OUT ──
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// ── GET CURRENT USER ──
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// ── GET USER PROFILE ──
export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) throw error
  return data
}

// ── RESEND CONFIRMATION EMAIL ──
export async function sendConfirmationEmail() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not logged in')
  const { error } = await supabase.auth.resend({
    type:  'signup',
    email: user.email,
  })
  if (error) throw error
}
