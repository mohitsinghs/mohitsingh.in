import Head from 'next/head'
import { useRouter } from 'next/router'

export default function SeoHeader({ title, excerpt }) {
  const router = useRouter()
  const isPoetry = router.pathname.startsWith('/poetry')
  const isBlog = router.pathname.startsWith('/code')
  let currentTitle = 'Mohit Singh'
  if (isBlog) {
    currentTitle = `${title} | Mohit Singh`
  } else if (isPoetry) {
    currentTitle = `${title} | मोहित सिंह`
  } else if (title) {
    currentTitle = title
  }
  return (
    <Head>
      <title>{currentTitle}</title>
      <meta name='description' content={excerpt} />
      <link
        href='https://mohitsingh.in/sitemap.xml'
        rel='sitemap'
        type='application/xml'
        title='Sitemap'
      />
      <meta
        content='wmG9n4x_BUWryqpD2K4wEF9Edfh_LNapQe-qfbv4D3o'
        name='google-site-verification'
      />
    </Head>
  )
}
