module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#000000",
          DEFAULT: "#212121",
          light: '#484848'
        },
        typeface: {
          DEFAULT: "#374151"
        }
      },
      minWidth: {
        '2': '8rem'
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif']
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
