const withMarkdoc = require('@markdoc/next.js')

module.exports = withMarkdoc()({
  reactStrictMode: true,
  pageExtensions: ['js', 'md'],
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
})
