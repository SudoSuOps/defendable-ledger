/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0a0a0a",
          800: "#111111",
          700: "#1a1a1a",
          600: "#262626",
        },
        cream: {
          100: "#f5f1e8",
          200: "#e8e2d3",
          300: "#c9bfa8",
        },
        gold: {
          400: "#d4a857",
          500: "#b8924a",
          600: "#8c6f3a",
        },
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
