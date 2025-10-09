import React from 'react'

export function Loader() {
    

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            backgroundColor: '#0f1923',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
            zIndex: 9999,
            position: 'fixed',
            top: 0,
            left: 0
          }}>
            Loading Valorant universe...
          </div>
    )
}
