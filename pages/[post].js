import Article from '@/components/post/Article'
import { getPost, populateParams } from 'lib/page'
import 'littlefoot/dist/littlefoot.css'

export default function PostPage({ post }) {
  return <Article post={post} />
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.post)
  return {
    props: {
      post,
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
