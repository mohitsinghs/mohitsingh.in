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
