import React, { useState, useEffect } from 'react';
import HealthyLivingPageLayout from './HealthyLivingPageLayout';

const habitLoopSteps = [
  { num: 1, title: 'Cue', desc: 'A trigger that initiates the behavior — time of day, location, emotional state, or another habit.' },
  { num: 2, title: 'Routine', desc: 'The behavior itself — physical, mental, or emotional. This is what most people focus on when trying to change habits.' },
  { num: 3, title: 'Reward', desc: 'The benefit your brain receives — dopamine release that teaches the brain to repeat the behavior next time.' },
];

const strategyCards = [
  {
    title: 'Habit Stacking',
    desc: 'Link a new habit to one that already exists. "After I pour my morning coffee, I will do 5 minutes of stretching." The existing habit becomes a built-in cue.',
  },
  {
    title: 'Start Tiny',
    desc: 'Make the behavior so small it feels almost too easy. A 2-minute walk. One push-up. One glass of water. You\'re not trying to achieve results yet — you\'re building the identity of someone who shows up.',
  },
  {
    title: 'Design Your Environment',
    desc: 'Put healthy choices in plain sight and make bad ones harder. Keep fruit on the counter. Leave your gym bag at the door. The environment shapes behavior more reliably than motivation does.',
  },
  {
    title: 'Track Your Progress',
    desc: 'A simple habit tracker creates a visual chain — and you won\'t want to break it. Research shows that tracking alone improves completion rates by up to 40%, independent of motivation.',
  },
];

const BuildingHealthyHabits = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <HealthyLivingPageLayout title="Building Healthy Habits">
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#555555',
          lineHeight: 1.6,
          margin: '0 0 0.75rem 0',
        }}
      >
        Small, consistent actions compound into lasting change — and the science shows exactly how to make them stick.
      </p>
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#555555',
          lineHeight: 1.6,
          margin: '0 0 2rem 0',
        }}
      >
        Most people try to change everything at once and burn out. Research in behavior science points to a different approach: start tiny, build structure, and let the habit do the work over time.
      </p>

      {/* Stats Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '1rem' : '2rem',
          backgroundColor: '#2D363D',
          color: 'white',
          padding: isMobile ? '1.5rem' : '2rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '2.5rem',
        }}
      >
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>66 days</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            average time for a new behavior to become automatic — not 21 days as the myth goes.
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>40%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            of our daily behaviors are habitual — meaning nearly half your day runs on autopilot.
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#1f9660', marginBottom: '0.5rem' }}>1%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            daily improvement compounds to 37x better over one year — the math of small, consistent gains.
          </div>
        </div>
      </div>

      {/* How Habits Are Built + The Habit Loop */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 340px',
          gap: '2.5rem',
          marginBottom: '2.5rem',
          alignItems: 'start',
        }}
      >
        <div>
          <h2
            style={{
              fontSize: isMobile ? '1.5rem' : '1.75rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              color: '#333333',
              margin: '0 0 0.75rem 0',
            }}
          >
            How Habits Are Built
          </h2>
          <p
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#555555',
              lineHeight: 1.6,
              margin: '0 0 1rem 0',
            }}
          >
            Every habit — good or bad — follows the same three-step neurological loop discovered by MIT researchers. Understanding it is the key to changing behavior intentionally rather than by accident.
          </p>
          <p
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#555555',
              lineHeight: 1.6,
              margin: '0 0 1.25rem 0',
            }}
          >
            A cue triggers your brain to initiate a behavior. A routine is the behavior itself. A reward teaches your brain whether to repeat the loop. Over time, the loop becomes wired — and increasingly automatic.
          </p>
          <div
            style={{
              backgroundColor: '#e8f4ef',
              border: '1px solid #1f9660',
              borderRadius: 8,
              padding: '1.25rem 1.5rem',
            }}
          >
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#333333', marginBottom: '0.25rem' }}>
              Identity-Based Habits
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: 0 }}>
              The most durable habits are tied to identity, not outcomes. Instead of &quot;I want to exercise more,&quot; try &quot;I am someone who moves their body daily.&quot; Each small action becomes a vote for the person you&apos;re becoming.
            </p>
          </div>
        </div>

        <div>
          <h3
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#555555',
              margin: '0 0 1rem 0',
              textTransform: 'uppercase',
            }}
          >
            The Habit Loop
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {habitLoopSteps.map((step, i) => (
              <React.Fragment key={i}>
                <div
                  style={{
                    padding: '1rem',
                    borderRadius: 8,
                    border: '1px solid #e5e5e5',
                    width: '100%',
                  }}
                >
                  <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.05em', opacity: 0.9, marginBottom: '0.25rem', color: '#555555' }}>
                    STEP {i + 1}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem', color: '#333333' }}>
                    {step.title}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.5, margin: 0, color: '#555555' }}>
                    {step.desc}
                  </p>
                </div>
                {i < habitLoopSteps.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Strategies That Actually Work */}
      <h2
        style={{
          fontSize: isMobile ? '1.5rem' : '1.75rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: 600,
          color: '#333333',
          margin: '0 0 0.5rem 0',
        }}
      >
        Strategies That Actually Work
      </h2>
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#555555',
          lineHeight: 1.6,
          margin: '0 0 1.5rem 0',
        }}
      >
        Behavior science has moved past willpower as a strategy. These approaches are backed by consistent research and used in evidence-based programs worldwide.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '1rem',
        }}
      >
        {strategyCards.map((card, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #e5e5e5',
              borderTop: '3px solid #1f9660',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              backgroundColor: 'white',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', color: '#333333', margin: '0 0 0.5rem 0' }}>
              {card.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: 0 }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </HealthyLivingPageLayout>
  );
};

export default BuildingHealthyHabits;
