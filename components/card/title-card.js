import { motion } from 'framer-motion'
import Link from 'next/link'

export function TitleCard({ link, title, initial, whileInView, transition }) {
  return (
    <Link key={title} href={link}>
      <motion.li
        initial={initial}
        whileInView={whileInView}
        transition={transition}
        className='flex relative justify-center items-center w-full h-24 text-xl text-slate-700 bg-slate-50 rounded-md transition-all duration-300 cursor-pointer font-hi md:text-2xl'
      >
        <span>{title}</span>
      </motion.li>
    </Link>
  )
}
