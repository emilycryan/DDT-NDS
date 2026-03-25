import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as motion from 'motion/react-client';
import {
  MOTIVATOR_LABELS,
  BARRIER_LABELS,
  PARTICIPATION_LABELS,
  TIME_LABELS,
  labelsFromIds,
} from '../data/actionPlanLabels';

const TOTAL_STEPS = 7;
const STEP = 7;
const BOX_BORDER = '2px solid #005ea2';

function parseJsonArray(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return [];
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function formatContactDate(iso) {
  if (!iso) return '—';
  const parts = iso.split('-');
  if (parts.length === 3) {
    const [y, m, d] = parts;
    return `${m}/${d}/${y}`;
  }
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  } catch {
    return iso;
  }
}

const ActionPlanCompleted = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    try {
      const first = sessionStorage.getItem('actionPlanFirstName');
      const contact = sessionStorage.getItem('actionPlanContactDate');
      if (!first) {
        navigate('/support/action-plan', { replace: true });
        return;
      }
      if (!contact) {
        navigate('/support/action-plan/select-date', { replace: true });
        return;
      }
      setSnapshot({
        firstName: first,
        motivators: parseJsonArray('actionPlanMotivatorIds'),
        motivatorOther: sessionStorage.getItem('actionPlanMotivatorOther') || '',
        barriers: parseJsonArray('actionPlanBarrierIds'),
        barrierOther: sessionStorage.getItem('actionPlanBarrierOther') || '',
        participation: parseJsonArray('actionPlanParticipationIds'),
        times: parseJsonArray('actionPlanTimeIds'),
        contactDate: contact,
      });
    } catch {
      navigate('/support/action-plan', { replace: true });
    }
  }, [navigate]);

  const progressPct = (STEP / TOTAL_STEPS) * 100;

  const motivationBullets = useMemo(() => {
    if (!snapshot) return [];
    const fromIds = labelsFromIds(MOTIVATOR_LABELS, snapshot.motivators);
    if (snapshot.motivatorOther) fromIds.push(snapshot.motivatorOther);
    return fromIds;
  }, [snapshot]);

  const logisticsBullets = useMemo(() => {
    if (!snapshot) return [];
    const fromIds = labelsFromIds(BARRIER_LABELS, snapshot.barriers);
    if (snapshot.barrierOther) fromIds.push(snapshot.barrierOther);
    return fromIds;
  }, [snapshot]);

  const preferenceBullets = useMemo(() => {
    if (!snapshot) return [];
    const a = labelsFromIds(PARTICIPATION_LABELS, snapshot.participation);
    const b = labelsFromIds(TIME_LABELS, snapshot.times);
    return [...a, ...b];
  }, [snapshot]);

  const handleEdit = () => {
    try {
      Object.keys(sessionStorage).forEach((k) => {
        if (k.startsWith('actionPlan')) sessionStorage.removeItem(k);
      });
    } catch {
      /* ignore */
    }
    navigate('/support/action-plan');
  };

  const handlePrint = () => {
    window.print();
  };

  if (!snapshot) return null;

  return (
    <main
      className="action-plan-completed"
      style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh', padding: isMobile ? '2rem 1rem' : '2.5rem 1.5rem' }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <nav
          className="action-plan-no-print"
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

        <div style={{ height: 4, backgroundColor: 'var(--ink-10)', borderRadius: 2, marginBottom: '1.25rem', overflow: 'hidden' }} className="action-plan-no-print">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: '100%', backgroundColor: 'var(--coral)' }}
          />
        </div>

        <p
          className="action-plan-no-print"
          style={{
            fontSize: '0.875rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--ink-70)',
            marginBottom: '0.5rem',
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
          Completed Plan
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
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#1b1b1b', lineHeight: 1.65, textAlign: 'center' }}>
            You have completed your Path2Prevention Action Plan! Review your plan below, print a copy, then move forward.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-sm)',
              backgroundColor: '#0F4C5C',
              color: '#fff',
              fontFamily: 'var(--font-body)',
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '0.06em',
              marginBottom: '0.5rem',
            }}
          >
            P2P
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: isMobile ? '1.25rem' : '1.4rem',
              color: 'var(--ink)',
            }}
          >
            {snapshot.firstName}&apos;s Action Plan
          </h2>
        </div>

        <SummaryBox title="I am taking this step towards a healthier life because I want to:">
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', lineHeight: 1.55 }}>
            {motivationBullets.length ? (
              motivationBullets.map((t, i) => <li key={i}>{t}</li>)
            ) : (
              <li>—</li>
            )}
          </ul>
        </SummaryBox>

        <SummaryBox title="Before enrolling in the program and attending classes for a year, I need to plan for:">
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', lineHeight: 1.55 }}>
            {logisticsBullets.length ? (
              logisticsBullets.map((t, i) => <li key={i}>{t}</li>)
            ) : (
              <li>—</li>
            )}
          </ul>
        </SummaryBox>

        <SummaryBox title="My preferred program provider will offer classes that take place:">
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', lineHeight: 1.55 }}>
            {preferenceBullets.length ? (
              preferenceBullets.map((t, i) => <li key={i}>{t}</li>)
            ) : (
              <li>—</li>
            )}
          </ul>
          <p
            style={{
              margin: '1rem 0 0 0',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: '#323a45',
              fontStyle: 'italic',
              lineHeight: 1.5,
            }}
          >
            Don&apos;t forget to use our{' '}
            <Link to="/lifestyle-programs" style={{ color: '#005ea2', fontWeight: 600 }}>
              Find a Program
            </Link>{' '}
            search to find a provider that meets your preferences and contact them!
          </p>
        </SummaryBox>

        <SummaryBox title="Once I find a program provider, I will contact them by:">
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, color: '#1b1b1b' }}>
            {formatContactDate(snapshot.contactDate)}
          </p>
        </SummaryBox>

        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: '#1b1b1b',
            margin: '1.75rem 0 1.5rem',
            lineHeight: 1.5,
          }}
        >
          I, <strong style={{ fontWeight: 700 }}>{snapshot.firstName}</strong>, am ready to begin my Path to Prevention.
        </p>

        <div
          className="action-plan-no-print"
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'stretch' : 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleEdit}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: '#005ea2',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Edit My Plan
            </button>
            <button
              type="button"
              onClick={handlePrint}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: '#005ea2',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" strokeLinecap="round" />
                <rect x="6" y="14" width="12" height="8" rx="1" />
              </svg>
              Print My Plan
            </button>
          </div>
          <Link
            to="/lifestyle-programs"
            className="btn btn-primary"
            style={{ textDecoration: 'none', color: 'var(--text-white)', alignSelf: isMobile ? 'center' : 'auto' }}
          >
            Move Forward
          </Link>
        </div>

        <p className="action-plan-no-print" style={{ textAlign: 'center', marginBottom: 0 }}>
          <Link to="/support" style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--ink-70)' }}>
            ← Back to Support
          </Link>
        </p>
      </div>
    </main>
  );
};

function SummaryBox({ title, children }) {
  return (
    <section
      style={{
        border: BOX_BORDER,
        borderRadius: 'var(--radius-md)',
        padding: '1.15rem 1.25rem',
        marginBottom: '1rem',
        backgroundColor: '#fff',
      }}
    >
      <h3
        style={{
          margin: '0 0 0.75rem 0',
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '0.9375rem',
          color: '#1b1b1b',
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

export default ActionPlanCompleted;
