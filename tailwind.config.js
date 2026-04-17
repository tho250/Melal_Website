/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          light: '#dcfce7',
          DEFAULT: '#16a34a',
          dark: '#15803d',
          900: '#14532d'
        },
        surface: {
          DEFAULT: '#ffffff',
          alt: '#f8fafc',
          muted: '#f1f5f9'
        }
      },
      boxShadow: {
        soft: '0 4px 24px -2px rgba(16, 24, 40, 0.06), 0 2px 8px -2px rgba(16, 24, 40, 0.04)',
        'soft-lg': '0 12px 40px -4px rgba(16, 24, 40, 0.08), 0 4px 12px -2px rgba(16, 24, 40, 0.04)',
        'soft-xl': '0 20px 56px -8px rgba(16, 24, 40, 0.10), 0 8px 20px -4px rgba(16, 24, 40, 0.05)',
        glow: '0 0 40px -8px rgba(22, 163, 74, 0.25)'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'ui-sans-serif', 'sans-serif']
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-sm': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
