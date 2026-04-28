import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LearningCategoryPageLayout = ({ categoryLabel, categoryPath, pageSequence, title, children }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentIndex = pageSequence.findIndex((p) => p.path === location.pathname);
  const nextPage = currentIndex >= 0
    ? pageSequence[(currentIndex + 1) % pageSequence.length]
    : pageSequence[0];

  return (
    <div style={{ backgroundColor: 'white', minHeight: '80vh' }}>
      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: isMobile ? '2rem 1rem' : '3rem 2rem',
        }}
      >
        <nav
          style={{
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--ink-70)',
          }}
          aria-label="Breadcrumb"
        >
          <Link to="/" style={{ color: 'var(--ink-70)', textDecoration: 'none' }}>
            Home
          </Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link to="/learn" style={{ color: 'var(--ink-70)', textDecoration: 'none' }}>
            Learn More
          </Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link to={categoryPath} style={{ color: 'var(--ink-70)', textDecoration: 'none' }}>
            {categoryLabel}
          </Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{title}</span>
        </nav>

        <span
          style={{
            display: 'inline-block',
            backgroundColor: '#FFEDE9',
            color: '#DC5A42',
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '0.05em',
            padding: '0.4rem 1.125rem',
            borderRadius: 'var(--radius-pill)',
            marginBottom: '1.25rem',
            fontFamily: 'var(--font-body)',
            textTransform: 'uppercase',
          }}
        >
          {categoryLabel}
        </span>

        <h1
          style={{
            fontSize: isMobile ? '2.25rem' : '3rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: '600',
            color: '#333333',
            lineHeight: 1.15,
            margin: '0 0 1.5rem 0',
          }}
        >
          {title}
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          {pageSequence.map((page) => {
            const isActive = page.path === location.pathname;
            return (
              <Link
                key={page.path}
                to={page.path}
                style={{
                  minHeight: 112,
                  border: isActive ? '2px solid #E05A4D' : '1px solid #e5e5e5',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  backgroundColor: isActive ? '#FFEDE9' : 'white',
                  color: isActive ? '#DC5A42' : 'var(--ink)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  lineHeight: 1.35,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'flex-end',
                  boxShadow: isActive ? '0 10px 24px rgba(224, 90, 77, 0.12)' : 'none',
                }}
              >
                {page.title}
              </Link>
            );
          })}
        </div>

        {children}

        <div
          style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e5e5e5',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Link
            to={nextPage.path}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#E05A4D',
              color: 'white',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '0.875rem 1.5rem',
              borderRadius: 30,
              textDecoration: 'none',
            }}
          >
            {nextPage.title}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LearningCategoryPageLayout;
