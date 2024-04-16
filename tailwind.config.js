import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'move': 'move .5s forwards'
      },
      keyframes: {
        'move': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
};