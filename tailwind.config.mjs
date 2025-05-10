/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        amazon: {
          orange: '#FF9900',
          'orange-dark': '#E68A00', // Añadido un naranja oscuro para hover
          black: '#131921',
          darkblue: '#232F3E',
          lightgray: '#F5F5F5'
        },
        'amazon-blue': '#232F3E', // Añadido amazon-blue (mismo que darkblue para mantener compatibilidad)
        'amazon-blue-dark': '#191E26', // Añadido amazon-blue-dark (versión más oscura)
        'amazon-orange': '#FF9900', // Añadido amazon-orange (mismo que amazon.orange)
        'amazon-orange-dark': '#E68A00' // Añadido amazon-orange-dark
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};