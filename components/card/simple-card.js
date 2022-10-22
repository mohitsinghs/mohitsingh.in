import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, TextLeft } from 'react-bootstrap-icons'

export function SimpleCard({
  url,
  title,
  date,
  time,
  words,
  excerpt,
  initial,
  whileInView,
  transition,
}) {
  return (
    <Link href={url}>
      <motion.li
        className='flex flex-col p-4 w-full cursor-pointer'
        initial={initial}
        whileInView={whileInView}
        transition={transition}
      >
        <h3 className='mb-2 text-xl font-bold text-slate-600'>{title}</h3>
        {date && (
          <p className='mb-2 text-xs font-medium text-slate-600 inline-flex items-center flex-wrap gap-2'>
            <span className='mr-2.5'>
              <Calendar size={12} className='inline mr-1.5' />
              {date}
            </span>
            <span className='mr-2.5'>
              <Clock size={12} className='inline mr-1.5' />
              {time}
            </span>
            <span className='mr-2.5'>
              <TextLeft size={12} className='inline mr-1.5' />
              {words}
            </span>
          </p>
        )}
        {excerpt && (
          <p className='flex-grow flex-shrink-0 text-sm leading-loose text-slate-600'>
            {excerpt}
          </p>
        )}
      </motion.li>
    </Link>
  )
}
