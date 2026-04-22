import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as motion from 'motion/react-client';

const TOTAL_STEPS = 7;
const STEP = 3;
const TEAL = '#005ea2';

const ActionPlanDppInfo = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    try {
      const n = sessionStorage.getItem('actionPlanFirstName');
      if (!n) navigate('/support/action-plan', { replace: true });
    } catch {
      navigate('/support/action-plan', { replace: true });
    }
  }, [navigate]);

  const progressPct = (STEP / TOTAL_STEPS) * 100;

  const handleContinue = (e) => {
    e.preventDefault();
    try {
      sessionStorage.setItem('actionPlanStep', String(STEP));
    } catch {
      /* ignore */
    }
    navigate('/support/action-plan/barriers');
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh', padding: isMobile ? '2rem 1rem' : '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <nav
          style={{
            marginBottom: '1.25rem',
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
          <Link to="/support" style={{ color: 'var(--ink-70)', textDecoration: 'none' }}>
            Take Action
          </Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Your Action Plan</span>
        </nav>

        <div style={{ height: 4, backgroundColor: 'var(--ink-10)', borderRadius: 2, marginBottom: '1.25rem', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: '100%', backgroundColor: 'var(--coral)' }}
          />
        </div>

        <p
          style={{
            fontSize: '0.875rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--ink-70)',
            marginBottom: '0.75rem',
            textAlign: 'center',
          }}
        >
          {STEP}/{TOTAL_STEPS}
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            color: 'var(--ink)',
            fontSize: isMobile ? '1.4rem' : '1.65rem',
            lineHeight: 1.25,
            margin: '0 0 1rem 0',
            textAlign: 'center',
          }}
        >
          National DPP LCP Information &amp; Cost
        </h1>

        <div
          style={{
            backgroundColor: '#EBF5FB',
            border: '1px solid #e0e0e0',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: '#1b1b1b',
              lineHeight: 1.65,
              textAlign: 'center',
            }}
          >
            Awesome work! Now, let&apos;s set your plan up for success. This program was created for people just like you — people ready to{' '}
            <strong style={{ fontWeight: 600 }}>create</strong> positive change in their lives and improve their health.
          </p>
        </div>

        {/* Program shape — open content, no accordion */}
        <section
          style={{
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.35rem',
            marginBottom: '1rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{ flexShrink: 0 }} aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M6 4h12v16H6V4z" stroke={TEAL} strokeWidth="1.5" />
                <path d="M9 8h6M9 12h4" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '1.05rem',
                color: '#1b1b1b',
              }}
            >
              What does the program look like?
            </h2>
          </div>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', lineHeight: 1.65 }}>
            The <strong style={{ fontWeight: 600 }}>National DPP lifestyle change program</strong> (National DPP LCP) is a <strong style={{ fontWeight: 600 }}>year-long</strong>, CDC-recognized program. You&apos;ll meet regularly with a <strong style={{ fontWeight: 600 }}>trained coach and a small group</strong>: often weekly at first, then about <strong style={{ fontWeight: 600 }}>once or twice a month</strong> for the rest of the year. Sessions may be <strong style={{ fontWeight: 600 }}>in person or online</strong> depending on the provider; all follow CDC guidance.
          </p>
        </section>

        {/* Cost — open content */}
        <section
          style={{
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.35rem',
            marginBottom: '1rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{ flexShrink: 0 }} aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke={TEAL} strokeWidth="1.5" />
                <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill={TEAL} fontFamily="system-ui,sans-serif">
                  $
                </text>
              </svg>
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '1.05rem',
                color: '#1b1b1b',
              }}
            >
              What does the program cost?
            </h2>
          </div>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', lineHeight: 1.65 }}>
            <strong style={{ fontWeight: 600 }}>It depends on the program.</strong> Many insurance plans (including Medicare and some Medicaid programs) cover the National DPP lifestyle change program; some sites are free or offer reduced fees; employers sometimes pay. Contact the program you&apos;re interested in for <strong style={{ fontWeight: 600 }}>your</strong> cost and coverage.
          </p>
        </section>

        {/* Tip — third “panel” from mock, always visible */}
        <div
          style={{
            backgroundColor: '#e8f4ef',
            border: '1px solid #c5e0d0',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '1.75rem',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'flex-start',
          }}
        >
          <span style={{ flexShrink: 0 }} aria-hidden>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M4 18c0-4 4-7 8-10 4 3 8 6 8 10v2H4v-2z" fill="#007833" opacity="0.2" />
              <circle cx="9" cy="11" r="1.5" fill="#007833" />
              <circle cx="15" cy="11" r="1.5" fill="#007833" />
            </svg>
          </span>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9375rem', color: '#007833', marginBottom: '0.35rem' }}>
              Tip
            </div>
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#1b1b1b', lineHeight: 1.6 }}>
              Have your health insurance information ready when you contact the program provider of your choice.
            </p>
          </div>
        </div>

        <form onSubmit={handleContinue}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className="btn btn-primary" style={{ minWidth: 240 }}>
              Identify Barriers
            </button>
          </div>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: 0 }}>
          <Link
            to="/support/action-plan/motivators"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--ink-70)',
            }}
          >
            ← Back
          </Link>
        </p>
      </div>
    </main>
  );
};

export default ActionPlanDppInfo;
