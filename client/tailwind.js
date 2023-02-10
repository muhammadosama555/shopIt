/** @type {import('tailwindcss').Config} */
module.exports = {
  content:[ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'nunito': 'Nunito',
        'poppins': 'Poppins',
        'ubuntu': 'Ubuntu',
      },
      screens: {
        'xs': {'min': '360px', 'max': '769px'},
        'sm': {'min': '580px', 'max': '769px'},
        'md': {'min': '770px', 'max': '989px'},
        'lg': {'min': '990px', 'max': '1200px'},
        'xl': {'min': '1201px'},
      },
      colors: {
        "red-color": "var(--red-color)"
      }
    },
  },
  plugins: [],
}
