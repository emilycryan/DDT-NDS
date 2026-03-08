import React, { useState, useEffect } from 'react';
import TipsPageLayout from './TipsPageLayout';

const weeklyResetSteps = [
  { title: 'Check what you have', desc: 'Open fridge, freezer, pantry. Note what needs to be used first and what\'s running low.' },
  { title: 'Pick 3–5 main dishes', desc: 'Choose meals that share ingredients. One roasted chicken = dinner + lunch salads + soup base.' },
  { title: 'Write a list — and stick to it', desc: 'Grocery shopping with a list cuts impulse buys by 23%. No list = 30% more spent.' },
  { title: 'Batch prep one thing', desc: 'Cook a big pot of grains, roast a tray of veggies, or prep proteins. 30 min now saves hours later.' },
];

const shoppingStrategies = [
  {
    title: 'Frozen = Fresh (Nutritionally)',
    desc: 'Frozen vegetables and fruits are picked at peak and flash-frozen. Often cheaper and more nutritious than out-of-season fresh.',
    barColor: '#1f9660',
    iconBg: '#E0EFE0',
    iconColor: '#2D363D',
    linkText: 'Best frozen buys',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
      </svg>
    ),
  },
  {
    title: 'Buy Protein at the Bottom',
    desc: 'Compare cost per gram of protein, not price per package. Legumes, eggs, and frozen fish often win.',
    barColor: '#E05A4D',
    iconBg: '#FFE0E0',
    iconColor: '#E05A4D',
    linkText: 'Cost-per-protein comparison',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: 'Store Brands Are Identical',
    desc: 'Generic and name-brand items often come from the same factory. Store brands average 25% cheaper.',
    barColor: '#888',
    iconBg: '#F0F0F0',
    iconColor: '#2D363D',
    linkText: 'Store brand guide',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Cook Once, Eat Three Times',
    desc: 'Double or triple recipes and freeze portions. Batch cooking cuts time, waste, and cost per meal.',
    barColor: '#1f9660',
    iconBg: '#E0EFE0',
    iconColor: '#2D363D',
    linkText: 'Batch cooking starter guide',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
];

const MealPlanningOnBudget = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <TipsPageLayout title="Meal Planning on a Budget">
      <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#555555', lineHeight: 1.6, margin: '0 0 0.75rem 0' }}>
        Healthy eating doesn&apos;t have to be expensive. Planning ahead reduces food waste, saves money, and puts you in control of what goes on your plate.
      </p>
      <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#555555', lineHeight: 1.6, margin: '0 0 2rem 0' }}>
        The average American household throws away $1,500 worth of food each year — often because they bought without a plan. A 30-minute weekly reset can cut that waste in half and make nutritious, satisfying meals the default.
      </p>

      {/* Stats Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? '1rem' : '2rem',
        backgroundColor: '#2D363D',
        color: 'white',
        padding: isMobile ? '1.5rem' : '2rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '2.5rem',
      }}>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#E8A598', marginBottom: '0.5rem' }}>$3,500</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            average spent per household on food away from home each year
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>40%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            of all food in the US is wasted — most of it from home kitchens, driven by poor planning and impulse buying
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>$1.50</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            per serving is achievable for nutritious, satisfying home-cooked meals — beans, eggs, frozen vegetables, and oats are the foundation
          </div>
        </div>
      </div>

      {/* Why Planning + Weekly Reset sidebar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 340px',
        gap: '2.5rem',
        marginBottom: '2.5rem',
        alignItems: 'start',
      }}>
        <div>
          <h2 style={{ fontSize: isMobile ? '1.5rem' : '1.75rem', fontFamily: 'var(--font-serif)', fontWeight: 600, color: '#333333', margin: '0 0 0.75rem 0' }}>
            Why Planning Changes Everything
          </h2>
          <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#555555', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
            Without a plan, we buy what looks good in the moment and often let it spoil. With a plan, we buy what we need, use what we buy, and eat better for less. The key is making planning a habit — same day, same routine.
          </p>
          <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#555555', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
            Start with one week. Pick 3–5 main dishes that share ingredients. Write a list. Stick to it. The first time takes longer; by the third week, it becomes automatic.
          </p>
          <div style={{
            backgroundColor: '#F8FAF8',
            borderLeft: '4px solid #1f9660',
            padding: '1.25rem 1.5rem',
          }}>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#333333', marginBottom: '0.25rem' }}>
              The Pantry Principle
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#333333', lineHeight: 1.5, margin: 0 }}>
              A well-stocked pantry eliminates &quot;there&apos;s nothing to eat.&quot; Keep: canned beans, lentils, canned tomatoes, brown rice, oats, olive oil, frozen vegetables, eggs, and garlic. These items can produce dozens of nutritious, cheap meals without fresh produce.
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#2D363D',
          color: 'white',
          padding: '1.5rem',
          borderRadius: 'var(--radius-md)',
        }}>
          <h3 style={{ fontSize: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.08em', margin: '0 0 1rem 0', textTransform: 'uppercase', color: 'white' }}>
            The Weekly Reset – Sundays, 30 Min
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {weeklyResetSteps.map((step, i) => (
              <React.Fragment key={i}>
                <div style={{ padding: '1rem', borderBottom: i < weeklyResetSteps.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#E05A4D', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem', color: 'white' }}>{step.title}</div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.5, margin: 0, color: 'rgba(255,255,255,0.9)' }}>{step.desc}</p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Shopping Strategies */}
      <h2 style={{ fontSize: isMobile ? '1.5rem' : '1.75rem', fontFamily: 'var(--font-serif)', fontWeight: 600, color: '#333333', margin: '0 0 0.5rem 0' }}>
        Smart Shopping Strategies
      </h2>
      <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#555555', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
        These tactics work at any budget level. The goal isn&apos;t deprivation — it&apos;s getting more nutrition and satisfaction for every dollar.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
        gap: '1rem',
      }}>
        {shoppingStrategies.map((card, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #e5e5e5',
              borderTop: `3px solid ${card.barColor}`,
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              backgroundColor: 'white',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                backgroundColor: card.iconBg,
                color: card.iconColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem',
              }}
            >
              {card.icon}
            </div>
            <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', color: '#333333', margin: '0 0 0.5rem 0' }}>{card.title}</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: 0 }}>{card.desc}</p>
          </div>
        ))}
      </div>
    </TipsPageLayout>
  );
};

export default MealPlanningOnBudget;
