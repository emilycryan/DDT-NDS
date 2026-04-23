import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeartHealthPageLayout from './HeartHealthPageLayout';

const fiveNumbers = [
  { title: 'Blood Pressure', value: 'Below 120/80', range: 'mmHg — normal range', desc: 'Measures the force of blood against artery walls. High readings raise the chance of heart attack and stroke.' },
  { title: 'Total Cholesterol', value: 'Below 200', range: 'mg/dL — desirable range', desc: 'Total amount of cholesterol in your blood. Elevated levels can lead to plaque buildup in arteries.' },
  { title: 'LDL "Bad" Cholesterol', value: 'Below 100', range: 'mg/dL — optimal range', desc: 'The main cholesterol that builds up in artery walls. Lower is better for heart health.' },
  { title: 'HDL "Good" Cholesterol', value: '60 or above', range: 'mg/dL — protective range', desc: 'Helps remove other cholesterol from your bloodstream. Higher levels are protective.' },
  { title: 'Triglycerides', value: 'Below 150', range: 'mg/dL — normal range', desc: 'A type of fat in the blood. High levels are linked to heart disease and metabolic strain.' },
];

const KnowYourNumbers = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <HeartHealthPageLayout title="Know Your Numbers">
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#555555',
          lineHeight: 1.6,
          margin: '0 0 2rem 0',
        }}
      >
        Heart disease is the leading cause of death in the United States — and it&apos;s largely preventable. Knowing your blood pressure, cholesterol, blood sugar, and other key metrics gives you a clear picture of where you stand — and what to do about it. Most adults should get checked at least once a year.
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
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-stat)', color: '#E8A598', marginBottom: '0.5rem' }}>Every 33s</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            someone in the United States dies from cardiovascular disease
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-stat)', color: '#E8A598', marginBottom: '0.5rem' }}>75%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            of adults with high blood pressure have it uncontrolled
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-stat)', color: '#1f9660', marginBottom: '0.5rem' }}>80%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            of heart disease and stroke events are preventable with lifestyle changes
          </div>
        </div>
      </div>

      {/* The Five Numbers That Matter Most */}
      <h2
        style={{
          fontSize: isMobile ? '1.5rem' : '1.75rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: 600,
          color: '#333333',
          margin: '0 0 0.5rem 0',
        }}
      >
        The Five Numbers That Matter Most
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
        Ask your doctor to check all five at your next visit. Together they give a complete picture of your cardiovascular health.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}
      >
        {fiveNumbers.map((item, i) => (
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
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.05em', color: '#1f9660', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              {item.title}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.25rem', color: '#333333', marginBottom: '0.25rem' }}>
              {item.value}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontStyle: 'italic', color: '#666666', marginBottom: '0.75rem' }}>
              {item.range}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#555555', lineHeight: 1.5, margin: 0 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom section - When Did You Last Get Checked? */}
      <div
        style={{
          backgroundColor: '#F8F7F5',
          borderRadius: 'var(--radius-md)',
          padding: isMobile ? '1.5rem' : '2rem',
        }}
      >
        <div>
          <h2
            style={{
              fontSize: isMobile ? '1.25rem' : '1.5rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              color: '#333333',
              margin: '0 0 0.5rem 0',
            }}
          >
            When Did You Last Get Checked?
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
            Healthy adults should have blood pressure checked at least yearly and a full lipid panel every 4-6 years. If you have contributing factors, your doctor may recommend more frequent monitoring.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
            <Link
              to="/learn/heart-health/blood-pressure-cholesterol"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#E05A4D',
                color: 'white',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                padding: '0.75rem 1.25rem',
                borderRadius: 30,
                textDecoration: 'none',
              }}
            >
              Find a Screening Near You
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#888888' }}>
              Many screenings are free or low-cost
            </span>
          </div>
        </div>
      </div>
    </HeartHealthPageLayout>
  );
};

export default KnowYourNumbers;
