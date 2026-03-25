import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as motion from 'motion/react-client';

const TOTAL_STEPS = 7;
const STEP = 1;

/** Simple inline illustration — two people, flat style, site palette */
function TwoPeopleIllustration() {
  return (
    <svg
      width="100%"
      height="auto"
      viewBox="0 0 400 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ maxWidth: 360, margin: '0 auto', display: 'block' }}
    >
      <rect width="400" height="220" fill="#F8FAFB" rx="12" />
      <circle cx="80" cy="60" r="40" fill="#E8EEF2" opacity="0.9" />
      <circle cx="340" cy="170" r="50" fill="#E8EEF2" opacity="0.7" />
      {/* Person 1 */}
      <ellipse cx="140" cy="175" rx="36" ry="10" fill="rgba(45,59,66,0.08)" />
      <path d="M120 120c0-15 12-28 28-28s28 13 28 28v55h-56v-55z" fill="#0F4C5C" />
      <circle cx="148" cy="95" r="22" fill="#E8C4A8" />
      <path d="M130 88c4-10 16-16 26-14" stroke="#2D3B42" strokeWidth="3" strokeLinecap="round" />
      {/* Person 2 */}
      <ellipse cx="260" cy="178" rx="38" ry="10" fill="rgba(45,59,66,0.08)" />
      <path d="M235 118c0-14 11-26 25-26s25 12 25 26v58h-50v-58z" fill="#B8C5CC" />
      <circle cx="260" cy="95" r="22" fill="#8D5524" />
      <path d="M248 82c6-8 18-12 28-8" stroke="#2D3B42" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M200 40h3M210 55h2M185 70h2" stroke="#C5D0D6" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 6" />
    </svg>
  );
}

const ActionPlanStart = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const progressPct = (STEP / TOTAL_STEPS) * 100;

  const handleContinue = (e) => {
    e.preventDefault();
    const trimmed = firstName.trim();
    if (!trimmed) return;
    try {
      sessionStorage.setItem('actionPlanFirstName', trimmed);
      sessionStorage.setItem('actionPlanStep', String(STEP));
    } catch {
      /* ignore */
    }
    navigate('/support/action-plan/motivators');
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh', padding: isMobile ? '2rem 1rem' : '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
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
            Support
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
            fontSize: isMobile ? '1.5rem' : '1.75rem',
            lineHeight: 1.25,
            margin: '0 0 1.25rem 0',
            textAlign: 'center',
          }}
        >
          General information
        </h1>

        <div
          style={{
            backgroundColor: '#f0f4f8',
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
              lineHeight: 1.6,
            }}
          >
            Welcome to your personalized Action Plan. After you answer a few more questions, your plan will be finished. Let&apos;s start with the basics.
          </p>
        </div>

        <form onSubmit={handleContinue}>
          <label
            htmlFor="action-plan-first-name"
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              color: '#1b1b1b',
              marginBottom: '0.5rem',
            }}
          >
            What is your first name?
          </label>
          <input
            id="action-plan-first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#1b1b1b',
              border: '1px solid #e0e0e0',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.5rem',
              backgroundColor: '#fff',
            }}
          />

          <div style={{ marginBottom: '1.75rem' }}>
            <TwoPeopleIllustration />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!firstName.trim()}
              style={{
                opacity: firstName.trim() ? 1 : 0.55,
                cursor: firstName.trim() ? 'pointer' : 'not-allowed',
                minWidth: 220,
              }}
            >
              Identify Motivators
            </button>
          </div>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: 0 }}>
          <Link
            to="/support"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--ink-70)',
            }}
          >
            ← Back to Support
          </Link>
        </p>
      </div>
    </main>
  );
};

export default ActionPlanStart;
