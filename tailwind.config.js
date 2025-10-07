/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette 1 - Green Theme
        "palette1-dark-gray": "#4d4d4d",
        "palette1-green": "#348856",
        "palette1-white": "#ffffff",
        "palette1-dark-green": "#00491d",
        "palette1-off-white": "#f1faee",

        // Palette 2 - Teal/Cyan Theme
        "palette2-light-cyan": "#7ce6e3",
        "palette2-teal": "#68a0a1",
        "palette2-powder-blue": "#a8dadc",
        "palette2-dark-teal": "#336366",
        "palette2-very-dark-teal": "#09282d",
        "palette2-red-accent": "#e63946",
      },
      backgroundImage: {
        // Palette 1 Gradients
        "gradient-brand":
          "linear-gradient(135deg, #00491d 0%, #348856 50%, #4d4d4d 100%)",
        "gradient-brand-soft":
          "linear-gradient(135deg, rgba(0,73,29,0.1) 0%, rgba(52,136,86,0.2) 50%, rgba(77,77,77,0.1) 100%)",
        "gradient-hero":
          "linear-gradient(120deg, #00491d 0%, #348856 40%, #4d4d4d 100%)",
        "gradient-card":
          "linear-gradient(145deg, rgba(52,136,86,0.05) 0%, rgba(0,73,29,0.15) 100%)",
        "gradient-overlay":
          "linear-gradient(180deg, rgba(0,73,29,0.9) 0%, rgba(52,136,86,0.7) 100%)",
        "gradient-accent": "linear-gradient(90deg, #348856 0%, #f1faee 100%)",
        "gradient-glow":
          "radial-gradient(circle at 50% 50%, rgba(52,136,86,0.3), transparent 70%)",

        // Palette 2 Gradients
        "gradient-teal":
          "linear-gradient(135deg, #09282d 0%, #336366 30%, #68a0a1 60%, #7ce6e3 100%)",
        "gradient-teal-soft":
          "linear-gradient(135deg, rgba(9,40,45,0.1) 0%, rgba(51,99,102,0.2) 30%, rgba(104,160,161,0.2) 60%, rgba(124,230,227,0.1) 100%)",
        "gradient-cyan":
          "linear-gradient(120deg, #a8dadc 0%, #7ce6e3 50%, #68a0a1 100%)",
        "gradient-ocean":
          "linear-gradient(145deg, #09282d 0%, #336366 50%, #a8dadc 100%)",
        "gradient-accent-red":
          "linear-gradient(90deg, #e63946 0%, #336366 100%)",
        "gradient-teal-glow":
          "radial-gradient(circle at 50% 50%, rgba(124,230,227,0.3), transparent 70%)",
      },
      boxShadow: {
        "glow-green": "0 0 20px rgba(52,136,86,0.3)",
        "glow-cyan": "0 0 20px rgba(124,230,227,0.3)",
      },
    },
  },
  plugins: [],
};
