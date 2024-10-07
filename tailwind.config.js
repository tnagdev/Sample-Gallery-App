/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {}
    },
  },
  plugins: [],
}

