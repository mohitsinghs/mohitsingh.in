import Link from 'next/link'
import { Calendar, ChevronRight, Clock } from 'react-feather'

export function SimpleCard({ link, title, date, time, excerpt }) {
  return (
    <Link href={link}>
      <li className='flex flex-col p-4 w-full cursor-pointer'>
        <h3 className='mb-2 text-xl font-bold text-gray-600'>{title}</h3>
        {date && (
          <p className='mb-2 text-sm font-medium text-gray-600 md:text-xs'>
            <span className='mr-2'>
              <Calendar size={14} className='inline mr-1' />
              {new Date(date).toDateString()}
            </span>
            <span className='ml-2'>
              <Clock size={14} className='inline mr-1' />
              {time}
            </span>
          </p>
        )}
        {excerpt && (
          <p className='flex-grow flex-shrink-0 text-sm leading-loose text-gray-600'>
            {excerpt}
          </p>
        )}
        <a
          className='self-end px-4 py-2 mt-4 max-w-max text-sm font-medium text-gray-600 cursor-pointer select-none hover:text-gray-700'
          href={link}
        >
          Continue Reading
          <ChevronRight className='inline ml-2 w-auto h-4' size={16} />
        </a>
      </li>
    </Link>
  )
}
