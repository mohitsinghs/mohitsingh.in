import Header from '@/components/navigation/header'
import Navbar from '@/components/navigation/navbar'
import Toc from '@/components/navigation/toc'
import SeoHeader from './seo'

export default function BlogLayout({ children, title, description, toc }) {
  return (
    <>
      <main className='flex flex-col flex-grow flex-shrink-0'>
        <SeoHeader title={title} excerpt={description} />
        <Navbar />
        <Header description={description} title={title} />
        <article
          className='py-4 px-4 sm:px-6 lg:px-8 flex w-full max-w-5xl mx-auto'
          itemID='#'
          itemScope
          itemType='http://schema.org/BlogPosting'
        >
          <section className='prose'>{children}</section>
          {toc?.length > 0 && (
            <aside className='sticky z-20 hidden xl:top-10 xl:block xl:self-start xl:shrink-0 xl:grow-0 xl:px-16'>
              <Toc toc={toc} />
            </aside>
          )}
        </article>
      </main>

      <footer className='py-4 w-full text-center'>
        <p className='text-xs text-slate-700'>
          Copyright &copy; {new Date().getFullYear()} Mohit Singh
        </p>
      </footer>
    </>
  )
}
