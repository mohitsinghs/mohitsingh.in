import Article from '@/components/post/Article'
import List from '@/components/post/List'
import { getAllPosts, getPost, populateParams } from 'lib/page'

export default function PostsPage({ title, posts, post, category }) {
  if (category === 'poetry') {
    if (post) {
      return <Article.Poetry post={post} />
    } else {
      return <List.Poetry title={title} posts={posts} />
    }
  }
  if (post) {
    return <Article post={post} />
  } else {
    return <List title={title} posts={posts} />
  }
}

export async function getStaticProps({ params }) {
  const [category, slug] = params.posts
  const [title, posts] = await getAllPosts(category)
  const post = await getPost(category, slug)
  return {
    props: {
      title,
      posts,
      post,
      category,
    },
  }
}

export async function getStaticPaths() {
  const paths = await populateParams()
  return {
    paths,
    fallback: false,
  }
}
