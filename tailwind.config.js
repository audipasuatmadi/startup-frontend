module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#80703e",
          DEFAULT: "#AD974F",
          light: "#c2a855"
        }
      },
      minWidth: {
        '2': '8rem'
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
