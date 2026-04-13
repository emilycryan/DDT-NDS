import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const educationalCards = [
  {
    accentColor: '#E05A4D',
    iconBgColor: '#FDE8E5',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
      </svg>
    ),
    title: 'Diabetes Prevention',
    description: 'Over 96 million American adults have prediabetes — and most don\'t know it. Learn how modest weight loss and regular physical activity can lower your chances of type 2 diabetes by more than 50%.',
    bullets: [
      { text: 'Understanding Prediabetes', path: '/resources/prediabetes/understanding-prediabetes' },
      { text: 'Nutrition & Blood Sugar', path: '/resources/prediabetes/nutrition-blood-sugar' },
      { text: 'Physical Activity & Insulin Sensitivity', path: '/resources/prediabetes/physical-activity-insulin-sensitivity' },
      { text: 'National DPP LCP Overview', path: '/resources/prediabetes/dpp-program-overview' },
    ],
    linkText: 'Explore diabetes resources →',
    linkHref: '/resources/prediabetes/understanding-prediabetes',
  },
  {
    accentColor: '#3C4449',
    iconBgColor: '#E8E8E8',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Heart Health',
    description: 'Heart disease is the leading cause of death in the United States. Discover how lifestyle choices around nutrition, physical activity, stress, and sleep can measurably support heart health — at any age.',
    bullets: [
      { text: 'Know Your Numbers', path: '/resources/heart-health/know-your-numbers' },
      { text: 'Blood Pressure & Cholesterol', path: '/resources/heart-health/blood-pressure-cholesterol' },
      { text: 'Heart-Healthy Eating', path: '/resources/heart-health/heart-healthy-eating' },
      { text: 'Stress & Heart Health', path: '/resources/heart-health/stress-and-heart-health' },
    ],
    linkText: 'Explore heart health resources →',
    linkHref: '/resources/heart-health/know-your-numbers',
  },
  {
    accentColor: '#1f9660',
    iconBgColor: '#e8f4ef',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Overall Healthy Living',
    description: 'Prevention isn\'t one thing — it\'s a combination of daily habits. Find practical guidance on nutrition, physical activity, sleep, stress management, and social well-being that fit real life.',
    bullets: [
      { text: 'Building Healthy Habits', path: '/resources/healthy-living/building-healthy-habits' },
      { text: 'Sleep & Recovery', path: '/resources/healthy-living/sleep-recovery' },
      { text: 'Mental Health & Resilience', path: '/resources/healthy-living/mental-health-resilience' },
      { text: 'Social Connection', path: '/resources/healthy-living/social-connection' },
    ],
    linkText: 'Explore healthy living guides →',
    linkHref: '/resources/healthy-living/building-healthy-habits',
  },
];

