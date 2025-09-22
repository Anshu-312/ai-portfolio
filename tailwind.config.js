/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,mdx}",
    "./src/components/**/*.{js,jsx,mdx}",
    "./src/app/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CLEAN COLOR SYSTEM
        'void': '#0A0B0F',
        'charcoal': '#1A1B23',
        'silver': '#E8E9EA',
         'accent': '#D4AF37',
         'accent-dark': '#B8860B',
         'accent-light': '#F5E6A3',
        'success': '#00FF88',
        'warning': '#FF6B35',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'void-gradient': 'linear-gradient(135deg, #0A0B0F 0%, #1A1B23 100%)',
         'accent-gradient': 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
         'gold-silver-gradient': 'linear-gradient(135deg, #D4AF37 0%, #E8E9EA 100%)',
         'luxury-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F5E6A3 50%, #E8E9EA 100%)',
        'success-gradient': 'linear-gradient(135deg, #00FF88 0%, #00CC6A 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(212, 175, 55, 0.25)',
        'glow-strong': '0 0 30px rgba(212, 175, 55, 0.35)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.3), 0 0 50px rgba(212, 175, 55, 0.15)',
        'luxury-glow': '0 0 20px rgba(212, 175, 55, 0.25), 0 0 40px rgba(232, 233, 234, 0.1)',
        'shadow': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'pulse': 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'fadeInUp': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};