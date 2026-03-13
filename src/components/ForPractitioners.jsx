import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ForPractitioners = () => {
  const navigate = useNavigate();
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
    <div
      style={{
        backgroundColor: 'white',
        minHeight: '80vh',
      }}
    >
      {/* Hero Section */}
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
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>For Practitioners</span>
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
          For Practitioners
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
          Tools, Evidence &amp; Practice Support
        </h1>

        <p
          style={{
            fontSize: '1.25rem',
            fontFamily: 'var(--font-body)',
            fontWeight: '700',
            color: '#333333',
            margin: '0 0 0.5rem 0',
            lineHeight: 1.4,
          }}
        >
          Built to support clinicians, care teams, and public health partners who guide patients toward prevention.
        </p>

        <p
          style={{
            fontSize: '1rem',
            fontFamily: 'var(--font-body)',
            color: '#555555',
            lineHeight: 1.6,
            margin: '0 0 2rem 0',
          }}
        >
          This resource is designed to complement standard clinical care — reinforcing CDC-aligned guidance on chronic disease prevention, offering patient-centered tools for self-management, and facilitating shared decision-making conversations at every touchpoint.
        </p>

        {/* Key Statistics Section */}
        <div
          style={{
            backgroundColor: '#2D363D',
            borderRadius: 'var(--radius-md)',
            padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
            marginBottom: '2.5rem',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '2rem' : '2rem',
          }}
        >
          <div>
            <div style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontFamily: 'var(--font-serif)', fontWeight: '700', color: '#1f9660', lineHeight: 1.1, marginBottom: '0.5rem' }}>
              58%
            </div>
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
              lower risk of developing type 2 diabetes for patients enrolled in a CDC-recognized DPP
            </p>
          </div>
          <div>
            <div style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontFamily: 'var(--font-serif)', fontWeight: '700', color: 'white', lineHeight: 1.1, marginBottom: '0.5rem' }}>
              34M
            </div>
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
              Americans have prediabetes — 8 in 10 don&apos;t know it, making practitioner screening essential
            </p>
          </div>
          <div>
            <div style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontFamily: 'var(--font-serif)', fontWeight: '700', color: 'white', lineHeight: 1.1, marginBottom: '0.5rem' }}>
              2×
            </div>
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
              more likely to enroll in prevention programs when referred by a trusted clinician or care team member
            </p>
          </div>
        </div>

        <h2 style={{ ...h2Styles, marginTop: 0, marginBottom: '0.75rem' }}>
          How This Resource Fits Into Care
        </h2>

        <p style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '2rem',
        }}>
          Integrate Path2Prevention into your existing workflow without disruption. The platform is built to serve as a complementary layer — not a replacement for clinical judgement.
        </p>

        {/* Three-column workflow */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 0,
            borderTop: '1px solid #e5e5e5',
            marginBottom: '2rem',
          }}
        >
          {[
            {
              accentColor: '#E05A4D',
              topBorderColor: '#E05A4D',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              ),
              title: 'Before a Visit',
              description: 'Send educational links so patients arrive informed and ready to discuss risk factors, lifestyle goals, and program options — reducing time spent on basics.',
              bullets: ['Share prediabetes risk education', 'Send DPP program overview', 'Prompt patients to take the risk test'],
            },
            {
              accentColor: '#6B7280',
              topBorderColor: '#e5e5e5',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
              ),
              title: 'During Counseling',
              description: 'Reference specific modules to anchor goal-setting conversations in evidence. Use the tools as a shared decision-making resource during the appointment.',
              bullets: ['Pull up nutrition or exercise modules', 'Reference Know Your Numbers data', 'Set SMART goals collaboratively'],
            },
            {
              accentColor: '#6B7280',
              topBorderColor: '#e5e5e5',
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              ),
              title: 'After a Visit',
              description: 'Share personalized resource packets and follow-up links that extend the conversation — keeping patients engaged between appointments and supporting adherence.',
              bullets: ['Send handouts and tracking sheets', 'Share local DPP program links', 'Provide follow-up reading by topic'],
            },
          ].map((col, i) => (
            <div
              key={i}
              style={{
                padding: '1.5rem',
                borderLeft: !isMobile && i > 0 ? '1px solid #e5e5e5' : 'none',
                borderTop: `3px solid ${col.topBorderColor}`,
                marginTop: '-1px',
              }}
            >
              <div style={{ color: col.accentColor, marginBottom: '1rem' }}>{col.icon}</div>
              <h3 style={{
                fontSize: '1.125rem',
                fontFamily: 'var(--font-body)',
                fontWeight: '700',
                color: 'var(--ink)',
                margin: '0 0 0.75rem 0',
              }}>
                {col.title}
              </h3>
              <p style={{
                fontSize: '0.9375rem',
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
                margin: '0 0 1rem 0',
              }}>
                {col.description}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {col.bullets.map((b, j) => (
                  <li key={j} style={{ ...listItemStyles, marginBottom: '0.35rem' }}>
                    <span style={bulletStyles} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Guidelines & Evidence — light beige background */}
        <div style={{ backgroundColor: '#fdfaf7', borderRadius: 'var(--radius-md)', padding: isMobile ? '2rem 1rem' : '2.5rem 2rem', marginBottom: '2rem' }}>
          <h2 style={{ ...h2Styles, marginTop: 0 }}>
            Guidelines &amp; Evidence You Can Trust
          </h2>
          <p style={{
            fontSize: '1rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            marginBottom: '1.5rem',
          }}>
            Every resource on this site is grounded in federal clinical guidance and peer-reviewed research. Below are the primary frameworks and evidence sources that inform this platform.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.5rem',
          }}>
            {[
              {
                label: 'CDC & FEDERAL RESOURCES',
                title: 'Community Preventive Services Task Force',
                description: 'Provides evidence summaries on what works for chronic disease prevention.',
                bullets: ['Systematic evidence reviews by intervention type', 'Recommendations updated on a rolling basis', 'Includes implementation considerations for practice'],
                href: 'https://www.thecommunityguide.org/',
              },
              {
                label: 'CDC & FEDERAL RESOURCES',
                title: 'National Diabetes Prevention Program (DPP)',
                description: 'CDC\'s framework for lifestyle change programs recognized to reduce type 2 diabetes risk.',
                bullets: ['Program standards and implementation guidance', 'Medicare coverage criteria for eligible patients', 'Referral pathways and documentation support'],
                href: 'https://www.cdc.gov/diabetes-prevention/programs/what-is-the-national-dpp.html',
              },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  border: '1px solid #e8e8e8',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    color: '#E05A4D',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {card.label}
                </span>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: '600',
                  color: 'var(--ink)',
                  margin: '0 0 0.75rem 0',
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontSize: '0.9375rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                  margin: '0 0 1rem 0',
                }}>
                  {card.description}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  {card.bullets.map((b, j) => (
                    <li key={j} style={{ ...listItemStyles, marginBottom: '0.35rem', fontSize: '0.9375rem' }}>
                      <span style={bulletStyles} />
                      {b}
                    </li>
                  ))}
                </ul>
                <a href={card.href} target="_blank" rel="noopener noreferrer" style={linkStyles}>
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>

        <h2 style={h2Styles}>
          Patient Education &amp; Handouts
        </h2>
        <p style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '1.5rem',
        }}>
          Ready-to-use materials for patient handoffs. Print or share digitally. Links and embeds will be added as the platform develops.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {[
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E05A4D" strokeWidth="1.5">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
              ),
              title: 'Risk Factor Checklist',
              description: 'A one-page patient-facing checklist covering the key risk factors for prediabetes and type 2 diabetes. Use before or during a visit.',
              to: '/for-practitioners/risk-factor-checklist',
              titleColor: '#E05A4D',
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E05A4D" strokeWidth="1.5">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              ),
              title: 'Weekly Activity Tracking Sheet',
              description: 'A simple weekly log for patients to track physical activity minutes — built around the DPP goal of 150 minutes of moderate activity per week.',
              to: '/for-practitioners/weekly-activity-tracking-sheet',
              titleColor: '#E05A4D',
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E05A4D" strokeWidth="1.5">
                  <path d="M16 3c-.8 0-1.7.4-2.2 1-.5.6-.8 1.4-.7 2.2.8.1 1.7-.3 2.3-.9.5-.5.9-1.3.6-2.3z" />
                  <path d="M11.5 6.5C10.4 5.6 8.9 5 7.5 5 5 5 3 7 3 9.8c0 2.1.8 4.4 2.2 6 1 1.1 2.1 1.7 3.3 1.7 1.1 0 1.8-.4 2.8-.4s1.7.4 2.8.4c1.2 0 2.3-.6 3.3-1.7 1.4-1.6 2.1-3.9 2.1-6.1C21.5 7 19.5 5 17 5c-1.4 0-2.9.6-4 1.5z" />
                </svg>
              ),
              title: 'Healthy Eating Guide',
              description: 'A practical, plain-language overview of blood sugar-friendly eating patterns for patients newly diagnosed with prediabetes or elevated risk.',
              href: 'https://ddt-nds.vercel.app/resources/heart-health/heart-healthy-eating',
              titleColor: '#E05A4D',
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E05A4D" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              ),
              title: 'Goal-Setting Worksheet',
              description: 'A guided worksheet that walks patients through writing a specific, achievable behavior goal using the SMART+ framework introduced in counseling.',
              to: '/for-practitioners/goal-setting-worksheet',
              titleColor: '#E05A4D',
            },
          ].map((card, i) => {
            const cardContent = (
              <>
                <div style={{ flexShrink: 0 }}>{card.icon}</div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '700',
                  color: card.titleColor || 'var(--ink)',
                  margin: 0,
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontSize: '0.9375rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                  margin: 0,
                }}>
                  {card.description}
                </p>
              </>
            );
            const cardStyle = {
              backgroundColor: '#F7F7F7',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            };
            if (card.to) {
              return (
                <Link
                  key={i}
                  to={card.to}
                  style={{ ...cardStyle, textDecoration: 'none', color: 'inherit' }}
                >
                  {cardContent}
                </Link>
              );
            }
            return card.href ? (
              <a
                key={i}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...cardStyle, textDecoration: 'none', color: 'inherit' }}
              >
                {cardContent}
              </a>
            ) : (
              <div key={i} style={cardStyle}>
                {cardContent}
              </div>
            );
          })}
        </div>

        {false && (
          <>
            <h2 style={h2Styles}>
              Integrating Into Practice Workflows
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '1.5rem',
              marginBottom: '2rem',
              alignItems: 'start',
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: '600',
                  color: 'var(--ink)',
                  marginBottom: '1rem',
                }}>
                  Tips for Workflow Integration
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={listItemStyles}><span style={bulletStyles} />Embed direct links into patient portals</li>
                  <li style={listItemStyles}><span style={bulletStyles} />Use short URLs or QR codes on print handouts</li>
                  <li style={listItemStyles}><span style={bulletStyles} />Create clinic-specific resource packets</li>
                </ul>
              </div>
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    color: '#E05A4D',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  EHR &amp; REFERRAL SUPPORT
                </span>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: '600',
                  color: 'var(--ink)',
                  margin: '0 0 1rem 0',
                }}>
                  Smart Phrases &amp; Order Sets
                </h3>
                <p style={{
                  fontSize: '0.9375rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: '600',
                  color: 'var(--ink)',
                  margin: '0 0 0.5rem 0',
                }}>
                  In development:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ ...listItemStyles, marginBottom: '0.35rem', fontSize: '0.9375rem' }}><span style={bulletStyles} />Epic / Cerner smart phrase templates</li>
                  <li style={{ ...listItemStyles, marginBottom: '0.35rem', fontSize: '0.9375rem' }}><span style={bulletStyles} />ICD-10 coding reference for prediabetes</li>
                  <li style={{ ...listItemStyles, marginBottom: 0, fontSize: '0.9375rem' }}><span style={bulletStyles} />DPP referral letter template</li>
                </ul>
              </div>
            </div>
          </>
        )}

        {/* Feedback section — light beige background, two columns */}
        <div style={{
          backgroundColor: '#fdfaf7',
          borderRadius: 'var(--radius-md)',
          padding: isMobile ? '2rem 1rem' : '2.5rem 2rem',
          marginBottom: '3rem',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '3rem',
            alignItems: 'start',
          }}>
            <div>
              <h2 style={{ ...h2Styles, marginTop: 0, marginBottom: '1rem' }}>
                Feedback &amp; Improvement Loop
              </h2>
              <p style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                marginBottom: '1rem',
              }}>
                We&apos;re building this site with direct input from clinicians, care teams, and public health partners. Your observations from practice — what works, what&apos;s missing, what patients respond to — directly shape future iterations.
              </p>
              <p style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
              }}>
                Tell us about your workflow, your patient population, challenges you&apos;ve run into, and what would make this more useful in your practice context.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button type="button" onClick={() => navigate('/for-practitioners/feedback')} className="btn btn-primary" style={{ display: 'inline-block' }}>
                  Share Your Feedback
                </button>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#6B7280' }}>
                  Takes about 3 minutes
                </span>
              </div>
            </div>
            <div style={{ paddingTop: '2.6rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  color: '#E05A4D',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                }}
              >
                WHAT WE&apos;RE ASKING ABOUT
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Workflow integration challenges',
                  'Patient response to tools and content',
                  'Gaps in current content coverage',
                  'Success stories worth featuring',
                  'Feature suggestions for next build cycle',
                ].map((item, i) => (
                  <li key={i} style={{ ...listItemStyles, marginBottom: '0.5rem', fontSize: '0.9375rem' }}>
                    <span style={bulletStyles} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForPractitioners;
