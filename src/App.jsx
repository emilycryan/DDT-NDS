import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import * as motion from 'motion/react-client'
import './App.css'
import CDCHeader from './components/CDCHeader'
import CDCFooter from './components/CDCFooter'
import Chatbot from './components/Chatbot'
import RiskAssessment from './components/RiskAssessment'
import AssessmentChronicConditions from './components/AssessmentChronicConditions'
import AssessmentCaregiver from './components/AssessmentCaregiver'
import AssessmentJustCurious from './components/AssessmentJustCurious'
import About from './components/About'
import Resources from './components/Resources'
import Support from './components/Support'
import ForPractitioners from './components/ForPractitioners'
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

const PAGE_TO_PATH = {
  'about': '/about',
  'resources': '/resources',
  'support': '/support',
  'for-practitioners': '/for-practitioners',
  'risk-assessment': '/get-started',
  'lifestyle-programs': '/lifestyle-programs',
  'assessment-chronic': '/get-started/for-myself',
  'assessment-caregiver': '/get-started/for-someone',
  'assessment-just-curious': '/get-started/just-curious',
}

const PATH_TO_PAGE = Object.fromEntries(Object.entries(PAGE_TO_PATH).map(([k, v]) => [v, k]))

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const onNavigate = (page) => {
    const path = PAGE_TO_PATH[page] || (page === 'home' ? '/' : `/${page}`)
    navigate(path)
    window.scrollTo(0, 0)
  }

  const goToHomeSection = (sectionId) => {
    navigate('/')
    setTimeout(() => scrollToSection(sectionId), 150)
  }

  const handleChatbotNavigate = (target) => {
    if (['about', 'resources', 'support', 'for-practitioners', 'risk-assessment', 'lifestyle-programs'].includes(target)) onNavigate(target)
    else goToHomeSection(target)
  }

  const navigateTo = (target) => {
    if (['about', 'resources', 'support', 'for-practitioners', 'risk-assessment', 'lifestyle-programs'].includes(target)) onNavigate(target)
    else goToHomeSection(target)
  }

  const currentPage = location.pathname === '/' ? 'home' : (PATH_TO_PAGE[location.pathname] || 'home')

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', margin: 0, padding: 0 }}>
      <CDCHeader
        scrollToSection={scrollToSection}
        goToHomeSection={goToHomeSection}
        currentPage={currentPage}
      />

      <Routes>
      <Route path="/about" element={
        <main style={{ minHeight: '80vh' }}>
          <About />
        </main>
      } />
      <Route path="/resources" element={
        <main style={{ minHeight: '80vh' }}>
          <Resources onNavigate={navigateTo} />
        </main>
      } />
      <Route path="/support" element={
        <main style={{ minHeight: '80vh' }}>
          <Support />
          <section style={{ backgroundColor: 'var(--bg-content)', padding: isMobile ? '3rem 1rem' : '4rem 2rem' }}>
            <FAQs />
          </section>
        </main>
      } />
      <Route path="/for-practitioners" element={
        <main style={{ minHeight: '80vh' }}>
          <ForPractitioners />
        </main>
      } />
      <Route path="/get-started" element={
        <RiskAssessment onNavigate={onNavigate} />
      } />
      <Route path="/get-started/for-myself" element={
        <AssessmentChronicConditions onBack={() => onNavigate('risk-assessment')} />
      } />
      <Route path="/get-started/for-someone" element={
        <AssessmentCaregiver onBack={() => onNavigate('risk-assessment')} />
      } />
      <Route path="/get-started/just-curious" element={
        <AssessmentJustCurious onBack={() => onNavigate('risk-assessment')} />
      } />
      <Route path="/lifestyle-programs" element={<LifestylePrograms />} />
      <Route path="/" element={
      <main>
        {/* Hero — white bg, two-line serif + coral italic */}
        <motion.section
          id="home"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            backgroundColor: '#FFFFFF',
            padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
            scrollMarginTop: '120px',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="hero-serif" style={{
              fontSize: isMobile ? '3.5rem' : 'clamp(3rem, 8vw, 6rem)',
              color: 'var(--ink)',
              lineHeight: 1.1,
              marginBottom: '0.25rem',
            }}>
              Start Your
            </h1>
            <h1 className="hero-serif-italic" style={{
              fontSize: isMobile ? '3.5rem' : 'clamp(3rem, 8vw, 6rem)',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}>
              Path2Prevention
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              color: 'var(--ink-70)',
              maxWidth: '36rem',
              margin: '0 auto 2rem',
              lineHeight: 1.6,
            }}>
              Get started on your CDC: Path2Prevention journey to prevent chronic diseases. Find videos, interactive tools, and personalized information to help you learn more about preventing conditions like heart disease, stroke, diabetes, COPD, and obesity.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <button onClick={() => onNavigate('risk-assessment')} className="btn btn-primary">
                Am I At Risk?
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="btn btn-secondary">
                How It Works
              </button>
            </div>
          </div>
        </motion.section>

        {/* Why CDC: Path2Prevention — two columns */}
        <motion.section
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            padding: isMobile ? '4rem 1.5rem' : '5rem 2rem',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '2.5rem' : '4rem',
            alignItems: 'center',
          }}>
            <div>
              <h2 className="hero-serif" style={{
                fontSize: isMobile ? '2.25rem' : '3rem',
                color: 'var(--ink)',
                marginBottom: '1rem',
              }}>
                Why CDC: Path2Prevention?
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                color: 'var(--ink-70)',
                marginBottom: '2rem',
                lineHeight: 1.6,
              }}>
                CDC: Path2Prevention is an online resource for people who may be at risk for developing chronic diseases. Find videos, games, and other personalized information to help you learn more about prevention.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div className="icon-circle icon-circle-coral">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: '700', color: 'var(--ink)', marginBottom: '0.25rem' }}>Educational Videos</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--ink-70)' }}>Watch and learn at your own pace.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div className="icon-circle icon-circle-coral">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: '700', color: 'var(--ink)', marginBottom: '0.25rem' }}>Interactive Games</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--ink-70)' }}>Engage with fun, evidence-based content.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div className="icon-circle icon-circle-coral">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: '700', color: 'var(--ink)', marginBottom: '0.25rem' }}>Personalized Info</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--ink-70)' }}>Get recommendations tailored to you.</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div className="image-overlay" style={{
                borderRadius: 'var(--radius-3xl)',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(239, 70, 35, 0.08)',
                aspectRatio: '4/3',
              }}>
                <img src="/diverse-group-eating.jpg" alt="Community healthy living" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.5rem 1.5rem 2rem',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                  color: '#fff',
                }}>
                  <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', opacity: 0.9 }}>COMMUNITY</div>
                  <div style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>Healthy Living</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: '700', fontSize: '1.125rem', marginTop: '0.5rem' }}>Building healthier habits together.</div>
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
                  FOCUS ON Prevention.
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Here's How It Works — three white cards */}
        <motion.section
          id="how-it-works"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } } }}
          style={{
            backgroundColor: '#F4F6F8',
            padding: isMobile ? '4rem 1.5rem' : '5rem 2rem',
            textAlign: 'center',
            scrollMarginTop: '100px',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2
              className="hero-serif"
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: isMobile ? '2.25rem' : '3rem',
                color: 'var(--ink)',
                marginBottom: '1rem',
              }}
            >
              Here's How It Works
            </motion.h2>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                color: 'var(--ink-70)',
                maxWidth: '36rem',
                margin: '0 auto 3rem',
                lineHeight: 1.6,
              }}
            >
              Click into a section below to find videos, interactive games, and more to start on your CDC: Path2Prevention.
            </motion.p>
            <motion.div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '1.5rem',
              }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04, transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] } }}
                onClick={() => onNavigate('about')}
                className="card card-clickable"
                style={{ textAlign: 'center', padding: '2rem', cursor: 'pointer', transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                <div className="icon-circle icon-circle-coral" style={{ margin: '0 auto 1.25rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '700', fontSize: '1.125rem', color: 'var(--ink)', marginBottom: '0.75rem' }}>What is The Path?</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--ink-70)', lineHeight: 1.5, margin: 0 }}>Learn about chronic disease risk factors and how lifestyle changes can help prevent conditions like heart disease, stroke, and diabetes.</p>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04, transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] } }}
                onClick={() => onNavigate('resources')}
                className="card card-clickable"
                style={{ textAlign: 'center', padding: '2rem', cursor: 'pointer', transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                <div className="icon-circle icon-circle-coral" style={{ margin: '0 auto 1.25rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '700', fontSize: '1.125rem', color: 'var(--ink)', marginBottom: '0.75rem' }}>Get the Facts</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--ink-70)', lineHeight: 1.5, margin: 0 }}>Access evidence-based information about preventing chronic diseases including obesity, COPD, and cardiovascular conditions.</p>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04, transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] } }}
                onClick={() => onNavigate('risk-assessment')}
                className="card card-clickable"
                style={{ textAlign: 'center', padding: '2rem', cursor: 'pointer', transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                <div className="icon-circle icon-circle-coral" style={{ margin: '0 auto 1.25rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '700', fontSize: '1.125rem', color: 'var(--ink)', marginBottom: '0.75rem' }}>Start Your Plan</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--ink-70)', lineHeight: 1.5, margin: 0 }}>Take a risk assessment and create a personalized action plan with interactive tools and resources tailored to your needs.</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Start Today CTA — coral block */}
        <motion.section
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ padding: isMobile ? '3rem 1.5rem' : '4rem 2rem' }}
        >
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            backgroundColor: 'var(--coral)',
            borderRadius: '64px',
            padding: isMobile ? '3rem 2rem' : '4rem 3rem',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '2rem',
            alignItems: 'center',
          }}>
            <h2 className="hero-serif" style={{ fontSize: isMobile ? '2.5rem' : '4rem', color: '#fff', margin: 0, lineHeight: 1.1 }}>
              Start Today
            </h2>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', color: '#fff', fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                Take the first step toward better health. Complete your assessment in under 10 minutes and get instant results.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => onNavigate('risk-assessment')} className="btn btn-white">Get Started</button>
                <button className="btn btn-white">Learn More</button>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem', marginTop: '1.25rem', marginBottom: 0 }}>
                You're not alone. We've helped thousands get started on their path to prevention.
              </p>
            </div>
          </div>
        </motion.section>

      </main>
      } />
      </Routes>

      {/* CDC Footer */}
      <CDCFooter />
      
      {/* Chatbot */}
      <Chatbot onNavigate={handleChatbotNavigate} />
    </div>
  )
}

export default App
