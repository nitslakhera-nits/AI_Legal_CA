/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        legal: '#1e293b',
        ai: '#8b5cf6',
        action: '#3b82f6',
        surface: '#f8fafc',
      },
    },
  },
  plugins: [],
};
