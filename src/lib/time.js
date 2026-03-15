// Formats a Date to Bangladesh Standard Time (UTC+6)
export function toBDT(date = new Date()) {
  return date.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Dhaka',
    hour:     '2-digit',
    minute:   '2-digit',
    hour12:   true,
  })
}

export function toBDTFull(date = new Date()) {
  return date.toLocaleString('en-US', {
    timeZone:    'Asia/Dhaka',
    weekday:     'short',
    month:       'short',
    day:         'numeric',
    hour:        '2-digit',
    minute:      '2-digit',
    hour12:      true,
  })
}