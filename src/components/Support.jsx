import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const conditionCards = [
  {
    accentColor: '#E05A4D',
    iconBgColor: '#FDE8E5',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
      </svg>
    ),
    title: 'What Is Type 2 Diabetes?',
    description: 'Overview, common factors, symptoms, and how to stay on top of your health.',
    bullets: ['What prediabetes means', 'Key health factors to watch', 'Screening and diagnosis options', 'Steps you can take today'],
    linkHref: 'https://www.cdc.gov/diabetes/basics/type2.html',
    linkText: 'Explore diabetes resources →',
  },
  {
    accentColor: '#3C4449',
    iconBgColor: '#E8E8E8',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Heart Disease & Stroke',
    description: 'Key facts about prevention, screening, and living well.',
    bullets: ['Know your numbers', 'Blood pressure & cholesterol', 'Heart-healthy eating', 'Stroke warning signs'],
    linkHref: 'https://www.cdc.gov/heartdisease/index.htm',
    linkText: 'Explore heart health resources →',
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
    title: 'Preventing Chronic Disease',
    description: 'Lifestyle steps that support long-term health — from healthy eating to staying active.',
    bullets: ['Building healthy habits', 'Sleep & recovery', 'Mental health & resilience', 'Staying connected socially'],
    linkHref: 'https://www.cdc.gov/chronicdisease/index.htm',
    linkText: 'Explore healthy living guides →',
  },
];

