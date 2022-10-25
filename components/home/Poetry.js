import clsx from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronRight } from 'react-bootstrap-icons'

export function Card({ link, title, initial, whileInView, transition }) {
  return (
    <Link key={title} href={link}>
      <motion.li
        initial={initial}
        whileInView={whileInView}
        transition={transition}
        className='flex relative justify-center items-center w-full h-24 text-xl text-slate-700 bg-slate-50 rounded-md transition-all duration-300 cursor-pointer md:text-2xl'
      >
        <span>{title}</span>
      </motion.li>
    </Link>
  )
}

function Poetry({ name, children }) {
  const [knowsHindi, setKnowsHindi] = useState(false)
  const [hasSelected, setHasSelected] = useState(false)

  return (
    <section
      className={clsx([
        'flex flex-col p-4 mx-auto w-full max-w-5xl',
        hasSelected && !knowsHindi && 'hidden',
      ])}
    >
      {knowsHindi ? (
        <>
          <h2 className='py-8 text-3xl text-center leading-loose font-bold tracking-wide text-slate-600'>
            {name}
          </h2>
          <ul className='grid grid-flow-row auto-rows-fr gap-8 md:grid-flow-col'>
            {children}
          </ul>
          <Link
            href={`/${name.toLowerCase()}`}
            className='flex items-center self-end mt-8 text-sm font-bold text-gray-600 cursor-pointer select-none hover:text-gray-700'
          >
            Read More
            <ChevronRight size={16} />
          </Link>
        </>
      ) : (
        <div className='w-full bg-slate-50 rounded-md shadow-sm my-16'>
          <p className='pt-8 text-xl text-center leading-loose font-bold tracking-wide text-slate-600'>
            Do you know Hindi ?
          </p>
          <p className='text-center text-sm text-slate-500'>
            And are you interested in some hindi literature ?
          </p>
          <div className='pb-8 flex justify-center'>
            <button
              onClick={() => {
                setKnowsHindi(true)
                setHasSelected(true)
              }}
              className={clsx([
                'inline-flex items-center px-4 py-1.5 mt-8 mx-2 text-sm font-medium text-white border border-transparent rounded-md shadow transform -translate-y-0 hover:-translate-y-0.5 transition-lift duration-300 ease-in-out bg-slate-600 hover:bg-slate-500',
              ])}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setKnowsHindi(false)
                setHasSelected(true)
              }}
              className={clsx([
                'inline-flex items-center px-4 py-1.5 mt-8 mx-2 text-sm font-medium text-white border border-transparent rounded-md shadow transform -translate-y-0 hover:-translate-y-0.5 transition-lift duration-300 ease-in-out bg-slate-600 hover:bg-slate-500',
              ])}
            >
              No
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

Poetry.Card = Card

export default Poetry
