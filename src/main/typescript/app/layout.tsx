import { Inter, Lora } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
})

export const metadata = {
  title: 'Parent\'s Corner - International Department',
  description: '小學國際處學生與家長最新消息公告',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" className={`${inter.variable} ${lora.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}