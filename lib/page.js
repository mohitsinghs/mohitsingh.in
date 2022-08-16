import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
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

export async function getPost(kind, slug, include = true) {
  if (!slug) return null
  slug = slug.replace(/\.md$/, '')
  const text = await fs.readFile(
    path.join(path.join(CONTENT_DIR, kind), `${slug}.md`),
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
    link: path.join(kind, slug),
    time: readingTime(rendered).text,
  }
  if (include) {
    result.content = rendered
  }
  return result
}

export async function getAllPosts(kind, limit) {
  const slugs = await fs.readdir(path.join(CONTENT_DIR, kind))
  const posts = await Promise.all(
    slugs.map((slug) => getPost(kind, slug, false))
  )
  if (kind === 'poetry') {
    posts.sort((p1, p2) => p1.order - p2.order)
  } else {
    posts.sort((p1, p2) => (p1.date > p2.date ? -1 : 1))
  }
  if (limit && typeof limit === 'number') {
    return [kind.toTitleCase(), posts.slice(0, 2)]
  }
  return [kind.toTitleCase(), posts]
}

export async function postsForHome() {
  const kinds = await fs.readdir(CONTENT_DIR)
  const posts = Object.fromEntries(
    await Promise.all(kinds.map(async (k) => await getAllPosts(k, 4)))
  )
  return posts
}

export async function populateParams() {
  const cats = await fs.readdir(CONTENT_DIR)
  return (
    await Promise.all(
      cats.map(async (cat) => [
        { params: { posts: [cat] } },
        ...(
          await fs.readdir(path.join(CONTENT_DIR, cat))
        ).map((slug) => ({
          params: { posts: [cat, slug.replace(/\.md$/, '')] },
        })),
      ])
    )
  ).flat()
}
