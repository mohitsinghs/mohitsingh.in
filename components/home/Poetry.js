import clsx from 'clsx'
import Link from 'next/link'

function Poetry() {
  return (
    <section className='w-full bg-slate-50 rounded-md shadow-sm py-16 my-16 px-4'>
      <div className='max-w-5xl flex flex-col sm:flex-row justify-between mx-auto'>
        <div className='flex flex-col'>
          <p className='block text-xl leading-loose font-bold tracking-wide text-slate-600'>
            Do you know Hindi ?
          </p>
          <p className='block text-sm text-slate-500'>
            And are you interested in some hindi poetry ?
          </p>
        </div>
        <div className='items-center flex'>
          <Link
            href='/poetry'
            className={clsx([
              'inline-flex items-center px-4 py-1.5 mt-8 sm:mx-2 text-sm font-medium text-white border border-transparent rounded-md shadow transform -translate-y-0 hover:-translate-y-0.5 transition-lift duration-300 ease-in-out bg-slate-600 hover:bg-slate-500',
            ])}
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Poetry
