import Link from 'next/link'
import { ChevronRight } from 'react-feather'

function Section({ name, children }) {
  return (
    <section className='flex flex-col px-4 py-4 mx-auto w-full max-w-5xl'>
      <h2 className='py-8 text-3xl text-center leading-loose font-bold tracking-wide text-gray-600'>
        {name}
      </h2>
      <ul className='grid grid-flow-row auto-rows-fr gap-8 md:grid-flow-col'>
        {children}
      </ul>
      <Link href={`/${name.toLowerCase()}`}>
        <a className='flex items-center self-end mt-8 text-sm font-bold text-gray-600 cursor-pointer select-none hover:text-gray-700'>
          Read More
          <ChevronRight size={16} />
        </a>
      </Link>
    </section>
  )
}

export default Section
