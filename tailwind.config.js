const withMT = require('@material-tailwind/react/utils/withMT');

/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        customDark: '#232323',
        whiteText: '#FFFFFFB3',
        primary: '#8ABF40', // Xanh dương đậm
        secondary: '#27A6E1', // Xanh nhạt
        accent: '#F59E0B',
        black: '#1E1E1E',
        customGray: {
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
        },
        pingPong: {
          '0%': { left: '0%', width: '0%' },
          '50%': { left: '0%', width: '100%' },
          '100%': { left: '100%', width: '0%' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        pingPong: 'pingPong 2s infinite ease-in-out',
      },
    },
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
  },
  plugins: [],
});
