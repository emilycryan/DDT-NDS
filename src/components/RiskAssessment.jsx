import React, { useState, useEffect } from 'react';

const RiskAssessment = () => {
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
      {/* Hero Section */}
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: isMobile ? '3rem 1rem' : '4rem 2rem',
        textAlign: 'center'
      }}>
        {/* Main Heading */}
        <h1 style={{
          fontSize: isMobile ? '2.25rem' : '3rem',
          fontFamily: 'var(--font-header)',
          fontWeight: '800',
          color: 'var(--text-primary)',
          lineHeight: '1.1',
          marginBottom: '1.5rem',
          margin: '0 0 1.5rem 0'
        }}>
          Am I at Risk?
        </h1>

        {/* Description */}
        <p style={{
          fontSize: isMobile ? '1rem' : '1.125rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          Take our comprehensive risk assessments to learn about your personal risk factors for chronic diseases. These evidence-based screening tools help identify areas where lifestyle changes can make a difference.
        </p>

        {/* CTA Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button 
            onClick={() => {
              const element = document.getElementById('assessment-selection');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="btn btn-primary"
            style={{
              minWidth: '200px'
            }}
          >
            Start Assessment
          </button>
        </div>
      </section>

      {/* Assessment Types Section */}
      <section 
        id="assessment-selection"
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
            fontFamily: 'var(--font-header)',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            margin: '0 0 1rem 0'
          }}>
            Who Are You Taking This For?
          </h2>

          <p style={{
            fontSize: '1.125rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--text-secondary)',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }}>
            Choose the option that best describes your situation. This helps us provide the most relevant assessment and recommendations.
          </p>

          {/* Assessment Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {/* For Myself - Concerned */}
            <div 
              className="card"
              style={{
                textAlign: 'center',
                padding: '2rem',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--mood-dark-navy)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontFamily: 'var(--font-header)',
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
                I'm concerned about my own health and want to understand my risk factors for chronic diseases like diabetes, heart disease, or stroke.
              </p>
            </div>

            {/* For Someone Else - Caregiver */}
            <div 
              className="card"
              style={{
                textAlign: 'center',
                padding: '2rem',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--mood-golden-yellow)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontFamily: 'var(--font-header)',
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
                I'm a caregiver, family member, or friend who is concerned about someone else's health and want to help them understand their risks.
              </p>
            </div>

            {/* Just Curious - Denial Friendly */}
            <div 
              className="card"
              style={{
                textAlign: 'center',
                padding: '2rem',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--mood-dark-grey)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontFamily: 'var(--font-header)',
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
                I'm generally interested in learning about chronic disease prevention. I feel pretty healthy but want to see what this is all about.
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="quote-card" style={{
            marginTop: '3rem',
            padding: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontFamily: 'var(--font-header)',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              margin: '0 0 1rem 0'
            }}>
              What Happens Next?
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '2rem',
              textAlign: 'left'
            }}>
              <div>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: 'var(--font-header)',
                  color: 'var(--primary-dark)',
                  marginBottom: '0.5rem',
                  margin: '0 0 0.5rem 0'
                }}>
                  1. Complete Assessment
                </h4>
                <p style={{
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)',
                  margin: 0
                }}>
                  Answer questions about your health, lifestyle, and family history.
                </p>
              </div>
              <div>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: 'var(--font-header)',
                  color: 'var(--primary-dark)',
                  marginBottom: '0.5rem',
                  margin: '0 0 0.5rem 0'
                }}>
                  2. Get Your Results
                </h4>
                <p style={{
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)',
                  margin: 0
                }}>
                  Receive personalized risk assessment and prevention recommendations.
                </p>
              </div>
              <div>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: 'var(--font-header)',
                  color: 'var(--primary-dark)',
                  marginBottom: '0.5rem',
                  margin: '0 0 0.5rem 0'
                }}>
                  3. Take Action
                </h4>
                <p style={{
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)',
                  margin: 0
                }}>
                  Access resources, programs, and tools to support your prevention journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RiskAssessment;
