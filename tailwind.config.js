/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },

    extend: {
      screens: {
        xsm: "425px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],

  darkMode: "class",
};
