const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Kalam', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        code: {
          storm: '#24283b',
          term: '#414868',
          comment: '#565f89',
          markup: '#9aa5ce',
          props: '#7dcfff',
          regex: '#b4f9f8',
          string: '#9ece6a',
          constant: '#ff9e64',
          text: '#a9b1d6',
          white: '#c0caf5',
          magenta: '#bb9af7',
          blue: '#7aa2f7',
          green: '#73daca',
          yellow: '#e0af68',
          red: '#f7768e',
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
            pre: {
              paddingTop: 0,
              paddingBottom: 0,
              paddingRight: 0,
              paddingLeft: 0,
            },
            blockquote: {
              fontWeight: 'normal',
              fontStyle: 'normal',
              color: theme('colors.gray.500'),
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
            },
            'blockquote p:first-of-type::before': {
              content: '',
            },
            'blockquote p:last-of-type::after': {
              content: '',
            },
            code: {
              color: theme('colors.code.white'),
              backgroundColor: theme('colors.code.storm'),
              padding: '0.25rem 0.5rem',
              margin: '0 0.25rem',
              fontWeight: '600',
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
