// eslint-disable-next-line camelcase
import { IBM_Plex_Mono, Kalam, Poppins } from 'next/font/google'
import '../styles/index.css'

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1.0,
}

const kalam = Kalam({
  subsets: ['devanagari'],
  weight: ['400', '700'],
  variable: '--font-hi',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['italic', 'normal'],
  variable: '--font-sans',
  display: 'swap',
})

const ibmPlex = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['italic', 'normal'],
  variable: '--font-mono',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className={`${kalam.variable} ${poppins.variable} ${ibmPlex.variable}`}
    >
      <body>
        <div className='absolute bg-gray-800 h-1 w-full' />
        {children}
      </body>
    </html>
  )
}
