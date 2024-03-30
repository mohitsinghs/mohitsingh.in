import Header from '@/components/navigation/header'
import Toc from '@/components/navigation/toc'
import { getPageData, getPageMetadata, getPages } from '@mohitsingh/contempt'
import clsx from 'clsx'

export async function generateStaticParams() {
  const pages = await getPages()
  return pages.map((data) => ({
    category: data[0],
    post: data[1],
  }))
}

export async function generateMetadata({ params }) {
  const { category, post } = params
  const metaData = await getPageMetadata(category, post)
  return {
    title: metaData.title,
    description: metaData.description,
  }
}

export default async function BlogPage({ params }) {
  const { category, post } = params
  const [children, data, toc] = await getPageData(category, post)
  const isPoetry = category === 'poetry'

  return (
    <>
      <Header description={data.description} title={data.title} />
      <article
        className={clsx([
          'py-4 px-4 sm:px-6 lg:px-8 flex w-full lg:w-4/5 max-w-7xl mx-auto',
          isPoetry && 'font-hi',
        ])}
        itemID='#'
        itemScope
        itemType='http://schema.org/BlogPosting'
      >
        <section className='prose min-w-0'>{children}</section>
        {toc?.length > 0 && (
          <aside className='sticky z-20 hidden xl:top-10 xl:block xl:self-start xl:shrink-0 xl:grow-0 xl:px-16'>
            <Toc toc={toc} />
          </aside>
        )}
      </article>
    </>
  )
}
