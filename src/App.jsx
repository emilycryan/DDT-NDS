import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
import * as motion from 'motion/react-client'
import './App.css'
import CDCHeader from './components/CDCHeader'
import CDCFooter from './components/CDCFooter'
import Chatbot from './components/Chatbot'
import GetStartedHub from './components/GetStartedHub'
import QuestionsChronicConditions from './components/QuestionsChronicConditions'
import QuestionsCaregiverFlow from './components/QuestionsCaregiverFlow'
import QuestionsJustCuriousFlow from './components/QuestionsJustCuriousFlow'
import About from './components/About'
import Learn from './components/Learn'
import Action from './components/Action'
import ForPractitioners from './components/ForPractitioners'
import PractitionerFeedback from './components/PractitionerFeedback'
import HealthFactorsChecklist from './components/HealthFactorsChecklist'
import WeeklyActivityTrackingSheet from './components/WeeklyActivityTrackingSheet'
import GoalSettingWorksheet from './components/GoalSettingWorksheet'
import LifestylePrograms from './components/LifestylePrograms'
import FAQs from './components/FAQs'
import UnderstandingPrediabetes from './components/UnderstandingPrediabetes'
import NutritionBloodSugar from './components/NutritionBloodSugar'
import ExerciseInsulinSensitivity from './components/ExerciseInsulinSensitivity'
import DPPProgramOverview from './components/DPPProgramOverview'
import KnowYourNumbers from './components/KnowYourNumbers'
import BloodPressureCholesterol from './components/BloodPressureCholesterol'
import HeartHealthyEating from './components/HeartHealthyEating'
import StressHeartHealth from './components/StressHeartHealth'
import BuildingHealthyHabits from './components/BuildingHealthyHabits'
import SleepRecovery from './components/SleepRecovery'
import MentalHealthResilience from './components/MentalHealthResilience'
import SocialConnection from './components/SocialConnection'
import HowToReadFoodLabels from './components/HowToReadFoodLabels'
import MealPlanningOnBudget from './components/MealPlanningOnBudget'
import MovingMoreWhenBusy from './components/MovingMoreWhenBusy'
import SettingRealisticGoals from './components/SettingRealisticGoals'
import ActionPlanStart from './components/ActionPlanStart'
import ActionPlanMotivators from './components/ActionPlanMotivators'
import ActionPlanDppInfo from './components/ActionPlanDppInfo'
import ActionPlanBarriers from './components/ActionPlanBarriers'
import ActionPlanClassPreferences from './components/ActionPlanClassPreferences'
import ActionPlanSelectDate from './components/ActionPlanSelectDate'
import ActionPlanCompleted from './components/ActionPlanCompleted'

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
  'learn': '/learn',
  'action': '/action',
  'for-practitioners': '/for-practitioners',
  'get-started': '/get-started',
  'lifestyle-programs': '/lifestyle-programs',
  'action-plan': '/action/action-plan',
  'questions-for-myself': '/get-started/for-myself',
  'questions-for-someone': '/get-started/for-someone',
  'questions-just-curious': '/get-started/just-curious',
  // Back-compat aliases (old nav names)
  'resources': '/learn',
  'support': '/action',
}

const PATH_TO_PAGE = Object.fromEntries(Object.entries(PAGE_TO_PATH).map(([k, v]) => [v, k]))

