import type { Metadata } from 'next'
import './globals.css'
import '@/components'

export const metadata: Metadata = {
  title: 'ClassSync',
  description: 'Collaborative platform for academic management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
