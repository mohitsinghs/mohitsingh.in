import { SimpleCard, TitleCard } from '@/components/card'
import Header from '@/components/home/Header'
import Section from '@/components/home/Section'
import Layout from '@/components/Layout'
import { postsForHome } from 'lib/page'

export default function IndexPage({ posts }) {
  return (
    <Layout home>
      <Header />
      {Object.keys(posts).map((postType) => (
        <Section name={postType} key={postType}>
          {posts[postType]?.map((post) =>
            postType === 'Poetry' ? (
              <TitleCard key={post.title} title={post.title} link={post.link} />
            ) : (
              <SimpleCard key={post.title} {...post} />
            )
          )}
        </Section>
      ))}
    </Layout>
  )
}
export async function getStaticProps() {
  return {
    props: {
      posts: await postsForHome(),
    },
  }
}
