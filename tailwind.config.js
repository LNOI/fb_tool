/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      "backgroundColor":{
        "boxdark-2": "#1a1a1a",
      },
      "textColor":{
        "bodydark": "#f0f0f0",
      }
    },
  },
  plugins: [],
};
