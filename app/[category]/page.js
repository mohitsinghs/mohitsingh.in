import { SimpleCard, TitleCard } from '@/components/card'
import Header from '@/components/navigation/header'
import { getCategories, getPosts, getTitle } from '@mohitsingh/contempt'
import clsx from 'clsx'

const titleDescByCategory = {
  posts: {
    title: 'Posts',
    description: 'Random bits and bytes',
  },
  poetry: {
    title: 'Poetry',
    description: 'My poetic perspective',
  },
}

export async function generateMetadata({ params }) {
  return {
    title: `${getTitle(params.category)} | Mohit Singh`,
    description: params.category,
  }
}

export async function generateStaticParams() {
  return (await getCategories()).map((category) => ({
    category,
  }))
}

export default async function ArchivePage({ params }) {
  const isPoetry = params.category.toLowerCase() === 'poetry'
  const { title, description } = titleDescByCategory[params.category]
  const posts = await getPosts(params.category, isPoetry)
  return (
    <>
      <Header
        title={title}
        description={description}
        isPoetry={isPoetry}
        center
      />
      <ul
        className={clsx([
          'grid grid-cols-1 gap-8 mx-auto lg:w-4/5 w-full md:grid-cols-2 xl:grid-cols-3',
          isPoetry && 'font-hi',
        ])}
      >
        {posts.map((post) =>
          isPoetry ? (
            <TitleCard key={post.title} {...post} />
          ) : (
            <SimpleCard key={post.title} {...post} />
          )
        )}
      </ul>
    </>
  )
}
