import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// Google Fonts configuration - Inter font
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true
})

// Website metadata configuration
export const metadata: Metadata = {
  title: "KCISLK Parents' Corner",
  description:
    "KCISLK Elementary School International Department Parents' Corner - Access the latest school news, events, resources, and updates for parents.",
  generator: 'kcislk-parents-corner',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: "KCISLK Parents' Corner",
    description: "Stay connected with your child's international education journey at KCISLK Elementary School.",
    type: "website",
    locale: "en_US",
  }
}

/**
 * Root Layout Component - Parents' Corner Layout
 * 
 * @description Clean, public-facing layout for parents without authentication
 * @param children React children components
 * @author Claude Code | Generated for KCISLK Parents' Corner
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}