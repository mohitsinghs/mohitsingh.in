import { SimpleCard, TitleCard } from '@/components/card'
import Header from '@/components/home/Header'
import Section from '@/components/home/Section'
import Layout from '@/components/Layout'
import { postsForHome } from 'lib/page'

export default function IndexPage({ posts }) {
  return (
    <Layout home>
      <Header />
      {Object.keys(posts).map((postType, i) => (
        <Section name={postType} key={postType}>
          {posts[postType]?.map((post) =>
            postType === 'Poetry' ? (
              <TitleCard
                key={post.title}
                title={post.title}
                link={post.link}
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
