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
        content: 'rgb(var(--color-content) / <alpha-value>)'
      },
      backgroundImage: {
        'dark-mode': "url('../../app/components/images/dark-mode.webp')",
        'light-mode': "url('../../app/components/images/light-mode.webp')",
      },
      margin: {
        '5p': '5%', // для 5% margin
        '10p': '10%', // для 10% margin
        '15p': '15%', // для 15% margin
      },
      borderRadius: {
        large: '1.5rem',
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },

  darkMode: "class",
  plugins: [nextui()],
};
