/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        softbg: "#F6F8FB",
        sidebar: "#283046",
        primary: "#556EE6",
        card: "#FFFFFF",
        textdark: "#4B4B4B",
        accent: "#7E6BF2",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.06)",
        soft: "0 2px 10px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};
