/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#424769'
      },
      backgroundColor: {
        'primary': '#424769',
        'primary-hover': '#2D3250'
      },
      borderColor: {
        'primary': '#424769'
      }
    },
  },
  plugins: [],
}