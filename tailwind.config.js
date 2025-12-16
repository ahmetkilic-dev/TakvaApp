/** @type {import('tailwindcss').Config} */
module.exports = {
  // ARTIK app KLASÖRÜNE BAKMASINI SÖYLÜYORUZ 👇
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}