import '@/components'

export default function LibraryPage() {
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
          Library
        </h1>
        
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{
            padding: '0.75rem 1rem',
            border: '1px solid #e9e9e7',
            borderRadius: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1rem' }}>📄</span>
              <span style={{ 
                fontSize: '0.9375rem', 
                fontWeight: '500',
                color: '#37352f'
              }}>
                Java OOP Concepts
              </span>
            </div>
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem',
              fontSize: '0.8125rem',
              color: '#787774'
            }}>
              <span>Java</span>
              <span>·</span>
              <span>Notes</span>
            </div>
          </div>

          <div style={{
            padding: '0.75rem 1rem',
            border: '1px solid #e9e9e7',
            borderRadius: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1rem' }}>📄</span>
              <span style={{ 
                fontSize: '0.9375rem', 
                fontWeight: '500',
                color: '#37352f'
              }}>
                PHP Laravel Guide
              </span>
            </div>
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem',
              fontSize: '0.8125rem',
              color: '#787774'
            }}>
              <span>PHP</span>
              <span>·</span>
              <span>Tutorial</span>
            </div>
          </div>

          <div style={{
            padding: '0.75rem 1rem',
            border: '1px solid #e9e9e7',
            borderRadius: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1rem' }}>📄</span>
              <span style={{ 
                fontSize: '0.9375rem', 
                fontWeight: '500',
                color: '#37352f'
              }}>
                C# LINQ Examples
              </span>
            </div>
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem',
              fontSize: '0.8125rem',
              color: '#787774'
            }}>
              <span>C#</span>
              <span>·</span>
              <span>Exercise</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
