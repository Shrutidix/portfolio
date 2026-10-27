/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        espresso: {
          950: '#1A120E',
          900: '#231813', // Deep Espresso Brown background
          850: '#281C16',
          800: '#2B1E18', // Atelier dark background
          700: '#35261E',
          600: '#43322A',
          500: '#533F35',
        },
        paper: {
          cream: '#FAF6EF', // Luxury cream cards
          ivory: '#F4ECE0',
          sand: '#E7DCCB',  // Warm sand light page background
          dark: '#DECDB8',
          border: 'rgba(53, 38, 30, 0.12)',
        },
        slate: {
          ink: '#222B31',
          panel: '#1E252A',
          border: '#323E45',
        },
        sage: {
          DEFAULT: '#7E9387',
          dark: '#3F6253',
          light: '#A1B3A9',
          pale: '#C8D5CE',
        },
        sand: {
          DEFAULT: '#D9C3A3',
          light: '#EADBC6',
          dark: '#B89F7D',
        },
        signature: {
          violet: '#7C5CFF',
          cyan: '#22D3EE',
          amber: '#FFB020',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'book': '0 25px 50px -12px rgba(25, 17, 13, 0.5), 0 10px 20px -8px rgba(25, 17, 13, 0.35)',
        'book-light': '0 20px 40px -12px rgba(80, 60, 45, 0.18), 0 6px 12px -4px rgba(80, 60, 45, 0.1)',
        'paper-card': '0 4px 25px rgba(35, 24, 19, 0.08), 0 1px 3px rgba(35, 24, 19, 0.05)',
        'glow-cyan': '0 0 25px rgba(34, 211, 238, 0.35)',
        'glow-violet': '0 0 25px rgba(124, 92, 255, 0.35)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'sheen': 'sheen 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-100%) rotate(25deg)' },
          '100%': { transform: 'translateX(200%) rotate(25deg)' },
        }
      }
    },
  },
  plugins: [],
};
