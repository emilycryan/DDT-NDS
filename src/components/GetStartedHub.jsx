import React, { useState, useEffect } from 'react';

const GetStartedHub = ({ onNavigate }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main style={{ 
      backgroundColor: 'var(--bg-secondary)',
      minHeight: '80vh'
    }}>
      {/* Hero Section — two columns: left text + bullets + CTA, right image (matches homepage Why CDC layout) */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '3rem 1rem' : '5rem 2rem',
        backgroundColor: '#FFFFFF',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '2.5rem' : '4rem',
          alignItems: 'center',
        }}>
          <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
            <h1 style={{
              fontSize: isMobile ? '2.25rem' : '3rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: '800',
              color: 'var(--text-primary)',
              lineHeight: '1.1',
              marginBottom: '1rem',
              margin: '0 0 1rem 0'
            }}>
              Get Started
            </h1>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--ink-70)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              margin: isMobile ? '0 auto 2rem auto' : '0 0 2rem 0'
            }}>
              Answer a few questions to learn how everyday factors relate to chronic conditions like diabetes, heart disease, and stroke. These evidence-based tools help spot where small lifestyle changes can make the biggest difference.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div className="icon-circle icon-circle-coral">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: '700', color: 'var(--ink)', marginBottom: '0.25rem' }}>Evidence-Based Questions</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--ink-70)' }}>Explore how weight, activity, family history, and more connect to diabetes, heart disease, stroke, and more.</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div className="icon-circle icon-circle-coral">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: '700', color: 'var(--ink)', marginBottom: '0.25rem' }}>Personalized Results</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--ink-70)' }}>Get recommendations tailored to your health and lifestyle responses.</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div className="icon-circle icon-circle-coral">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: '700', color: 'var(--ink)', marginBottom: '0.25rem' }}>Take the Next Step</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--ink-70)' }}>Connect to programs and resources that support your prevention journey.</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <button
                onClick={() => {
                  const element = document.getElementById('get-started-flow-selection');
                  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="btn btn-primary"
                style={{ minWidth: '200px' }}
              >
                Let's Go
              </button>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="image-overlay" style={{
              borderRadius: 'var(--radius-3xl)',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(15, 76, 92, 0.15)',
              aspectRatio: '4/3',
            }}>
              <img src="/worriedcouple.png" alt="It's important to take care of myself for my family and my friends" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                padding: '1.5rem 2rem 2rem 1.5rem',
                background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                color: '#fff',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
              }}>
                <blockquote style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: '400',
                  fontSize: isMobile ? '1.625rem' : '2.5rem',
                  lineHeight: 1.15,
                  margin: 0,
                  maxWidth: '72%',
                }}>
                  &ldquo;It&rsquo;s important to take care of myself for my family and my friends.&rdquo;
                </blockquote>
              </div>
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: '#0F4C5C',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '6px 12px',
                borderRadius: '20px',
              }}>
                FOCUS ON Understanding.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        id="get-started-flow-selection"
        style={{
          backgroundColor: 'var(--bg-primary)',
          padding: isMobile ? '3rem 1rem' : '4rem 2rem',
          textAlign: 'center'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            margin: '0 0 1rem 0'
          }}>
            What brought you here today?
          </h2>

          <p style={{
            fontSize: '1.125rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }}>
            Perhaps you're wondering what lifestyle changes might look like as someone with a newly diagnosed chronic condition. Or maybe you're a friend, family member or caregiver of someone with one or more chronic conditions. Let us know so we can tailor next questions and recommendations.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            <div 
              className="card card-clickable"
              role="button"
              tabIndex={0}
              onClick={() => onNavigate && onNavigate('questions-for-myself')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate && onNavigate('questions-for-myself'); } }}
              style={{
                textAlign: 'center',
                padding: '2rem',
                cursor: 'pointer',
                backgroundColor: 'var(--gov-bar)',
                border: 'none'
              }}
            >
              <div
                className="get-started-tile-icon"
                style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                margin: '0 0 1rem 0'
              }}>
                For Myself
              </h3>
              <p style={{
                fontSize: '0.95rem',
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                margin: 0
              }}>
                I&apos;m focused on my own health and want to understand how everyday factors relate to conditions like diabetes, heart disease, or stroke.
              </p>
            </div>

            <div 
              className="card card-clickable"
              role="button"
              tabIndex={0}
              onClick={() => onNavigate && onNavigate('questions-for-someone')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate && onNavigate('questions-for-someone'); } }}
              style={{
                textAlign: 'center',
                padding: '2rem',
                cursor: 'pointer',
                backgroundColor: 'var(--gov-bar)',
                border: 'none'
              }}
            >
              <div
                className="get-started-tile-icon"
                style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                margin: '0 0 1rem 0'
              }}>
                For Someone I Care About
              </h3>
              <p style={{
                fontSize: '0.95rem',
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                margin: 0
              }}>
                I&apos;m a caregiver, family member, or friend who wants to help someone I care about understand their health picture.
              </p>
            </div>

            <div 
              className="card card-clickable"
              role="button"
              tabIndex={0}
              onClick={() => onNavigate && onNavigate('questions-just-curious')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate && onNavigate('questions-just-curious'); } }}
              style={{
                textAlign: 'center',
                padding: '2rem',
                cursor: 'pointer',
                backgroundColor: 'var(--gov-bar)',
                border: 'none'
              }}
            >
              <div
                className="get-started-tile-icon"
                style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                margin: '0 0 1rem 0'
              }}>
                Just Curious
              </h3>
              <p style={{
                fontSize: '0.95rem',
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                margin: 0
              }}>
                I&apos;m generally interested in learning about chronic disease prevention. I feel pretty healthy but want to see what this is all about.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GetStartedHub;
