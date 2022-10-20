import Layout from '@/components/Layout'
import { SimpleCard, TitleCard } from '../card'

function ListHeader({ title }) {
  return (
    <header className='my-16 w-full'>
      <h1 className='text-4xl font-bold text-center text-slate-600'>{title}</h1>
    </header>
  )
}

function Poetry({ title, posts }) {
  return (
    <Layout
      title={`${title} | Blog of Mohit Singh`}
      type='archive'
      url={title.toLowerCase()}
      header={<ListHeader title={title} />}
    >
      <ul className='grid grid-cols-1 gap-4 m-8 mx-auto w-4/5 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post, i) => (
          <TitleCard
            key={post.title}
            link={post.link}
            title={post.title}
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </ul>
    </Layout>
  )
}

function List({ title, posts }) {
  return (
    <Layout
      title={`${title} | Blog of Mohit Singh`}
      type='archive'
      url={title.toLowerCase()}
      header={<ListHeader title={title} />}
    >
      <ul className='grid grid-cols-1 gap-8 mx-auto w-4/5 md:grid-cols-2 xl:grid-cols-3'>
        {posts.map((post, i) => (
          <SimpleCard
            key={post.title}
            {...post}
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </ul>
    </Layout>
  )
}

List.Poetry = Poetry

export default List
