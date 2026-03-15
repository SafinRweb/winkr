import { supabase } from './supabase'

// ─────────────────────────────────────────────
// LOCAL STORAGE HELPERS (used during setup wizard
// before email confirmation — no auth needed)
// ─────────────────────────────────────────────

export function saveBasicInfoLocal({ city, age, heightCm, education }) {
  const existing = JSON.parse(localStorage.getItem('winkr_setup') || '{}')
  localStorage.setItem('winkr_setup', JSON.stringify({
    ...existing,
    city,
    age:       parseInt(age),
    height_cm: parseInt(heightCm),
    education,
  }))
}

export function savePersonalityLocal({
  bio, relationshipGoal, personalityType, mbti,
  favoriteMusic, favoriteSinger, favoriteBand, favoriteColor, special,
}) {
  const existing = JSON.parse(localStorage.getItem('winkr_setup') || '{}')
  localStorage.setItem('winkr_setup', JSON.stringify({
    ...existing,
    bio,
    relationship_goal: relationshipGoal,
    personality_type:  personalityType,
    mbti,
    favorite_music:    favoriteMusic,
    favorite_singer:   favoriteSinger,
    favorite_band:     favoriteBand,
    favorite_color:    favoriteColor,
    special_note:      special,
  }))
}

export function saveLifestyleLocal({ hobbies, interests, lookingFor }) {
  const existing = JSON.parse(localStorage.getItem('winkr_setup') || '{}')
  localStorage.setItem('winkr_setup', JSON.stringify({
    ...existing,
    hobbies,
    interests,
    looking_for: lookingFor,
  }))
}

// Called after email confirmation + login
// Pushes everything saved locally to Supabase
export async function flushSetupToSupabase() {
  const setup = JSON.parse(localStorage.getItem('winkr_setup') || '{}')
  if (!Object.keys(setup).length) return

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { error } = await supabase
    .from('users')
    .update(setup)
    .eq('id', user.id)

  if (error) throw error

  localStorage.removeItem('winkr_setup')
}

// ─────────────────────────────────────────────
// SUPABASE HELPERS (need auth)
// ─────────────────────────────────────────────

export async function updateProfile(fields) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not logged in')

  const { error } = await supabase
    .from('users')
    .update(fields)
    .eq('id', user.id)

  if (error) throw error
}

// Upload photos to Supabase Storage
export async function uploadPhotos(files) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not logged in')

  const uploadedUrls = []

  for (const file of files) {
    const ext      = file.name.split('.').pop()
    const filename = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('photos')
      .upload(filename, file, { upsert: true })

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('photos')
      .getPublicUrl(filename)

    uploadedUrls.push(data.publicUrl)
  }

  await updateProfile({ photo_urls: uploadedUrls })
  return uploadedUrls
}

// Calculate profile strength
export function calcProfileStrength(user) {
  let score = 0
  if (user.name)                   score += 10
  if (user.age)                    score += 10
  if (user.city)                   score += 10
  if (user.bio)                    score += 15
  if (user.relationship_goal)      score += 10
  if (user.photo_urls?.length > 0) score += 20
  if (user.hobbies?.length > 0)    score += 10
  if (user.interests?.length > 0)  score += 10
  if (user.favorite_music)         score +=  5
  return Math.min(score, 100)
}
