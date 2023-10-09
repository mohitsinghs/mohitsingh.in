import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className='flex py-3.5 border-b border-slate-100 justify-center'>
      <div className='flex w-full flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8 lg:w-4/5'>
        <div className='relative flex flex-grow basis-0 items-center'>
          <Link
            href='/'
            aria-label='Home page'
            className='text-xl text-slate-600 font-bold'
          >
            M<span className='hidden lg:inline'>ohit </span>S
            <span className='hidden lg:inline'>ingh</span>
          </Link>
        </div>
        <div className='relative flex basis-0 items-center justify-end gap-6 sm:gap-8 md:flex-grow'>
          <Link
            className='text-sm tracking-wide leading-6 font-medium text-slate-600 hover:text-slate-800'
            href='/code'
          >
            Code
          </Link>
          <Link
            className='text-sm tracking-wide leading-6 font-medium text-slate-600 hover:text-slate-800'
            href='/poetry'
          >
            Poetry
          </Link>
        </div>
      </div>
    </nav>
  )
}
