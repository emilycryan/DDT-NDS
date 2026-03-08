import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PrediabetesPageLayout from './PrediabetesPageLayout';

const eatMoreItems = [
  { title: 'Non-starchy vegetables', desc: 'Broccoli, leafy greens, peppers, cucumbers — fill half your plate' },
  { title: 'Whole grains', desc: 'Brown rice, oats, quinoa, whole wheat bread — digest slowly, stabilize blood sugar' },
  { title: 'Lean protein', desc: 'Chicken, fish, eggs, legumes — keeps you full and reduces spikes' },
  { title: 'Healthy fats', desc: 'Avocado, olive oil, nuts — improve insulin sensitivity over time' },
  { title: 'Water & unsweetened drinks', desc: 'Replace sugary drinks with water, sparkling water, or herbal tea' },
];

const limitItems = [
  { title: 'Sugary beverages', desc: 'Soda, juice, sweet tea, energy drinks — cause rapid blood sugar spikes' },
  { title: 'Refined carbohydrates', desc: 'White bread, white rice, pasta, pastries — digest quickly, spike glucose' },
  { title: 'Added sugars', desc: 'Candy, desserts, flavored yogurts — check nutrition labels for hidden sugars' },
  { title: 'Saturated & trans fats', desc: 'Fried foods, fatty cuts, processed snacks — worsen insulin resistance' },
  { title: 'Large portion sizes', desc: 'Even healthy foods can raise blood sugar if eaten in excess — portion control matters' },
];

const strategyCards = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v18M3 12h18M12 3a9 9 0 0 0 0 18M12 21a9 9 0 0 1 0-18" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="4"/>
      </svg>
    ),
    title: 'Use the Plate Method',
    description: 'Fill half your plate with vegetables, a quarter with lean protein, and a quarter with whole grains.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Don't Skip Meals",
    description: 'Eating at regular intervals prevents energy crashes and reduces the urge to overeat or reach for quick-sugar foods.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Read Nutrition Labels',
    description: "Watch for total carbohydrates, added sugars, and serving sizes — they're often smaller than what we actually eat.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Swap Your Drink First',
    description: 'Replacing just one sugary drink per day with water can reduce daily sugar intake by 10+ teaspoons.',
  },
];

const NutritionBloodSugar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PrediabetesPageLayout title="Nutrition & Blood Sugar">
      <h2
        style={{
          fontSize: isMobile ? '1.25rem' : '1.375rem',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          color: '#555555',
          margin: '0 0 0.75rem 0',
        }}
      >
        What you eat directly shapes your blood sugar — and your risk.
      </h2>
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#555555',
          lineHeight: 1.6,
          margin: '0 0 2.5rem 0',
        }}
      >
        You don&apos;t need a perfect diet. Small, sustainable shifts in what and how you eat can meaningfully lower blood sugar, support a healthy weight, and reduce your risk of type 2 diabetes.
      </p>

      {/* Eat More Of / Limit or Avoid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid #e5e5e5',
            borderTop: '4px solid #1f9660',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
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
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.375rem', color: '#333333', margin: 0 }}>
              Eat More Of
            </h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {eatMoreItems.map((item, i) => (
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
            backgroundColor: 'white',
            border: '1px solid #e5e5e5',
            borderTop: '4px solid #E05A4D',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
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
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.375rem', color: '#333333', margin: 0 }}>
              Limit or Avoid
            </h3>
          </div>
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

      {/* Practical Strategies That Work */}
      <div
        style={{
          backgroundColor: '#F8F7F5',
          borderRadius: 'var(--radius-md)',
          padding: isMobile ? '1.5rem' : '2rem',
          marginBottom: '2rem',
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
          Practical Strategies That Work
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
          These evidence-based habits don&apos;t require a special diet. Start with one and build from there.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: '1rem',
          }}
        >
          {strategyCards.map((card, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e5e5',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: '#E8E8E8',
                  color: '#555555',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                {card.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', color: '#333333', margin: '0 0 0.5rem 0' }}>
                {card.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: 0 }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Link
          to="/resources/prediabetes/dpp-program-overview"
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
          Get a Personalized Meal Plan
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#888888' }}>
          Available through the DPP lifestyle program
        </span>
      </div>
    </PrediabetesPageLayout>
  );
};

export default NutritionBloodSugar;
