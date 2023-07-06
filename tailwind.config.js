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
      },
    },
  },
  plugins: [],

  darkMode: "class",
};
