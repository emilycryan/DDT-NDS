import React, { useState, useEffect } from 'react';
import HeartHealthPageLayout from './HeartHealthPageLayout';

const stressCycleSteps = [
  { num: 1, title: 'Chronic stress activates', desc: 'cortisol + adrenaline release, raising heart rate and BP' },
  { num: 2, title: 'Sleep disrupted', desc: 'poor sleep further raises cortisol and blood pressure' },
  { num: 3, title: 'Inflammation increases', desc: 'arterial damage, plaque buildup, and clotting concerns rise' },
  { num: 4, title: 'Stress-related habits compound', desc: 'overeating, inactivity, and alcohol use amplify cardiac damage' },
];

const stressReducers = [
  { title: 'Physical Activity', desc: 'Physical activity is the most effective stress-buffer available. Even a 20-minute walk lowers cortisol and improves mood for hours afterward.' },
  { title: 'Mindfulness & Breathing', desc: 'Mindfulness-based stress reduction (MBSR) and slow diaphragmatic breathing directly activate the parasympathetic nervous system, lowering BP within minutes.' },
  { title: 'Sleep Hygiene', desc: 'Consistent bedtimes, dark cool rooms, and limiting screens before bed improve sleep depth. Each extra hour of quality sleep measurably reduces blood pressure.' },
  { title: 'Social Connection', desc: 'Strong social ties lower cardiovascular mortality by up to 29%. Group-based lifestyle programs like the National DPP lifestyle change program leverage community as a therapeutic tool.' },
];

const StressHeartHealth = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <HeartHealthPageLayout title="Stress & Heart Health">
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#555555',
          lineHeight: 1.6,
          margin: '0 0 0.75rem 0',
        }}
      >
        Chronic stress silently strains your heart — but it responds to the same lifestyle levers as everything else.
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
        Ongoing stress raises blood pressure, increases inflammation, disrupts sleep, and can lead to behaviors like overeating and inactivity that strain the heart further. Managing stress isn&apos;t a luxury — it&apos;s part of heart health.
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
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-stat)', marginBottom: '0.5rem' }}>2-3×</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            higher heart attack rates in people with chronic stress and poor sleep combined
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-stat)', marginBottom: '0.5rem' }}>7-9h</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            of sleep adults need each night — consistently getting less raises blood pressure
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-stat)', color: '#1f9660', marginBottom: '0.5rem' }}>29%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            lower cardiovascular mortality in people with strong social connections
          </div>
        </div>
      </div>

      {/* How Stress Damages the Heart + Stress-Heart Cycle - two columns */}
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
            How Stress Damages the Heart
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
            When you&apos;re stressed, your body releases cortisol and adrenaline — hormones that raise heart rate and blood pressure. Short-term, this is normal. Chronically elevated, it accelerates arterial damage, promotes inflammation, and disrupts cholesterol metabolism.
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
            Stress also contributes to behaviors that compound strain on the heart: poor sleep, emotional eating, physical inactivity, and increased alcohol use. Managing stress directly addresses all of these upstream.
          </p>
          <div
            style={{
              backgroundColor: '#FFEDE9',
              borderLeft: '4px solid #E05A4D',
              padding: '1.25rem 1.5rem',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#333333', lineHeight: 1.6, margin: 0 }}>
              <strong>Sleep apnea</strong> — in which breathing repeatedly stops during sleep — is closely tied to heart disease and is linked to both high blood pressure and obesity.
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
              margin: '0 0 1.25rem 0',
              textTransform: 'uppercase',
            }}
          >
            The Stress-Heart Cycle
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {stressCycleSteps.map((step, i) => (
              <React.Fragment key={i}>
                <div
                  style={{
                    border: '1px solid #E05A4D',
                    borderRadius: 8,
                    padding: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        backgroundColor: '#E05A4D',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        flexShrink: 0,
                      }}
                    >
                      {step.num}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#333333', marginBottom: '0.25rem' }}>
                        {step.title}
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#555555', lineHeight: 1.4 }}>
                        {step.desc}
                      </div>
                    </div>
                  </div>
                </div>
                {i < stressCycleSteps.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '0.25rem 0' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#E05A4D" style={{ flexShrink: 0 }}>
                      <path d="M12 5v14M8 13l4 4 4-4"/>
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Evidence-Based Stress Reducers */}
      <h2
        style={{
          fontSize: isMobile ? '1.5rem' : '1.75rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: 600,
          color: '#333333',
          margin: '0 0 0.5rem 0',
        }}
      >
        Evidence-Based Stress Reducers
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
        These approaches have demonstrated measurable reductions in blood pressure, cortisol, and serious cardiac events.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '1rem',
        }}
      >
        {stressReducers.map((card, i) => (
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
    </HeartHealthPageLayout>
  );
};

export default StressHeartHealth;
