/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-pink': '#FF006B',
        'primary-blue': '#00D9FF',
        'dark-bg': '#0A0A0A',
        'light-bg': '#FFFFFF',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutal-pink': '8px 8px 0px 0px rgba(255,0,107,1)',
        'brutal-blue': '8px 8px 0px 0px rgba(0,217,255,1)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
