import './globals.css'
import { Inter } from 'next/font/google'
import { Provider } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export const metadeta={
  title:'Promptopia',
  description:'Discover & Share AI Prompts'
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-700 text-white`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
