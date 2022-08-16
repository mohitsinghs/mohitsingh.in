import { Github, Twitter } from 'react-bootstrap-icons'

export default function Header() {
  return (
    <header className='flex flex-col items-center py-16 w-full'>
      <h1 className='text-3xl font-bold text-gray-700 md:text-4xl'>
        Mohit Singh
      </h1>
      <p className='py-2 font-light text-gray-600'>
        <span>A human and dreamer</span>
      </p>
      <ul className='flex pt-8 space-x-6'>
        <li>
          <a
            href='https://github.com/mohitsinghs'
            target='_blank'
            rel='nofollow noreferrer'
          >
            <Github className='text-xl text-gray-700 fill-current' />
          </a>
        </li>
        <li>
          <a
            href='https://twitter.com/maybemohit'
            target='_blank'
            rel='nofollow noreferrer'
          >
            <Twitter className='text-xl text-blue-500 fill-current' />
          </a>
        </li>
      </ul>
    </header>
  )
}
