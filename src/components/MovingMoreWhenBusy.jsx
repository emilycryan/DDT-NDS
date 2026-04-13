import React, { useState, useEffect } from 'react';
import TipsPageLayout from './TipsPageLayout';

const activitySnacks = [
  { title: 'Walk during phone calls', desc: 'The average office worker has 3–5 calls per day. Standing or pacing adds 20–40 min of movement with zero productivity loss.', dotColor: '#1f9660' },
  { title: "Set a \"move\" timer every hour", desc: '2–3 minutes of movement per hour — a lap of the hallway, a flight of stairs — adds up to 16–24 minutes across a workday.', dotColor: '#1f9660' },
  { title: 'Park one stop farther', desc: 'Parking a few blocks away or getting off transit one stop early adds a genuine 10-minute walk without carving out extra time.', dotColor: '#1f9660' },
  { title: 'TV + movement', desc: 'March in place, do light stretches, or use resistance bands during TV time. 30 minutes of passive TV becomes 30 minutes of gentle activity.', dotColor: '#1f9660' },
  { title: '10-min walk after each meal', desc: 'Three post-meal walks = 30 minutes of focused blood sugar management. One of the highest-impact, lowest-barrier habits available.', dotColor: '#E05A4D', dark: true },
];

const movementCards = [
  {
    title: 'Habit-Stack Your Movement',
    desc: 'Attach movement to something you already do. "After I pour my morning coffee, I will do 5 minutes of stretching." The existing habit becomes the cue.',
    iconBg: '#FEEBEB',
    topBarColor: '#E05A4D',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E05A4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: 'Make Sitting a Cue',
    desc: 'Every time you sit down to work, set a 60-minute timer. When it goes off, stand and move for 2 minutes. Sitting becomes the cue to eventually move.',
    iconBg: '#EBF9F3',
    topBarColor: '#1f9660',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1f9660" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: 'The 2-Minute Rule',
    desc: 'If a movement feels too big, shrink it to 2 minutes. Two minutes of walking beats zero. Once you\'re up, you often keep going.',
    iconBg: '#F5F5F5',
    topBarColor: '#2D363D',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D363D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Find a Movement Buddy',
    desc: 'Accountability works. A walking partner, a group class, or a virtual check-in makes showing up more likely.',
    iconBg: '#FEEBEB',
    topBarColor: '#E05A4D',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E05A4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const MovingMoreWhenBusy = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <TipsPageLayout title="Moving More When You're Busy">
      <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#555555', lineHeight: 1.6, margin: '0 0 0.75rem 0' }}>
        You don&apos;t need a gym or an hour. Movement is available in small bursts throughout the day — and the research shows they add up. NEAT (non-workout activity thermogenesis) is the energy you burn through daily movement that isn&apos;t a structured workout: walking to the kitchen, shifting in your chair, standing. It can be 350+ extra calories per day.
      </p>
      <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#555555', lineHeight: 1.6, margin: '0 0 2rem 0' }}>
        &quot;Activity snacks&quot; — short bouts of 10 minutes or less — produce the same cardiovascular and metabolic benefits as one 60-minute session. The key is consistency, not duration.
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
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-stat)', marginBottom: '0.5rem' }}>22 min</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            per day is all it takes to hit the CDC weekly activity goal — less time than most people spend scrolling
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-stat)', marginBottom: '0.5rem' }}>10 min</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            &quot;activity snacks&quot; produce the same cardiovascular and metabolic benefits as one 60-minute session
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-stat)', color: '#1f9660', marginBottom: '0.5rem' }}>350+</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            extra calories burned per day through NEAT — the cumulative effect of fidgeting, standing, walking, and daily movement
          </div>
        </div>
      </div>

      {/* Science + activity snacks sidebar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 340px',
        gap: '2.5rem',
        marginBottom: '2.5rem',
        alignItems: 'start',
      }}>
        <div>
          <h2 style={{ fontSize: isMobile ? '1.5rem' : '1.75rem', fontFamily: 'var(--font-serif)', fontWeight: 600, color: '#333333', margin: '0 0 0.75rem 0' }}>
            The Science of Everyday Movement
          </h2>
          <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#555555', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
            NEAT is the energy you burn through everything that isn&apos;t a structured workout: walking to the kitchen, shifting in your chair, taking the stairs. Research shows that sedentary individuals can move 2+ hours more per day without a formal gym session. The difference is in how you structure your environment and habits.
          </p>
          <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#555555', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
            10-minute walks produce the same blood sugar–lowering effect as one 60-minute session. A post-meal walk is one of the single most effective interventions for blood sugar control — sometimes more effective than medication.
          </p>
          <div style={{
            backgroundColor: '#FFEDE9',
            borderLeft: '4px solid #E05A4D',
            borderRadius: '0 8px 8px 0',
            padding: '1.25rem 1.5rem',
          }}>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#333333', marginBottom: '0.25rem' }}>
              The Post-Meal Walk
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: 0 }}>
              A 10-minute walk after eating is one of the single most effective interventions for blood sugar control — sometimes more effective than medication. No equipment, no gym, no special clothing required.
            </p>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.08em', color: '#555555', margin: '0 0 1rem 0', textTransform: 'uppercase' }}>
            Activity Snack Ideas
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {activitySnacks.map((item, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 8,
                  padding: '1rem 1rem 1rem 1.25rem',
                  backgroundColor: item.dark ? '#2D363D' : '#F5F5F5',
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    minWidth: 8,
                    borderRadius: '50%',
                    backgroundColor: item.dotColor,
                    marginTop: '0.4rem',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: item.dark ? 'white' : '#333333', marginBottom: '0.25rem' }}>{item.title}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: item.dark ? 'rgba(255,255,255,0.9)' : '#555555', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Making Movement Automatic */}
      <h2 style={{ fontSize: isMobile ? '1.5rem' : '1.75rem', fontFamily: 'var(--font-serif)', fontWeight: 600, color: '#333333', margin: '0 0 0.5rem 0' }}>
        Making Movement Automatic
      </h2>
      <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#555555', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
        The most effective strategy isn&apos;t willpower — it&apos;s redesigning your environment and routines so movement happens without deciding. These four approaches are backed by behavior science and used in evidence-based programs.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
        gap: '1rem',
      }}>
        {movementCards.map((card, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #e5e5e5',
              borderTop: `3px solid ${card.topBarColor}`,
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              backgroundColor: 'white',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                backgroundColor: card.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem',
              }}
            >
              {card.icon}
            </div>
            <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', color: '#333333', margin: '0 0 0.5rem 0' }}>{card.title}</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: 0 }}>{card.desc}</p>
          </div>
        ))}
      </div>
    </TipsPageLayout>
  );
};

export default MovingMoreWhenBusy;
