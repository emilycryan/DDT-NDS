import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const riskImpact = [
  { factor: 'Smoking', impact: '2× risk' },
  { factor: 'Diabetes', impact: '2× risk' },
  { factor: 'Sleep apnea', impact: '2× risk' },
  { factor: 'Heart disease', impact: '2–4× risk' },
  { factor: 'Atrial fibrillation', impact: '5× risk' },
  { factor: 'Physical inactivity', impact: '1.5× risk' },
  { factor: 'High blood pressure', impact: '4× risk', highlight: true },
];

const dailyPrevention = [
  {
    title: 'Manage blood pressure',
    body: 'Aim for under 120/80. A 10-point drop in systolic BP cuts stroke risk by roughly a third — the single biggest lever you have.',
  },
  {
    title: 'Move 30 minutes daily',
    body: 'Brisk walking, biking, or swimming — even split into 10-minute chunks. Reduces stroke risk by about 25%.',
  },
  {
    title: 'Eat plants first',
    body: 'Vegetables, fruits, whole grains, legumes, nuts. A Mediterranean-style pattern is consistently linked to lower stroke risk.',
  },
  {
    title: "Don't smoke or vape",
    body: 'Quitting at any age sharply lowers stroke risk — within five years, risk falls close to that of a non-smoker.',
  },
  {
    title: 'Sleep 7–9 hours',
    body: 'Treat sleep apnea if you have it. Chronic poor sleep raises blood pressure, blood sugar, and clotting risk.',
  },
];

const watchRisks = [
  {
    title: 'Uncontrolled hypertension',
    body: "The number one cause of stroke. Most people with high BP don't feel it — measure regularly, treat consistently.",
  },
  {
    title: 'Smoking & vaping',
    body: 'Damages blood vessels, raises blood pressure, and makes blood more likely to clot. Vaping shows similar early effects.',
  },
  {
    title: 'Untreated diabetes',
    body: 'High blood sugar damages the small vessels in the brain. Strokes happen earlier and recover slower in people with uncontrolled diabetes.',
  },
  {
    title: 'Atrial fibrillation',
    body: 'An irregular heartbeat that lets clots form in the heart and travel to the brain. Up to 5× higher stroke risk — ask about screening.',
  },
  {
    title: 'Heavy alcohol use',
    body: 'Raises blood pressure and triglycerides. Limit to 1 drink/day for women, 2 for men at most — less is better.',
  },
];

