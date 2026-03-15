/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary':   '#0D0B0B',
        'bg-surface':   '#1A1614',
        'bg-elevated':  '#241E1C',
        coral:          '#E85D4A',
        'coral-light':  '#F4A5A0',
        'coral-dim':    '#5C2E28',
        'coral-faint':  'rgba(232,93,74,0.10)',
        gold:           '#D4A844',
        'gold-faint':   'rgba(212,168,68,0.10)',
        'text-primary': '#F5EEE8',
        'text-second':  '#B0A09A',
        'text-hint':    '#6B5C58',
        divider:        '#2C2421',
      },
      fontFamily: {
        fraunces: ['Fraunces', 'Georgia', 'serif'],
        sans:     ['DM Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'coral-glow': '0 8px 32px rgba(232,93,74,0.40)',
        'coral-sm':   '0 4px 16px rgba(232,93,74,0.25)',
        'gold-glow':  '0 8px 32px rgba(212,168,68,0.35)',
      },
    },
  },
  plugins: [],
}
