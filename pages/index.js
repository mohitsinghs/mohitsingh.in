import Header from '@/components/home/Header'
import Layout from '@/components/Layout'
import { getAllPosts } from 'lib/page'
import Link from 'next/link'
import { ChevronRight } from 'react-feather'

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
              <h2 className='mb-2 text-lg font-extrabold text-gray-600 md:text-2xl'>
                {post.title}
              </h2>
              <p className='mb-2 text-sm font-medium text-gray-600 md:text-xs'>
                {new Date(post.date).toDateString()}
              </p>
              <p className='text-sm leading-loose text-gray-600'>
                {post.excerpt}
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
