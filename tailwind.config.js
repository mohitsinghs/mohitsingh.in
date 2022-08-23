const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        hi: ['Kalam', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        code: {
          // one dark colors
          black: '#282c34',
          white: '#abb2bf',
          gray: '#7f848e',
          yellow: '#e5c07b',
          orange: '#d19a66',
          red: '#e06c75',
          purple: '#c678dd',
          blue: '#61afef',
          cyan: '#56b6c2',
          green: '#98c379',
          selection: 'rgba(148, 170, 209, 0.2)',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.600'),
            'h2,h3,strong': {
              color: theme('colors.gray.600'),
            },
            a: {
              color: theme('colors.gray.600'),
            },
            code: {
              color: theme('colors.code.white'),
              backgroundColor: theme('colors.code.black'),
              padding: '0 0.5rem',
              margin: '0 0.25rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
              lineHeight: '1.5',
              display: 'inline-block',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
