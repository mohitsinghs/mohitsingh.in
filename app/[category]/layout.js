import Navbar from '@/components/navigation/navbar'

export default function CategoryLayout({ children }) {
  return (
    <>
      <main className='flex flex-col flex-grow flex-shrink-0'>
        <Navbar />
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
