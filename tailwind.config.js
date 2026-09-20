/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef8ff',
          100: '#d8efff',
          200: '#b3dfff',
          300: '#7cc9ff',
          400: '#3babff',
          500: '#118cff',
          600: '#0068d1',
          700: '#0053a9',
          800: '#074788',
          900: '#0d3d70'
        }
      },
      fontFamily: {
        sans: ['Sora', 'ui-sans-serif', 'system-ui'],
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        glow: '0 10px 30px rgba(17, 140, 255, 0.18)'
      }
    }
  },
  plugins: []
}
