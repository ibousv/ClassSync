import '@/components'

export default function DashboardPage() {
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh',
      background: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* @ts-expect-error - Web component */}
      <cs-nav></cs-nav>
      
      <main style={{ 
        flex: 1, 
        overflow: 'auto',
        padding: '3rem 4rem',
        maxWidth: '900px'
      }}>
        {/* @ts-expect-error - Web component */}
        <cs-dashboard></cs-dashboard>
      </main>
    </div>
  )
}
