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
      'green_hover': '#1b5e5a',
      'slate': {
        300: '#cbd5e1',
        400: '#94a3b8',
        700: '#334155'
      },
      'brown': 'rgba(87, 88, 83, 0.4)', //for border color
      'white': '#ffff',
      'black': '#000000',
      'cyan': '#20B2AA',
      'signup': '#52a2fb',
      'signupBTN': '#185493',
      'blue_hover': '#1434A4',
      'red': '#dc143c',
      'green': '#008000',
      'dark-green': '#165049',
      'Otp-page-color': '#b0bdfb',
      'otp-button': '#1a7ccf',
      'otp-hover': '#0808fe',
      'explore-text': '#777a71',



    }

  },
  plugins: [],
}