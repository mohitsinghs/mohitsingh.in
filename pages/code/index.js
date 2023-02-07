import { SimpleCard } from '@/components/card'
import ArchiveLayout from '@/components/layouts/archive'
import collectLinks from '@/lib/collectLinks'

function CodePage({ title, description, posts }) {
  return (
    <ArchiveLayout title={title} description={description}>
      <ul className='grid grid-cols-1 gap-8 mx-auto lg:w-4/5 w-full md:grid-cols-2 xl:grid-cols-3'>
        {posts.map((post) => (
          <SimpleCard key={post.title} {...post} />
        ))}
      </ul>
    </ArchiveLayout>
  )
}

export async function getStaticProps() {
  const posts = await collectLinks('code')
  return {
    props: {
      title: 'Code',
      description: 'Random bits and bytes',
      posts,
    },
  }
}

export default CodePage
