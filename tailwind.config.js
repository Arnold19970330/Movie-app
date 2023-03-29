/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
      'Josefin': ['Josefin','sans-serif'],
      },
      backgroundImage: {
        'mainPhoto': "url('/assets/rose-petals.png')",
        'movieCard': "url('/assets/sun-tornado.png')",
      }
    },
  },
  plugins: [],
}