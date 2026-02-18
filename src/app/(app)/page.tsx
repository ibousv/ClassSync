'use client'

import '@/components'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'cs-home': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <cs-home></cs-home>
    </div>
  )
}
