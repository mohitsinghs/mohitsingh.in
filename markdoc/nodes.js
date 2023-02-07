import { Fence } from '@/components/elements'

const nodes = {
  document: {
    render: false,
    children: [
      'heading',
      'paragraph',
      'image',
      'table',
      'tag',
      'fence',
      'blockquote',
      'comment',
      'list',
      'hr',
    ],
    attributes: {
      frontmatter: { render: false },
    },
  },
  link: {
    render: 'a',
    children: ['strong', 'em', 's', 'code', 'text', 'tag'],
    attributes: {
      href: { type: String, required: true },
      title: { type: String },
      rel: { type: String, default: 'nofollow noopener' },
    },
  },
  fence: {
    render: Fence,
    attributes: {
      language: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  },
}

export default nodes
