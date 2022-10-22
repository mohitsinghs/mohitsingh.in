import clsx from 'clsx'
import Link from 'next/link'
import useToc from './useToc'

export default function Toc({ toc }) {
  const [currentSection] = useToc(toc)

  function isActive(section) {
    if (section.id === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
  }

  return (
    <>
      <h2 className='text-sm font-medium text-slate-900'>On this page</h2>
      <ul
        role='list'
        className='mt-4 space-y-3 border-b border-slate-200 pb-8 text-sm xl:border-none xl:pb-0'
      >
        {toc.map((section) => (
          <li key={section.id}>
            <h3>
              <Link
                href={`#${section.id}`}
                className={clsx([
                  isActive(section)
                    ? 'font-medium text-slate-600'
                    : 'font-normal text-slate-500 hover:text-slate-700',
                ])}
              >
                {section.title}
              </Link>
            </h3>
            {section.children.length > 0 && (
              <ol role='list' className='mt-2 space-y-3 pl-5 text-slate-500'>
                {section.children.map((subsection) => (
                  <li key={subsection.id}>
                    <Link
                      href={`#${subsection.id}`}
                      className={clsx([
                        isActive(subsection)
                          ? 'font-medium text-slate-600'
                          : 'hover:text-slate-600',
                      ])}
                    >
                      {subsection.title}
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
