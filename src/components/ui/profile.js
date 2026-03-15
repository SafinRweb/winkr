import { supabase } from './supabase'

// ── Get current logged in user ID ──
function getUserId() {
  const session = supabase.auth.getSession()
  return supabase.auth.getUser().then(({ data }) => data?.user?.id)
}

// ── Update any fields on the user profile ──
export async function updateProfile(fields) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not logged in')

  const { error } = await supabase
    .from('users')
    .update(fields)
    .eq('id', user.id)

  if (error) throw error
}

// ── Step 1: Basic Info ──
export async function saveBasicInfo({ city, age, heightCm, education }) {
  await updateProfile({
    city,
    age:       parseInt(age),
    height_cm: parseInt(heightCm),
    education,
  })
}

// ── Step 2: Personality ──
export async function savePersonality({
  bio, relationshipGoal, personalityType, mbti,
  favoriteMusic, favoriteSinger, favoriteBand, favoriteColor, special,
}) {
  await updateProfile({
    bio,
    relationship_goal: relationshipGoal,
    personality_type:  personalityType,
    mbti,
    favorite_music:    favoriteMusic,
    favorite_singer:   favoriteSinger,
    favorite_band:     favoriteBand,
    favorite_color:    favoriteColor,
    special_note:      special,
  })
}

// ── Step 3: Lifestyle ──
export async function saveLifestyle({ hobbies, interests, lookingFor }) {
  await updateProfile({
    hobbies,
    interests,
    looking_for: lookingFor,
  })
}

// ── Step 4: Upload photos ──
export async function uploadPhotos(files) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not logged in')

  const uploadedUrls = []

  for (const file of files) {
    // Create a unique filename
    const ext      = file.name.split('.').pop()
    const filename = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('photos')
      .upload(filename, file, { upsert: true })

    if (uploadError) throw uploadError

    // Get the public URL
    const { data } = supabase.storage
      .from('photos')
      .getPublicUrl(filename)

    uploadedUrls.push(data.publicUrl)
  }

  // Save URLs to user profile
  await updateProfile({ photo_urls: uploadedUrls })

  return uploadedUrls
}

// ── Calculate profile strength ──
export function calcProfileStrength(user) {
  let score = 0
  if (user.name)             score += 10
  if (user.age)              score += 10
  if (user.city)             score += 10
  if (user.bio)              score += 15
  if (user.relationship_goal) score += 10
  if (user.photo_urls?.length > 0) score += 20
  if (user.hobbies?.length > 0)    score += 10
  if (user.interests?.length > 0)  score += 10
  if (user.favorite_music)         score += 5
  return Math.min(score, 100)
}
