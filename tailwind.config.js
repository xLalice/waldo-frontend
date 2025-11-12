/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "custom" : ['Starborn'],
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        'pop-in': 'pop-in 0.3s ease-out forwards'
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        'pop-in': {
          '0%': {
            transform: 'translate(-50%, -50%) scale(0.5)',
            opacity: '0',
          },
          '80%': {
            transform: 'translate(-50%, -50%) scale(1.1)',
            opacity: '1',
          },
          '100%': {
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
}