import Link from 'next/link'
import { CodeSlash, Pen } from 'react-bootstrap-icons'

export function JumpLink({ href, children }) {
  return (
    <Link
      className='text-xs tracking-wide leading-6 font-medium text-slate-100 px-4 py-1 rounded-md hover:-rotate-2 hover:translate-y-1 hover:text-slate-200 bg-slate-700 hover:bg-slate-800 transition-all ease-in-out duration-200 shadow-sm hover:shadow-md'
      href={href}
    >
      {children}
    </Link>
  )
}

export default function Header() {
  return (
    <header className='py-6 w-full px-4 relative flex flex-col justify-center items-center h-screen mb-[-3rem]'>
      <div className='mx-auto max-w-7xl py-8'>
        <h1 className='text-3xl sm:text-4xl font-bold leading-tight text-slate-700 max-w-2xl sm:leading-tight'>
          Probably a Software Engineer.
        </h1>
        <p className='my-8 text-slate-600 max-w-2xl leading-relaxed'>
          I am Mohit Singh, a software engineer from India. I occasionally work
          with organizations to help them build their dreams when I am not
          building mine.
        </p>

        <nav className='flex gap-4 mt-2'>
          <JumpLink href='/code'>
            <CodeSlash className='inline mr-1' size={16} /> Code
          </JumpLink>
          <JumpLink href='/poetry'>
            <Pen className='inline mr-1' size={16} /> Poetry
          </JumpLink>
        </nav>
      </div>
    </header>
  )
}
