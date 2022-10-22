import BlogLayout from '@/components/layouts/blog'
import PoetryLayout from '@/components/layouts/poetry'
import collectHeadings from '@/lib/collectHeadings'
import '@/styles/index.css'
import '@fontsource/kalam/devanagari.css'
import '@fontsource/poppins/latin.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Prism from 'prism-react-renderer/prism'
;(typeof global !== 'undefined' ? global : window).Prism = Prism
require('prismjs/components/prism-properties')

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  const isIndexPage = ['/code', '/poetry', '/life'].includes(router.pathname)
  const isPoetry = router.pathname.startsWith('/poetry')
  const hasFront =
    !isIndexPage &&
    (router.pathname.startsWith('/code') ||
      router.pathname.startsWith('/life') ||
      isPoetry)
  if (hasFront) {
    const fm = pageProps.markdoc?.frontmatter
    const toc = collectHeadings(pageProps.markdoc?.content) || []
    const Layout = isPoetry ? PoetryLayout : BlogLayout
    return (
      <>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
        </Head>
        <Layout {...(fm || {})} {...(!isPoetry && { toc })}>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  }
  return <Component {...pageProps} />
}

export default App
