import BlogLayout from '@/components/layouts/blog'
import PoetryLayout from '@/components/layouts/poetry'
import collectHeadings from '@/lib/collectHeadings'
import '@/styles/index.css'
import '@fontsource/kalam/devanagari.css'
import '@fontsource/poppins/latin.css'
import { GoogleTagManager } from '@next/third-parties/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Prism from 'prism-react-renderer/prism'
;(typeof global !== 'undefined' ? global : window).Prism = Prism
require('prismjs/components/prism-properties')

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  const isPoetry = router.pathname.startsWith('/poetry')
  if (pageProps?.markdoc?.frontmatter) {
    const fm = pageProps.markdoc?.frontmatter
    const toc = collectHeadings(pageProps.markdoc?.content) || []
    const Layout = isPoetry ? PoetryLayout : BlogLayout
    const showToc = !isPoetry && fm?.toc !== false
    return (
      <>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
        </Head>
        <Layout {...(fm || {})} {...(showToc && { toc })}>
          <Component {...pageProps} />
          <GoogleTagManager gtmId='G-FF6JGZ4DLS' />
        </Layout>
      </>
    )
  }
  return <Component {...pageProps} />
}

export default App
