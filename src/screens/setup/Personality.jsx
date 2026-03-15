import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorBanner, StepBar, LoadingDots } from '@/components/ui/index.jsx'
import { SingleSelectChips } from '@/components/ui/index.jsx'
import { RELATIONSHIP_GOALS, PERSONALITY_TYPES } from '@/lib/mockData'
import { savePersonalityLocal } from '@/lib/profile.js'

export default function Personality() {
  const navigate         = useNavigate()
  const [bio,     setBio]     = useState('')
  const [goal,    setGoal]    = useState('')
  const [ptype,   setPtype]   = useState('')
  const [mbti,    setMbti]    = useState('')
  const [music,   setMusic]   = useState('')
  const [singer,  setSinger]  = useState('')
  const [band,    setBand]    = useState('')
  const [color,   setColor]   = useState('')
  const [special, setSpecial] = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleContinue = async () => {
    if (bio.trim().length < 20) {
      setError('Tell them a bit about yourself — at least 20 characters 💜')
      return
    }
    if (!goal) {
      setError("Let them know what you're looking for — select a relationship goal")
      return
    }

    setLoading(true)
    setError('')
    try {
        savePersonalityLocal({ bio, relationshipGoal: goal, personalityType: ptype,
          mbti, favoriteMusic: music, favoriteSinger: singer,
          favoriteBand: band, favoriteColor: color, special })
        navigate('/setup/lifestyle')
      } catch (err) {
        setError(err.message)
      } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col px-6 pt-12 pb-10 overflow-y-auto">
      <StepBar current={2} total={4} onBack={() => navigate('/setup/basic')} />

      <p className="overline mb-2">Step 2 of 4 — Personality</p>
      <h2 className="font-fraunces text-4xl font-bold text-text-primary mb-8">
        What makes you, you?
      </h2>

      <ErrorBanner message={error} onDismiss={() => setError('')} />

      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-text-second text-sm font-medium font-sans">Bio</span>
            <span className="text-text-hint text-xs">{bio.length}/300</span>
          </div>
          <textarea
            value={bio} onChange={(e) => setBio(e.target.value)}
            placeholder="Write a short bio..." rows={4} maxLength={300}
            className="winkr-input resize-none" disabled={loading}
          />
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-text-second text-sm font-medium font-sans">Relationship Goal</span>
            <span className="text-coral text-sm">*</span>
          </div>
          <SingleSelectChips options={RELATIONSHIP_GOALS} selected={goal} onSelect={setGoal} />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-text-second text-sm font-medium font-sans">Personality Type</span>
            <span className="text-text-hint text-xs">(optional)</span>
          </div>
          <SingleSelectChips options={PERSONALITY_TYPES} selected={ptype} onSelect={setPtype} />
        </div>

        <input value={mbti}    onChange={(e) => setMbti(e.target.value)}    placeholder="MBTI type, e.g. INFP (optional)"              className="winkr-input" disabled={loading} />
        <input value={music}   onChange={(e) => setMusic(e.target.value)}   placeholder="Favorite music genre (optional)"               className="winkr-input" disabled={loading} />
        <input value={singer}  onChange={(e) => setSinger(e.target.value)}  placeholder="Favorite singer (optional)"                    className="winkr-input" disabled={loading} />
        <input value={band}    onChange={(e) => setBand(e.target.value)}    placeholder="Favorite band (optional)"                      className="winkr-input" disabled={loading} />
        <input value={color}   onChange={(e) => setColor(e.target.value)}   placeholder="Favorite color (optional)"                     className="winkr-input" disabled={loading} />
        <input value={special} onChange={(e) => setSpecial(e.target.value)} placeholder="Anything you want them to know? ✨ (optional)" className="winkr-input" maxLength={150} disabled={loading} />
      </div>

      <button
        onClick={handleContinue}
        disabled={loading}
        className="winkr-btn mt-8"
      >
        {loading ? <LoadingDots /> : 'Continue'}
      </button>
    </div>
  )
}
