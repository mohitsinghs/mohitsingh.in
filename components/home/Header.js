import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className='flex flex-col items-center py-16 w-full'>
      <h1 className='text-4xl font-bold text-slate-800 md:text-5xl'>
        <motion.span
          initial={{ y: 100, rotate: 0, opacity: 0 }}
          whileInView={{
            y: 0,
            rotate: -6,
            opacity: 1,
          }}
          transition={{
            type: 'spring',
            duration: 0.5,
            damping: 5,
            stiffness: 50,
          }}
          className='relative bg-slate-800 px-4 py-2.5 rounded-xl text-gray-100 inline-block'
        >
          <span className='absolute bg-slate-800 top-0 left-16 -mt-60 w-1 rotate-6 h-64' />
          Mohit
        </motion.span>

        <span className='px-4'>Singh</span>
      </h1>
      <p className='py-4 font-light text-slate-700'>A human and dreamer</p>
    </header>
  )
}
