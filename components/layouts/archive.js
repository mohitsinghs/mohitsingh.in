import Header from '@/components/navigation/header'
import Navbar from '@/components/navigation/navbar'
import SeoHeader from './seo'

export default function ArchiveLayout({ children, title, description }) {
  return (
    <>
      <main className='flex flex-col flex-grow flex-shrink-0'>
        <SeoHeader title={title} excerpt={description} />
        <Navbar />
        <Header title={title} description={description} center />
        {children}
      </main>
      <footer className='py-4 px-4 sm:px-6 lg:px-8 w-full text-center'>
        <p className='text-xs text-slate-700'>
          Copyright &copy; {new Date().getFullYear()} Mohit Singh
        </p>
      </footer>
    </>
  )
}
