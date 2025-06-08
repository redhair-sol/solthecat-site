/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "royal-bg": "#fffafc",
        "royal-pink": "#f5c2d1",
        "royal-purple": "#9253a5",
        "royal-text": "#3e2e41",
        "royal-lilac": "#d9b8ff",
        "royal-shadow": "#ead6ea",
      },
      fontFamily: {
        cursive: ['"Dancing Script"', "cursive"],
        sans: ['"Poppins"', "sans-serif"],
      },
    },
  },
  plugins: [],
}
