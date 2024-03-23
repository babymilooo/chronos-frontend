const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bkg: 'rgb(var(--color-bkg) / <alpha-value>)',
        content: 'rgb(var(--color-content) / <alpha-value>)',
        bkg2: 'rgb(var(--color-bkg2) / <alpha-value>)',
        content2: 'rgb(var(--color-content2) / <alpha-value>)'
      },
      margin: {
        '5p': '5%', // для 5% margin
        '10p': '10%', // для 10% margin
        '15p': '15%', // для 15% margin
      },
      borderRadius: {
        large: '1.5rem',
      },
      animation: {
        'jump-in-centered': 'jump-in-centered 0.25s both',
      },
    },
  },

  darkMode: "class",
  plugins: [
    nextui(),
    require('tailwindcss-animated')
  ],
};