const StrokeRiskFactorsPrevention = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const inner = {
    maxWidth: 1200,
    margin: '0 auto',
  };
  const sectionPad = isMobile ? '3rem 1.25rem' : '4rem 2rem';

  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <section style={{ padding: isMobile ? '2rem 1.25rem 3rem' : '3rem 2rem 4rem' }}>
        <div style={inner}>
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
            <Link to="/learn" style={{ color: 'var(--ink-70)', textDecoration: 'none' }}>
              Learn More
            </Link>
            <span style={{ margin: '0 0.5rem' }}>/</span>
            <Link to="/learn/stroke-prevention/recognizing-stroke-symptoms-fast" style={{ color: 'var(--ink-70)', textDecoration: 'none' }}>
              Stroke Prevention
            </Link>
            <span style={{ margin: '0 0.5rem' }}>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Stroke Risk Factors & Prevention</span>
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
              borderRadius: 'var(--radius-pill)',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
            }}
          >
            Stroke Prevention
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: isMobile ? '2.5rem' : '3.25rem',
              fontWeight: 400,
              color: '#1f1f1f',
              lineHeight: 1.05,
              margin: '0 0 1rem',
            }}
          >
            Stroke Risk Factors & Prevention
          </h1>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700, color: '#333333', lineHeight: 1.5, margin: '0 0 0.75rem', maxWidth: 1100 }}>
            Up to 80% of strokes are preventable. Knowing your risks — and which ones you can change — is the most effective place to start.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.65, margin: 0, maxWidth: 650 }}>
            Some risk factors for stroke are out of your hands: age, family history, the body you were born into. But the majority of stroke risk comes from factors you can influence — high blood pressure, blood sugar, weight, smoking, sleep, and stress. Small, sustained changes add up fast.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: '#191919', padding: isMobile ? '2rem 1.25rem' : '3rem 2rem' }}>
        <div
          style={{
            ...inner,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '1.5rem' : '2rem',
          }}
        >
          {[
            { stat: '80%', color: '#3BAA66', text: 'of strokes are preventable through lifestyle and managing known conditions' },
            { stat: '10 mmHg', color: '#ffffff', text: 'drop in systolic blood pressure cuts stroke risk by roughly one third' },
            { stat: '1 in 4', color: '#EC7D68', text: "stroke survivors will have a second stroke if risks aren't addressed" },
          ].map((item, index) => (
            <div
              key={item.stat}
              style={{
                borderLeft: !isMobile && index > 0 ? '1px solid rgba(255,255,255,0.18)' : 'none',
                paddingLeft: !isMobile && index > 0 ? '2rem' : 0,
              }}
            >
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2.5rem' : '3rem', fontWeight: 400, color: item.color, lineHeight: 1, marginBottom: '0.75rem' }}>
                {item.stat}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.55, margin: 0, maxWidth: 300 }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div
          style={{
            ...inner,
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 360px',
            gap: isMobile ? '2rem' : '4rem',
            alignItems: 'start',
          }}
        >
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 400, color: '#1f1f1f', lineHeight: 1.15, margin: '0 0 1.5rem' }}>
              How Strokes Happen
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#4d4d4d', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
              There are two main kinds of stroke. Ischemic strokes — about 87% of cases — happen when a clot blocks blood flow to part of the brain. Hemorrhagic strokes happen when a vessel in the brain bleeds, often because long-term high blood pressure has weakened the wall.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#4d4d4d', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
              Both types share root causes you can act on: blood pressure, blood sugar, cholesterol, smoking, weight, alcohol use, and physical activity. Even one of these well-managed lowers stroke risk meaningfully.
            </p>
            <div style={{ backgroundColor: '#E5F4EA', borderLeft: '4px solid #3BAA66', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', padding: '1rem 1.25rem' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 800, color: '#3BAA66', marginBottom: '0.35rem' }}>
                Why prevention works
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#333333', lineHeight: 1.55, margin: 0 }}>
                Lowering systolic blood pressure by just 10 mmHg cuts stroke risk by roughly a third. No medication is needed for most people — weight, salt, and movement do most of the work.
              </p>
            </div>
          </div>

          <aside>
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 800, letterSpacing: '0.08em', color: '#6b6b6b', margin: '0 0 0.75rem', textTransform: 'uppercase' }}>
              Top Risk Factor Impact
            </h3>
            <div style={{ border: '1px solid #dedbd6', borderRadius: 'var(--radius-sm)', overflow: 'hidden', backgroundColor: '#ffffff' }}>
              {riskImpact.map((item) => (
                <div
                  key={item.factor}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '0.9rem 1rem',
                    borderBottom: item === riskImpact[riskImpact.length - 1] ? 'none' : '1px solid #edeae6',
                    backgroundColor: item.highlight ? '#FBE7DF' : '#ffffff',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 800, color: item.highlight ? '#EC7D68' : '#1f1f1f' }}>
                    {item.factor}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 800, color: item.highlight ? '#EC7D68' : '#3BAA66', whiteSpace: 'nowrap' }}>
                    {item.impact}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section style={{ backgroundColor: '#F3F2EF', padding: sectionPad }}>
        <div style={inner}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 400, color: '#1f1f1f', lineHeight: 1.15, margin: '0 0 2rem' }}>
            What You Can Do vs What to Watch For
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '1.25rem',
            }}
          >
            <article style={{ backgroundColor: '#ffffff', border: '1px solid #dedbd6', borderTop: '3px solid #3BAA66', borderRadius: 'var(--radius-sm)', padding: isMobile ? '1.5rem' : '1.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 400, color: '#3BAA66', margin: '0 0 1rem' }}>
                Daily Prevention
              </h3>
              {dailyPrevention.map((item, index) => (
                <div key={item.title} style={{ padding: index === 0 ? '0 0 0.9rem' : '0.9rem 0', borderBottom: index === dailyPrevention.length - 1 ? 'none' : '1px solid #edeae6' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 800, color: '#1f1f1f', marginBottom: '0.2rem' }}>
                    {item.title}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#5a5a5a', lineHeight: 1.35, margin: 0 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </article>

            <article style={{ backgroundColor: '#ffffff', border: '1px solid #dedbd6', borderTop: '3px solid #EC7D68', borderRadius: 'var(--radius-sm)', padding: isMobile ? '1.5rem' : '1.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 400, color: '#EC7D68', margin: '0 0 1rem' }}>
                Watch for These Risks
              </h3>
              {watchRisks.map((item, index) => (
                <div key={item.title} style={{ padding: index === 0 ? '0 0 0.9rem' : '0.9rem 0', borderBottom: index === watchRisks.length - 1 ? 'none' : '1px solid #edeae6' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 800, color: '#1f1f1f', marginBottom: '0.2rem' }}>
                    {item.title}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#5a5a5a', lineHeight: 1.35, margin: 0 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </article>
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? '0 1.25rem 3rem' : '0 2rem 4rem', backgroundColor: '#F3F2EF' }}>
        <div style={{ ...inner, display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #dedbd6', paddingTop: '2rem' }}>
          <Link
            to="/learn/stroke-prevention/blood-pressure-brain-health"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#E05A4D',
              color: 'white',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '0.875rem 1.5rem',
              borderRadius: 30,
              textDecoration: 'none',
            }}
          >
            Blood Pressure & Brain Health
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default StrokeRiskFactorsPrevention;
