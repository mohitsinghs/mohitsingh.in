import clsx from 'clsx'
import Link from 'next/link'
import { Hammer, PencilFill, TerminalFill } from 'react-bootstrap-icons'

export default function Navbar({ full }) {
  return (
    <nav className='flex py-3.5 border-b border-slate-100 justify-center'>
      <div
        className={clsx([
          'flex w-full flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8',
          full ? 'lg:w-4/5 w-full' : 'max-w-5xl',
        ])}
      >
        <div className='relative flex flex-grow basis-0 items-center'>
          <Link
            href='/'
            aria-label='Home page'
            className='text-xl text-slate-600 font-bold'
          >
            Mohit Singh
          </Link>
        </div>
        <div className='relative flex basis-0 items-center justify-end gap-6 sm:gap-8 md:flex-grow'>
          <Link
            className='text-sm font-medium text-slate-600 hover:text-slate-800'
            href='/code'
          >
            <span className='hidden md:block'>Code</span>
            <TerminalFill className='md:hidden w-5 h-5 mr-1' />
          </Link>
          <Link
            className='text-sm font-medium text-slate-600 hover:text-slate-800'
            href='/life'
          >
            <span className='hidden md:block'>Life</span>
            <Hammer className='md:hidden w-5 h-5 mr-1' />
          </Link>
          <Link
            className='text-sm font-medium text-slate-600 hover:text-slate-800'
            href='/poetry'
          >
            <span className='hidden md:block'>Poetry</span>
            <PencilFill className='md:hidden w-5 h-5 mr-1' />
          </Link>
        </div>
      </div>
    </nav>
  )
}
