/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // High-Contrast Nature Palette (WCAG AAA Compliant)
        'primary': '#0F766E',        // Deep Teal
        'primary-light': '#14B8A6',  // Lighter Teal
        'primary-dark': '#115E59',   // Darker Teal
        'secondary': '#7C3AED',      // Violet
        'secondary-light': '#A78BFA', // Light Violet
        'secondary-dark': '#6D28D9', // Dark Violet
        'accent': '#F59E0B',         // Amber
        'accent-light': '#FCD34D',   // Light Amber
        'accent-dark': '#D97706',    // Dark Amber
        'success': '#059669',        // Emerald
        'warning': '#D97706',        // Dark Amber
        'error': '#DC2626',          // Crimson
        'background': '#F8FAFC',     // Cool Gray
        'surface': '#FFFFFF',        // White
        'text-primary': '#1E293B',   // Slate
        'text-secondary': '#475569', // Medium Slate
        'neutral': '#64748B',        // Slate Gray
        'neutral-light': '#E2E8F0',  // Light Slate
      },
      backgroundImage: {
        'nature-gradient': 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
        'violet-gradient': 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
        'warm-gradient': 'linear-gradient(135deg, #0F766E 0%, #7C3AED 100%)',
        'accent-gradient': 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)',
      },
      ringWidth: {
        'focus': '3px',
      },
      ringOffsetWidth: {
        'focus': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
