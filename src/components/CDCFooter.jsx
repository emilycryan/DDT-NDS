import React, { useState, useEffect } from 'react';

const CDCFooter = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const footerBg = '#2D3B42';
  const linkColor = 'rgba(255, 255, 255, 0.75)';
  const linkStyle = { color: linkColor, textDecoration: 'none', fontSize: '14px', fontFamily: 'var(--font-body)' };

  return (
    <footer style={{
      backgroundColor: footerBg,
      color: '#fff',
      padding: isMobile ? '2rem 24px' : '2.5rem 24px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'center',
        justifyContent: 'space-between',
        gap: isMobile ? '1.5rem' : '2rem',
        flexWrap: 'wrap',
      }}>
        <a href="https://www.cdc.gov/about/default.htm" className="footer-link" style={linkStyle}>About CDC</a>
        <a href="https://www.cdc.gov/cdc-info/index.html" className="footer-link" style={linkStyle}>Contact Us</a>
        <a href="tel:800-232-4636" style={linkStyle}>800-232-4636</a>
      </div>
    </footer>
  );
};

export default CDCFooter;
