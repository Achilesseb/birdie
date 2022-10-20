/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "outside-circle": "linear-gradient(135deg, #79f1a4 40%, #0e5cad 100%)",
        "inside-circle":
          "linear-gradient(135deg, #79f1a570 10%, #0e5bad85 100%)",
      },
      colors: {
        "border-blue": "#0e5badc7",
        "border-green": "#79f1a5",
      },
    },
  },
  plugins: [],
};
