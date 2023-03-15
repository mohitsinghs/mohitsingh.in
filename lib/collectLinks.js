import { readdir } from 'fs/promises'
import { read } from 'gray-matter'
import { join } from 'path'
import readingTime from 'reading-time'

async function collectLinks(slug) {
  const isPoetry = slug === 'poetry'
  const pagePath = join(process.cwd(), 'pages', slug)
  const paths = await readdir(pagePath)
  const links = paths
    .filter((p) => p !== 'index.js')
    .map((contentPath) => {
      const fm = read(join(pagePath, contentPath), {
        excerpt: true,
        excerpt_separator: '\n\n',
      })
      const time = readingTime(fm.content)
      if (fm.data.date) {
        fm.data.date = new Date(fm.data.date).toDateString()
      }
      return {
        url: `${slug}/${contentPath.replace('.md', '')}`,
        ...fm.data,
        time: `${time.text}`,
        words: `${time.words} words`,
        excerpt: fm.excerpt,
      }
    })
  const orderFilter = (a, b) => (a.order > b.order ? 1 : -1)
  const dateFilter = (a, b) =>
    new Date(b.date).getTime() > new Date(a.date).getTime() ? 1 : -1
  links.sort(isPoetry ? orderFilter : dateFilter)
  return links
}

// eslint-disable-next-line no-extend-native
String.prototype.toTitleCase = function () {
  return this.split('')
    .map((l, i) => (i === 0 ? l.toUpperCase() : l))
    .join('')
}

export default collectLinks
