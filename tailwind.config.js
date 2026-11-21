/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        toast: {
          bg: '#fbf8f2',
          card: '#ffffff',
          subtle: '#f5eee3',
          pill: '#f2ebde',
          border: '#ede5d8',
          borderDark: '#ded3c3',
          dark: '#362117',
          cocoa: '#5c4738',
          muted: '#8a7566',
          accent: '#e05d44',
          accentLight: '#fdeee9',
          amber: '#c07212',
          olive: '#437a3b',
        },
      },
      boxShadow: {
        toast: '0 2px 10px rgba(54, 33, 23, 0.05)',
        toastLg: '0 8px 30px rgba(54, 33, 23, 0.08)',
        toastPill: '0 2px 8px rgba(54, 33, 23, 0.07)',
      }
    },
  },
  plugins: [],
}
