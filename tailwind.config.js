/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Domaine', ...defaultTheme.fontFamily.serif],
        display: ['Brandon Grotesque', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      letterSpacing: {
        mega: '0.33em',
      },
      colors: {
        caramel: {
          100: '#fbf7f4',
          200: '#e9d4c3',
          300: '#d6b599',
          400: '#bf926e',
          500: '#a2744e',
          600: '#835b3a',
          700: '#664429',
          800: '#472e1a',
          900: '#26180d',
        },
      },
      inset: {full: '100%'},
    },
  },
  plugins: [],
}
