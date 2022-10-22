const withMarkdoc = require('@markdoc/next.js')

module.exports = withMarkdoc()({
  reactStrictMode: true,
  pageExtensions: ['js', 'md'],
  experimental: {
    newNextLinkBehavior: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
})
