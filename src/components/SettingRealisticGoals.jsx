import React, { useState, useEffect } from 'react';
import TipsPageLayout from './TipsPageLayout';

const goalMakeover = [
  {
    bad: 'I want to eat healthier.',
    badWhy: 'Vague, unmeasurable, no defined action. Your brain has no idea what to do with this. When you\'re tired and hungry on Tuesday, this goal provides zero guidance.',
    good: 'After dinner on weeknights, I will eat a piece of fruit instead of a snack from the pantry.',
    goodWhy: 'Specific cue (after dinner), specific behavior (fruit), specific constraint (weeknights), replaces an existing habit. When it\'s 8pm Tuesday, you know exactly what to do.',
  },
  {
    bad: "I'm going to start exercising.",
    badWhy: 'No frequency, no duration, no location, no cue. The decision of when and how gets postponed indefinitely. "Tomorrow" stretches into never.',
    good: 'On Monday, Wednesday, and Friday mornings, I will walk for 15 minutes starting from my front door at 7am.',
    goodWhy: 'Three specific days, a defined time, a defined start location, a duration that feels achievable. The decision is already made. There\'s nothing to negotiate with yourself in the moment.',
  },
  {
    bad: 'I want to lose 30 pounds.',
    badWhy: 'Outcome-only. No behaviors specified. Slow progress feels like failure. Easy to measure how far away you are; impossible to measure what to do today.',
    good: 'For the next 30 days, I will track what I eat at dinner and keep portions to one plate.',
    goodWhy: 'Behavior-focused, time-bound, fully within your control. Every day you can answer "did I do it?" with a yes or no — regardless of what the scale says.',
  },
  {
    bad: "I'll try to drink more water.",
    badWhy: '"Try" is doing a lot of work here. No amount defined. No cue. No tracking. This type of goal relies entirely on remembering and motivation — both unreliable.',
    good: 'When I sit down at my desk each morning, I will drink one full glass of water before opening email.',
    goodWhy: 'Habit-stacked to an existing behavior (sitting at desk), specific quantity, specific order. No willpower required. The cue is automatic and the behavior follows.',
  },
];

const smartFramework = [
  { letter: 'S', title: 'SPECIFIC', letterColor: '#C22F2F', desc: "Name exactly what you'll do, when, where, and how much.", question: 'What exactly will I do?', highlight: false },
  { letter: 'M', title: 'MEASURABLE', letterColor: '#4E8964', desc: "Define how you'll track progress — a number, a streak, a simple check mark.", question: 'How will I know I did it?', highlight: false },
  { letter: 'A', title: 'ACHIEVABLE', letterColor: '#BF8830', desc: "Stretch goals motivate; impossible ones quit. Aim for 70% confidence it'll work.", question: 'Is this realistic right now?', highlight: false },
  { letter: 'R', title: 'RELEVANT', letterColor: '#8769B1', desc: 'Tie the goal to something that genuinely matters to you — not just a "should."', question: 'Why does this matter to me?', highlight: false },
  { letter: 'T', title: 'TIME-BOUND', letterColor: '#3F92AC', desc: 'Set a review date — not a deadline to fail, but a checkpoint to learn and adjust.', question: 'When will I check in?', highlight: false },
  { letter: '+', title: 'FLEXIBLE', letterColor: '#C22F2F', desc: 'Build in a backup plan. Life happens — flexibility is strength, not failure.', question: "What's my plan B?", highlight: true },
];

