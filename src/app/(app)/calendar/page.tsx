import '@/components'

export default function CalendarPage() {
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
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700',
          color: '#37352f',
          margin: '0 0 2rem 0',
          letterSpacing: '-0.02em'
        }}>
          Calendar
        </h1>
        
        <div style={{
          padding: '1.5rem',
          border: '1px solid #e9e9e7',
          borderRadius: '0.25rem'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '0.25rem',
            marginBottom: '1rem'
          }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} style={{ 
                textAlign: 'center',
                fontSize: '0.8125rem',
                color: '#787774',
                fontWeight: '500'
              }}>
                {day}
              </div>
            ))}
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '0.25rem'
          }}>
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 2
              return (
                <div 
                  key={i} 
                  style={{
                    height: '80px',
                    padding: '0.5rem',
                    border: '1px solid #e9e9e7',
                    borderRadius: '0.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}
                >
                  <span style={{
                    fontSize: '0.8125rem',
                    color: day <= 0 || day > 28 ? '#d2d2d7' : '#37352f',
                    fontWeight: day === 13 ? '700' : '500'
                  }}>
                    {day > 0 ? day : ''}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
