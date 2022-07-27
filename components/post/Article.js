import Layout from '@/components/Layout'
import { Clock, User } from 'react-feather'

export default function Article({ post }) {
  return (
    <Layout
      title={`${post.title} | Mohit Singh`}
      description={post.excerpt}
      url={post.link}
    >
      <article
        className='px-4 py-24 w-full'
        itemID='#'
        itemScope
        itemType='http://schema.org/BlogPosting'
      >
        <header className='mx-auto mb-12 w-full max-w-lg text-center md:w-2/3'>
          <h1
            className='mb-3 text-4xl font-bold text-gray-700 md:leading-tight md:text-5xl'
            itemProp='headline'
            title={post.title}
          >
            {post.title}
          </h1>
          <p className='text-sm text-gray-600 md:text-xs'>
            <User size={12} className='inline mr-1' />
            <span
              className='font-medium'
              itemProp='author'
              itemScope='itemscope'
              itemType='http://schema.org/Person'
            >
              <span itemProp='name'>&nbsp;{post.author}&nbsp;</span>
            </span>
            on&nbsp;
            <time
              itemProp='datePublished dateModified'
              dateTime={new Date(post.date).toDateString()}
              pubdate='true'
            >
              {new Date(post.date).toDateString()}
            </time>
            <span>
              <Clock size={12} className='inline mr-1 ml-3' />
              {post.time}
            </span>
          </p>
        </header>

        <section
          className='mx-auto prose'
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </Layout>
  )
}
