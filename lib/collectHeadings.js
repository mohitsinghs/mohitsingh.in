import slugify from '@sindresorhus/slugify'

function collectHeadings(nodes) {
  const sections = []
  for (const node of nodes) {
    if (node.name?.match(/h[2,3]/)) {
      const title = node.children[0]
      if (typeof title === 'string') {
        const id = slugify(title)
        node.attributes.id = id
        if (node.name?.match(/h3/) && sections[sections.length - 1]) {
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }
  }
  return sections
}

export default collectHeadings
