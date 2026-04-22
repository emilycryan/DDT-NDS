import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as motion from 'motion/react-client';
import { BARRIER_LABELS } from '../data/actionPlanLabels';

const TOTAL_STEPS = 7;
const STEP = 4;
const ICON_COLOR = '#005ea2';

const BarrierIcons = {
  caregiver: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3" stroke={ICON_COLOR} strokeWidth="1.5" />
      <path d="M8 20v-3a4 4 0 014-4 4 4 0 014 4v3" stroke={ICON_COLOR} strokeWidth="1.5" />
      <ellipse cx="17" cy="11" rx="2" ry="2.5" fill={ICON_COLOR} opacity="0.35" />
    </svg>
  ),
  meals: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 6h3v10H8V6zM13 8h3v8h-3V8z" stroke={ICON_COLOR} strokeWidth="1.5" />
      <ellipse cx="10" cy="18" rx="6" ry="2" stroke={ICON_COLOR} strokeWidth="1.2" />
    </svg>
  ),
  clock: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke={ICON_COLOR} strokeWidth="1.5" />
      <path d="M12 7v6l4 2" stroke={ICON_COLOR} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  travel: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="6" width="16" height="14" rx="1" stroke={ICON_COLOR} strokeWidth="1.5" />
      <path d="M8 10h8M8 14h5" stroke={ICON_COLOR} strokeWidth="1.2" strokeLinecap="round" />
      <rect x="16" y="4" width="4" height="3" rx="0.5" stroke={ICON_COLOR} strokeWidth="1" />
    </svg>
  ),
  transport: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 14h16l-1-4H5l-1 4z" stroke={ICON_COLOR} strokeWidth="1.5" />
      <circle cx="8" cy="16" r="2" stroke={ICON_COLOR} strokeWidth="1.5" />
      <circle cx="16" cy="16" r="2" stroke={ICON_COLOR} strokeWidth="1.5" />
      <path d="M6 10V8h12v2" stroke={ICON_COLOR} strokeWidth="1.5" />
    </svg>
  ),
  paw: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <ellipse cx="12" cy="14" rx="5" ry="4" stroke={ICON_COLOR} strokeWidth="1.5" />
      <circle cx="9" cy="9" r="1.5" fill={ICON_COLOR} />
      <circle cx="15" cy="9" r="1.5" fill={ICON_COLOR} />
      <circle cx="7" cy="12" r="1.2" fill={ICON_COLOR} />
      <circle cx="17" cy="12" r="1.2" fill={ICON_COLOR} />
    </svg>
  ),
  calendar: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="16" rx="2" stroke={ICON_COLOR} strokeWidth="1.5" />
      <path d="M4 10h16M9 5V3M15 5V3" stroke={ICON_COLOR} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 14h2M13 14h2M9 17h6" stroke={ICON_COLOR} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
};

const BARRIER_OPTIONS = [
  { id: 'caregiver', iconKey: 'caregiver' },
  { id: 'family-meals', iconKey: 'meals' },
  { id: 'schedule', iconKey: 'clock' },
  { id: 'travel', iconKey: 'travel' },
  { id: 'transportation', iconKey: 'transport' },
  { id: 'pet-care', iconKey: 'paw' },
  { id: 'commitments', iconKey: 'calendar' },
];

const ActionPlanBarriers = () => {
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
      const raw = sessionStorage.getItem('actionPlanBarrierIds');
      if (raw) {
        try {
          const ids = JSON.parse(raw);
          if (Array.isArray(ids)) setSelected(new Set(ids));
        } catch {
          /* ignore */
        }
      }
      const o = sessionStorage.getItem('actionPlanBarrierOther');
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
      sessionStorage.setItem('actionPlanBarrierIds', JSON.stringify([...selected]));
      sessionStorage.setItem('actionPlanBarrierOther', other.trim());
      sessionStorage.setItem('actionPlanStep', String(STEP));
    } catch {
      /* ignore */
    }
    navigate('/support/action-plan/class-preferences');
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh', padding: isMobile ? '2rem 1rem' : '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', position: 'relative' }}>
          <Link
            to="/support/action-plan/dpp-information"
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
              flexShrink: 0,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <span style={{ flex: 1 }} />
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
          Identifying Barriers
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
              lineHeight: 1.65,
              textAlign: 'center',
            }}
          >
            The path to change is not always simple. Take some time to think about the challenges you may face along the way. Planning for them now can make facing them in real life much easier.
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
            To be able to enroll in the program and attend classes, I need to plan for:
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
            aria-label="Barriers"
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '0.75rem',
              marginBottom: '1.25rem',
            }}
          >
            {BARRIER_OPTIONS.map(({ id, iconKey }, idx) => {
              const isOn = selected.has(id);
              const isLast = idx === BARRIER_OPTIONS.length - 1;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={isOn}
                  onClick={() => toggle(id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.85rem 1rem',
                    minHeight: 72,
                    backgroundColor: isOn ? '#FDF1EE' : '#fff',
                    border: `2px solid ${isOn ? 'var(--coral)' : '#e0e0e0'}`,
                    borderRadius: 'var(--radius-md)',
                    boxShadow: isOn ? '0 4px 12px rgba(239, 70, 35, 0.12)' : '0 2px 6px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#1b1b1b',
                    textAlign: 'left',
                    lineHeight: 1.35,
                    transition: 'border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
                    ...(isLast && !isMobile
                      ? { gridColumn: '1 / -1', justifySelf: 'center', width: 'min(100%, 440px)' }
                      : {}),
                  }}
                >
                  <span style={{ flexShrink: 0 }}>{BarrierIcons[iconKey]}</span>
                  <span>{BARRIER_LABELS[id]}</span>
                </button>
              );
            })}
          </div>

          <label
            htmlFor="action-plan-barrier-other"
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
            id="action-plan-barrier-other"
            name="other"
            rows={4}
            value={other}
            onChange={(e) => setOther(e.target.value)}
            placeholder="Add other barriers here."
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
              Select a Class
            </button>
          </div>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: 0 }}>
          <Link
            to="/support/action-plan/dpp-information"
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

export default ActionPlanBarriers;
