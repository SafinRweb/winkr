import { supabase } from './supabase'

// ── SIGN UP ──
export async function signUp(name, email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error

  // Create the user profile row
  const { error: profileError } = await supabase
    .from('users')
    .insert({
      id:    data.user.id,
      name,
      email,
      age:   0,    // filled in setup wizard
      city:  '',   // filled in setup wizard
    })
  if (profileError) throw profileError

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