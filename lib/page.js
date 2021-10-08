import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import remarkExternalLinks from 'remark-external-links'
import remarkGfm from 'remark-gfm'
import html from 'remark-html'
import prism from './prism'

const CONTENT_DIR = path.resolve(process.cwd(), '_content')

// eslint-disable-next-line no-extend-native
String.prototype.toTitleCase = function () {
  return this.split('')
    .map((l, i) => (i === 0 ? l.toUpperCase() : l))
    .join('')
}

export async function getPost(slug, include = true) {
  if (!slug) return null
  slug = slug.replace(/\.md$/, '')
  const text = await fs.readFile(
    path.join(path.join(CONTENT_DIR), `${slug}.md`),
    'utf8'
  )
  const { data, content } = matter(text)
  const rendered =
    (
      await remark()
        .use(remarkExternalLinks, { target: false })
        .use(remarkGfm)
        .use(html, { sanitize: false })
        .use(prism)
        .process(content)
    ).toString() || ''

  const result = {
    ...data,
    slug,
    link: slug,
  }
  if (include) {
    result.content = rendered
  }
  return result
}

export async function getAllPosts(limit) {
  const slugs = await fs.readdir(CONTENT_DIR)
  const posts = (
    await Promise.all(slugs.map((slug) => getPost(slug, false)))
  ).sort((p1, p2) => (p1.date > p2.date ? -1 : 1))
  if (limit && typeof limit === 'number') {
    return posts.slice(0, limit)
  }
  return posts
}

export async function populateParams() {
  const slugs = await fs.readdir(CONTENT_DIR)
  return slugs
    .map((slug) => ({
      params: { post: slug.replace(/\.md$/, '') },
    }))
    .flat()
}
