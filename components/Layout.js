import clsx from 'clsx'
import Head from 'next/head'

export default function Layout({
  children,
  title = 'Mohit Singh',
  description = 'Digital home of an eccentric programmer who also explores a lot of other unrelated fields.',
  url = '',
  home = false,
}) {
  return (
    <>
      <main
        className={clsx([!home && 'flex flex-col', 'flex-grow flex-shrink-0'])}
      >
        <Head>
          <title>{title}</title>
          <meta name='description' content={description} />
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
          <link rel='canonical' href={`https://mohitsingh.in/${url}`} />
        </Head>
        {children}
      </main>
      <footer className='py-4 w-full text-center'>
        <p className='text-xs text-gray-700'>
          Copyright &copy; {new Date().getFullYear()} Mohit Singh
        </p>
      </footer>
    </>
  )
}
