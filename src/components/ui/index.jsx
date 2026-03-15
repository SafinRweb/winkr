import { useState } from 'react'
import { Check, Plus, X } from 'lucide-react'

// ─────────────────────────────────────────────
// BUTTON
// ─────────────────────────────────────────────
export function Button({ children, onClick, variant = 'primary', disabled, className = '' }) {
  if (variant === 'outline') {
    return (
      <button onClick={onClick} disabled={disabled} className={`winkr-btn-outline ${className}`}>
        {children}
      </button>
    )
  }
  return (
    <button onClick={onClick} disabled={disabled} className={`winkr-btn ${className}`}>
      {children}
    </button>
  )
}

// ─────────────────────────────────────────────
// SINGLE-SELECT CHIPS  (one option at a time)
// ─────────────────────────────────────────────
export function SingleSelectChips({ options, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`winkr-chip ${selected === opt ? 'active' : ''}`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// MULTI-SELECT CHIPS  (many options)
// ─────────────────────────────────────────────
export function MultiSelectChips({ options, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isSelected = selected.includes(opt)
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`winkr-chip ${isSelected ? 'active' : ''}`}
          >
            {isSelected && <Check size={11} />}
            {opt}
          </button>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────
// ADD CUSTOM CHIP  (opens a mini sheet)
// ─────────────────────────────────────────────
export function AddCustomChip({ label, onAdd }) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')

  const handleAdd = () => {
    if (text.trim()) { onAdd(text.trim()); setText(''); setOpen(false) }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-coral-dim
                   text-coral text-xs font-sans font-medium hover:bg-coral-faint transition-colors"
      >
        <Plus size={12} /> {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-[430px] mx-auto bg-bg-surface rounded-t-3xl p-6 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-9 h-1 bg-divider rounded-full mx-auto mb-5" />
            <p className="font-fraunces text-xl font-semibold text-text-primary mb-4">Add custom</p>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type here..."
              className="winkr-input mb-4"
              autoFocus
            />
            <Button onClick={handleAdd} disabled={!text.trim()}>Add</Button>
          </div>
        </div>
      )}
    </>
  )
}

// ─────────────────────────────────────────────
// ERROR BANNER  (appears at top of forms)
// ─────────────────────────────────────────────
export function ErrorBanner({ message, onDismiss }) {
  if (!message) return null
  return (
    <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 mb-5">
      <button onClick={onDismiss} className="shrink-0 mt-0.5">
        <X size={14} className="text-red-400" />
      </button>
      <p className="text-red-400 text-sm font-sans leading-relaxed">{message}</p>
    </div>
  )
}

// ─────────────────────────────────────────────
// SECTION HEADER  (overline + divider line)
// ─────────────────────────────────────────────
export function SectionHeader({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="overline shrink-0">{children}</span>
      <div className="h-px bg-divider flex-1" />
    </div>
  )
}

// ─────────────────────────────────────────────
// PERSONALITY CARD  (2×2 grid on profile)
// ─────────────────────────────────────────────
export function PersonalityCard({ emoji, label, value }) {
  return (
    <div className="bg-bg-elevated rounded-2xl p-3.5 flex flex-col gap-2">
      <div className="w-7 h-7 flex items-start">
        <span className="text-xl leading-none">{emoji}</span>
      </div>
      <div>
        <p className="overline mb-1">{label}</p>
        <p className="text-text-primary text-sm font-sans font-medium leading-snug line-clamp-2">
          {value || '—'}
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// BOTTOM SHEET  (slide-up modal)
// ─────────────────────────────────────────────
export function BottomSheet({ open, onClose, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div
        className="w-full max-w-[430px] mx-auto bg-bg-surface rounded-t-3xl overflow-y-auto"
        style={{ maxHeight: '90dvh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-9 h-1 bg-divider rounded-full mx-auto mt-3 mb-1" />
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// CONFIRM DIALOG
// ─────────────────────────────────────────────
export function ConfirmDialog({ open, onClose, title, message, confirmLabel, confirmDanger, onConfirm }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/60">
      <div className="w-full max-w-sm bg-bg-surface rounded-2xl p-6">
        <p className="font-fraunces text-2xl font-bold text-text-primary mb-2">{title}</p>
        {message && <p className="text-text-second text-sm font-sans mb-6 leading-relaxed">{message}</p>}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl border border-divider text-text-hint text-sm font-sans font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 rounded-2xl text-sm font-sans font-semibold ${
              confirmDanger
                ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                : 'bg-coral text-white shadow-coral-sm'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// STEP BAR  (setup wizard progress)
// ─────────────────────────────────────────────
export function StepBar({ current, total, onBack }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <button onClick={onBack} className="text-text-hint">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
        </svg>
      </button>
      <div className="flex gap-1.5 flex-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-colors ${i < current ? 'bg-coral' : 'bg-divider'}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// LOADING DOTS
// ─────────────────────────────────────────────
export function LoadingDots() {
  return (
    <span className="flex items-center justify-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white"
          style={{
            animation: 'loadingDot 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </span>
  )
}
