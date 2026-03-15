import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorBanner, StepBar } from '@/components/ui/index.jsx'

export default function BasicInfo() {
  const navigate = useNavigate()
  const [city,   setCity]   = useState('')
  const [age,    setAge]    = useState('')
  const [height, setHeight] = useState('')
  const [edu,    setEdu]    = useState('')
  const [error,  setError]  = useState('')

  // Live feet/inches conversion
  const heightFt = (() => {
    const cm = parseInt(height)
    if (cm >= 100 && cm <= 220) {
      const feet   = Math.floor(cm / 30.48)
      const inches = Math.round((cm / 2.54) % 12)
      return `≈ ${feet} ft ${inches} in`
    }
    return ''
  })()

  const handleContinue = () => {
    if (!city || !age || !height || !edu) { setError('Please fill in all fields'); return }
    if (parseInt(age) < 18)              { setError('You must be 18 or older'); return }
    navigate('/setup/personality')
  }

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col px-6 pt-12 pb-10">
      <StepBar current={1} total={4} onBack={() => navigate('/register')} />

      <p className="overline mb-2">Step 1 of 4 — Basic Info</p>
      <h2 className="font-fraunces text-4xl font-bold text-text-primary mb-8">
        Let's start with the basics.
      </h2>

      <ErrorBanner message={error} onDismiss={() => setError('')} />

      <div className="flex flex-col gap-4 flex-1">
        <input
          value={city} onChange={(e) => setCity(e.target.value)}
          placeholder="Your city"
          className="winkr-input"
        />
        <input
          value={age} onChange={(e) => setAge(e.target.value)}
          type="number" placeholder="Age"
          className="winkr-input"
        />
        <div>
          <input
            value={height} onChange={(e) => setHeight(e.target.value)}
            type="number" placeholder="Height in cm"
            className="winkr-input"
          />
          {heightFt && (
            <p className="text-coral text-xs font-sans mt-1.5 ml-1">{heightFt}</p>
          )}
        </div>
        <select
          value={edu} onChange={(e) => setEdu(e.target.value)}
          className="winkr-input"
          style={{ background: '#1A1614' }}
        >
          <option value="" disabled>Education level</option>
          {["High School", "Bachelor's", "Master's", "PhD", "Other"].map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <button onClick={handleContinue} className="winkr-btn mt-8">Continue</button>
    </div>
  )
}
