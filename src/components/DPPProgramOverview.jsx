import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PrediabetesPageLayout from './PrediabetesPageLayout';

const DPPProgramOverview = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PrediabetesPageLayout title="National DPP Lifestyle Change Program Overview">
      <h2
        style={{
          fontSize: isMobile ? '1.25rem' : '1.375rem',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          color: '#555555',
          margin: '0 0 0.75rem 0',
        }}
      >
        A proven, year-long program that lowers your chances of type 2 diabetes by 58%.
      </h2>
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#555555',
          lineHeight: 1.6,
          margin: '0 0 2rem 0',
        }}
      >
        The <strong>National Diabetes Prevention Program</strong> (National DPP) is the official partnership that helps people at risk for type 2 diabetes find quality prevention services. The CDC-recognized <strong>National DPP lifestyle change program</strong> (National DPP LCP) is the year-long, evidence-based class that helps people with prediabetes make the small shifts that add up to lasting change — guided by a trained coach, with peer support along the way.
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
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-stat)', color: '#1f9660', marginBottom: '0.5rem' }}>58%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            lower chances of developing type 2 diabetes for patients enrolled in a CDC-recognized National DPP lifestyle change program
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-stat)', marginBottom: '0.5rem' }}>1 Year</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            structured program with ~24 hours of expert-guided instruction
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-stat)', marginBottom: '0.5rem' }}>⅓ less</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            likely to develop diabetes even 10 years after program completion
          </div>
        </div>
      </div>

      {/* Two-column: narrower main + wider sidebar for balance */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 0.88fr) minmax(380px, 1.12fr)',
          gap: isMobile ? '2rem' : '2rem 2.5rem',
          alignItems: 'stretch',
        }}
      >
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            minWidth: 0,
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? '1.5rem' : '1.75rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              color: '#333333',
              margin: 0,
            }}
          >
            How the Program Works
          </h2>
          <p
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#555555',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            The National DPP lifestyle change program (National DPP LCP) is a year-long program led by a trained lifestyle coach. It teaches practical skills for healthy eating, physical activity, stress management, and building lasting habits — in a group setting with peer support.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: '0 0 auto' }}>
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e5e5',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                display: 'flex',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#E05A4D',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}
              >
                1
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.125rem', color: '#333333', margin: '0 0 0.5rem 0' }}>
                  First 6 Months — Weekly Sessions
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: 0 }}>
                  Meet weekly for about an hour. You&apos;ll build core habits—healthy eating, moving more, managing stress, and handling real-life slip-ups—with others who are on the same journey. The group keeps you accountable without going it alone.
                </p>
              </div>
            </div>
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e5e5',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                display: 'flex',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#1f9660',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}
              >
                2
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.125rem', color: '#333333', margin: '0 0 0.5rem 0' }}>
                  Next 6 Months — Monthly Check-Ins
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: 0 }}>
                  Shift to monthly sessions to lock in what you&apos;ve learned, stay on track with your coach, and lean on the same peer group as you turn new habits into everyday life.
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 'auto',
              padding: '1.25rem 1.35rem',
              backgroundColor: '#e8f4ef',
              border: '1px solid #c5e0d0',
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid #1f9660',
            }}
          >
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9375rem', color: '#1b4332', marginBottom: '0.5rem' }}>
              Why this format works
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#333333', lineHeight: 1.55, margin: 0 }}>
              Research shows that combining coaching, group support, and skills practice over a full year is what helps people sustain weight and activity changes—so the program is designed as a year-long arc, not a short class.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            minWidth: 0,
          }}
        >
          <div
            style={{
              backgroundColor: '#F8F7F5',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              border: '1px solid #e5e5e5',
            }}
          >
            <h3
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: '#555555',
                margin: '0 0 0.35rem 0',
                textTransform: 'uppercase',
              }}
            >
              Am I Eligible?
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: '#333333',
                fontWeight: 600,
                lineHeight: 1.4,
                margin: '0 0 1rem 0',
              }}
            >
              Check the list—most people know in a minute if they&apos;re in the ballpark.
            </p>
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e5e5',
                borderRadius: 8,
                padding: '1.25rem',
              }}
            >
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 600, color: '#495e69', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '0 0 0.5rem 0' }}>
                Step 1 — Everyone must meet all 4
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#555555', lineHeight: 1.55, margin: '0 0 0.75rem 0' }}>
                To participate, you must meet <strong>all 4</strong> of these requirements:
              </p>
              <ol
                style={{
                  margin: '0 0 1rem 0',
                  paddingLeft: '1.25rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: '#555555',
                  lineHeight: 1.55,
                }}
              >
                <li style={{ marginBottom: '0.35rem' }}>Be 18 years or older.</li>
                <li style={{ marginBottom: '0.35rem' }}>
                  Have a body mass index (BMI) of 25 or higher (23 or higher if you&apos;re an Asian American person).
                </li>
                <li style={{ marginBottom: '0.35rem' }}>Not be previously diagnosed with type 1 or type 2 diabetes.</li>
                <li>Not be pregnant.</li>
              </ol>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 600, color: '#495e69', letterSpacing: '0.04em', textTransform: 'uppercase', margin: '1rem 0 0.5rem 0' }}>
                Step 2 — And at least one of these
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#555555', lineHeight: 1.55, margin: '0 0 0.75rem 0' }}>
                You&apos;ll also need to meet <strong>1</strong> of the following (blood test, gestational diabetes history, or risk test score):
              </p>
              <ol
                style={{
                  margin: '0 0 0.75rem 0',
                  paddingLeft: '1.25rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: '#555555',
                  lineHeight: 1.55,
                }}
              >
                <li style={{ marginBottom: '0.75rem' }}>
                  Had a blood test result in the prediabetes range within the past year (includes any of these tests and results):
                  <ul style={{ margin: '0.35rem 0 0 0', paddingLeft: '1.25rem', listStyle: 'disc' }}>
                    <li>Hemoglobin A1C: 5.7%–6.4%</li>
                    <li>Fasting plasma glucose: 100–125 mg/dL</li>
                    <li>2-hour plasma glucose (after a 75g glucose load): 140–199 mg/dL.</li>
                  </ul>
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  Be previously diagnosed with gestational diabetes (diabetes during pregnancy).
                </li>
                <li>
                  Received a high-risk result (score of 5 or higher) on the{' '}
                  <a
                    href="https://www.cdc.gov/prediabetes/risktest/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#005ea2' }}
                  >
                    Prediabetes Risk Test
                  </a>
                  .
                </li>
              </ol>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#666666', lineHeight: 1.5, margin: '0.75rem 0 0 0', paddingTop: '0.75rem', borderTop: '1px solid #eee' }}>
                <strong style={{ color: '#555555' }}>On Medicare?</strong> The Medicare Diabetes Prevention Program uses different rules.{' '}
                <a
                  href="https://www.cdc.gov/diabetes-prevention/lifestyle-change-program/ndpp-medicare-program.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#005ea2' }}
                >
                  See Medicare eligibility
                </a>
                .
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#2D363D',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 0.5px, transparent 1px)',
              backgroundSize: '24px 24px',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.125rem', color: 'white', margin: '0 0 0.5rem 0' }}>
              Ready to find a program?
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
              Search in-person, live virtual, and hybrid options—pick what fits your schedule and your life.
            </p>
            <Link
              to="/lifestyle-programs"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'white',
                color: '#2D363D',
                border: 'none',
                borderRadius: 30,
                padding: '0.75rem 1.25rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                textDecoration: 'none',
              }}
            >
              Search Programs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </PrediabetesPageLayout>
  );
};

export default DPPProgramOverview;
