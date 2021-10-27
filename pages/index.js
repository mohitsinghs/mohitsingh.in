import Header from '@/components/home/Header'
import Layout from '@/components/Layout'
import { getAllPosts } from 'lib/page'
import Link from 'next/link'
import { Calendar, Clock } from 'react-feather'

export default function IndexPage({ posts }) {
  return (
    <Layout home header={<Header />}>
      <ul className='flex flex-col gap-4 my-8 md:max-w-prose md:mx-auto'>
        {posts?.map((post) => (
          <Link key={post.title} href={post.link}>
            <li
              className='flex flex-col w-full p-4 cursor-pointer'
              key={post.title}
            >
              <h2 className='mb-2 text-2xl font-extrabold likely-red'>
                {post.title}
              </h2>
              <p className='text-sm leading-loose text-gray-600'>
                {post.excerpt}
              </p>
              <p className='mt-2 text-sm font-medium text-gray-600 md:text-xs'>
                <span className='mr-2'>
                  <Calendar size={14} className='inline mr-1' />
                  {new Date(post.date).toDateString()}
                </span>
                <span className='ml-2'>
                  <Clock size={14} className='inline mr-1' />
                  {post.time}
                </span>
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </Layout>
  )
}
export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  }
}