const SettingRealisticGoals = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [actionPlanName, setActionPlanName] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    try {
      const n = sessionStorage.getItem('actionPlanFirstName');
      if (n) setActionPlanName(n);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <TipsPageLayout title="Setting Realistic Goals">
      {actionPlanName && (
        <div
          style={{
            backgroundColor: '#f0f4f8',
            border: '1px solid #e0e0e0',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '1.25rem',
          }}
        >
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#1b1b1b', lineHeight: 1.6 }}>
            <strong style={{ fontWeight: 600 }}>Hi {actionPlanName}</strong> — you&apos;re continuing your personalized Action Plan. Use the ideas below to shape goals that fit your life.
          </p>
        </div>
      )}
      <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#555555', lineHeight: 1.6, margin: '0 0 0.75rem 0' }}>
        92% of people fail at their goals — not from lack of motivation, but from setting goals that were never designed to succeed in the first place.
      </p>
      <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#555555', lineHeight: 1.6, margin: '0 0 2rem 0' }}>
        The research on behavior change is clear: specific, small, and system-backed goals outperform ambitious, vague, willpower-dependent ones every time. This page shows you how to build goals that stick.
      </p>

      {/* Stats Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? '1rem' : '2rem',
        backgroundColor: '#2D363D',
        color: 'white',
        padding: isMobile ? '1.5rem' : '2rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '2.5rem',
      }}>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#E8A598', marginBottom: '0.5rem' }}>92%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            of people fail to achieve their stated goals — The problem is almost never motivation, it&apos;s goal design
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>42%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            more likely to achieve a goal when you write it down and track it — one of the most robust findings in behavior research
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>3 to 1</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            advantage for identity-based goals over outcome-based goals — &quot;I am someone who walks daily&quot; beats &quot;I want to lose 20 lbs&quot; every time
          </div>
        </div>
      </div>

      {/* The Goal Makeover */}
      <h2 style={{ fontSize: isMobile ? '1.5rem' : '1.75rem', fontFamily: 'var(--font-serif)', fontWeight: 600, color: '#333333', margin: '0 0 0.75rem 0' }}>
        The Goal Makeover
      </h2>
      <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#555555', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
        The same intention, redesigned using behavior science principles. The difference between goals that fail and goals that work is almost always in how they&apos;re written — not in how motivated you are.
      </p>

      <div style={{ borderRadius: 'var(--radius-md)', marginBottom: '2.5rem', border: '1px solid #e5e5e5', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', backgroundColor: '#2D363D', color: 'white', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', fontFamily: 'var(--font-body)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#E05A4D', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
            WHAT MOST PEOPLE WRITE
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#1f9660', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            WHAT ACTUALLY WORKS
          </div>
        </div>
        {goalMakeover.map((row, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 0,
              borderBottom: i < goalMakeover.length - 1 ? '1px solid #e5e5e5' : 'none',
            }}
          >
            <div style={{ padding: '1rem 1.25rem', borderRight: isMobile ? 'none' : '1px solid #e5e5e5', backgroundColor: '#FAFAF8' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#E05A4D', marginBottom: '0.35rem' }}>&quot;{row.bad}&quot;</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#555555', lineHeight: 1.5 }}>{row.badWhy}</div>
            </div>
            <div style={{ padding: '1rem 1.25rem', backgroundColor: '#e8f4ef' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#1a6b4a', marginBottom: '0.35rem' }}>&quot;{row.good}&quot;</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#555555', lineHeight: 1.5 }}>{row.goodWhy}</div>
            </div>
          </div>
        ))}
      </div>

      {/* SMART+ Framework */}
      <div style={{
        backgroundColor: '#2D363D',
        color: 'white',
        borderRadius: 'var(--radius-md)',
        padding: isMobile ? '1.5rem' : '2rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ width: 4, height: 16, backgroundColor: '#C22F2F', borderRadius: 2 }} />
          <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', color: '#C22F2F', fontFamily: 'var(--font-body)' }}>THE FRAMEWORK</div>
        </div>
        <h2 style={{ fontSize: isMobile ? '1.5rem' : '1.75rem', fontFamily: 'var(--font-serif)', fontWeight: 600, margin: '0 0 0.5rem 0', color: '#F4F0E6' }}>
          The SMART+ Goal Framework
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#F4F0E6', lineHeight: 1.6, margin: '0 0 1.5rem 0', opacity: 0.95 }}>
          Every letter is a filter. Run your goal through each one — if it fails any test, rewrite it before you start.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(6, 1fr)',
          gap: 0,
          borderLeft: '1px solid rgba(255,255,255,0.15)',
        }}>
          {smartFramework.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: item.highlight ? '#281013' : 'transparent',
                padding: '1rem',
                borderRight: i < smartFramework.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
              }}
            >
              <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: item.letterColor, marginBottom: '0.5rem' }}>{item.letter}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'white' }}>{item.title}</div>
              <div style={{ height: 1, backgroundColor: item.letterColor, marginBottom: '0.75rem' }} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', lineHeight: 1.5, margin: '0 0 0.75rem 0', color: 'white' }}>{item.desc}</p>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'white', opacity: 0.95 }}>&quot;{item.question}&quot;</div>
            </div>
          ))}
        </div>
      </div>
    </TipsPageLayout>
  );
};

export default SettingRealisticGoals;
