/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: {
    tailwindcss: {
      config: "apps/<app-name>/tailwind.config.js",
    },
    autoprefixer: {},
  },
};
