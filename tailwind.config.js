module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './components/**/*.{vue,js}',
      './shared/components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          200: '#FCD34D', //light yellow
          500: '#FB7901', //golden
        },
        secondary: {
          100: '#dff7d5', //very light green
          200: '#32CD32', //green
          300: '#9CF1FE', //light blue
          400: '#78f547', //light green
          500: '#000000', //blue
        },
        accent: {
          100: '#ffe0db', //very light red
          500: '#ff8c00', //light-orange
          600: '#C53193;', //pink
          700: '#ff4500', //orange
          800: '#c30b4e', //dark-pink
          900: '#FF461B;', //red
        },
      },
      fontFamily: {
        sans: ['sofia-pro'],
      },
      spacing: {
        108: '27rem',
        116: '29rem',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-rtl'),
    require('@tailwindcss/typography'),
  ],
}
