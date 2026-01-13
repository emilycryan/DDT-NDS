import React, { useState, useEffect } from 'react';

const Resources = ({ onNavigate }) => {
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
      backgroundColor: '#f8fafc',
      minHeight: '80vh'
    }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'white',
        padding: isMobile ? '3rem 1rem' : '4rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: 'bold',
            color: '#1e293b',
            lineHeight: '1.1',
            marginBottom: '1rem',
            margin: '0 0 1rem 0'
          }}>
            Prevention Resources
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: '#0f766e',
            fontWeight: '600',
            marginBottom: '1.5rem',
            margin: '0 0 1.5rem 0'
          }}>
            Tools and information to support your health journey
          </p>

          <p style={{
            fontSize: '1.125rem',
            color: '#64748b',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Access evidence-based resources, programs, and tools to help prevent chronic diseases and maintain a healthy lifestyle.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '3rem 1rem' : '4rem 2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Find Programs Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onClick={() => {
            if (onNavigate) {
              onNavigate('lifestyle-programs');
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            }
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#1e40af',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '1rem'
            }}>
              Find a Program Near You
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#64748b',
              lineHeight: '1.5',
              marginBottom: '1.5rem'
            }}>
              Search for CDC-recognized diabetes prevention programs in your area. Choose from in-person, virtual, or on-demand options.
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: '#1e40af',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>
              Search Programs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '0.5rem' }}>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>

          {/* Risk Assessment Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onClick={() => {
            if (onNavigate) {
              onNavigate('risk-assessment');
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            }
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#059669',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '1rem'
            }}>
              Risk Assessment
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#64748b',
              lineHeight: '1.5',
              marginBottom: '1.5rem'
            }}>
              Take a personalized assessment to understand your risk factors for chronic diseases and get tailored recommendations.
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: '#059669',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>
              Take Assessment
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '0.5rem' }}>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '0.75rem',
          border: '1px solid #e2e8f0',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: '#1e293b',
            marginBottom: '1.5rem'
          }}>
            Educational Resources
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.5rem'
          }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8fafc',
              borderRadius: '0.5rem',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '0.75rem'
              }}>
                Diabetes Prevention
              </h4>
              <p style={{
                fontSize: '0.95rem',
                color: '#64748b',
                lineHeight: '1.5'
              }}>
                Learn about lifestyle changes that can reduce your risk of developing type 2 diabetes by up to 58%.
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8fafc',
              borderRadius: '0.5rem',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '0.75rem'
              }}>
                Heart Health
              </h4>
              <p style={{
                fontSize: '0.95rem',
                color: '#64748b',
                lineHeight: '1.5'
              }}>
                Discover strategies for maintaining cardiovascular health through diet, exercise, and lifestyle modifications.
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8fafc',
              borderRadius: '0.5rem',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '0.75rem'
              }}>
                Healthy Living
              </h4>
              <p style={{
                fontSize: '0.95rem',
                color: '#64748b',
                lineHeight: '1.5'
              }}>
                Access tools and tips for maintaining a healthy weight, staying active, and making nutritious food choices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Resources;
