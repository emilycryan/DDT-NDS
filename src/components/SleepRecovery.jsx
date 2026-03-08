import React, { useState, useEffect } from 'react';
import HealthyLivingPageLayout from './HealthyLivingPageLayout';

const sleepStages = [
  {
    title: 'Light Sleep (N1-N2)',
    desc: 'Heart rate and breathing slow. Body temperature drops. Memory consolidation begins. Occupies ~50% of total sleep time.',
  },
  {
    title: 'Deep Sleep (N3)',
    desc: 'Tissue repair, immune activation, blood sugar regulation, and brain waste clearance (the glymphatic system) all peak here.',
  },
  {
    title: 'REM Sleep',
    desc: 'Emotional processing, creative problem-solving, and long-term memory storage. Disrupted REM is linked to anxiety and depression.',
  },
];

const sleepHygieneCards = [
  {
    title: 'Consistent Schedule',
    desc: 'Go to bed and wake up at the same time every day — including weekends. Your circadian rhythm is a biological clock that responds to consistency, not just sleep duration.',
  },
  {
    title: 'Wind-Down Routine',
    desc: 'Start a 30-60 minute wind-down ritual before bed: dim lights, stop screens, light stretching or reading. Your brain needs transition time to shift from alert to sleep mode.',
  },
  {
    title: 'Optimize Your Room',
    desc: 'Cool (65-68°F), dark, and quiet. Block light completely with blackout curtains. Even small LED lights suppress melatonin. Consider white noise if ambient sound is an issue.',
  },
  {
    title: 'Limit Caffeine & Screens',
    desc: 'Caffeine has a 5-hour half-life — that afternoon coffee is still half-active at bedtime. Blue light from screens delays melatonin release by up to 3 hours. Cut both by 2pm and 9pm respectively.',
  },
];

const SleepRecovery = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <HealthyLivingPageLayout title="Sleep & Recovery">
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#555555',
          lineHeight: 1.6,
          margin: '0 0 0.75rem 0',
        }}
      >
        Sleep is the body&apos;s most powerful recovery tool — and most Americans aren&apos;t getting enough of it.
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
        Chronic sleep deprivation raises blood pressure, disrupts metabolism, impairs immune function, and accelerates cognitive decline. The good news: consistent habits can transform sleep quality.
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
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#E8A598', marginBottom: '0.5rem' }}>1 in 3</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            US adults don&apos;t get enough sleep on a regular basis — the CDC calls it a public health epidemic.
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>7-9h</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            recommended for adults each night — consistently getting less raises blood pressure and blood sugar.
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#E8A598', marginBottom: '0.5rem' }}>50-70M</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            Americans have a chronic sleep disorder — many undiagnosed, including sleep apnea linked to heart disease.
          </div>
        </div>
      </div>

      {/* Why Sleep Is Non-Negotiable + What Happens While You Sleep */}
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
            Why Sleep Is Non-Negotiable
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
            During sleep, your body repairs tissue, clears metabolic waste from the brain, activates immune defenses, drops blood pressure, and releases growth hormone that rebuilds cells. Cutting sleep short raises insulin resistance, increases hunger hormones, impairs decision-making, and elevates inflammatory markers.
          </p>
          <div
            style={{
              border: '2px solid #E05A4D',
              borderRadius: 8,
              padding: '1.25rem 1.5rem',
            }}
          >
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#E05A4D', marginBottom: '0.25rem' }}>
              Sleep Debt Is Real
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: 0 }}>
              You cannot fully recover from a week of short sleep with a single long night. Chronic sleep restriction causes cumulative cognitive and metabolic harm that weekend catch-up sleep only partially reverses.
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
            What Happens While You Sleep
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {sleepStages.map((stage, i) => (
              <React.Fragment key={i}>
                <div
                  style={{
                    padding: '1rem',
                    borderRadius: 8,
                    border: '1px solid #e5e5e5',
                    width: '100%',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem', color: '#333333' }}>
                    {stage.title}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.5, margin: 0, color: '#555555' }}>
                    {stage.desc}
                  </p>
                </div>
                {i < sleepStages.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: '#555555',
              lineHeight: 1.5,
              margin: '1rem 0 0 0',
            }}
          >
            Each cycle lasts ~90 minutes. Adults need 4-6 complete cycles per night for full restoration.
          </p>
        </div>
      </div>

      {/* Sleep Hygiene That Works */}
      <h2
        style={{
          fontSize: isMobile ? '1.5rem' : '1.75rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: 600,
          color: '#333333',
          margin: '0 0 0.5rem 0',
        }}
      >
        Sleep Hygiene That Works
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
        These evidence-based habits have been shown to improve sleep onset, duration, and quality — without medication.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '1rem',
        }}
      >
        {sleepHygieneCards.map((card, i) => (
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

export default SleepRecovery;
