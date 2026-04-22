import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const primaryNavButtonStyle = {
  background: 'none',
  border: 'none',
  fontFamily: 'var(--font-body)',
  fontWeight: '600',
  fontSize: '14px',
  cursor: 'pointer',
  padding: 0,
};

const CDCHeader = ({ goToHomeSection, scrollToSection, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useNavigate();

  const goTo = (destination) => {
    if (destination === 'home') {
      navigate('/');
    } else if (destination === 'about') navigate('/about');
    else if (destination === 'resources') navigate('/resources');
    else if (destination === 'support') navigate('/support');
    else if (destination === 'for-practitioners') navigate('/for-practitioners');
    else if (destination === 'get-started') navigate('/get-started');
    else if (destination === 'lifestyle-programs') navigate('/lifestyle-programs');
    else if (goToHomeSection && typeof goToHomeSection === 'function') {
      goToHomeSection(destination);
    } else if (scrollToSection && typeof scrollToSection === 'function') {
      scrollToSection(destination);
    } else {
      const el = document.getElementById(destination);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top info bar — light blue */}
      <div style={{
        backgroundColor: 'var(--gov-bar)',
        fontSize: '13px',
        padding: '8px 0',
        color: 'var(--ink)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{ fontFamily: 'var(--font-body)', color: 'var(--ink)' }}>
            An official website of the United States government
          </span>
          <button type="button" style={{
            background: 'none',
            border: 'none',
            color: 'var(--ink)',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '13px',
            padding: 0,
            fontFamily: 'var(--font-body)',
          }}>
            Here's how you know
          </button>
        </div>
      </div>

      {/* Main nav — solid white */}
      <header style={{
        backgroundColor: '#FFFFFF',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 1px 0 rgba(45, 59, 66, 0.06)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link
            to="/"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: '700',
              fontSize: isMobile ? '18px' : '20px',
              color: 'var(--ink)',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
            }}
          >
            Path2Prevention
          </Link>

          <nav style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: '18px' }}>
            <Link to="/about" className="header-nav-text-link">About</Link>
            <Link to="/resources" className="header-nav-text-link">Learn More</Link>
            <Link to="/support" className="header-nav-text-link">Take Action</Link>
            <Link to="/for-practitioners" className="header-nav-text-link">For Practitioners</Link>
            <Link
              to="/lifestyle-programs"
              className="btn btn-secondary"
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
              }}
            >
              Find a Program
            </Link>
            <Link
              to="/get-started"
              className="btn btn-primary"
              style={{
                ...primaryNavButtonStyle,
                padding: '10px 20px',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'white',
                backgroundColor: 'var(--coral)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              GET STARTED
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: isMobile ? 'block' : 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
            }}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--ink)">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            boxShadow: '0 4px 6px rgba(0,0,0,0.08)',
            zIndex: 999,
            padding: '16px 24px',
          }}>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="header-nav-text-link header-nav-text-link--drawer">About</Link>
            <Link to="/resources" onClick={() => setIsMenuOpen(false)} className="header-nav-text-link header-nav-text-link--drawer">Learn More</Link>
            <Link to="/support" onClick={() => setIsMenuOpen(false)} className="header-nav-text-link header-nav-text-link--drawer">Take Action</Link>
            <Link to="/for-practitioners" onClick={() => setIsMenuOpen(false)} className="header-nav-text-link header-nav-text-link--drawer">For Practitioners</Link>
            <Link to="/lifestyle-programs" onClick={() => setIsMenuOpen(false)} className="btn btn-secondary" style={{ display: 'block', width: '100%', marginTop: 8, textAlign: 'center', textDecoration: 'none' }}>Find a Program</Link>
            <Link to="/get-started" onClick={() => setIsMenuOpen(false)} className="btn btn-primary" style={{ display: 'block', width: '100%', marginTop: 8, textAlign: 'center', textDecoration: 'none', color: 'white' }}>GET STARTED</Link>
          </div>
        )}
      </header>
    </>
  );
};

export default CDCHeader;
