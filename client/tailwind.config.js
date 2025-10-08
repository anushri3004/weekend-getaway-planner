/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'coral': '#FF6B6B',
        'peach': '#FFE66D',
        'tropical-teal': '#4ECDC4',
        'soft-cream': '#FFF8F0',
        'dark-gray': '#2C3E50',
      },
      backgroundImage: {
        'sunset-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
        'coral-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
        'peach-gradient': 'linear-gradient(135deg, #FFE66D 0%, #FFF2A8 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
