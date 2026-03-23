import React, { useState, useEffect } from 'react';
import PrediabetesPageLayout from './PrediabetesPageLayout';

const aerobicItems = ['Lively walking', 'Swimming or water aerobics', 'Cycling (indoor or outdoor)', 'Dancing or aerobics classes', 'Jogging or running'];
const strengthItems = ['Free weights or weight machines', 'Resistance bands', 'Bodyweight exercises (squats, push-ups)', 'Yoga and Pilates', 'Heavy gardening or yard work'];
const gettingStartedSteps = [
  'Start with a 10-minute walk after your largest meal each day',
  'Add 5 minutes every week until you reach 30 minutes',
  'Introduce 1 strength session per week on a non-consecutive day',
  'Track your minutes with a phone app or simple tally',
];

const ExerciseInsulinSensitivity = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PrediabetesPageLayout title="Exercise & Insulin Sensitivity">
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#555555',
          lineHeight: 1.6,
          margin: '0 0 0.75rem 0',
        }}
      >
        Moving more is one of the most powerful things you can do for your blood sugar.
      </p>
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#555555',
          lineHeight: 1.6,
          margin: '0 0 2.5rem 0',
        }}
      >
        Physical activity helps your body use insulin more effectively — meaning less glucose stays in your bloodstream. You don&apos;t need to run marathons. A 15-minute walk after meals can make a measurable difference.
      </p>

      {/* How Exercise Lowers Blood Sugar + Factoid cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 280px',
          gap: '2rem',
          alignItems: 'start',
          marginBottom: '2.5rem',
        }}
      >
        <div>
          <h2
            style={{
              fontSize: isMobile ? '1.5rem' : '1.75rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              color: '#333333',
              margin: '0 0 1rem 0',
            }}
          >
            How Exercise Lowers Blood Sugar
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
            When you exercise, your muscles use glucose for energy — directly pulling sugar out of your bloodstream. Over time, regular activity also makes your cells more responsive to insulin, so your body needs less of it to do the same job.
          </p>
          <p
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#555555',
              lineHeight: 1.6,
              margin: '0 0 1.5rem 0',
            }}
          >
            Even a single workout has a lasting effect: your insulin sensitivity can remain elevated for 24-72 hours after moderate exercise. Consistency is what creates lasting change.
          </p>
          <div
            style={{
              backgroundColor: '#e8f4ef',
              borderLeft: '4px solid #1f9660',
              padding: '1.25rem 1.5rem',
              borderRadius: '0 8px 8px 0',
            }}
          >
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#333333', marginBottom: '0.25rem' }}>
              CDC Recommendation
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: 0 }}>
              150 minutes of moderate-intensity activity per week — about 30 minutes, 5 days a week. You can break it into 10-minute segments throughout the day.
            </p>
          </div>
        </div>

        {/* Factoid cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              backgroundColor: '#2D363D',
              color: 'white',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>58%</div>
            <div style={{ fontSize: '0.875rem', lineHeight: 1.4, opacity: 0.95 }}>
              reduction in diabetes likelihood with combined diet and exercise changes
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid #e5e5e5',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#1f9660', marginBottom: '0.5rem' }}>5-7%</div>
            <div style={{ fontSize: '0.875rem', color: '#555555', lineHeight: 1.4 }}>
              body weight loss target that produces meaningful blood sugar results (10-14 lbs for a 200 lb person)
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid #e5e5e5',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#1f9660', marginBottom: '0.5rem' }}>24-72h</div>
            <div style={{ fontSize: '0.875rem', color: '#555555', lineHeight: 1.4 }}>
              improved insulin sensitivity after a single bout of moderate exercise
            </div>
          </div>
        </div>
      </div>

      {/* Types of Exercise That Help - Tan background */}
      <div
        style={{
          backgroundColor: '#F8F7F5',
          borderRadius: 'var(--radius-md)',
          padding: isMobile ? '1.5rem' : '2rem',
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? '1.5rem' : '1.75rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: 600,
            color: '#333333',
            margin: '0 0 0.5rem 0',
          }}
        >
          Types of Exercise That Help
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
          Both aerobic exercise and strength training improve insulin sensitivity — and they work differently, so combining them is ideal.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}
        >
          {/* Aerobic Activity */}
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid #e5e5e5',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.25rem', color: '#333333', margin: '0 0 0.5rem 0' }}>
              Aerobic Activity
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
              Gets your heart rate up and burns glucose directly. Most effective for immediate blood sugar lowering.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0', flex: 1 }}>
              {aerobicItems.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#E05A4D', flexShrink: 0, marginTop: '0.5rem' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555' }}>{item}</span>
                </li>
              ))}
            </ul>
            <div
              style={{
                backgroundColor: '#e8f4ef',
                padding: '0.75rem 1rem',
                borderRadius: 8,
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#333333',
              }}
            >
              Goal: 150 min/week
            </div>
          </div>

          {/* Strength Training */}
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid #e5e5e5',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.25rem', color: '#333333', margin: '0 0 0.5rem 0' }}>
              Strength Training
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
              Builds muscle mass, which improves how your body stores and uses glucose over the long term.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0', flex: 1 }}>
              {strengthItems.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#333333', flexShrink: 0, marginTop: '0.5rem' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555' }}>{item}</span>
                </li>
              ))}
            </ul>
            <div
              style={{
                backgroundColor: '#e8f4ef',
                padding: '0.75rem 1rem',
                borderRadius: 8,
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#333333',
              }}
            >
              Goal: 2 sessions/week
            </div>
          </div>

          {/* Getting Started */}
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid #e5e5e5',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.25rem', color: '#333333', margin: '0 0 0.5rem 0' }}>
              Getting Started
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
              Even 10 minutes counts. Build gradually — consistency matters far more than intensity.
            </p>
            <ol style={{ paddingLeft: '1.5rem', margin: '0 0 1rem 0', flex: 1 }}>
              {gettingStartedSteps.map((step, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: '#555555',
                    lineHeight: 1.5,
                    marginBottom: '0.5rem',
                  }}
                >
                  {step}
                </li>
              ))}
            </ol>
            <div
              style={{
                backgroundColor: '#e8f4ef',
                padding: '0.75rem 1rem',
                borderRadius: 8,
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: '#333333',
              }}
            >
              Goal: Join a DPP
            </div>
          </div>
        </div>
      </div>
    </PrediabetesPageLayout>
  );
};

export default ExerciseInsulinSensitivity;
