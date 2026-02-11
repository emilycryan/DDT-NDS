import React, { useState, useEffect } from 'react';

const CDCHeader = ({ onNavigate, goToHomeSection, scrollToSection, currentPage }) => {
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

  const goTo = (target) => {
    if (['about', 'resources', 'support', 'for-practitioners', 'home', 'risk-assessment', 'lifestyle-programs'].includes(target) && onNavigate) {
      onNavigate(target);
    } else if (goToHomeSection && typeof goToHomeSection === 'function') {
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
          <div
            onClick={() => goTo('home')}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
            }}
          >
            <img src="/cdc-round.png" alt="CDC" style={{ height: isMobile ? '36px' : '40px', width: 'auto', display: 'block' }} />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontWeight: '700',
              fontSize: isMobile ? '18px' : '20px',
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
            }}>
              Path2Prevention
            </span>
          </div>

          <nav style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: '32px' }}>
            <button type="button" onClick={() => goTo('about')} style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: '600',
              fontSize: '14px',
              color: 'var(--ink)',
              cursor: 'pointer',
              padding: 0,
            }}>
              About
            </button>
            <button type="button" onClick={() => goTo('resources')} style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: '600',
              fontSize: '14px',
              color: 'var(--ink)',
              cursor: 'pointer',
              padding: 0,
            }}>
              Resources
            </button>
            <button type="button" onClick={() => goTo('support')} style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: '600',
              fontSize: '14px',
              color: 'var(--ink)',
              cursor: 'pointer',
              padding: 0,
            }}>
              Support
            </button>
            <button type="button" onClick={() => goTo('for-practitioners')} style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: '600',
              fontSize: '14px',
              color: 'var(--ink)',
              cursor: 'pointer',
              padding: 0,
            }}>
              For Practitioners
            </button>
            <button
              type="button"
              onClick={() => goTo('risk-assessment')}
              className="btn btn-primary"
              style={{
                padding: '10px 20px',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              GET STARTED
            </button>
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
            <button type="button" onClick={() => goTo('about')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer' }}>About</button>
            <button type="button" onClick={() => goTo('resources')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer' }}>Resources</button>
            <button type="button" onClick={() => goTo('support')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer' }}>Support</button>
            <button type="button" onClick={() => goTo('for-practitioners')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 0', fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--ink)', background: 'none', border: 'none', cursor: 'pointer' }}>For Practitioners</button>
            <button type="button" onClick={() => goTo('risk-assessment')} className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>GET STARTED</button>
          </div>
        )}
      </header>
    </>
  );
};

export default CDCHeader;
