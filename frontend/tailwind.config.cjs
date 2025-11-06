/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class', // Enables toggling dark/light
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
