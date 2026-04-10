/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        threatIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        /* both = apply 0% before delay (stagger) and 100% after */
        "threat-in": "threatIn 0.5s ease-out both",
      },
      fontFamily: {
        sans: ["Outfit", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow:
          "0 0 60px -12px rgba(139, 92, 246, 0.45), 0 0 100px -24px rgba(59, 130, 246, 0.35)",
        "glow-sm": "0 0 24px rgba(139, 92, 246, 0.25)",
      },
    },
  },
  plugins: [],
};
