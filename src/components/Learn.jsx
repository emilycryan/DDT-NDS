import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const educationalCards = [
  {
    bgColor: '#E05A4D',
    badgeBg: '#FBE0D7',
    badgeColor: '#c0392b',
    badgeLabel: 'Diabetes Prevention',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    title: 'Diabetes Prevention',
    description:
      "Over 96 million American adults have prediabetes — and most don't know it. Learn how modest weight loss and regular physical activity can lower your chances of type 2 diabetes by more than 50%.",
    bullets: [
      { text: 'Understanding Prediabetes', path: '/learn/prediabetes/understanding-prediabetes' },
      { text: 'Nutrition & Blood Sugar', path: '/learn/prediabetes/nutrition-blood-sugar' },
      { text: 'Physical Activity & Insulin Sensitivity', path: '/learn/prediabetes/physical-activity-insulin-sensitivity' },
      { text: 'National DPP LCP Overview', path: '/learn/prediabetes/dpp-program-overview' },
    ],
    linkText: 'Explore diabetes resources →',
    linkHref: '/learn/prediabetes/understanding-prediabetes',
  },
  {
    bgColor: '#2D363D',
    badgeBg: '#B0B5BA',
    badgeColor: '#2D363D',
    badgeLabel: 'Heart Health',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: 'Heart Health',
    description:
      'Heart disease is the leading cause of death in the United States. Discover how lifestyle choices around nutrition, physical activity, stress, and sleep can measurably support heart health — at any age.',
    bullets: [
      { text: 'Know Your Numbers', path: '/learn/heart-health/know-your-numbers' },
      { text: 'Blood Pressure & Cholesterol', path: '/learn/heart-health/blood-pressure-cholesterol' },
      { text: 'Heart-Healthy Eating', path: '/learn/heart-health/heart-healthy-eating' },
      { text: 'Stress & Heart Health', path: '/learn/heart-health/stress-and-heart-health' },
    ],
    linkText: 'Explore heart health resources →',
    linkHref: '/learn/heart-health/know-your-numbers',
  },
  {
    bgColor: '#1f9660',
    badgeBg: 'rgba(255,255,255,0.22)',
    badgeColor: 'white',
    badgeLabel: 'Healthy Living',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Overall Healthy Living',
    description:
      "Prevention isn't one thing — it's a combination of daily habits. Find practical guidance on nutrition, physical activity, sleep, stress management, and social well-being that fit real life.",
    bullets: [
      { text: 'Building Healthy Habits', path: '/learn/healthy-living/building-healthy-habits' },
      { text: 'Sleep & Recovery', path: '/learn/healthy-living/sleep-recovery' },
      { text: 'Mental Health & Resilience', path: '/learn/healthy-living/mental-health-resilience' },
      { text: 'Social Connection', path: '/learn/healthy-living/social-connection' },
    ],
    linkText: 'Explore healthy living guides →',
    linkHref: '/learn/healthy-living/building-healthy-habits',
  },
];

