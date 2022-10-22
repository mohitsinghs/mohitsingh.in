import { SimpleCard, TitleCard } from '@/components/card'
import Header from '@/components/home/Header'
import Section from '@/components/home/Section'
import PageLayout from '@/components/layouts/page'
import { postsForHome } from '@/lib/collectLinks'

export default function IndexPage({ posts }) {
  return (
    <PageLayout title='Mohit Singh'>
      <Header />
      {posts.map(({ name, posts }) => (
        <Section name={name} key={name}>
          {posts?.map((post) =>
            name === 'Poetry' ? (
              <TitleCard
                key={post.title}
                title={post.title}
                link={post.url}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            ) : (
              <SimpleCard
                key={post.title}
                {...post}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )
          )}
        </Section>
      ))}
    </PageLayout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      posts: await postsForHome(),
    },
  }
}
