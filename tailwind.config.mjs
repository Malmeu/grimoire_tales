/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-void': '#1a0d1e',
        'dark-purple': '#2d1b3c',
        'parchment': '#b89778',
        'parchment-light': '#d4c4a8',
        'gold-old': '#e8c07b',
        'gold-bright': '#ffd700',
        'blood-red': '#8b0000',
        'mystic-blue': '#4a5568',
      },
      fontFamily: {
        'gothic': ['Cinzel', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'body': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'parchment-texture': "url('/textures/parchment.png')",
        'dark-gradient': 'linear-gradient(135deg, #1a0d1e 0%, #2d1b3c 50%, #1a0d1e 100%)',
        'mystic-gradient': 'linear-gradient(180deg, rgba(26,13,30,0.9) 0%, rgba(45,27,60,0.8) 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(232, 192, 123, 0.3)',
        'glow-strong': '0 0 40px rgba(232, 192, 123, 0.5)',
        'dark': '0 10px 40px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'mist': 'mist 8s ease-in-out infinite',
        'flicker': 'flicker 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        mist: {
          '0%, 100%': { opacity: '0.3', transform: 'translateX(0)' },
          '50%': { opacity: '0.6', transform: 'translateX(20px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
