import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as motion from 'motion/react-client';

const TOTAL_STEPS = 7;
const STEP = 2;
const ICON_COLOR = '#005ea2';

const MotivatorIcons = {
  scale: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="10" width="14" height="10" rx="1" stroke={ICON_COLOR} strokeWidth="1.5" />
      <path d="M8 10V8a4 4 0 018 0v2" stroke={ICON_COLOR} strokeWidth="1.5" />
      <path d="M9 14h6" stroke={ICON_COLOR} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  family: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 12h4v8H4v-8zm8-4h4v12h-4V8zm8 4h4v8h-4v-8z" fill={ICON_COLOR} opacity="0.35" />
      <path d="M12 6l-2 2h4l-2-2z" fill={ICON_COLOR} />
      <path d="M12 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill={ICON_COLOR} />
    </svg>
  ),
  energy: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="10" r="3" stroke={ICON_COLOR} strokeWidth="1.5" />
      <circle cx="15" cy="10" r="3" stroke={ICON_COLOR} strokeWidth="1.5" />
      <path d="M12 16c-2 0-3.5 1-4 2.5M12 16c2 0 3.5 1 4 2.5" stroke={ICON_COLOR} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 13v3" stroke="#E05A4D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  dumbbell: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 10h2v4H6v-4zm10 0h2v4h-2v-4z" fill={ICON_COLOR} />
      <path d="M8 11h8" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 9v6M19 9v6" stroke={ICON_COLOR} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  pill: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="10" width="12" height="6" rx="3" stroke={ICON_COLOR} strokeWidth="1.5" />
      <path d="M10 10v6M14 10v6" stroke={ICON_COLOR} strokeWidth="1" opacity="0.5" />
    </svg>
  ),
  diabetes: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 18c0-4 2-7 4-9 2 2 4 5 4 9" stroke={ICON_COLOR} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 14h2M12 12v6" stroke={ICON_COLOR} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="14" cy="8" r="2" fill="#5BC0DE" opacity="0.6" />
    </svg>
  ),
  bills: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="6" width="14" height="14" rx="2" stroke={ICON_COLOR} strokeWidth="1.5" />
      <path d="M12 10v6M9 13h6" stroke={ICON_COLOR} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  hospital: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 20V10l6-4 6 4v10" stroke={ICON_COLOR} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M11 14h2v6h-2v-6z" fill={ICON_COLOR} opacity="0.4" />
      <path d="M12 11v3" stroke={ICON_COLOR} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  health: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke={ICON_COLOR} strokeWidth="1.5" />
      <path d="M12 8v8M8 12h8" stroke={ICON_COLOR} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

const MOTIVATOR_OPTIONS = [
  { id: 'lose-weight', label: 'Lose weight', iconKey: 'scale' },
  { id: 'family', label: 'Stay healthy for my family', iconKey: 'family' },
  { id: 'energy', label: 'Feel more energized', iconKey: 'energy' },
  { id: 'active', label: 'Be more active', iconKey: 'dumbbell' },
  { id: 'less-medicine', label: 'Take less medicine (such as high blood pressure medicine)', iconKey: 'pill' },
  { id: 'avoid-diabetes', label: "Avoid type 2 diabetes because I've seen what it can do", iconKey: 'diabetes' },
  { id: 'medical-bills', label: 'Reduce my chances of higher medical bills', iconKey: 'bills' },
  { id: 'avoid-conditions', label: 'Avoid serious medical conditions', iconKey: 'hospital' },
  { id: 'prioritize', label: 'Prioritize my health', iconKey: 'health' },
];

const ActionPlanMotivators = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selected, setSelected] = useState(() => new Set());
  const [other, setOther] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    try {
      const n = sessionStorage.getItem('actionPlanFirstName');
      if (!n) {
        navigate('/support/action-plan', { replace: true });
        return;
      }
      const raw = sessionStorage.getItem('actionPlanMotivatorIds');
      if (raw) {
        try {
          const ids = JSON.parse(raw);
          if (Array.isArray(ids)) setSelected(new Set(ids));
        } catch {
          /* ignore */
        }
      }
      const o = sessionStorage.getItem('actionPlanMotivatorOther');
      if (o) setOther(o);
    } catch {
      navigate('/support/action-plan', { replace: true });
    }
  }, [navigate]);

  const progressPct = (STEP / TOTAL_STEPS) * 100;

  const toggle = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const canContinue = selected.size > 0 || other.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canContinue) return;
    try {
      sessionStorage.setItem('actionPlanMotivatorIds', JSON.stringify([...selected]));
      sessionStorage.setItem('actionPlanMotivatorOther', other.trim());
      sessionStorage.setItem('actionPlanStep', String(STEP));
    } catch {
      /* ignore */
    }
    navigate('/support/action-plan/dpp-information');
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh', padding: isMobile ? '2rem 1rem' : '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
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
          Identifying Motivators
        </h1>

        <div
          style={{
            backgroundColor: '#EBF5FB',
            border: '1px solid #e0e0e0',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '1.25rem',
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: '#1b1b1b',
              lineHeight: 1.6,
              textAlign: 'center',
            }}
          >
            Congratulations on taking this step toward a healthier life! What is motivating you to take this step?
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '1rem',
              color: '#1b1b1b',
              margin: '0 0 0.35rem 0',
            }}
          >
            I want to create a healthier life because I want to:
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: '#323a45',
              fontStyle: 'italic',
              margin: '0 0 1rem 0',
            }}
          >
            Click on all the boxes that relate to you or write in your own reason.
          </p>

          <div
            role="group"
            aria-label="Motivators"
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '0.75rem',
              marginBottom: '1.25rem',
            }}
          >
            {MOTIVATOR_OPTIONS.map(({ id, label, iconKey }) => {
              const isOn = selected.has(id);
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={isOn}
                  onClick={() => toggle(id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '0.65rem',
                    padding: '1rem 0.75rem',
                    minHeight: 120,
                    backgroundColor: isOn ? '#FDF1EE' : '#fff',
                    border: `2px solid ${isOn ? 'var(--coral)' : '#e0e0e0'}`,
                    borderRadius: 'var(--radius-md)',
                    boxShadow: isOn ? '0 4px 12px rgba(239, 70, 35, 0.12)' : '0 2px 6px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: '#1b1b1b',
                    textAlign: 'center',
                    lineHeight: 1.35,
                    transition: 'border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <span style={{ flexShrink: 0 }}>{MotivatorIcons[iconKey]}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          <label
            htmlFor="action-plan-motivator-other"
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              color: '#1b1b1b',
              marginBottom: '0.5rem',
            }}
          >
            Other:
          </label>
          <textarea
            id="action-plan-motivator-other"
            name="other"
            rows={4}
            value={other}
            onChange={(e) => setOther(e.target.value)}
            placeholder="Add your own reasons here."
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
              resize: 'vertical',
              backgroundColor: '#fff',
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!canContinue}
              style={{
                opacity: canContinue ? 1 : 0.55,
                cursor: canContinue ? 'pointer' : 'not-allowed',
                minWidth: 260,
              }}
            >
              Learn About the Program
            </button>
          </div>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: 0 }}>
          <Link
            to="/support/action-plan"
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

export default ActionPlanMotivators;
