import Link from 'next/link'
import { Calendar, ChevronRight, Clock } from 'react-feather'

function Hi({ post }) {
  return (
    <Link href={post?.link}>
      <li className='flex flex-col justify-center items-center w-full h-24 text-xl font-bold text-gray-700 bg-gray-50 rounded-md border border-gray-100 transition-all duration-300 cursor-pointer hover:bg-gray-100 hover:border-8 hover:border-gray-200 md:text-2xl'>
        {post?.title}
      </li>
    </Link>
  )
}

function Card({ post }) {
  return (
    <Link href={post?.link}>
      <li className='flex flex-col p-4 w-full cursor-pointer'>
        <h3 className='mb-2 text-xl font-bold text-gray-600'>{post?.title}</h3>
        {post.date && (
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
        )}
        {post.excerpt && (
          <p className='flex-grow flex-shrink-0 text-sm leading-loose text-gray-600'>
            {post?.excerpt}
          </p>
        )}
        <a
          className='self-end px-4 py-2 mt-4 max-w-max text-sm font-medium text-gray-600 cursor-pointer select-none hover:text-gray-700'
          href={post.link}
        >
          Continue Reading
          <ChevronRight className='inline ml-2 w-auto h-4' size={16} />
        </a>
      </li>
    </Link>
  )
}

Card.Hi = Hi
export default Card
