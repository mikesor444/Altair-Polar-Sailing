import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "serif"]
      },
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        accent2: "rgb(var(--accent2) / <alpha-value>)",
        glass: "rgb(var(--glass) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        night: "#0A1828"
      },
      spacing: {
        1: "8px",
        2: "16px",
        3: "24px",
        4: "32px",
        5: "40px",
        6: "48px",
        7: "56px",
        8: "64px",
        9: "72px",
        10: "80px"
      },
      borderRadius: {
        glass: "18px"
      },
      boxShadow: {
        glass: "0 10px 40px rgba(10, 24, 40, 0.08)"
      },
      transitionDuration: {
        swift: "220ms",
        glide: "380ms"
      }
    }
  },
  plugins: []
};

export default config;
