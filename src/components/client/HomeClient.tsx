'use client'

import { useEffect } from 'react'

export default function HomeClient() {
  useEffect(() => {
    // Import and register Lit component dynamically
    import('@/components/home/cs-home').then(() => {
      // Component is now registered
    })
  }, [])

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
