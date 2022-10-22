import SeoHeader from './seo'

export default function PageLayout({ children, title, description }) {
  return (
    <>
      <main className='flex flex-col flex-grow flex-shrink-0'>
        <SeoHeader title={title} excerpt={description} />
        {children}
      </main>
      <footer className='py-4 w-full text-center'>
        <p className='text-xs text-slate-700'>
          Copyright &copy; {new Date().getFullYear()} Mohit Singh
        </p>
      </footer>
    </>
  )
}
