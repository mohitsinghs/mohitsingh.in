import { TitleCard } from '@/components/card'
import ArchiveLayout from '@/components/layouts/archive'
import collectLinks from '@/lib/collectLinks'

function PoetryPage({ title, description, posts }) {
  return (
    <ArchiveLayout title={title} description={description}>
      <ul className='grid grid-cols-1 gap-4 m-8 mx-auto lg:w-4/5 w-full px-4 lg:px-0 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post) => (
          <TitleCard
            key={post.order}
            link={post.url}
            title={post.title}
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </ul>
    </ArchiveLayout>
  )
}

export async function getStaticProps() {
  const posts = await collectLinks('poetry')
  return {
    props: {
      title: 'भारत दर्शन',
      description: 'वर्तमान भारतीय समाज का काव्यगत विश्लेषण',
      posts,
    },
  }
}

export default PoetryPage
