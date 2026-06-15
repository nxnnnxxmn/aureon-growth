import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // EDITORIAL LUXURY palette — deeper, warmer, more sophisticated
        // Background gains subtle warm undertone (vs pure cold violet)
        background: "#0a0813",
        surface: "#100b1c",
        "surface-2": "#171022",
        "surface-3": "#1d1429",
        // Violet — slightly desaturated for elegance (vs vibrant template feel)
        violet: {
          950: "#180830",
          900: "#260f45",
          800: "#3a1a66",
          700: "#4f2682",
          600: "#653697",
          500: "#7c5fb3", // primary — was 8054c2, now more refined amethyst tone
          400: "#9778c8",
          300: "#b094db",
          200: "#cab3ea",
          100: "#e0d2f3",
        },
        // Premium accent colors
        plum: "#4a2972",
        amethyst: "#7c5fb3",
        wine: "#5a1a2b",
        // GOLD — luxury micro-accent (replaces lime in premium moments)
        gold: {
          DEFAULT: "#c9a961",
          50: "#fbf6e7",
          100: "#f6ecc8",
          200: "#ecdb95",
          300: "#dec368",
          400: "#c9a961", // primary luxury accent
          500: "#b48f3f",
          600: "#8e6f2f",
          700: "#5a4720",
          deep: "#8e6f2f",
          soft: "#dec368",
        },
        // CHROME / PLATINUM — premium neutral for borders, icons, fine details
        chrome: {
          DEFAULT: "#c2c5cc",
          200: "#e6e8ec",
          300: "#cbcdd4",
          400: "#a8acb6",
          500: "#838894",
          600: "#5f6470",
        },
        // STEEL — refined data accent (more serious than bright electric)
        steel: {
          DEFAULT: "#5a7fb8",
          400: "#7997c8",
          500: "#5a7fb8",
          600: "#3f5d92",
          700: "#2a4471",
        },
        // Electric blue — controlled secondary accent
        electric: {
          DEFAULT: "#3b6fd4",
          400: "#5a8bf0",
          500: "#3b6fd4",
          600: "#2a55b0",
          700: "#1d3e85",
        },
        // Sunset coral — energy / transformation accent (3rd color)
        sunset: {
          DEFAULT: "#ff7a59",
          50: "#fff2ed",
          100: "#ffe0d4",
          200: "#ffc1a8",
          300: "#ff9b7b",
          400: "#ff7a59",
          500: "#ff5a3a",
          600: "#e8421f",
          700: "#b8331a",
        },
        // Champagne — warm premium cream (inverted sections)
        champagne: {
          DEFAULT: "#f3e6c4",
          50: "#fdfaf1",
          100: "#faf2dc",
          200: "#f3e6c4",
          300: "#e8d2a0",
          400: "#d9b876",
          500: "#c89f4d",
          warm: "#f5ead0",
          dust: "#e6d2a8",
        },
        // Lime — data / growth signal
        lime: {
          DEFAULT: "#c4f54e",
          400: "#d6f87a",
          500: "#c4f54e",
          600: "#a8d92e",
          700: "#7faa1f",
        },
        // Inverted ink for warm sections
        ink: {
          DEFAULT: "#1a1424",
          900: "#0e0a17",
          800: "#1a1424",
          700: "#241b32",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jet-brains)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glow-violet": "radial-gradient(ellipse at center, rgba(128, 84, 194, 0.12) 0%, transparent 70%)",
        "grid-pattern":
          "linear-gradient(rgba(128,84,194,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(128,84,194,0.04) 1px, transparent 1px)",
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(106, 58, 168, 0.22) 0%, rgba(8,7,13,0) 60%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(128,84,194,0.07) 0%, rgba(82,42,143,0.03) 100%)",
        "premium-mesh":
          "radial-gradient(at 30% 20%, rgba(106,58,168,0.15) 0%, transparent 50%), radial-gradient(at 70% 70%, rgba(61,29,114,0.12) 0%, transparent 50%)",
      },
      backgroundSize: {
        "grid-size": "60px 60px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "gradient-x": "gradientX 4s ease infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "border-flow": "borderFlow 4s linear infinite",
        "typewriter": "typewriter 3s steps(40) forwards",
        "blink": "blink 1s step-end infinite",
        "wa-pulse": "waPulse 2s ease-in-out infinite",
        "marquee": "marquee 40s linear infinite",
        "marquee-reverse": "marquee 40s linear infinite reverse",
        "marquee-slow": "marquee 60s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.03)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        typewriter: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        blink: {
          "50%": { borderColor: "transparent" },
        },
        waPulse: {
          "0%, 100%": {
            boxShadow:
              "0 0 0 0 rgba(34,197,94,0.5), 0 8px 24px rgba(0,0,0,0.35)",
          },
          "50%": {
            boxShadow:
              "0 0 0 14px rgba(34,197,94,0), 0 8px 24px rgba(0,0,0,0.35)",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        "glow-violet": "0 0 30px rgba(124, 95, 179, 0.22), 0 0 60px rgba(74, 41, 114, 0.08)",
        "glow-violet-sm": "0 0 16px rgba(124, 95, 179, 0.2)",
        "glow-violet-lg": "0 0 50px rgba(124, 95, 179, 0.3), 0 0 100px rgba(74, 41, 114, 0.15)",
        "glow-electric": "0 0 24px rgba(90, 127, 184, 0.28), 0 0 56px rgba(90, 127, 184, 0.10)",
        "glow-electric-sm": "0 0 12px rgba(90, 127, 184, 0.22)",
        "glow-gold": "0 0 24px rgba(201, 169, 97, 0.25), 0 0 56px rgba(201, 169, 97, 0.10)",
        "glow-gold-sm": "0 0 14px rgba(201, 169, 97, 0.22)",
        card: "0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(124,95,179,0.08) inset",
        "card-hover": "0 24px 60px rgba(0,0,0,0.5), 0 0 36px rgba(124,95,179,0.14)",
        "premium-elevated":
          "0 20px 50px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,95,179,0.08) inset, 0 1px 0 rgba(255,255,255,0.04) inset",
        "tilt-3d":
          "0 30px 60px -20px rgba(0,0,0,0.7), 0 18px 36px -18px rgba(124,95,179,0.22), 0 0 0 1px rgba(124,95,179,0.1) inset",
        // ETCHED — premium hardware-style inner border (luxury UI signature)
        etched:
          "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.4)",
        "etched-gold":
          "inset 0 1px 0 rgba(201,169,97,0.18), inset 0 -1px 0 rgba(0,0,0,0.4), 0 0 0 1px rgba(201,169,97,0.10), 0 8px 24px rgba(0,0,0,0.3)",
      },
      dropShadow: {
        "glow-violet": ["0 0 18px rgba(128,84,194,0.45)", "0 0 32px rgba(128,84,194,0.18)"],
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
