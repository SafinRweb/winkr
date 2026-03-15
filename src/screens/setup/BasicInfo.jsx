import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorBanner, StepBar } from '@/components/ui/index.jsx'
import { saveBasicInfo } from '@/lib/profile.js'
import { LoadingDots } from '@/components/ui/index.jsx'

const CITIES = [
  'Dhaka', 'Chattogram', 'Khulna', 'Cumilla', 'Sylhet',
  'Rajshahi', 'Rangpur', 'Bogura', 'Barishal', 'Mymensingh',
]

const EDUCATION_LEVELS = ["High School", "Bachelor's", "Master's", "PhD", "Other"]

export default function BasicInfo() {
  const navigate = useNavigate()

  const [city,       setCity]      = useState('')
  const [age,        setAge]       = useState('')
  const [height,     setHeight]    = useState('')
  const [edu,        setEdu]       = useState('')
  const [otherEdu,   setOtherEdu]  = useState('')
  const [error,      setError]     = useState('')
  const [loading,    setLoading]   = useState(false)

  const heightFt = (() => {
    const cm = parseInt(height)
    if (cm >= 100 && cm <= 220) {
      const feet   = Math.floor(cm / 30.48)
      const inches = Math.round((cm / 2.54) % 12)
      return `≈ ${feet} ft ${inches} in`
    }
    return ''
  })()

  const handleContinue = async () => {
    if (!city)   { setError('Please select your city'); return }
    if (!age)    { setError('Please enter your age'); return }
    if (!height) { setError('Please enter your height'); return }
    if (!edu)    { setError('Please select your education level'); return }
    if (edu === 'Other' && !otherEdu.trim()) {
      setError('Please specify your education')
      return
    }
    if (parseInt(age) < 18) { setError('You must be 18 or older'); return }

    setLoading(true)
    setError('')
    try {
      await saveBasicInfo({
        city,
        age,
        heightCm: height,
        education: edu === 'Other' ? otherEdu.trim() : edu,
      })
      navigate('/setup/personality')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
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

        {/* City dropdown */}
        <div>
          <p className="text-text-second text-sm font-medium font-sans mb-2">City</p>
          <select
            value={city}
            onChange={(e) => { setCity(e.target.value); setError('') }}
            className="winkr-input"
            style={{ background: '#1A1614' }}
            disabled={loading}
          >
            <option value="" disabled>Select your city</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Age */}
        <div>
          <p className="text-text-second text-sm font-medium font-sans mb-2">Age</p>
          <input
            value={age}
            onChange={(e) => { setAge(e.target.value); setError('') }}
            type="number"
            placeholder="Your age"
            className="winkr-input"
            disabled={loading}
            min={18} max={60}
          />
        </div>

        {/* Height */}
        <div>
          <p className="text-text-second text-sm font-medium font-sans mb-2">Height</p>
          <input
            value={height}
            onChange={(e) => { setHeight(e.target.value); setError('') }}
            type="number"
            placeholder="Height in cm"
            className="winkr-input"
            disabled={loading}
          />
          {heightFt && (
            <p className="text-coral text-xs font-sans mt-1.5 ml-1">{heightFt}</p>
          )}
        </div>

        {/* Education */}
        <div>
          <p className="text-text-second text-sm font-medium font-sans mb-2">Education</p>
          <select
            value={edu}
            onChange={(e) => { setEdu(e.target.value); setOtherEdu(''); setError('') }}
            className="winkr-input"
            style={{ background: '#1A1614' }}
            disabled={loading}
          >
            <option value="" disabled>Select education level</option>
            {EDUCATION_LEVELS.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>

          {/* Other education text field — shows only when "Other" is selected */}
          {edu === 'Other' && (
            <div className="mt-3">
              <input
                value={otherEdu}
                onChange={(e) => { setOtherEdu(e.target.value); setError('') }}
                placeholder="Please specify your education..."
                className="winkr-input"
                disabled={loading}
                autoFocus
              />
            </div>
          )}
        </div>

      </div>

      <button onClick={handleContinue} disabled={loading} className="winkr-btn mt-8">
        {loading ? <LoadingDots /> : 'Continue'}
      </button>
    </div>
  )
}
