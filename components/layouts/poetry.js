import Header from '@/components/navigation/header'
import Navbar from '@/components/navigation/navbar'
import SeoHeader from './seo'

export default function PoetryLayout({ children, title, description }) {
  return (
    <>
      <main className='flex flex-col flex-grow flex-shrink-0'>
        <SeoHeader title={title} excerpt={description} />
        <Navbar />
        <Header description={description} title={title} center />
        <article
          className='px-4 sm:px-6 lg:px-8 py-4 w-full'
          itemID='#'
          itemScope
          itemType='http://schema.org/BlogPosting'
        >
          <section className='mx-auto prose text-center'>{children}</section>
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