const Resources = ({ onNavigate }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Compact hero cards — three across on desktop */
  const heroPad = isMobile ? '1.5rem' : '1.25rem 1.1rem';
  const heroTitle = isMobile ? '1.35rem' : 'clamp(1.2rem, 2.1vw, 1.5rem)';
  const heroBody = '0.8125rem';
  const heroBadgeMb = '0.85rem';
  const heroPMb = '1rem';

  return (
    <div style={{ minHeight: '80vh', backgroundColor: 'white' }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
      }}>
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
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Resources</span>
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
            Prevention Resources
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
            Prevention Resources
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
            Tools and information to support your health journey
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
            Access evidence-based resources, programs, and tools to help prevent chronic diseases and maintain a healthy lifestyle.
          </p>
        </section>

        {/* Three interactive hero cards (compact, one row on desktop) */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          {/* Left — Find a Lifestyle Change Program */}
          <div
            style={{
              backgroundColor: '#2D363D',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 0.5px, transparent 1px)',
              backgroundSize: '24px 24px',
              borderRadius: 'var(--radius-lg)',
              padding: heroPad,
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onClick={() => onNavigate?.('lifestyle-programs')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
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
                backgroundColor: '#B0B5BA',
                color: '#2D363D',
                fontSize: '0.65rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                padding: '0.3rem 0.7rem',
                borderRadius: 'var(--radius-pill)',
                marginBottom: heroBadgeMb,
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Programs Near You
            </span>

            <h2
              style={{
                fontSize: heroTitle,
                fontFamily: 'var(--font-serif)',
                fontWeight: '600',
                color: 'white',
                margin: '0 0 0.65rem 0',
                lineHeight: 1.2,
              }}
            >
              Find a Lifestyle Change Program
            </h2>

            <p
              style={{
                fontSize: heroBody,
                fontFamily: 'var(--font-body)',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.55,
                margin: `0 0 ${heroPMb} 0`,
              }}
            >
              CDC-recognized Lifestyle Change Intervention (LCI) programs are proven to lower the chances of type 2 diabetes and other chronic conditions. Find a program in your community or online that fits your schedule and lifestyle.
            </p>

            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'white',
                color: '#2D363D',
                border: 'none',
                borderRadius: 30,
                padding: '0.55rem 1rem',
                fontFamily: 'var(--font-body)',
                fontWeight: '600',
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              Search Programs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Center — Create a Plan (Action Plan) */}
          <div
            style={{
              backgroundColor: '#007833',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 0.5px, transparent 1px)',
              backgroundSize: '24px 24px',
              borderRadius: 'var(--radius-lg)',
              padding: heroPad,
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onClick={() => onNavigate?.('action-plan')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 119, 51, 0.35)';
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
                backgroundColor: 'rgba(255,255,255,0.22)',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                padding: '0.3rem 0.7rem',
                borderRadius: 'var(--radius-pill)',
                marginBottom: heroBadgeMb,
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Guided Plan
            </span>

            <h2
              style={{
                fontSize: heroTitle,
                fontFamily: 'var(--font-serif)',
                fontWeight: '600',
                color: 'white',
                margin: '0 0 0.65rem 0',
                lineHeight: 1.2,
              }}
            >
              Plan My Path
            </h2>

            <p
              style={{
                fontSize: heroBody,
                fontFamily: 'var(--font-body)',
                color: 'rgba(255,255,255,0.95)',
                lineHeight: 1.55,
                margin: `0 0 ${heroPMb} 0`,
              }}
            >
              Build a personalized, step-by-step Action Plan that captures your motivators, logistics, and class preferences — then take it with you when you connect with a program.
            </p>

            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'white',
                color: '#007833',
                border: 'none',
                borderRadius: 30,
                padding: '0.55rem 1rem',
                fontFamily: 'var(--font-body)',
                fontWeight: '600',
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              Create Plan
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Right — Get started questions */}
          <div
            style={{
              backgroundColor: '#F35831',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 0.5px, transparent 1px)',
              backgroundSize: '24px 24px',
              borderRadius: 'var(--radius-lg)',
              padding: heroPad,
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onClick={() => onNavigate?.('get-started')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(239, 70, 35, 0.35)';
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
                backgroundColor: '#FBE0D7',
                color: '#F35831',
                fontSize: '0.65rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                padding: '0.3rem 0.7rem',
                borderRadius: 'var(--radius-pill)',
                marginBottom: heroBadgeMb,
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
              </svg>
              Free • 10 Minutes
            </span>

            <h2
              style={{
                fontSize: heroTitle,
                fontFamily: 'var(--font-serif)',
                fontWeight: '600',
                color: 'white',
                margin: '0 0 0.65rem 0',
                lineHeight: 1.2,
              }}
            >
              Answer a Few Questions
            </h2>

            <p
              style={{
                fontSize: heroBody,
                fontFamily: 'var(--font-body)',
                color: 'rgba(255,255,255,0.95)',
                lineHeight: 1.55,
                margin: `0 0 ${heroPMb} 0`,
              }}
            >
              Not sure where to start? Our free, confidential questions help you understand how your health picture relates to conditions like type 2 diabetes, heart disease, and more — and point you toward the right resources.
            </p>

            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'white',
                color: '#F35831',
                border: 'none',
                borderRadius: 30,
                padding: '0.55rem 1rem',
                fontFamily: 'var(--font-body)',
                fontWeight: '600',
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
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
            }}
          >
            {educationalCards.map((card, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  border: '1px solid #e5e5e5',
                  borderTop: `3px solid ${card.accentColor}`,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: card.iconBgColor,
                    color: card.accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  {card.icon}
                </div>

                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    color: '#2e2e2e',
                    margin: '0 0 0.75rem 0',
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.9375rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    color: '#6B7280',
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
                    margin: '0 0 1rem 0',
                    fontSize: '0.9375rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    color: '#6B7280',
                    lineHeight: 1.6,
                  }}
                >
                  {card.bullets.map((bullet, j) => (
                    <li key={j} style={{ marginBottom: '0.25rem', paddingLeft: '1.25rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: '0.65em', width: 6, height: 6, borderRadius: '50%', backgroundColor: '#9CA3AF', display: 'inline-block' }} />
                      <Link
                        to={bullet.path}
                        style={{
                          color: 'inherit',
                          textDecoration: 'none',
                        }}
                      >
                        {bullet.text}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  to={card.linkHref || '#'}
                  style={{
                    marginTop: 'auto',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: card.accentColor,
                    textDecoration: 'none',
                  }}
                >
                  {card.linkText}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources;
