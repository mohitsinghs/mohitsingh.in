import Link from 'next/link'

export function TitleCard({ url, title }) {
  return (
    <li key={title}>
      <Link
        href={url}
        className='flex relative justify-center items-center w-full h-24 text-xl text-slate-700 bg-slate-50 rounded-md transition-all duration-300 cursor-pointer md:text-2xl'
      >
        <span>{title}</span>
      </Link>
    </li>
  )
}