function PrefixRedirect({ fromPrefix, toPrefix }) {
  const location = useLocation()

  const pathname = location.pathname || '/'
  if (!pathname.startsWith(fromPrefix)) return <Navigate to="/" replace />

  const nextPathname = pathname.replace(fromPrefix, toPrefix)
  const to = `${nextPathname}${location.search || ''}${location.hash || ''}`
  return <Navigate to={to} replace />
}

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const onNavigate = (page) => {
    const path = PAGE_TO_PATH[page] || (page === 'home' ? '/' : `/${page}`)
    navigate(path)
    window.scrollTo(0, 0)
  }

  const goToHomeSection = (sectionId) => {
    navigate('/')
    setTimeout(() => scrollToSection(sectionId), 150)
  }

  const handleChatbotNavigate = (destination) => {
    if (['about', 'learn', 'action', 'resources', 'support', 'for-practitioners', 'get-started', 'lifestyle-programs', 'action-plan'].includes(destination)) onNavigate(destination)
    else goToHomeSection(destination)
  }

  const navigateTo = (destination) => {
    if (['about', 'learn', 'action', 'resources', 'support', 'for-practitioners', 'get-started', 'lifestyle-programs', 'action-plan'].includes(destination)) onNavigate(destination)
    else goToHomeSection(destination)
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
      {/* Backward-compatible URL prefixes */}
      <Route path="/resources/*" element={<PrefixRedirect fromPrefix="/resources" toPrefix="/learn" />} />
      <Route path="/support/*" element={<PrefixRedirect fromPrefix="/support" toPrefix="/action" />} />

      <Route path="/about" element={
        <main style={{ minHeight: '80vh' }}>
          <About onNavigate={navigateTo} />
        </main>
      } />
      <Route path="/learn" element={
        <main style={{ minHeight: '80vh' }}>
          <Learn onNavigate={navigateTo} />
        </main>
      } />
      <Route path="/learn/prediabetes/understanding-prediabetes" element={
        <main style={{ minHeight: '80vh' }}>
          <UnderstandingPrediabetes />
        </main>
      } />
      <Route path="/learn/prediabetes/nutrition-blood-sugar" element={
        <main style={{ minHeight: '80vh' }}>
          <NutritionBloodSugar />
        </main>
      } />
      <Route path="/learn/prediabetes/physical-activity-insulin-sensitivity" element={
        <main style={{ minHeight: '80vh' }}>
          <ExerciseInsulinSensitivity />
        </main>
      } />
      <Route path="/learn/prediabetes/dpp-program-overview" element={
        <main style={{ minHeight: '80vh' }}>
          <DPPProgramOverview />
        </main>
      } />
      <Route path="/learn/heart-health/know-your-numbers" element={
        <main style={{ minHeight: '80vh' }}>
          <KnowYourNumbers />
        </main>
      } />
      <Route path="/learn/heart-health/blood-pressure-cholesterol" element={
        <main style={{ minHeight: '80vh' }}>
          <BloodPressureCholesterol />
        </main>
      } />
      <Route path="/learn/heart-health/heart-healthy-eating" element={
        <main style={{ minHeight: '80vh' }}>
          <HeartHealthyEating />
        </main>
      } />
      <Route path="/learn/heart-health/stress-and-heart-health" element={
        <main style={{ minHeight: '80vh' }}>
          <StressHeartHealth />
        </main>
      } />
      <Route path="/learn/heart-health/stress-cardiovascular-risk" element={<Navigate to="/learn/heart-health/stress-and-heart-health" replace />} />
      <Route path="/learn/healthy-living/building-healthy-habits" element={
        <main style={{ minHeight: '80vh' }}>
          <BuildingHealthyHabits />
        </main>
      } />
      <Route path="/learn/healthy-living/sleep-recovery" element={
        <main style={{ minHeight: '80vh' }}>
          <SleepRecovery />
        </main>
      } />
      <Route path="/learn/healthy-living/mental-health-resilience" element={
        <main style={{ minHeight: '80vh' }}>
          <MentalHealthResilience />
        </main>
      } />
      <Route path="/learn/healthy-living/social-connection" element={
        <main style={{ minHeight: '80vh' }}>
          <SocialConnection />
        </main>
      } />
      <Route path="/action/tips/how-to-read-food-labels" element={
        <main style={{ minHeight: '80vh' }}>
          <HowToReadFoodLabels />
        </main>
      } />
      <Route path="/action/tips/meal-planning-on-budget" element={
        <main style={{ minHeight: '80vh' }}>
          <MealPlanningOnBudget />
        </main>
      } />
      <Route path="/action/tips/moving-more-when-busy" element={
        <main style={{ minHeight: '80vh' }}>
          <MovingMoreWhenBusy />
        </main>
      } />
      <Route path="/action/tips/setting-realistic-goals" element={
        <main style={{ minHeight: '80vh' }}>
          <SettingRealisticGoals />
        </main>
      } />
      <Route path="/action/action-plan" element={
        <main style={{ minHeight: '80vh' }}>
          <ActionPlanStart />
        </main>
      } />
      <Route path="/action/action-plan/motivators" element={
        <main style={{ minHeight: '80vh' }}>
          <ActionPlanMotivators />
        </main>
      } />
      <Route path="/action/action-plan/dpp-information" element={
        <main style={{ minHeight: '80vh' }}>
          <ActionPlanDppInfo />
        </main>
      } />
      <Route path="/action/action-plan/barriers" element={
        <main style={{ minHeight: '80vh' }}>
          <ActionPlanBarriers />
        </main>
      } />
      <Route path="/action/action-plan/class-preferences" element={
        <main style={{ minHeight: '80vh' }}>
          <ActionPlanClassPreferences />
        </main>
      } />
      <Route path="/action/action-plan/select-date" element={
        <main style={{ minHeight: '80vh' }}>
          <ActionPlanSelectDate />
        </main>
      } />
      <Route path="/action/action-plan/completed" element={
        <main style={{ minHeight: '80vh' }}>
          <ActionPlanCompleted />
        </main>
      } />
      <Route path="/action" element={
        <main style={{ minHeight: '80vh' }}>
          <Action />
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
      <Route path="/for-practitioners/feedback" element={
        <main style={{ minHeight: '80vh' }}>
          <PractitionerFeedback />
        </main>
      } />
      <Route path="/for-practitioners/health-factors-checklist" element={
        <main style={{ minHeight: '80vh' }}>
          <HealthFactorsChecklist />
        </main>
      } />
      <Route path="/for-practitioners/risk-factor-checklist" element={<Navigate to="/for-practitioners/health-factors-checklist" replace />} />
      <Route path="/for-practitioners/weekly-activity-tracking-sheet" element={
        <main style={{ minHeight: '80vh' }}>
          <WeeklyActivityTrackingSheet />
        </main>
      } />
      <Route path="/for-practitioners/goal-setting-worksheet" element={
        <main style={{ minHeight: '80vh' }}>
          <GoalSettingWorksheet />
        </main>
      } />
      <Route path="/get-started" element={
        <GetStartedHub onNavigate={onNavigate} />
      } />
      <Route path="/get-started/for-myself" element={
        <QuestionsChronicConditions onBack={() => onNavigate('get-started')} />
      } />
      <Route path="/get-started/for-someone" element={
        <QuestionsCaregiverFlow onBack={() => onNavigate('get-started')} />
      } />
      <Route path="/get-started/just-curious" element={
        <QuestionsJustCuriousFlow onBack={() => onNavigate('get-started')} />
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
              Get started on your Path2Prevention journey to prevent chronic diseases. Find videos, interactive tools, and personalized information to help you learn more about preventing conditions like heart disease, stroke, diabetes, COPD, and obesity.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <button onClick={() => onNavigate('get-started')} className="btn btn-primary">
                Get Started
              </button>
            </div>
          </div>
        </motion.section>

        {/* Why Path2Prevention — two columns */}
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
                Why Path2Prevention?
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                color: 'var(--ink-70)',
                marginBottom: '2rem',
                lineHeight: 1.6,
              }}>
                Path2Prevention is an online resource for people who want to focus on preventing chronic diseases. Find videos, resources, and other personalized information to help you learn more about prevention.
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
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: '700', color: 'var(--ink)', marginBottom: '0.25rem' }}>Learn More</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--ink-70)' }}>Download our guides and lifestyle journey tools.</div>
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
              Click into a section below to find videos, interactive games, and more to start on your Path2Prevention.
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
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--ink-70)', lineHeight: 1.5, margin: 0 }}>Learn what influences long-term health and how lifestyle changes can help prevent conditions like heart disease, stroke, and diabetes.</p>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04, transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] } }}
                onClick={() => onNavigate('learn')}
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
                onClick={() => onNavigate('get-started')}
                className="card card-clickable"
                style={{ textAlign: 'center', padding: '2rem', cursor: 'pointer', transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                <div className="icon-circle icon-circle-coral" style={{ margin: '0 auto 1.25rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: '700', fontSize: '1.125rem', color: 'var(--ink)', marginBottom: '0.75rem' }}>Start Your Journey</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--ink-70)', lineHeight: 1.5, margin: 0 }}>Answer a few questions and begin a personalized journey with interactive tools and resources tailored to your needs.</p>
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
                Take the first step toward better health. Find out how you can make small changes for big impacts to improve your health.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => onNavigate('get-started')} className="btn btn-white">Get Started</button>
                <button onClick={() => onNavigate('about')} className="btn btn-white">Learn More</button>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem', marginTop: '1.25rem', marginBottom: 0 }}>
                You're not alone. We have the tools and resources to help you create your own path to prevention.
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
