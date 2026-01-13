import React from 'react';

const HowItWorks = () => {
  return (
    <main style={{ 
      backgroundColor: '#f8fafc',
      minHeight: '80vh'
    }}>
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#1e293b',
          lineHeight: '1.1',
          marginBottom: '1.5rem',
          margin: '0 0 1.5rem 0'
        }}>
          How It Works
        </h1>

        <p style={{
          fontSize: '1.125rem',
          color: '#64748b',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Content coming soon...
        </p>
      </section>
    </main>
  );
};

export default HowItWorks;
