import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as motion from 'motion/react-client';
import { PARTICIPATION_LABELS, TIME_LABELS } from '../data/actionPlanLabels';

const TOTAL_STEPS = 7;
const STEP = 5;
const ICON = '#005ea2';

const PARTICIPATION = [
  { id: 'in-person', iconKey: 'chalk' },
  { id: 'online', iconKey: 'laptop' },
  { id: 'distance', iconKey: 'phone' },
];

const TIME_OPTS = [
  { id: 'morning', iconKey: 'sun', accent: '#E6B800' },
  { id: 'afternoon', iconKey: 'partly', accent: '#5B9BD5' },
  { id: 'evening', iconKey: 'moon', accent: '#1a365d' },
  { id: 'weekend', iconKey: 'cal', accent: '#005ea2' },
];

const Icons = {
  chalk: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="14" rx="1" stroke={ICON} strokeWidth="1.5" />
      <path d="M7 9h10M7 12h6" stroke={ICON} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="7" r="1" fill={ICON} />
    </svg>
  ),
  laptop: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="6" width="14" height="10" rx="1" stroke={ICON} strokeWidth="1.5" />
      <path d="M4 18h16" stroke={ICON} strokeWidth="1.5" />
      <path d="M10 14h4" stroke={ICON} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  phone: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="8" y="3" width="8" height="18" rx="1.5" stroke={ICON} strokeWidth="1.5" />
      <circle cx="12" cy="17" r="1" fill={ICON} />
    </svg>
  ),
  sun: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="5" fill="#E6B800" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="#E6B800" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  partly: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="10" cy="12" r="4" fill="#5B9BD5" opacity="0.9" />
      <path d="M16 10a4 4 0 11-4 7h-5a5 5 0 019-4z" fill="#87CEEB" />
    </svg>
  ),
  moon: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14 4a6 6 0 100 12 7 7 0 01-7-7 6 6 0 0012-5z" fill="#1a365d" />
      <circle cx="6" cy="6" r="0.8" fill="#fff" opacity="0.6" />
      <circle cx="9" cy="4" r="0.5" fill="#fff" opacity="0.5" />
    </svg>
  ),
  cal: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="16" rx="2" stroke="#005ea2" strokeWidth="1.5" />
      <path d="M4 10h16M9 5V3M15 5V3" stroke="#005ea2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const ActionPlanClassPreferences = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [participation, setParticipation] = useState(() => new Set());
  const [times, setTimes] = useState(() => new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem('actionPlanFirstName')) {
        navigate('/support/action-plan', { replace: true });
        return;
      }
      const p = sessionStorage.getItem('actionPlanParticipationIds');
      if (p) {
        try {
          const ids = JSON.parse(p);
          if (Array.isArray(ids)) setParticipation(new Set(ids));
        } catch {
          /* ignore */
        }
      }
      const t = sessionStorage.getItem('actionPlanTimeIds');
      if (t) {
        try {
          const ids = JSON.parse(t);
          if (Array.isArray(ids)) setTimes(new Set(ids));
        } catch {
          /* ignore */
        }
      }
    } catch {
      navigate('/support/action-plan', { replace: true });
    }
  }, [navigate]);

  const progressPct = (STEP / TOTAL_STEPS) * 100;

  const toggleP = useCallback((id) => {
    setParticipation((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }, []);

  const toggleT = useCallback((id) => {
    setTimes((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }, []);

  const canContinue = participation.size > 0 && times.size > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canContinue) return;
    try {
      sessionStorage.setItem('actionPlanParticipationIds', JSON.stringify([...participation]));
      sessionStorage.setItem('actionPlanTimeIds', JSON.stringify([...times]));
      sessionStorage.setItem('actionPlanStep', String(STEP));
    } catch {
      /* ignore */
    }
    navigate('/support/action-plan/select-date');
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh', padding: isMobile ? '2rem 1rem' : '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <Link
            to="/support/action-plan/barriers"
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
            fontSize: isMobile ? '1.5rem' : '1.75rem',
            lineHeight: 1.25,
            margin: '0 0 1rem 0',
            textAlign: 'center',
          }}
        >
          Class Preferences
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
          <p style={{ margin: '0 0 0.75rem 0', fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#1b1b1b', lineHeight: 1.65 }}>
            Great work. Just a few more questions and your plan will be finished! Let&apos;s look at how the program and class schedule could fit into your life.
          </p>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', lineHeight: 1.65 }}>
            Many providers offer the program, so you can find a class that works best for you. These providers must meet CDC standards for recognition and use CDC-approved materials for classes.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', color: '#1b1b1b', margin: '0 0 0.25rem 0' }}>
            I would prefer to participate in classes:
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#323a45', fontStyle: 'italic', margin: '0 0 0.75rem 0' }}>
            Click all the boxes that are right for you.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '0.75rem',
              marginBottom: '1.75rem',
            }}
          >
            {PARTICIPATION.map(({ id, iconKey }) => {
              const isOn = participation.has(id);
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={isOn}
                  onClick={() => toggleP(id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                    padding: '1rem',
                    minHeight: 130,
                    backgroundColor: isOn ? '#FDF1EE' : '#fff',
                    border: `2px solid ${isOn ? 'var(--coral)' : '#e0e0e0'}`,
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ flexShrink: 0 }}>{Icons[iconKey]}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500, color: '#1b1b1b', lineHeight: 1.45 }}>
                    {PARTICIPATION_LABELS[id]}
                  </span>
                </button>
              );
            })}
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', color: '#1b1b1b', margin: '0 0 0.25rem 0' }}>
            I would want to go to a class:
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#323a45', fontStyle: 'italic', margin: '0 0 0.75rem 0' }}>
            Click all the boxes that are right for you.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '0.75rem',
              marginBottom: '1.5rem',
            }}
          >
            {TIME_OPTS.map(({ id, iconKey }) => {
              const isOn = times.has(id);
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={isOn}
                  onClick={() => toggleT(id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem 0.65rem',
                    backgroundColor: isOn ? '#FDF1EE' : '#fff',
                    border: `2px solid ${isOn ? 'var(--coral)' : '#e0e0e0'}`,
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                  }}
                >
                  <span>{Icons[iconKey]}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500, color: '#1b1b1b', lineHeight: 1.35, textAlign: 'center' }}>
                    {TIME_LABELS[id]}
                  </span>
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!canContinue}
              style={{
                opacity: canContinue ? 1 : 0.55,
                cursor: canContinue ? 'pointer' : 'not-allowed',
                minWidth: 240,
              }}
            >
              Select a Date
            </button>
          </div>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: 0 }}>
          <Link to="/support/action-plan/barriers" style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--ink-70)' }}>
            ← Back
          </Link>
        </p>
      </div>
    </main>
  );
};

export default ActionPlanClassPreferences;
