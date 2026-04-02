import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SMART_PLUS = [
  { letter: 'S', label: 'Specific', question: 'What exactly will I do? When, where, and how much?', placeholder: 'Example: Walk for 15 minutes after breakfast on Monday, Wednesday, and Friday.' },
  { letter: 'M', label: 'Measurable', question: 'How will I know I did it?', placeholder: 'Example: I can count minutes, steps, or check off days.' },
  { letter: 'A', label: 'Achievable', question: 'Is this realistic for me right now?', placeholder: 'Example: I feel 70% confident I can do this.' },
  { letter: 'R', label: 'Relevant', question: 'Why does this matter to me?', placeholder: 'Example: I want more energy to play with my grandkids.' },
  { letter: 'T', label: 'Time-bound', question: 'When will I check in and adjust if needed?', placeholder: 'Example: I will review this goal in 2 weeks.' },
  { letter: '+', label: 'Flexible (Plan B)', question: "What's my backup if something gets in the way?", placeholder: 'Example: If the weather is bad, I will do a 15-minute video workout at home instead.' },
];

const GoalSettingWorksheet = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sectionStyles = {
    maxWidth: 960,
    margin: '0 auto',
    padding: isMobile ? '2rem 1rem' : '3rem 2rem',
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '80vh' }}>
      <section style={sectionStyles}>
        <nav
          style={{
            marginBottom: '1.5rem',
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
          <Link to="/for-practitioners" style={{ color: 'var(--ink-70)', textDecoration: 'none' }}>
            For Practitioners
          </Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Goal-Setting Worksheet</span>
        </nav>

        <span
          style={{
            display: 'inline-block',
            backgroundColor: '#FFEDE9',
            color: '#DC5A42',
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '0.05em',
            padding: '0.4rem 1.125rem',
            borderRadius: '999px',
            marginBottom: '1.25rem',
            fontFamily: 'var(--font-body)',
            textTransform: 'uppercase',
          }}
        >
          Visit Tool
        </span>

        <h1
          style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: 600,
            color: '#333333',
            lineHeight: 1.15,
            margin: '0 0 0.75rem 0',
          }}
        >
          Goal-Setting Worksheet
        </h1>

        <p
          style={{
            fontSize: '1rem',
            fontFamily: 'var(--font-body)',
            color: '#555555',
            lineHeight: 1.6,
            margin: '0 0 0.5rem 0',
          }}
        >
          A guided worksheet that walks patients through writing a specific, achievable behavior goal using the SMART+ framework. Research shows that structured goal-setting — specific, measurable, and tied to personal values — increases the likelihood of successful behavior change. The National DPP lifestyle change program and other evidence-based lifestyle interventions use frameworks like SMART to support sustainable habits.
        </p>

        <p
          style={{
            fontSize: '0.875rem',
            fontFamily: 'var(--font-body)',
            color: '#6B7280',
            lineHeight: 1.5,
            margin: '0 0 1.5rem 0',
          }}
        >
          Work through each step with the patient. Focus on behaviors (what they will do) rather than outcomes (weight, lab values). The “+” adds flexibility — a plan B for when life gets in the way.
        </p>

        <div
          style={{
            backgroundColor: '#F9FAFB',
            borderRadius: 'var(--radius-md)',
            padding: isMobile ? '1.5rem' : '2rem',
            border: '1px solid #E5E7EB',
          }}
        >
          <h2
            style={{
              fontSize: '1.125rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              color: '#111827',
              margin: '0 0 1rem 0',
            }}
          >
            My behavior goal (SMART+)
          </h2>

          {SMART_PLUS.map((step, i) => (
            <div
              key={i}
              style={{
                marginBottom: i < SMART_PLUS.length - 1 ? '1.25rem' : 0,
                paddingBottom: i < SMART_PLUS.length - 1 ? '1.25rem' : 0,
                borderBottom: i < SMART_PLUS.length - 1 ? '1px solid #E5E7EB' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    backgroundColor: '#2D363D',
                    color: 'white',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {step.letter}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                    color: '#111827',
                  }}
                >
                  {step.label}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: '#6B7280',
                  marginBottom: '0.5rem',
                  fontStyle: 'italic',
                }}
              >
                {step.question}
              </div>
              <div
                style={{
                  minHeight: 56,
                  border: '1px solid #D1D5DB',
                  borderRadius: 8,
                  backgroundColor: 'white',
                  padding: '0.75rem',
                }}
              />
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: '#9CA3AF',
                  marginTop: '0.35rem',
                }}
              >
                {step.placeholder}
              </div>
            </div>
          ))}

          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                color: '#111827',
                marginBottom: '0.5rem',
              }}
            >
              My goal in one sentence:
            </div>
            <div
              style={{
                minHeight: 48,
                border: '1px dashed #D1D5DB',
                borderRadius: 8,
                backgroundColor: 'white',
              }}
            />
          </div>
        </div>

        <p
          style={{
            fontSize: '0.8125rem',
            fontFamily: 'var(--font-body)',
            color: '#6B7280',
            lineHeight: 1.5,
            marginTop: '1.5rem',
            fontStyle: 'italic',
          }}
        >
          Sources: CDC National DPP; goal-setting theory in health behavior change; evidence-based self-management frameworks.
        </p>
      </section>
    </div>
  );
};

export default GoalSettingWorksheet;
