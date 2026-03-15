import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import {
  StepBar, SectionHeader,
  MultiSelectChips, AddCustomChip, LoadingDots,
} from '@/components/ui/index.jsx'
import { HOBBY_OPTIONS, INTEREST_OPTIONS, LOOKING_FOR_OPTIONS } from '@/lib/mockData'
import { saveLifestyleLocal } from '@/lib/profile.js'

// ─────────────────────────────────────────────
// LIFESTYLE
// ─────────────────────────────────────────────
export function Lifestyle() {
  const navigate                  = useNavigate()
  const [hobbies,   setHobbies]   = useState([])
  const [interests, setInterests] = useState([])
  const [looking,   setLooking]   = useState([])
  const [error,     setError]     = useState('')
  const [loading,   setLoading]   = useState(false)

  const toggle = (setter) => (v) =>
    setter((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])

  const handleContinue = () => {
    setLoading(true)
    try {
      saveLifestyleLocal({ hobbies, interests, lookingFor: looking })
      navigate('/setup/photos')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col px-6 pt-12 pb-10 overflow-y-auto">
      <StepBar current={3} total={4} onBack={() => navigate('/setup/personality')} />

      <p className="overline mb-2">Step 3 of 4 — Lifestyle</p>
      <h2 className="font-fraunces text-4xl font-bold text-text-primary mb-8">Your world.</h2>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-400/20">
          <p className="text-red-400 text-sm font-sans">{error}</p>
        </div>
      )}

      <div className="flex flex-col gap-8">
        <div>
          <SectionHeader>Hobbies</SectionHeader>
          <MultiSelectChips options={HOBBY_OPTIONS} selected={hobbies} onToggle={toggle(setHobbies)} />
          <div className="mt-3">
            <AddCustomChip label="Add custom hobby" onAdd={(v) => setHobbies((p) => [...p, v])} />
          </div>
        </div>
        <div>
          <SectionHeader>Interests</SectionHeader>
          <MultiSelectChips options={INTEREST_OPTIONS} selected={interests} onToggle={toggle(setInterests)} />
          <div className="mt-3">
            <AddCustomChip label="Add custom interest" onAdd={(v) => setInterests((p) => [...p, v])} />
          </div>
        </div>
        <div>
          <SectionHeader>I'm looking for someone who...</SectionHeader>
          <MultiSelectChips options={LOOKING_FOR_OPTIONS} selected={looking} onToggle={toggle(setLooking)} />
          <div className="mt-3">
            <AddCustomChip label="Add custom" onAdd={(v) => setLooking((p) => [...p, v])} />
          </div>
        </div>
      </div>

      <button onClick={handleContinue} disabled={loading} className="winkr-btn mt-8">
        {loading ? <LoadingDots /> : 'Continue'}
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────
// PHOTO UPLOAD
// ─────────────────────────────────────────────
export function PhotoUpload() {
  const navigate                    = useNavigate()
  const [photos,   setPhotos]       = useState([])
  const [previews, setPreviews]     = useState([])
  const [error,    setError]        = useState('')

  const handleFileSelect = (e) => {
    const files     = Array.from(e.target.files)
    if (!files.length) return
    const remaining = 5 - photos.length
    const selected  = files.slice(0, remaining)
    setPhotos((prev)   => [...prev, ...selected])
    setPreviews((prev) => [...prev, ...selected.map((f) => URL.createObjectURL(f))])
  }

  const removePhoto = (index) => {
    setPhotos((prev)   => prev.filter((_, i) => i !== index))
    setPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFinish = () => {
    if (photos.length === 0) { setError('Please add at least 1 photo'); return }
    localStorage.setItem('winkr_pending_photos', 'true')
    navigate('/confirm-email')
  }

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col px-6 pt-12 pb-10">
      <StepBar current={4} total={4} onBack={() => navigate('/setup/lifestyle')} />

      <p className="overline mb-2">Step 4 of 4 — Photos</p>
      <h2 className="font-fraunces text-4xl font-bold text-text-primary mb-2">
        Add your photos.
      </h2>
      <p className="text-text-second text-sm font-sans mb-8">
        Others will see these blurred until you both match.
      </p>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-400/20">
          <p className="text-red-400 text-sm font-sans">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[0, 1, 2, 3, 4].map((i) => {
          const preview = previews[i]
          return preview ? (
            <div key={i} className={`relative rounded-2xl overflow-hidden ${i === 0 ? 'col-span-2 h-52' : 'h-36'}`}>
              <img src={preview} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => removePhoto(i)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center text-white text-sm font-bold"
              >
                ×
              </button>
            </div>
          ) : (
            <label key={i}
              className={`rounded-2xl border-2 border-dashed border-coral-dim flex flex-col items-center justify-center cursor-pointer hover:border-coral hover:bg-coral-faint transition-colors ${i === 0 ? 'col-span-2 h-52' : 'h-36'}`}>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileSelect} />
              <Plus size={24} className="text-coral mb-1" />
              <span className="text-coral text-xs font-sans">{i === 0 ? 'Add main photo' : 'Add photo'}</span>
            </label>
          )
        })}
      </div>

      <p className="text-text-hint text-xs font-sans mb-6">
        {photos.length}/5 photos · At least 1 required
      </p>

      <button onClick={handleFinish} disabled={photos.length === 0} className="winkr-btn mt-auto">
        Finish Setup
      </button>
    </div>
  )
}
