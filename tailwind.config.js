/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
    },

    colors: {

      'tertiary': '#1E2019', //for header and all
      'secondary': '#141510', //for code area and output
      'primary': '#238579', //greenish color
      'customWhite': '#D6D6D6', //almost white
      'slate': {
        300: '#cbd5e1'
      }

    }
  },
  plugins: [],
}