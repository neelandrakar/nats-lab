/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#f7f6f2",
          surface: "#fffdf9",
          card: "#fffdf9",
          accent: "#1e3a8a",
          teal: "#1e3a8a",
          cyan: "#1e3a8a",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "dash": "dash 5s linear infinite",
      },
      keyframes: {
        dash: {
          to: {
            "stroke-dashoffset": "-40",
          }
        }
      }
    },
  },
  plugins: [],
};
