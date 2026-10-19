/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary, #2F5BFF)",
        secondary: "var(--color-secondary, #FFD200)",
        "page-bg": "var(--color-bg, #F8F6FF)",
        "card-bg": "var(--color-card, #FFFFFF)",
        stroke: "var(--color-stroke, #18181B)",
        dark: "var(--color-dark, #18181B)",
        muted: "var(--color-muted, #52525B)",
      },
      fontFamily: {
        heading: ["Syne", "Plus Jakarta Sans", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"],
      },
      borderWidth: {
        3: "3px",
      },
      boxShadow: {
        neo: "var(--shadow-offset, 4px 4px 0 var(--color-stroke))",
        "neo-hover": "var(--shadow-offset-hover, 6px 6px 0 var(--color-stroke))",
        "neo-sm": "2px 2px 0 var(--color-stroke)",
        "neo-lg": "6px 6px 0 var(--color-stroke)",
      },
      borderRadius: {
        card: "var(--radius-card, 20px)",
      },
      maxWidth: {
        container: "var(--container-max-w, 1200px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(3deg)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(10px) rotate(-3deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-slow": "float-slow 5s ease-in-out infinite",
        "float-reverse": "float-reverse 4.5s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
}
