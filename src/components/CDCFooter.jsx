import React, { useState, useEffect } from 'react';

const CDCFooter = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Main Footer - Dark Bar */}
      <footer style={{
        backgroundColor: '#2c3e50',
        color: '#fff',
        padding: '40px 0 20px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          {/* Top Section with About CDC and Social Media */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '20px',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            {/* About CDC Section */}
            <div style={{ 
              flex: '1', 
              minWidth: isMobile ? '100%' : '300px' 
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '15px',
                color: '#fff'
              }}>
                About CDC
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#bdc3c7',
                marginBottom: '15px'
              }}>
                CDC works 24/7 to protect America from health, safety and security threats, both foreign and domestic. Whether diseases start at home or abroad, are chronic or acute, curable or preventable, human error or deliberate attack, CDC fights disease and supports communities and citizens to do the same.
              </p>
              <a href="#" style={{
                color: '#3498db',
                textDecoration: 'none',
                fontSize: '14px'
              }}>
                Learn more about CDC →
              </a>
            </div>

            {/* Social Media Section */}
            <div style={{ 
              flex: '0 0 auto',
              width: isMobile ? '100%' : 'auto'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '15px',
                color: '#fff'
              }}>
                Connect with CDC
              </h3>
              <div style={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
                justifyContent: isMobile ? 'flex-start' : 'center',
                flexWrap: 'wrap'
              }}>
                {/* Facebook */}
                <a href="#" style={{
                  color: 'white',
                  textDecoration: 'none',
                  display: 'block'
                }} aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* Twitter/X */}
                <a href="#" style={{
                  color: 'white',
                  textDecoration: 'none',
                  display: 'block'
                }} aria-label="Twitter">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#" style={{
                  color: 'white',
                  textDecoration: 'none',
                  display: 'block'
                }} aria-label="YouTube">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" style={{
                  color: 'white',
                  textDecoration: 'none',
                  display: 'block'
                }} aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" style={{
                  color: 'white',
                  textDecoration: 'none',
                  display: 'block'
                }} aria-label="LinkedIn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                {/* Email */}
                <a href="#" style={{
                  color: 'white',
                  textDecoration: 'none',
                  display: 'block'
                }} aria-label="Email Updates">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.342L12 10.77l10.022-6.949h.342c.904 0 1.636.732 1.636 1.636Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile 
              ? '1fr' 
              : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: isMobile ? '20px' : '30px',
            marginBottom: '30px',
            borderTop: '1px solid #34495e',
            paddingTop: '30px'
          }}>
            {/* Column 1 */}
            <div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: '#bdc3c7',
                    textDecoration: 'none',
                    fontSize: '14px',
                    ':hover': { color: '#3498db' }
                  }}>
                    About CDC
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: '#bdc3c7',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Jobs
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: '#bdc3c7',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Funding
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: '#bdc3c7',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Policies
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: '#bdc3c7',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    File Viewers & Players
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: '#bdc3c7',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Privacy
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: '#bdc3c7',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    FOIA
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: '#bdc3c7',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    No Fear Act
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: '#bdc3c7',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    OIG
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: '#bdc3c7',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Nondiscrimination
                  </a>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <a href="#" style={{
                    color: '#bdc3c7',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div style={{
            textAlign: 'center',
            paddingTop: '20px',
            borderTop: '1px solid #34495e',
            fontSize: '14px',
            color: '#95a5a6'
          }}>
            <p style={{ margin: 0 }}>
              U.S. Department of Health & Human Services | CDC
            </p>
            <p style={{ margin: '5px 0 0 0' }}>
              Page last reviewed: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CDCFooter;
