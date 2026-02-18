import '@/components'

export default function ChatPage() {
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
          Chat
        </h1>
        
        <div style={{
          padding: '1.5rem',
          border: '1px solid #e9e9e7',
          borderRadius: '0.25rem',
          height: '500px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            flex: 1,
            overflowY: 'auto'
          }}>
            <div style={{
              padding: '0.75rem 1rem',
              background: '#f7f6f3',
              borderRadius: '0.25rem',
              maxWidth: '80%',
              alignSelf: 'flex-start'
            }}>
              <div style={{ fontSize: '0.8125rem', color: '#787774', marginBottom: '0.25rem' }}>
                John
              </div>
              <div style={{ fontSize: '0.9375rem', color: '#37352f' }}>
                Does anyone have the Java OOP notes?
              </div>
            </div>

            <div style={{
              padding: '0.75rem 1rem',
              background: '#f7f6f3',
              borderRadius: '0.25rem',
              maxWidth: '80%',
              alignSelf: 'flex-start'
            }}>
              <div style={{ fontSize: '0.8125rem', color: '#787774', marginBottom: '0.25rem' }}>
                Sarah
              </div>
              <div style={{ fontSize: '0.9375rem', color: '#37352f' }}>
                I uploaded them yesterday. Check the library!
              </div>
            </div>

            <div style={{
              padding: '0.75rem 1rem',
              background: '#f7f6f3',
              borderRadius: '0.25rem',
              maxWidth: '80%',
              alignSelf: 'flex-start'
            }}>
              <div style={{ fontSize: '0.8125rem', color: '#787774', marginBottom: '0.25rem' }}>
                John
              </div>
              <div style={{ fontSize: '0.9375rem', color: '#37352f' }}>
                Thanks! Just downloaded it.
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginTop: '1rem'
          }}>
            <input 
              type="text" 
              placeholder="Type a message..." 
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: '1px solid #e9e9e7',
                borderRadius: '0.25rem',
                fontSize: '0.9375rem',
                color: '#37352f'
              }}
            />
            <button style={{
              padding: '0.75rem 1.5rem',
              background: '#37352f',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              fontSize: '0.9375rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
