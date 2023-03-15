import { TitleCard } from '@/components/card'
import ArchiveLayout from '@/components/layouts/archive'
import collectLinks from '@/lib/collectLinks'

function PoetryPage({ title, description, posts }) {
  return (
    <ArchiveLayout title={title} description={description}>
      <ul className='grid grid-cols-1 gap-4 m-8 mx-auto lg:w-4/5 w-full px-4 lg:px-0 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post) => (
          <TitleCard key={post.order} link={post.url} title={post.title} />
        ))}
      </ul>
    </ArchiveLayout>
  )
}

export async function getStaticProps() {
  const posts = await collectLinks('poetry')
  return {
    props: {
      title: 'कवितायें',
      description: 'मेरा काव्यात्मक दृष्टिकोण',
      posts,
    },
  }
}

export default PoetryPage
