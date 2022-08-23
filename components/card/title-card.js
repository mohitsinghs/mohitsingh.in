import Link from 'next/link'

export function TitleCard({ link, title }) {
  return (
    <Link key={title} href={link}>
      <li className='flex relative justify-center items-center w-full h-24 text-xl text-gray-700 bg-gray-100 rounded-md transition-all duration-300 cursor-pointer font-hi md:text-2xl hover:bg-gray-600 hover:text-white'>
        <span>{title}</span>
      </li>
    </Link>
  )
}
