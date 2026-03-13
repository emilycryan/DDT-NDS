import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RiskFactorChecklist = () => {
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

  const checklistItem = (label, helper) => (
    <div
      key={label}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        padding: '0.6rem 0',
        borderBottom: '1px solid #e5e5e5',
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          border: '2px solid #C4C4C4',
          flexShrink: 0,
          marginTop: 2,
        }}
      />
      <div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--ink)',
            fontWeight: 500,
          }}
        >
          {label}
        </div>
        {helper && (
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              marginTop: 2,
            }}
          >
            {helper}
          </div>
        )}
      </div>
    </div>
  );

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
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Risk Factor Checklist</span>
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
          Risk Factor Checklist
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
          A simple checklist you can use with patients to quickly review common risk factors for prediabetes and
          type 2 diabetes. Complete together before or during a visit to guide conversation and next steps.
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
          Check all that apply. Use the notes area at the bottom for details or follow-up items.
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
            Check if any of these are true:
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '0.5rem 0' : '0 1.5rem',
            }}
          >
            <div>
              {checklistItem('Age 45 or older', 'Especially if not regularly active.')}
              {checklistItem('Overweight or higher body weight', 'BMI in the overweight or obesity range.')}
              {checklistItem('Family history of type 2 diabetes', 'Parent, brother, sister, or child with type 2 diabetes.')}
              {checklistItem('History of gestational diabetes or large baby', 'Diabetes during pregnancy or baby weighing more than 9 lbs.')}
              {checklistItem('Physically inactive', 'Less than 150 minutes of moderate activity each week.')}
            </div>
            <div>
              {checklistItem('High blood pressure', 'History of hypertension or on blood pressure medication.')}
              {checklistItem('Abnormal cholesterol', 'Low HDL (“good”) cholesterol or high triglycerides.')}
              {checklistItem('History of heart disease or stroke', 'Prior cardiovascular event or diagnosed condition.')}
              {checklistItem('Sleep problems', 'Obstructive sleep apnea or short sleep most nights.')}
              {checklistItem('Other conditions that increase risk', 'Such as PCOS or certain medications that raise blood sugar.')}
            </div>
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid #E5E7EB',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: '#111827',
                marginBottom: '0.5rem',
              }}
            >
              Notes / follow-up:
            </div>
            <div
              style={{
                minHeight: 96,
                borderRadius: 8,
                border: '1px dashed #D1D5DB',
                backgroundColor: 'white',
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RiskFactorChecklist;

