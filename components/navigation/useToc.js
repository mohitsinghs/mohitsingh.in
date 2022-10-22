import { useCallback, useEffect, useState } from 'react'

function useToc(toc) {
  const [currentSection, setCurrentSection] = useState(toc[0]?.id)

  const getHeadings = useCallback((toc) => {
    return toc
      .flatMap((node) => [node.id, ...node.children.map((child) => child.id)])
      .map((id) => {
        const heading = document.getElementById(id)
        // eslint-disable-next-line array-callback-return
        if (!heading) return
        const top = heading.offsetTop
        return { id, top }
      })
  }, [])

  useEffect(() => {
    const headings = getHeadings(toc).concat([])
    if (toc.length === 0 || headings.length === 0) return
    function onScroll() {
      const contentRoot = document.documentElement
      const top = contentRoot.scrollTop + 1
      let current = headings[0].id
      const matchingHeads = headings
        .map((h) => [h.id, h.top - top])
        .filter((h) => h[1] < 0)
      if (matchingHeads.length) {
        current = matchingHeads.reduce((prev, curr) => {
          return prev[1] === Math.max(prev[1], curr[1]) ? prev : curr
        })[0]
      }
      setCurrentSection(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    })
    return () => {
      window.removeEventListener('scroll', onScroll, {
        capture: true,
        passive: true,
      })
    }
  }, [getHeadings, toc])

  return [currentSection]
}

export default useToc
