/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        "custom-bg": "url('/src/bgimage.png')", // Image from the public folder
      },
      // Scrollbar customization
      scrollbar: ["rounded", "visible"],
      colors: {
        scrollbar: "#0AE", // Custom color for the scrollbar thumb
        scrollbarTrack: "#F5F5F5", // Custom color for the scrollbar track
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"), // assuming you install tailwind-scrollbar plugin
  ],
  variants: {
    scrollbar: ["responsive", "hover"],
  },
  content: ["./src/**/*.{html,js}"],
};
