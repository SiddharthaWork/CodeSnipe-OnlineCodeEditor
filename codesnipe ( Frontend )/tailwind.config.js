/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Add Poppins
        heading: ['Oswald', 'sans-serif'], // Add Oswald
        body: ['Nunito', 'sans-serif'], // Add Nunito
        kanit: ['Kanit', 'sans-serif'], // Add Kanit
        montserrat: ['Montserrat', 'sans-serif'], // Add Montserrat
        openSans: ['Open Sans', 'sans-serif'], // Add Open Sans
      },
    },
  },
  plugins: [],
}