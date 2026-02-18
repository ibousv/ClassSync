import { RootLayout } from '@payloadcms/next/layouts'
import '@payloadcms/next/css'
import config from '@/payload/payload.config'
import type { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) =>
  RootLayout({ children, config } as any)

export default Layout
