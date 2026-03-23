import React, { useState, useEffect } from 'react';
import HeartHealthPageLayout from './HeartHealthPageLayout';

const dashTargets = [
  { item: 'Vegetables', value: '4-5 servings' },
  { item: 'Fruits', value: '4-5 servings' },
  { item: 'Whole Grains', value: '6-8 servings' },
  { item: 'Lean Protein / Fish', value: '2 or fewer servings' },
  { item: 'Low-Fat Dairy', value: '2-3 servings' },
  { item: 'Nuts, Seeds, Legumes', value: '4-5 / week' },
  { item: 'Sodium', value: 'Under 1,500-2,300 mg', highlight: true },
];

const prioritizeItems = [
  { title: 'Fatty fish', desc: 'Salmon, mackerel, sardines — rich in omega-3s that lower triglycerides and reduce inflammation' },
  { title: 'Leafy greens & berries', desc: 'High in potassium (lowers BP), antioxidants, and fiber' },
  { title: 'Olive oil & avocado', desc: 'Monounsaturated fats raise HDL and lower LDL cholesterol' },
  { title: 'Oats & legumes', desc: 'Soluble fiber binds to cholesterol and carries it out of the body' },
  { title: 'Nuts & seeds', desc: 'Walnuts, flaxseed, and chia are especially protective for cardiovascular health' },
];

const limitItems = [
  { title: 'Sodium-heavy foods', desc: 'Canned soups, deli meats, fast food — single servings often exceed daily limits' },
  { title: 'Saturated & trans fats', desc: 'Butter, full-fat dairy, palm oil, fried foods — directly raise LDL cholesterol' },
  { title: 'Added sugars', desc: 'Raise triglycerides and contribute to weight gain — a double hit to heart health' },
  { title: 'Alcohol', desc: 'Raises blood pressure and triglycerides — limit to 1 drink/day for women, 2 for men at most' },
  { title: 'Red & processed meat', desc: 'Bacon, sausage, hot dogs — associated with increased cardiovascular mortality' },
];

const HeartHealthyEating = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <HeartHealthPageLayout title="Heart-Healthy Eating">
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#555555',
          lineHeight: 1.6,
          margin: '0 0 0.75rem 0',
        }}
      >
        Food is medicine. The right diet can lower blood pressure, improve cholesterol, and reduce inflammation.
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
        You don&apos;t need a restrictive diet. The evidence consistently points to a few core patterns — more plants, less sodium, less saturated fat, less added sugar — that together make a measurable difference in cardiac outcomes.
      </p>

      {/* The DASH Diet + DASH Daily Targets - two columns */}
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
            The DASH Diet
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
            Dietary Approaches to Stop Hypertension. The DASH diet is consistently ranked among the best evidence-based approaches for lowering blood pressure and improving cholesterol — without medication.
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
            It emphasizes vegetables, fruits, whole grains, lean proteins, and low-fat dairy, while limiting sodium, red meat, and added sugars. Most people see results within 2 weeks.
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
              Key DASH Target
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: 0 }}>
              Limit sodium to 1,500-2,300 mg per day. The average American consumes over 3,400 mg daily — more than double the recommended amount.
            </p>
          </div>
        </div>

        <div
          style={{
            border: '1px solid #e5e5e5',
            borderTop: '3px solid #1f9660',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            backgroundColor: 'white',
          }}
        >
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
            DASH Daily Targets
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {dashTargets.map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#333333', fontWeight: row.highlight ? 600 : 400 }}>{row.item}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: row.highlight ? 600 : 400, color: row.highlight ? '#E05A4D' : '#555555' }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What to Put on Your Plate */}
      <h2
        style={{
          fontSize: isMobile ? '1.5rem' : '1.75rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: 600,
          color: '#333333',
          margin: '0 0 1rem 0',
        }}
      >
        What to Put on Your Plate
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '1.5rem',
        }}
      >
        <div
          style={{
            border: '1px solid #e5e5e5',
            borderTop: '3px solid #1f9660',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            backgroundColor: 'white',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.125rem', color: '#333333', margin: '0 0 1rem 0' }}>
            Prioritize
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {prioritizeItems.map((item, i) => (
              <li key={i} style={{ marginBottom: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#333333', marginBottom: '0.25rem' }}>
                  {item.title}:
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{
            border: '1px solid #e5e5e5',
            borderTop: '3px solid #E05A4D',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            backgroundColor: 'white',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.125rem', color: '#333333', margin: '0 0 1rem 0' }}>
            Limit or Avoid
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {limitItems.map((item, i) => (
              <li key={i} style={{ marginBottom: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#333333', marginBottom: '0.25rem' }}>
                  {item.title}:
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </HeartHealthPageLayout>
  );
};

export default HeartHealthyEating;
