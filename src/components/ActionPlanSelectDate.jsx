import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as motion from 'motion/react-client';

const TOTAL_STEPS = 7;
const STEP = 6;
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function fromIsoDate(value) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function formatDisplayDate(value) {
  const date = fromIsoDate(value);
  if (!date) return '';
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function buildCalendarDays(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

const ActionPlanSelectDate = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dateValue, setDateValue] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());
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
      if (saved) {
        const savedDate = fromIsoDate(saved);
        setDateValue(saved);
        if (savedDate) setVisibleMonth(savedDate);
      }
    } catch {
      navigate('/action/action-plan', { replace: true });
    }
  }, [navigate]);

  const progressPct = (STEP / TOTAL_STEPS) * 100;
  const calendarDays = useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth]);
  const monthLabel = visibleMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const shiftMonth = (delta) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  };

  const selectDate = (date) => {
    setDateValue(toIsoDate(date));
    setVisibleMonth(date);
    setCalendarOpen(false);
  };

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
    <main style={{ backgroundColor: 'var(--bg-page)', minHeight: '80vh', padding: isMobile ? '2rem 1rem' : '2.5rem 1.5rem' }}>
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
              border: '1px solid rgba(45, 59, 66, 0.16)',
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
            backgroundColor: 'var(--ink)',
            border: '1px solid var(--ink)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            boxShadow: '0 14px 24px rgba(45, 59, 66, 0.16)',
          }}
        >
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#fff', lineHeight: 1.65 }}>
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
              color: 'var(--ink)',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}
          >
            I will contact a program provider by:
          </label>

          <div style={{ marginBottom: '0.5rem', position: 'relative' }}>
            <button
              id="action-plan-contact-date"
              type="button"
              aria-haspopup="dialog"
              aria-expanded={calendarOpen}
              onClick={() => setCalendarOpen((open) => !open)}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '0.75rem 3.2rem 0.75rem 1rem',
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                color: 'var(--ink)',
                border: '2px solid var(--ink-10)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#fff',
                minHeight: 52,
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {dateValue ? formatDisplayDate(dateValue) : 'Select a date'}
            </button>

            <button
              type="button"
              aria-label="Open calendar"
              onClick={() => setCalendarOpen((open) => !open)}
              style={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 40,
                height: 40,
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--ink)',
                color: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4M8 3v4M3 10h18" strokeLinecap="round" />
              </svg>
            </button>

            {calendarOpen && (
              <div
                role="dialog"
                aria-label="Choose contact date"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  right: 0,
                  zIndex: 20,
                  width: isMobile ? 'min(100%, 320px)' : 320,
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(45, 59, 66, 0.14)',
                  borderTop: '4px solid var(--ink)',
                  backgroundColor: '#fff',
                  boxShadow: '0 18px 36px rgba(45, 59, 66, 0.18)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <button type="button" onClick={() => shiftMonth(-1)} aria-label="Previous month" style={calendarNavButtonStyle}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>
                    {monthLabel}
                  </div>
                  <button type="button" onClick={() => shiftMonth(1)} aria-label="Next month" style={calendarNavButtonStyle}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
                  {WEEKDAYS.map((day, index) => (
                    <div key={`${day}-${index}`} style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-70)' }}>
                      {day}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                  {calendarDays.map((date) => {
                    const iso = toIsoDate(date);
                    const inMonth = date.getMonth() === visibleMonth.getMonth();
                    const isSelected = iso === dateValue;
                    return (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => selectDate(date)}
                        style={{
                          height: 36,
                          border: `1px solid ${isSelected ? 'var(--coral)' : 'transparent'}`,
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: isSelected ? 'var(--coral)' : 'transparent',
                          color: isSelected ? '#fff' : inMonth ? 'var(--ink)' : 'rgba(45, 59, 66, 0.35)',
                          fontFamily: 'var(--font-body)',
                          fontWeight: isSelected ? 700 : 600,
                          cursor: 'pointer',
                        }}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              position: 'relative',
              marginTop: '1.25rem',
              marginBottom: '1.75rem',
              padding: '1rem 1.1rem',
              backgroundColor: '#FDF1EE',
              border: '1px solid rgba(239, 70, 35, 0.24)',
              borderLeft: '4px solid var(--coral)',
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
                borderBottom: '8px solid rgba(239, 70, 35, 0.24)',
              }}
            />
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--ink)', lineHeight: 1.6 }}>
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

const calendarNavButtonStyle = {
  width: 34,
  height: 34,
  border: '1px solid rgba(45, 59, 66, 0.14)',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: '#fff',
  color: 'var(--ink)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

export default ActionPlanSelectDate;
