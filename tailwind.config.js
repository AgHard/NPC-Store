// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         blue: "#2997FF",
//         gray: {
//           DEFAULT: "#86868b",
//           100: "#94928d",
//           200: "#afafaf",
//           300: "#42424570",
//         },
//         zinc: "#101010",
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#2997FF",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        gold: '#FFD700',
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
      keyframes: {
        moveTop: {
          '0%, 100%': { top: '0' },
          '50%': { top: '100%' },
        },
        moveBottom: {
          '0%, 100%': { bottom: '0' },
          '50%': { bottom: '100%' },
        },
        moveLeft: {
          '0%, 100%': { left: '0' },
          '50%': { left: '100%' },
        },
        moveRight: {
          '0%, 100%': { right: '0' },
          '50%': { right: '100%' },
        },
      },
      animation: {
        moveTop: 'moveTop 2s linear infinite',
        moveBottom: 'moveBottom 2s linear infinite',
        moveLeft: 'moveLeft 2s linear infinite',
        moveRight: 'moveRight 2s linear infinite',
      },
    },
  },
  plugins: [],
};