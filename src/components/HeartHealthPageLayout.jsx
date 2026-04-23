import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PAGE_SEQUENCE = [
  { path: '/learn/heart-health/know-your-numbers', title: 'Know Your Numbers' },
  { path: '/learn/heart-health/blood-pressure-cholesterol', title: 'Blood Pressure & Cholesterol' },
  { path: '/learn/heart-health/heart-healthy-eating', title: 'Heart-Healthy Eating' },
  { path: '/learn/heart-health/stress-and-heart-health', title: 'Stress & Heart Health' },
];

const HeartHealthPageLayout = ({ title, children }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentIndex = PAGE_SEQUENCE.findIndex((p) => p.path === location.pathname);
  const nextPage = currentIndex >= 0
    ? PAGE_SEQUENCE[(currentIndex + 1) % PAGE_SEQUENCE.length]
    : PAGE_SEQUENCE[0];

  const sectionStyles = {
    maxWidth: 1200,
    margin: '0 auto',
    padding: isMobile ? '2rem 1rem' : '3rem 2rem',
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '80vh' }}>
      <section style={sectionStyles}>
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
          <Link to="/learn/heart-health/know-your-numbers" style={{ color: 'var(--ink-70)', textDecoration: 'none' }}>
            Heart Health
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
          Heart Health
        </span>

        <h1
          style={{
            fontSize: isMobile ? '2.25rem' : '3rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: '600',
            color: '#333333',
            lineHeight: 1.15,
            margin: '0 0 1rem 0',
          }}
        >
          {title}
        </h1>

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
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HeartHealthPageLayout;
