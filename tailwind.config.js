/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      merriweather: ['Merriweather', 'sans-serif'],
    },
    extend: {
      colors: {
        kone: '#222831',
        ktwo: '#393E46',
        kthree: '#bc293b',
        kfour: '#eeeeee',
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin.cjs')],
};
