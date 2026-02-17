import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const navLinkStyle = {
  background: 'none',
  border: 'none',
  fontFamily: 'var(--font-body)',
  fontWeight: '600',
  fontSize: '14px',
  color: 'var(--ink)',
  cursor: 'pointer',
  padding: 0,
  textDecoration: 'none',
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

  const goTo = (target) => {
    if (target === 'home') {
      navigate('/');
    } else if (target === 'about') navigate('/about');
    else if (target === 'resources') navigate('/resources');
    else if (target === 'support') navigate('/support');
    else if (target === 'for-practitioners') navigate('/for-practitioners');
    else if (target === 'risk-assessment') navigate('/get-started');
    else if (target === 'lifestyle-programs') navigate('/lifestyle-programs');
    else if (goToHomeSection && typeof goToHomeSection === 'function') {
      goToHomeSection(target);
    } else if (scrollToSection && typeof scrollToSection === 'function') {
      scrollToSection(target);
    } else {
      const el = document.getElementById(target);
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
            CDC Path2Prevention
          </Link>

          <nav style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: '32px' }}>
            <Link to="/about" style={navLinkStyle}>About</Link>
            <Link to="/resources" style={navLinkStyle}>Resources</Link>
            <Link to="/support" style={navLinkStyle}>Support</Link>
            <Link to="/for-practitioners" style={navLinkStyle}>For Practitioners</Link>
            <Link
              to="/get-started"
              className="btn btn-primary"
              style={{
                ...navLinkStyle,
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
            <Link to="/about" onClick={() => setIsMenuOpen(false)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--ink)', textDecoration: 'none' }}>About</Link>
            <Link to="/resources" onClick={() => setIsMenuOpen(false)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--ink)', textDecoration: 'none' }}>Resources</Link>
            <Link to="/support" onClick={() => setIsMenuOpen(false)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--ink)', textDecoration: 'none' }}>Support</Link>
            <Link to="/for-practitioners" onClick={() => setIsMenuOpen(false)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--ink)', textDecoration: 'none' }}>For Practitioners</Link>
            <Link to="/get-started" onClick={() => setIsMenuOpen(false)} className="btn btn-primary" style={{ display: 'block', width: '100%', marginTop: 8, textAlign: 'center', textDecoration: 'none', color: 'white' }}>GET STARTED</Link>
          </div>
        )}
      </header>
    </>
  );
};

export default CDCHeader;