const Support = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sectionStyles = {
    maxWidth: 1200,
    margin: '0 auto',
    padding: isMobile ? '2rem 1rem' : '3rem 2rem',
  };

  const h2Styles = {
    fontSize: isMobile ? '1.5rem' : '1.75rem',
    fontFamily: 'var(--font-serif)',
    fontWeight: '600',
    color: 'var(--ink)',
    marginBottom: '1rem',
    marginTop: '2rem',
  };

  const listItemStyles = {
    marginBottom: '1rem',
    paddingLeft: '1.5rem',
    position: 'relative',
  };

  const bulletStyles = {
    position: 'absolute',
    left: 0,
    top: '0.6rem',
    width: '0.5rem',
    height: '0.5rem',
    backgroundColor: 'var(--coral)',
    borderRadius: '50%',
  };

  const linkStyles = {
    color: 'var(--coral)',
    fontWeight: '600',
    textDecoration: 'none',
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '80vh' }}>
      {/* Top Section */}
      <div style={sectionStyles}>
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
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Take Action</span>
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
          Take Action
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
          Take Action
        </h1>

        <h2
          style={{
            fontSize: '1.25rem',
            fontFamily: 'var(--font-body)',
            fontWeight: '700',
            color: '#333333',
            margin: '0 0 1rem 0',
          }}
        >
          Choose Your Next Step
        </h2>

        <p
          style={{
            fontSize: '1rem',
            fontFamily: 'var(--font-body)',
            color: '#555555',
            lineHeight: 1.6,
            margin: '0 0 1rem 0',
          }}
        >
          Your life is already in motion. Chronic conditions like diabetes, heart disease, and stroke may be part of the path, but they don&apos;t decide where it leads. Use these tools, tips, and connections to take the next step that feels right for you.
        </p>

        {false && (
          <>
            <h3
              style={{
                fontSize: '1.375rem',
                fontFamily: 'var(--font-body)',
                fontWeight: '700',
                color: '#333333',
                margin: '0 0 0.5rem 0',
              }}
            >
              Understand Chronic Conditions
            </h3>
            <p
              style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                color: '#555555',
                lineHeight: 1.6,
                margin: '0 0 1.5rem 0',
              }}
            >
              Learn the basics and find practical steps for prevention and management.
            </p>

            {/* Three Informational Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              {conditionCards.map((card, i) => (
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
                  <h4
                    style={{
                      fontSize: '1.5rem',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 600,
                      color: '#2e2e2e',
                      margin: '0 0 0.75rem 0',
                    }}
                  >
                    {card.title}
                  </h4>
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

                  <a
                    href={card.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
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
                  </a>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content Sections */}
      <section style={{ ...sectionStyles, maxWidth: 1200, backgroundColor: '#F8F7F5', padding: isMobile ? '2rem 1rem' : '3rem 2rem', borderRadius: 'var(--radius-md)' }}>
        <h2 style={{
          fontSize: isMobile ? '1.75rem' : '2rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: '600',
          color: '#333333',
          margin: '0 0 1.5rem 0',
        }}>
          Tools and Resources You Can Use Now
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {/* Left Panel: Interactive tools & question flows */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: 16,
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: '#F45E4C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="14" rx="1"/>
                  <rect x="5" y="5" width="14" height="8"/>
                  <path d="M8 20h8M12 16v4" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.125rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                color: '#333333',
                margin: 0,
              }}>
                Interactive Tools & Quick Questions
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                backgroundColor: '#F7F7F7',
                borderRadius: 12,
                padding: '1rem 1.25rem',
              }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: '#333333', fontSize: '1rem' }}>Quick questions to get started</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#888888', flex: 1, minWidth: 200 }}>
                    See how your answers relate to conditions like diabetes, heart disease, and stroke.
                  </p>
                  <Link
                    to="/get-started"
                    className="btn btn-primary btn--compact-cta"
                    style={{
                      textDecoration: 'none',
                      color: 'var(--text-white)',
                    }}
                  >
                    Get started
                  </Link>
                </div>
              </div>

              <div style={{
                backgroundColor: '#F7F7F7',
                borderRadius: 12,
                padding: '1rem 1.25rem',
              }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: '#333333', fontSize: '1rem' }}>Plan my Path</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#888888', flex: 1, minWidth: 200 }}>
                    Create a personalized Action Plan to support a healthy lifestyle
                  </p>
                  <Link
                    to="/support/action-plan"
                    className="btn btn-secondary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '10px 20px',
                      fontSize: '14px',
                      fontWeight: 600,
                      borderRadius: 'var(--radius-md)',
                      textDecoration: 'none',
                      flexShrink: 0,
                    }}
                  >
                    Create Plan
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Learn With Video (match left panel style) */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: 16,
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: '#EF4623',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.125rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                color: '#333333',
                margin: 0,
              }}>
                Learn With Video
              </h3>
            </div>
            <p style={{
              margin: '0 0 1.25rem 0',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: '#555555',
              lineHeight: 1.5,
            }}>
              CDC educational videos to help you understand prevention.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  title: 'Meet Lisa: Preventing Prediabetes',
                  href: 'https://www.youtube.com/watch?v=azKL5xutMJE',
                },
                {
                  title: 'Imagine: You + National DPP',
                  href: 'https://www.youtube.com/watch?v=k_XoHSIG20U&t=2s',
                },
                {
                  title: 'Sneak Peek into the Lifestyle Change Program',
                  href: 'https://www.youtube.com/watch?v=w0NDVI4M_Bs',
                },
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
                    backgroundColor: '#F7F7F7',
                    borderRadius: 12,
                    textDecoration: 'none',
                  }}
                >
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: '#F45E4C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 2 }}>
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#EF4623', fontWeight: 600 }}>
                    {video.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ ...sectionStyles, maxWidth: 1200 }}>
        <h2 style={{
          fontSize: isMobile ? '1.75rem' : '2rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: '600',
          color: '#333333',
          margin: '0 0 0.5rem 0',
        }}>
          Connect With Support
        </h2>
        <p style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#555555',
          lineHeight: 1.5,
          margin: '0 0 1.5rem 0',
        }}>
          Programs, communities, and direct help when you need it.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {/* Left Card - Lifestyle Change Intervention (LCI) Programs */}
          <div
            style={{
              backgroundColor: '#2D363D',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 0.5px, transparent 1px)',
              backgroundSize: '24px 24px',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
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
                fontSize: '0.7rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                padding: '0.35rem 0.875rem',
                borderRadius: 'var(--radius-pill)',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Local &amp; Online Programs
            </span>

            <h3
              style={{
                fontSize: '2.5rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: '600',
                color: 'white',
                margin: '0 0 1rem 0',
                lineHeight: 1.2,
              }}
            >
              Lifestyle Change Intervention (LCI) Programs
            </h3>

            <p
              style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.6,
                margin: '0 0 1.5rem 0',
              }}
            >
              CDC-recognized evidence-based lifestyle change programs proven to prevent or delay chronic conditions. Find a program that fits your schedule — in person or online.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a
                href="https://www.cdc.gov/diabetes-prevention/index.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'white',
                  color: '#2D363D',
                  borderRadius: 30,
                  padding: '0.75rem 1.25rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '600',
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                }}
              >
                Find a program
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'white',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '600',
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                }}
              >
                Support Groups &amp; Coaching →
              </a>
            </div>
          </div>

          {/* Right Card - CDC Chronic Disease Contact Center */}
          <div
            style={{
              backgroundColor: '#F35831',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 0.5px, transparent 1px)',
              backgroundSize: '24px 24px',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
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
                fontSize: '0.7rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                padding: '0.35rem 0.875rem',
                borderRadius: 'var(--radius-pill)',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              Direct Help
            </span>

            <h3
              style={{
                fontSize: '2.5rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: '600',
                color: 'white',
                margin: '0 0 1rem 0',
                lineHeight: 1.2,
              }}
            >
              CDC Chronic Disease Contact Center
            </h3>

            <p
              style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                color: 'rgba(255,255,255,0.95)',
                lineHeight: 1.6,
                margin: '0 0 1.5rem 0',
              }}
            >
              Email and call-in support for questions, tools, and referrals. Our team can help connect you with local resources and answer your prevention questions.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
              <a
                href="tel:800-232-4636"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'white',
                  color: '#F35831',
                  borderRadius: 30,
                  padding: '0.75rem 1.25rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '600',
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                800-232-4636
              </a>
              <a
                href="mailto:cdcinfo@cdc.gov"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'white',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '600',
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                }}
              >
                Send us an email →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section style={{
        ...sectionStyles,
        maxWidth: 1200,
        backgroundColor: '#fdfaf7',
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
        borderRadius: 'var(--radius-md)',
      }}>
        <h2 style={{
          fontSize: isMobile ? '1.75rem' : '2rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: '600',
          color: '#333333',
          margin: '0 0 0.5rem 0',
        }}>
          Tips That Fit Your Life
        </h2>

        <p style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          color: '#555555',
          lineHeight: 1.5,
          margin: '0 0 1.5rem 0',
        }}>
          Everyday habits that make a difference — practical, actionable, and realistic.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '1.5rem',
        }}>
          {[
            {
              path: '/support/tips/how-to-read-food-labels',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              ),
              title: 'How to Read Food Labels',
              description: 'Decode nutrition facts to make smarter choices at the grocery store — without guesswork.',
            },
            {
              path: '/support/tips/meal-planning-on-budget',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <line x1="8" y1="6" x2="21" y2="6"/>
                  <line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/>
                  <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              ),
              title: 'Meal Planning on a Budget',
              description: 'Healthy eating doesn\'t have to be expensive. Simple strategies for nutritious meals that fit your wallet.',
            },
            {
              path: '/support/tips/moving-more-when-busy',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              ),
              title: "Moving More When You're Busy",
              description: "Small amounts of activity add up. Find easy ways to move throughout your day without a gym or extra time.",
            },
            {
              path: '/support/tips/setting-realistic-goals',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              ),
              title: 'Setting Realistic Goals',
              description: 'Goals you can stick with start small. Learn how to build momentum through achievable milestones.',
            },
          ].map((tip, i) => (
            <Link
              key={i}
              to={tip.path}
              style={{
                backgroundColor: 'white',
                borderRadius: 12,
                padding: '1.5rem',
                border: '1px solid #e8e8e8',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    minWidth: 44,
                    borderRadius: 10,
                    backgroundColor: '#f7a79e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {tip.icon}
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: '1.0625rem',
                      fontFamily: 'var(--font-body)',
                      fontWeight: '700',
                      color: '#E05A4D',
                      margin: '0 0 0.5rem 0',
                    }}
                  >
                    {tip.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 400,
                      color: '#555555',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {tip.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Support;
