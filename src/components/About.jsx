import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const featureItems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Trusted Information',
    description: 'Clear, evidence-based guidance on many chronic conditions affecting Americans today.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <path d="M12 18h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Interactive Tools',
    description: 'Short question flows, videos, and checklists that help you understand your health picture and take the next step.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Lifestyle Change Programs',
    description: 'Access to local and virtual resources that support lasting behavior change.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Stories and Learning',
    description: 'Real-world examples of people making changes that work for them.',
  },
];

const focusAreas = [
  'Nutrition',
  'Physical Activity',
  'Stress Management',
  'Sleep',
  'Social Connection',
];

const About = ({ onNavigate }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGetStarted = () => {
    if (onNavigate) onNavigate('get-started');
  };

  const handleExploreResources = () => {
    if (onNavigate) onNavigate('learn');
  };

  const sidebar = (
    <aside
      style={{
        flexShrink: 0,
        width: isMobile ? '100%' : '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        position: isMobile ? 'static' : 'sticky',
        top: 100,
        alignSelf: 'flex-start',
      }}
    >
      {/* Ready to start? */}
      <div
        style={{
          backgroundColor: 'var(--ink)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: '600',
            fontSize: '1.25rem',
            color: 'white',
            margin: '0 0 0.5rem 0',
          }}
        >
          Ready to start?
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.5,
            margin: '0 0 1.25rem 0',
          }}
        >
          Answer a few questions and begin your personalized prevention journey.
        </p>
        <button
          type="button"
          onClick={handleGetStarted}
          className="btn btn-primary"
          style={{ width: '100%', marginBottom: '0.75rem' }}
        >
          Get Started
        </button>
        <button
          type="button"
          onClick={handleExploreResources}
          style={{
            width: '100%',
            fontFamily: 'var(--font-body)',
            fontWeight: '600',
            fontSize: '1rem',
            padding: '0.75rem 1.5rem',
            borderRadius: 30,
            border: '1px solid rgba(255,255,255,0.4)',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            color: 'rgba(255,255,255,0.9)',
            transition: 'background-color 0.2s ease, border-color 0.2s ease',
          }}
        >
          Explore Learn More
        </button>
      </div>

      {/* Focus Areas */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          border: '1px solid rgba(45, 59, 66, 0.1)',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: '600',
            fontSize: '1.25rem',
            color: 'var(--ink)',
            margin: '0 0 1rem 0',
          }}
        >
          Focus Areas
        </h3>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {focusAreas.map((area, i) => (
            <li
              key={i}
              style={{
                paddingLeft: '1.25rem',
                position: 'relative',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'var(--ink-70)',
                lineHeight: 1.5,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '0.5rem',
                  width: 6,
                  height: 6,
                  backgroundColor: 'var(--coral)',
                  borderRadius: '50%',
                }}
              />
              {area}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
      }}
    >
      {/* Breadcrumbs */}
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
        <span style={{ color: 'var(--ink)', fontWeight: 600 }}>About</span>
      </nav>

      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '2rem' : '3rem',
          alignItems: 'flex-start',
        }}
      >
        {/* Main content */}
        <article style={{ flex: 1, minWidth: 0 }}>
          {/* Section tag */}
          <span
            style={{
              display: 'inline-block',
              backgroundColor: '#FFEDE9',
              color: '#DC5A42',
              fontSize: '0.75rem',
              fontWeight: '500',
              letterSpacing: '0.05em',
              padding: '0.4rem 1.125rem',
              borderRadius: 'var(--radius-pill)',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
            }}
          >
            About this Site
          </span>

          <h1
            style={{
              fontSize: isMobile ? '2.25rem' : '3rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: '600',
              color: '#333333',
              lineHeight: 1.15,
              margin: '0 0 0.75rem 0',
            }}
          >
            About this Site
          </h1>

          <p
            style={{
              fontSize: '1.125rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              color: '#555555',
              lineHeight: 1.5,
              margin: '0 0 1.5rem 0',
            }}
          >
            Prevention is powerful. Here's why we built this.
          </p>

          <div
            style={{
              fontSize: '1.125rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
            }}
          >
            <p style={{ marginBottom: '1.5rem' }}>
              This site exists to help people take charge of their health before chronic conditions take hold. Too often, conditions like diabetes, heart disease, obesity, depression, and others are only addressed once symptoms appear. But research is clear: small, sustained lifestyle changes—made early—can prevent or delay the onset of many of the most common and costly health challenges.
            </p>

            <p style={{ marginBottom: '2rem' }}>
              Our goal is to make prevention practical. We bring together resources, tools, and stories that support everyday choices in areas like nutrition, physical activity, stress management, sleep, and social connection. Whether you are a busy parent, a caregiver, a health professional, or someone simply curious about your own health, this site is designed to meet you where you are.
            </p>

            <h2
              style={{
                fontSize: '1.5rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: '600',
                color: 'var(--ink)',
                marginBottom: '1.25rem',
                marginTop: 0,
              }}
            >
              Here you'll find:
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {featureItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--soft-peach)',
                    alignItems: 'flex-start',
                    boxShadow: '0 1px 3px rgba(239, 70, 35, 0.06)',
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      minWidth: 48,
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--coral)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: '700',
                        fontSize: '1.0625rem',
                        color: 'var(--ink)',
                        margin: '0 0 0.25rem 0',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        color: 'var(--ink-70)',
                        lineHeight: 1.55,
                        margin: 0,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ marginBottom: '1.5rem' }}>
              This initiative reflects a simple truth: prevention is powerful. By addressing health concerns before conditions appear, we can improve quality of life, reduce healthcare costs, and build healthier families and communities.
            </p>

            <p
              style={{
                fontSize: '1.25rem',
                fontWeight: '500',
                color: 'var(--coral)',
                marginTop: '2rem',
                marginBottom: 0,
              }}
            >
              Every visit to this site is a step toward health that lasts.
            </p>
          </div>
        </article>

        {/* Sidebar - desktop: sticky, mobile: below content */}
        {!isMobile && sidebar}
      </div>

      {/* Mobile: render sidebar below content */}
      {isMobile && (
        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(45,59,66,0.1)' }}>
          {sidebar}
        </div>
      )}
    </div>
  );
};

export default About;
