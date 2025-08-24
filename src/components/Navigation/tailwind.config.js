const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' if you prefer auto dark mode

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },

    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        display: ['Poppins', ...defaultTheme.fontFamily.sans],
      },

      colors: {
        primary: {
          DEFAULT: '#6366F1',
          light: '#818CF8',
          dark: '#4F46E5',
        },
        secondary: '#F59E0B',
        background: '#0f172a',
        muted: '#94a3b8',
      },

      spacing: {
        128: '32rem',
        144: '36rem',
      },

      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '4xl': '2.5rem',
      },

      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },

      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out both',
      },

      boxShadow: {
        card: '0 4px 20px rgba(0, 0, 0, 0.1)',
        glow: '0 0 8px rgba(99, 102, 241, 0.6)',
      },

      gridTemplateColumns: {
        layout: '250px 1fr',
        dashboard: '200px 1fr 300px',
      },

      screens: {
        'xs': '400px',
        '3xl': '1800px',
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),

    // Example of custom plugin
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        },
        '.scrollbar-hide': {
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};
