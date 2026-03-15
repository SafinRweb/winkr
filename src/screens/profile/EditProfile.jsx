import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuthStore } from '@/store'
import {
  SectionHeader, SingleSelectChips, MultiSelectChips, AddCustomChip,
} from '@/components/ui/index.jsx'
import { RELATIONSHIP_GOALS, PERSONALITY_TYPES, HOBBY_OPTIONS, INTEREST_OPTIONS } from '@/lib/mockData'

export default function EditProfile() {
  const navigate    = useNavigate()
  const user        = useAuthStore((s) => s.user)
  const updateUser  = useAuthStore((s) => s.updateUser)

  const [name,      setName]      = useState(user.name)
  const [city,      setCity]      = useState(user.city)
  const [bio,       setBio]       = useState(user.bio)
  const [goal,      setGoal]      = useState(user.relationshipGoal)
  const [ptype,     setPtype]     = useState(user.personalityType)
  const [music,     setMusic]     = useState(user.favoriteMusic)
  const [singer,    setSinger]    = useState(user.favoriteSinger)
  const [band,      setBand]      = useState(user.favoriteBand)
  const [color,     setColor]     = useState(user.favoriteColor)
  const [hobbies,   setHobbies]   = useState([...user.hobbies])
  const [interests, setInterests] = useState([...user.interests])

  const toggle = (setter) => (v) =>
    setter((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v])

  const handleSave = () => {
    updateUser({ name, city, bio, relationshipGoal: goal, personalityType: ptype,
      favoriteMusic: music, favoriteSinger: singer, favoriteBand: band,
      favoriteColor: color, hobbies, interests })
    navigate(-1)
  }

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col">

      {/* AppBar */}
      <div className="flex items-center justify-between px-5 pt-11 pb-4 border-b border-divider">
        <button onClick={() => navigate(-1)} className="text-text-hint">
          <ArrowLeft size={22} />
        </button>
        <p className="font-sans font-semibold text-text-primary">Edit Profile</p>
        <button onClick={handleSave} className="text-coral font-sans font-semibold text-sm">
          Save
        </button>
      </div>

      {/* Scrollable form */}
      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-7 pb-16">

        {/* Basic Info */}
        <div>
          <SectionHeader>Basic Info</SectionHeader>
          <div className="flex flex-col gap-3.5">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="winkr-input" />
            <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City"      className="winkr-input" />
          </div>
        </div>

        {/* About You */}
        <div>
          <SectionHeader>About You</SectionHeader>
          <textarea
            value={bio} onChange={(e) => setBio(e.target.value)}
            rows={4} maxLength={300} placeholder="Write your bio..."
            className="winkr-input resize-none mb-5"
          />
          <p className="text-text-second text-sm font-medium font-sans mb-3">Relationship Goal</p>
          <SingleSelectChips options={RELATIONSHIP_GOALS} selected={goal} onSelect={setGoal} />
          <p className="text-text-second text-sm font-medium font-sans mb-3 mt-5">Personality Type</p>
          <SingleSelectChips options={PERSONALITY_TYPES} selected={ptype} onSelect={setPtype} />
        </div>

        {/* Personality */}
        <div>
          <SectionHeader>Personality</SectionHeader>
          <div className="flex flex-col gap-3.5">
            <input value={music}  onChange={(e) => setMusic(e.target.value)}  placeholder="Favorite music genre (optional)" className="winkr-input" />
            <input value={singer} onChange={(e) => setSinger(e.target.value)} placeholder="Favorite singer (optional)"       className="winkr-input" />
            <input value={band}   onChange={(e) => setBand(e.target.value)}   placeholder="Favorite band (optional)"         className="winkr-input" />
            <input value={color}  onChange={(e) => setColor(e.target.value)}  placeholder="Favorite color (optional)"        className="winkr-input" />
          </div>
        </div>

        {/* Hobbies */}
        <div>
          <SectionHeader>Hobbies</SectionHeader>
          <MultiSelectChips options={HOBBY_OPTIONS} selected={hobbies} onToggle={toggle(setHobbies)} />
          <div className="mt-3">
            <AddCustomChip label="Add custom hobby" onAdd={(v) => setHobbies((p) => [...p, v])} />
          </div>
        </div>

        {/* Interests */}
        <div>
          <SectionHeader>Interests</SectionHeader>
          <MultiSelectChips options={INTEREST_OPTIONS} selected={interests} onToggle={toggle(setInterests)} />
          <div className="mt-3">
            <AddCustomChip label="Add custom interest" onAdd={(v) => setInterests((p) => [...p, v])} />
          </div>
        </div>

        <button onClick={handleSave} className="winkr-btn">Save Changes</button>
      </div>
    </div>
  )
}
