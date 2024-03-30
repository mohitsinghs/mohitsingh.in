module.exports = {
  content: ['./app/**/*.js', './components/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        hi: ['var(--font-hi)'],
        mono: ['var(--font-mono)'],
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
              padding: '0.125rem 0.25rem',
              background: theme('colors.gray.50'),
              borderRadius: '0.125rem',
              fontWeight: 'normal',
              fontSize: '0.875rem',
              border: `1px solid ${theme('colors.gray.100')}`,
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              marginTop: 0,
              marginBottom: 0,
              borderRadius: '0 0 0.375rem 0.375rem',
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
            },
            'pre code': {
              display: 'block',
              minWidth: 'fit-content',
            },
            'pre code > span': {
              display: 'block',
              padding: '0 1rem',
              fontSize: '0.875rem',
              lineHeight: '1.625',
            },
            'pre code > span > span:first-child': {
              marginRight: '1.5ch',
              textAlign: 'right',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
