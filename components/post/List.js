import Layout from '@/components/Layout'
import Link from 'next/link'
import { Calendar, ChevronRight, Clock } from 'react-feather'

function Hi({ title, posts }) {
  return (
    <Layout
      title={`${title} | Blog of Mohit Singh`}
      type='archive'
      url={title.toLowerCase()}
      header={
        <header className='pt-16 pb-8 w-full'>
          <h1 className='text-4xl font-bold text-center text-gray-700'>
            {title}
          </h1>
        </header>
      }
    >
      <ul className='flex flex-col gap-4 m-8 mx-auto w-9/12 md:max-w-sm'>
        {posts.map((post) => (
          <Link key={post.title} href={post.link}>
            <li
              className='flex justify-center items-center w-full h-24 text-xl font-bold text-gray-700 bg-gray-50 rounded-md border border-gray-100 transition-all duration-300 cursor-pointer md:text-2xl hover:bg-gray-100 hover:border-8 hover:border-gray-200'
              key={post.title}
            >
              {post.title}
            </li>
          </Link>
        ))}
      </ul>
    </Layout>
  )
}

function List({ title, posts }) {
  return (
    <Layout
      title={`${title} | Blog of Mohit Singh`}
      type='archive'
      url={title.toLowerCase()}
      header={
        <header className='pt-16 pb-8 w-full'>
          <h1 className='text-4xl font-bold text-center text-gray-700'>
            {title}
          </h1>
        </header>
      }
    >
      <ul className='flex flex-col gap-4 mx-8 my-8 md:max-w-prose md:mx-auto'>
        {posts.map((post) => (
          <Link key={post.title} href={post.link}>
            <li
              className='flex flex-col p-4 w-full cursor-pointer'
              key={post.title}
            >
              <h2 className='mb-2 text-xl font-extrabold text-gray-700 md:text-2xl'>
                {post.title}
              </h2>
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
              <p className='leading-loose text-gray-700'>{post.excerpt}</p>
              <a
                className='justify-self-end px-4 py-2 mt-4 max-w-max text-sm font-medium text-gray-600 bg-gray-50 rounded-lg cursor-pointer select-none'
                href={post.link}
              >
                Continue Reading
                <ChevronRight className='inline ml-2 w-auto h-4' size={16} />
              </a>
            </li>
          </Link>
        ))}
      </ul>
    </Layout>
  )
}

List.Hi = Hi

export default List
