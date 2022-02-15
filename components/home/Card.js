import Link from 'next/link'
import { Calendar, ChevronRight, Clock } from 'react-feather'

export default function Card({ post }) {
  return (
    <Link href={post?.link}>
      <li className='flex flex-col w-full p-4 cursor-pointer'>
        <h3 className='mb-2 text-xl font-bold text-gray-600'>{post?.title}</h3>
        <p className='mb-2 text-sm font-medium text-gray-600 md:text-xs'>
          <span className='mr-2'>
            <Calendar size={14} className='inline mr-1' />
            {new Date(post.date).toDateString()}
          </span>
          <span className='ml-2'>
            <Clock size={14} className='inline mr-1' />
            {post.time}
          </span>
        </p>
        <p className='flex-grow flex-shrink-0 text-sm leading-loose text-gray-600'>
          {post?.excerpt}
        </p>
        <a
          className='self-end px-4 py-2 mt-4 text-sm font-medium text-gray-600 cursor-pointer select-none max-w-max hover:text-gray-700'
          href={post.link}
        >
          Continue Reading
          <ChevronRight className='inline w-auto h-4 ml-2' size={16} />
        </a>
      </li>
    </Link>
  )
}
