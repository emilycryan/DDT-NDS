import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as motion from 'motion/react-client';

const TOTAL_STEPS = 7;
const STEP = 6;

const ActionPlanSelectDate = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dateValue, setDateValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem('actionPlanFirstName')) {
        navigate('/action/action-plan', { replace: true });
        return;
      }
      const saved = sessionStorage.getItem('actionPlanContactDate');
      if (saved) setDateValue(saved);
    } catch {
      navigate('/action/action-plan', { replace: true });
    }
  }, [navigate]);

  const progressPct = (STEP / TOTAL_STEPS) * 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dateValue) return;
    try {
      sessionStorage.setItem('actionPlanContactDate', dateValue);
      sessionStorage.setItem('actionPlanStep', String(STEP));
    } catch {
      /* ignore */
    }
    navigate('/action/action-plan/completed');
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh', padding: isMobile ? '2rem 1rem' : '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <Link
            to="/action/action-plan/class-preferences"
            aria-label="Back to previous step"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '1px solid #e0e0e0',
              backgroundColor: '#fff',
              color: 'var(--ink)',
              textDecoration: 'none',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

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
          <Link to="/action" style={{ color: 'var(--ink-70)', textDecoration: 'none' }}>
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
            fontSize: isMobile ? '1.5rem' : '1.75rem',
            lineHeight: 1.25,
            margin: '0 0 1rem 0',
            textAlign: 'center',
          }}
        >
          Select a Date
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
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#1b1b1b', lineHeight: 1.65 }}>
            Last step! So far you have identified your motivation, your obstacles, and the type of class for you. Now, pick a date to contact a program provider.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="action-plan-contact-date"
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              color: '#1b1b1b',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            I will contact a program provider by:
          </label>

          <div style={{ marginBottom: '0.5rem' }}>
            <input
              id="action-plan-contact-date"
              type="date"
              required
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                color: '#1b1b1b',
                border: '1px solid #e0e0e0',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#fff',
              }}
            />
          </div>

          <div
            style={{
              position: 'relative',
              marginTop: '1.25rem',
              marginBottom: '1.75rem',
              padding: '1rem 1.1rem',
              backgroundColor: '#f3f4f6',
              border: '1px solid #e5e7eb',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
            }}
          >
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '8px solid #e5e7eb',
              }}
            />
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#323a45', lineHeight: 1.6 }}>
              Pick a date that works for your schedule, then add it to your calendar, write yourself a reminder, or even tell your family and friends about your plans!
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className="btn btn-primary" disabled={!dateValue} style={{ minWidth: 220, opacity: dateValue ? 1 : 0.55 }}>
              Review Plan
            </button>
          </div>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: 0 }}>
          <Link to="/action/action-plan/class-preferences" style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--ink-70)' }}>
            ← Back
          </Link>
        </p>
      </div>
    </main>
  );
};

export default ActionPlanSelectDate;
