/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
      colors: {
        "regal-blue": "rgb(104, 133, 151)",
        "regal-yellow": "rgb(237, 233, 230)",
        "regal-pink": "rgb(175, 42, 69)",
        "regal-black": "#151515",
      },
    },
  },
  plugins: [],
};
