/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem', // Default padding for containers
      },
    },
    fontFamily: {
      primary: 'Roboto',
      secondary: 'Rajdhani',
      tertiary: 'Pacifico',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      colors: {
        primary: '#0a0a0a',
        secondary:'#2ecc71',
        accent: '#B809C3',
      },
      backgroundImage: {
        // Define any custom background images here
      },
    },
  },
  plugins: [],
};
