import Link from 'next/link'
import { ChevronRight } from 'react-bootstrap-icons'

function Section({ name, children }) {
  return (
    <section className='flex flex-col mx-auto w-full max-w-7xl'>
      <h2 className='py-8 text-3xl text-center leading-loose font-bold tracking-wide text-slate-600'>
        {name}
      </h2>
      <ul className='grid grid-flow-row auto-rows-fr gap-8 md:grid-cols-2'>
        {children}
      </ul>
      <Link
        href={`/${name.toLowerCase()}`}
        className='flex items-center self-end mt-8 text-sm font-bold text-slate-600 cursor-pointer select-none hover:text-slate-700'
      >
        Read More
        <ChevronRight size={16} />
      </Link>
    </section>
  )
}

export default Section
