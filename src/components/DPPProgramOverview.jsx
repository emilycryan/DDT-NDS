import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PrediabetesPageLayout from './PrediabetesPageLayout';

const eligibilityItems = [
  'Are 18 years or older',
  'Have a BMI of 25 or higher (23+ for Asian Americans)',
  'Have a blood test showing prediabetes (A1C 5.7-6.4%), or had gestational diabetes, or score positive on the CDC prediabetes screening',
  'Have not been previously diagnosed with type 1 or type 2 diabetes, and are not currently pregnant',
];

const DPPProgramOverview = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PrediabetesPageLayout title="Diabetes Prevention Program (DPP) Overview">
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
        The CDC-recognized National Diabetes Prevention Program (DPP) is an evidence-based lifestyle change program that helps people with prediabetes make the small shifts that add up to lasting change – guided by a trained coach, with peer support along the way.
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
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#1f9660', marginBottom: '0.5rem' }}>58%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            lower chances of developing type 2 diabetes for program participants
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>1 Year</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            structured program with ~24 hours of expert-guided instruction
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>⅓ less</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            likely to develop diabetes even 10 years after program completion
          </div>
        </div>
      </div>

      {/* Two-column: Main content + Sidebar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 340px',
          gap: '2.5rem',
          alignItems: 'start',
        }}
      >
        {/* Main content */}
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
            How the Program Works
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
            The National DPP Lifestyle Change Program is a year-long program led by a trained Lifestyle Coach. It teaches practical skills for healthy eating, physical activity, stress management, and building lasting habits – in a group setting with peer support.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                  Meet weekly for 1-hour sessions. Learn core habits: healthy eating, adding physical activity, managing stress, and overcoming challenges. Small group setting builds accountability.
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
                  Meet monthly to reinforce skills and maintain positive changes. Build on momentum with coach support and the peer group you&apos;ve formed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                margin: '0 0 1rem 0',
                textTransform: 'uppercase',
              }}
            >
              Am I Eligible?
            </h3>
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e5e5',
                borderRadius: 8,
                padding: '1.25rem',
              }}
            >
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#333333', marginBottom: '0.75rem' }}>
                You may qualify if you:
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {eligibilityItems.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                      <circle cx="12" cy="12" r="10" fill="#1f9660"/>
                      <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#555555', lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
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
              Find Your Perfect Program
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
              In-person, live virtual, and on-demand options available nationwide.
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
