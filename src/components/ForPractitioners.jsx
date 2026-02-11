import React from 'react';

const ForPractitioners = () => {
  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '4rem 2rem',
      textAlign: 'left'
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontFamily: 'var(--font-serif)',
        fontWeight: '700',
        color: 'var(--text-primary)',
        lineHeight: '1.1',
        marginBottom: '1.5rem',
        margin: '0 0 1.5rem 0',
        textAlign: 'center'
      }}>
        For Practitioners
      </h1>

      <div style={{
        fontSize: '1.125rem',
        fontFamily: 'var(--font-body)',
        color: 'var(--text-secondary)',
        lineHeight: '1.7',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <p style={{ marginBottom: '1.5rem' }}>
          Content for practitioners coming soon.
        </p>
      </div>
    </div>
  );
};

export default ForPractitioners;
