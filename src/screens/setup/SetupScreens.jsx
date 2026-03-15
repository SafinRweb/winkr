// ─── Lifestyle.jsx ───────────────────────────
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepBar, SectionHeader, MultiSelectChips, AddCustomChip } from '@/components/ui/index.jsx'
import { HOBBY_OPTIONS, INTEREST_OPTIONS, LOOKING_FOR_OPTIONS } from '@/lib/mockData'

export function Lifestyle() {
  const navigate = useNavigate()
  const [hobbies,   setHobbies]   = useState([])
  const [interests, setInterests] = useState([])
  const [looking,   setLooking]   = useState([])

  const toggle = (setter) => (v) =>
    setter((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col px-6 pt-12 pb-10 overflow-y-auto">
      <StepBar current={3} total={4} onBack={() => navigate('/setup/personality')} />

      <p className="overline mb-2">Step 3 of 4 — Lifestyle</p>
      <h2 className="font-fraunces text-4xl font-bold text-text-primary mb-8">Your world.</h2>

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

      <button onClick={() => navigate('/setup/photos')} className="winkr-btn mt-8">Continue</button>
    </div>
  )
}


// ─── PhotoUpload.jsx ──────────────────────────
import { useAuthStore } from '@/store'
import { PHOTO_URLS } from '@/lib/mockData'
import { Plus } from 'lucide-react'

export function PhotoUpload() {
  const navigate = useNavigate()
  const login    = useAuthStore((s) => s.login)
  const [photos, setPhotos] = useState([PHOTO_URLS[3]])

  const addPhoto    = () => {
    const next = PHOTO_URLS.find((u) => !photos.includes(u))
    if (next) setPhotos((p) => [...p, next])
  }
  const removePhoto = (url) => setPhotos((p) => p.filter((u) => u !== url))

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col px-6 pt-12 pb-10">
      <StepBar current={4} total={4} onBack={() => navigate('/setup/lifestyle')} />

      <p className="overline mb-2">Step 4 of 4 — Photos</p>
      <h2 className="font-fraunces text-4xl font-bold text-text-primary mb-2">Add your photos.</h2>
      <p className="text-text-second text-sm font-sans mb-8">
        Others will see these blurred until you both match.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[0, 1, 2, 3, 4].map((i) => {
          const url = photos[i]
          return url ? (
            <div key={i} className={`relative rounded-2xl overflow-hidden ${i === 0 ? 'col-span-2 h-52' : 'h-36'}`}>
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => removePhoto(url)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white text-xs font-bold"
              >
                ×
              </button>
            </div>
          ) : (
            <button
              key={i}
              onClick={addPhoto}
              className={`rounded-2xl border-2 border-dashed border-coral-dim flex items-center justify-center hover:border-coral transition-colors ${i === 0 ? 'col-span-2 h-52' : 'h-36'}`}
            >
              <Plus size={24} className="text-coral" />
            </button>
          )
        })}
      </div>

      <p className="text-text-hint text-xs font-sans mb-6">At least 1 photo required to continue</p>

      <button
        onClick={() => { login(); navigate('/app/home') }}
        disabled={photos.length === 0}
        className="winkr-btn"
      >
        Finish Setup
      </button>
    </div>
  )
}
