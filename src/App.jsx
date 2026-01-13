import { useState, useEffect } from 'react'
import './App.css'
import CDCFooter from './components/CDCFooter'
import Chatbot from './components/Chatbot'
import RiskAssessment from './components/RiskAssessment'
import About from './components/About'
import Resources from './components/Resources'
import Support from './components/Support'
import HowItWorks from './components/HowItWorks'
import LifestylePrograms from './components/LifestylePrograms'
import FAQs from './components/FAQs'

// Helper function to scroll to section
const scrollToSection = (sectionId) => {
  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(() => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Small offset for banner and separator
      const offset = 30
      
      // Calculate position
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementTop - offset

      // Scroll to position
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      })
    } else {
      console.warn(`Section with id "${sectionId}" not found`)
    }
  })
}

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', margin: 0, padding: 0 }}>
      {/* Official US Government Banner */}
      <div style={{
        backgroundColor: 'var(--bg-page)',
        fontSize: '13px',
        padding: '8px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <svg width="20" height="11" viewBox="0 0 20 11" style={{ marginRight: '8px' }}>
            {/* Blue canton */}
            <rect x="0" y="0" width="8" height="6" fill="#012169"/>
            {/* Red stripes */}
            <rect x="0" y="0" width="20" height="0.85" fill="#C8102E"/>
            <rect x="0" y="1.7" width="20" height="0.85" fill="#C8102E"/>
            <rect x="0" y="3.4" width="20" height="0.85" fill="#C8102E"/>
            <rect x="0" y="5.1" width="20" height="0.85" fill="#C8102E"/>
            <rect x="0" y="6.8" width="20" height="0.85" fill="#C8102E"/>
            <rect x="0" y="8.5" width="20" height="0.85" fill="#C8102E"/>
            <rect x="0" y="10.2" width="20" height="0.8" fill="#C8102E"/>
            {/* White stripes */}
            <rect x="0" y="0.85" width="20" height="0.85" fill="white"/>
            <rect x="0" y="2.55" width="20" height="0.85" fill="white"/>
            <rect x="0" y="4.25" width="20" height="0.85" fill="white"/>
            <rect x="0" y="5.95" width="20" height="0.85" fill="white"/>
            <rect x="0" y="7.65" width="20" height="0.85" fill="white"/>
            <rect x="0" y="9.35" width="20" height="0.85" fill="white"/>
            {/* Stars (simplified as small circles) */}
            <circle cx="1" cy="1" r="0.3" fill="white"/>
            <circle cx="2.5" cy="1.5" r="0.3" fill="white"/>
            <circle cx="1" cy="2" r="0.3" fill="white"/>
            <circle cx="2.5" cy="2.5" r="0.3" fill="white"/>
            <circle cx="1" cy="3" r="0.3" fill="white"/>
            <circle cx="2.5" cy="3.5" r="0.3" fill="white"/>
            <circle cx="1" cy="4" r="0.3" fill="white"/>
            <circle cx="2.5" cy="4.5" r="0.3" fill="white"/>
            <circle cx="1" cy="5" r="0.3" fill="white"/>
            <circle cx="4" cy="1" r="0.3" fill="white"/>
            <circle cx="5.5" cy="1.5" r="0.3" fill="white"/>
            <circle cx="4" cy="2" r="0.3" fill="white"/>
            <circle cx="5.5" cy="2.5" r="0.3" fill="white"/>
            <circle cx="4" cy="3" r="0.3" fill="white"/>
            <circle cx="5.5" cy="3.5" r="0.3" fill="white"/>
            <circle cx="4" cy="4" r="0.3" fill="white"/>
            <circle cx="5.5" cy="4.5" r="0.3" fill="white"/>
            <circle cx="4" cy="5" r="0.3" fill="white"/>
            <circle cx="7" cy="1" r="0.3" fill="white"/>
            <circle cx="7" cy="2" r="0.3" fill="white"/>
            <circle cx="7" cy="3" r="0.3" fill="white"/>
            <circle cx="7" cy="4" r="0.3" fill="white"/>
            <circle cx="7" cy="5" r="0.3" fill="white"/>
          </svg>
          <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
            An official website of the United States government
          </span>
          <button style={{
            background: 'none',
            border: 'none',
            color: 'var(--green-primary)',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '13px',
            padding: '0',
            marginLeft: '8px',
            fontFamily: 'var(--font-body)'
          }}>
            Here's how you know
          </button>
        </div>
      </div>

      {/* Green Separator Line */}
      <div style={{
        height: '2px',
        backgroundColor: 'var(--green-primary)',
        width: '100%'
      }}></div>

      {/* Main Content - Single Page */}
      <main>
        {/* Hero Section */}
        <section id="home" style={{
          backgroundImage: 'url(/diverse-group-eating.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: isMobile ? '3rem 1rem' : '4rem 2rem',
          scrollMarginTop: '100px',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%'
          }}>
            <div style={{
              textAlign: isMobile ? 'center' : 'left',
              maxWidth: '600px'
            }}>
              {/* Main Heading */}
              <h1 style={{
                fontSize: isMobile ? '4.5rem' : '6rem',
                fontFamily: 'var(--font-header)',
                fontWeight: '800',
                color: 'var(--text-white)',
                lineHeight: '0.88',
                marginBottom: '2rem',
                margin: '0 0 2rem 0',
                letterSpacing: '-0.025em'
              }}>
                Start Your CDC: Path2{' '}Prevention
              </h1>

              {/* CTA Buttons */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: isMobile ? 'center' : 'flex-start'
              }}>
                <button 
                  onClick={() => scrollToSection('risk-assessment')}
                  className="btn btn-primary hero-btn"
                  style={{
                    minWidth: isMobile ? '200px' : 'auto'
                  }}
                >
                  Am I at Risk?
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="btn hero-btn hero-btn-white"
                  style={{
                    minWidth: isMobile ? '200px' : 'auto',
                    backgroundColor: 'var(--bg-content)',
                    color: 'var(--text-primary)',
                    border: 'none'
                  }}
                >
                  How It Works
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing between sections */}
        <div style={{ height: '4rem' }}></div>

        {/* How It Works Section */}
        <section id="how-it-works" style={{
          backgroundColor: 'var(--bg-content)',
          padding: isMobile ? '3rem 1rem' : '4rem 2rem',
          textAlign: 'center',
          scrollMarginTop: '100px'
        }}>
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
              Here's How It Works
            </h2>

            <p style={{
              fontSize: '1.125rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
              marginBottom: '3rem',
              maxWidth: '600px',
              margin: '0 auto 3rem auto'
            }}>
              Click into a section below to find videos, interactive games, and more to start on your CDC: Path2Prevention.
            </p>

            {/* Three Column Features */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '2rem'
            }}>
              {/* What is The Path? */}
              <div 
                onClick={() => scrollToSection('about')}
                className="card"
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  cursor: 'pointer'
                }}
              >
                <div className="icon-circle icon-circle-primary">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
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
                  What is The Path?
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Learn about chronic disease risk factors and how lifestyle changes can help prevent conditions like heart disease, stroke, and diabetes.
                </p>
              </div>

              {/* Get the Facts */}
              <div 
                onClick={() => scrollToSection('resources')}
                className="card"
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  cursor: 'pointer'
                }}
              >
                <div className="icon-circle icon-circle-accent">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
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
                  Get the Facts
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Access evidence-based information about preventing chronic diseases including obesity, COPD, and cardiovascular conditions.
                </p>
              </div>

              {/* Start Your Plan */}
              <div 
                onClick={() => scrollToSection('risk-assessment')}
                className="card"
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  cursor: 'pointer'
                }}
              >
                <div className="icon-circle icon-circle-grey">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
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
                  Start Your Plan
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Take a risk assessment and create a personalized action plan with interactive tools and resources tailored to your needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing between sections */}
        <div style={{ height: '4rem' }}></div>

        {/* Risk Assessment Section */}
        <section id="risk-assessment" style={{
          backgroundColor: 'var(--bg-content)',
          scrollMarginTop: '100px'
        }}>
          <RiskAssessment />
        </section>

        {/* Spacing between sections */}
        <div style={{ height: '4rem' }}></div>

        {/* Resources Section */}
        <section id="resources" style={{
          scrollMarginTop: '100px'
        }}>
          <Resources onNavigate={scrollToSection} />
        </section>

        {/* Spacing between sections */}
        <div style={{ height: '4rem' }}></div>

        {/* Lifestyle Programs Section */}
        <section id="lifestyle-programs" style={{
          backgroundColor: 'var(--bg-content)',
          scrollMarginTop: '100px'
        }}>
          <LifestylePrograms />
        </section>

        {/* Spacing between sections */}
        <div style={{ height: '4rem' }}></div>

        {/* Support Section */}
        <section id="support" style={{
          scrollMarginTop: '100px'
        }}>
          <Support />
        </section>

        {/* Spacing between sections */}
        <div style={{ height: '4rem' }}></div>

        {/* About Section */}
        <section id="about" style={{
          backgroundColor: 'var(--bg-page)',
          padding: isMobile ? '3rem 1rem' : '4rem 2rem',
          scrollMarginTop: '100px'
        }}>
          <About />
        </section>

        {/* Spacing between sections */}
        <div style={{ height: '4rem' }}></div>

        {/* FAQs Section */}
        <section id="faqs" style={{
          backgroundColor: 'var(--bg-content)',
          padding: isMobile ? '3rem 1rem' : '4rem 2rem',
          scrollMarginTop: '100px'
        }}>
          <FAQs />
        </section>
      </main>

      {/* CDC Footer */}
      <CDCFooter />
      
      {/* Chatbot */}
      <Chatbot onNavigate={scrollToSection} />
    </div>
  )
}

export default App
