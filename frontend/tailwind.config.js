/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/src/bgimage.png')",  // Image from the public folder
      },
    },
  },
  content: ["./src/**/*.{html,js}"],
}
