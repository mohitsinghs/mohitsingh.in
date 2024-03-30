import clsx from 'clsx'

export default function Header({ title, description, center, isPoetry }) {
  return (
    <header
      className={clsx([
        'flex flex-col mx-auto my-8 lg:my-16 w-full lg:w-4/5 lg:max-w-7xl px-4 sm:px-6 lg:px-8',
        isPoetry && 'font-hi',
      ])}
    >
      <h1
        className={clsx([
          'text-4xl font-bold text-slate-700 md:leading-normal leading-tight pb-2 md:text-5xl border-b-4 border-slate-800 max-w-fit',
          center && 'mx-auto',
        ])}
        itemProp='headline'
        title={title}
      >
        {title}
      </h1>
      {description && (
        <p
          className={clsx([
            'md:text-xl text-lg max-w-xl leading-loose text-slate-700 mb-2 mt-4',
            center ? 'mx-auto' : 'max-w-xl',
          ])}
        >
          {description}
        </p>
      )}
    </header>
  )
}
