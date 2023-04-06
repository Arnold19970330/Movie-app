/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
      'Josefin': ['Josefin','sans-serif'],
      },
      backgroundImage: {
        'mainPhoto': "url('https://firebasestorage.googleapis.com/v0/b/moovieapp-504a1.appspot.com/o/images%2Fsun-tornado.png?alt=media&token=2090e531-d2ce-41a5-b2c7-4e3b11c99faf')",
        'movieCard': "url('./assets/sun-tornado.png')",
      }
    },
  },
  plugins: [],
}