const Learn = ({ onNavigate }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ minHeight: '80vh', backgroundColor: 'white' }}>
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
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Learn More</span>
        </nav>

        {/* Hero Section */}
        <section style={{ marginBottom: '3rem' }}>
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
            Learn More
          </span>

          <h1
            style={{
              fontSize: isMobile ? '2.25rem' : '3rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: '600',
              color: '#333333',
              lineHeight: 1.15,
              margin: '0 0 0.5rem 0',
            }}
          >
            Learn More
          </h1>

          <p
            style={{
              fontSize: '1.125rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              color: '#555555',
              lineHeight: 1.5,
              margin: '0 0 0.75rem 0',
            }}
          >
            Evidence-based information to support your health journey
          </p>

          <p
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#555555',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Explore guides, videos, and expert resources to understand and prevent chronic diseases.
          </p>
        </section>

        {/* Educational Resources Section */}
        <section>
          <h2
            style={{
              fontSize: isMobile ? '1.75rem' : '2rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: '600',
              color: '#333333',
              margin: '0 0 0.5rem 0',
            }}
          >
            Educational Resources
          </h2>

          <p
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#555555',
              lineHeight: 1.5,
              margin: '0 0 1.5rem 0',
            }}
          >
            Evidence-based guides covering the most common preventable chronic conditions.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '1.5rem',
              marginBottom: '0.5rem',
            }}
          >
            {educationalCards.map((card, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: card.bgColor,
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 0.5px, transparent 1px)',
                  backgroundSize: '24px 24px',
                  borderRadius: 'var(--radius-lg)',
                  padding: isMobile ? '1.5rem' : '1.25rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: card.badgeBg,
                    color: card.badgeColor,
                    fontSize: '0.65rem',
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    padding: '0.3rem 0.7rem',
                    borderRadius: 'var(--radius-pill)',
                    marginBottom: '0.85rem',
                    fontFamily: 'var(--font-body)',
                    textTransform: 'uppercase',
                    alignSelf: 'flex-start',
                  }}
                >
                  {card.icon}
                  {card.badgeLabel}
                </span>

                <h3
                  style={{
                    fontSize: isMobile ? '1.35rem' : 'clamp(1.2rem, 2.1vw, 1.5rem)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    color: 'white',
                    margin: '0 0 0.65rem 0',
                    lineHeight: 1.2,
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.8125rem',
                    fontFamily: 'var(--font-body)',
                    color: 'rgba(255,255,255,0.88)',
                    lineHeight: 1.55,
                    margin: '0 0 1rem 0',
                  }}
                >
                  {card.description}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    paddingLeft: 0,
                    margin: '0 0 1.25rem 0',
                    fontSize: '0.8125rem',
                    fontFamily: 'var(--font-body)',
                    color: 'rgba(255,255,255,0.82)',
                    lineHeight: 1.6,
                  }}
                >
                  {card.bullets.map((bullet, j) => (
                    <li key={j} style={{ marginBottom: '0.25rem', paddingLeft: '1.25rem', position: 'relative' }}>
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '0.65em',
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255,255,255,0.6)',
                          display: 'inline-block',
                        }}
                      />
                      <Link to={bullet.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {bullet.text}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  to={card.linkHref || '#'}
                  style={{
                    marginTop: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'white',
                    color: card.bgColor,
                    border: 'none',
                    borderRadius: 30,
                    padding: '0.55rem 1rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: '600',
                    fontSize: '0.8125rem',
                    textDecoration: 'none',
                    alignSelf: 'flex-start',
                  }}
                >
                  {card.linkText.replace(' →', '')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Learn With Video Section */}
        <section style={{ marginTop: '2rem', marginBottom: 0, paddingBottom: 0 }}>
          <h2
            style={{
              fontSize: isMobile ? '1.75rem' : '2rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: '600',
              color: '#333333',
              margin: '0 0 0.5rem 0',
            }}
          >
            Learn With Video
          </h2>
          <p
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#555555',
              lineHeight: 1.5,
              margin: '0 0 1.5rem 0',
            }}
          >
            CDC educational videos to help you understand how to manage prediabetes as part of a chronic disease prevention approach.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '1rem',
            }}
          >
            {[
              { title: 'Meet Lisa: Preventing Prediabetes', href: 'https://www.youtube.com/watch?v=azKL5xutMJE' },
              { title: 'Imagine: You + National DPP', href: 'https://www.youtube.com/watch?v=k_XoHSIG20U&t=2s' },
              { title: 'Sneak Peek into the Lifestyle Change Program', href: 'https://www.youtube.com/watch?v=w0NDVI4M_Bs' },
            ].map((video, i) => (
              <a
                key={i}
                href={video.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 1.25rem',
                  backgroundColor: 'white',
                  border: '1px solid #e5e5e5',
                  borderRadius: 12,
                  textDecoration: 'none',
                  transition: 'box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: '#F45E4C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 2 }}>
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: '#EF4623',
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  {video.title}
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Learn;

