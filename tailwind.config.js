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
              backgroundColor: theme('colors.code.black'),
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
