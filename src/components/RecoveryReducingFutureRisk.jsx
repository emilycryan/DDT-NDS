import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const rehabPillars = [
  { title: 'Physical therapy', body: 'Rebuilds strength, balance, and walking. Most survivors start with PT in the hospital and continue at home or outpatient.' },
  { title: 'Occupational therapy', body: 'Restores daily-living skills — dressing, cooking, bathing, returning to work. Adapts the home if needed.' },
  { title: 'Speech & language therapy', body: 'For aphasia, swallowing problems, and slurred speech. Early speech therapy improves long-term communication.' },
  { title: 'Cognitive rehabilitation', body: 'Helps with memory, attention, planning, and problem-solving. Often overlooked but essential for return to work and independence.' },
  { title: 'Mental health support', body: "Depression affects about 1 in 3 stroke survivors and slows recovery. Counseling and medication help — don't tough it out." },
];

const reducingRisk = [
  { title: 'Take prescribed meds daily', body: 'Blood thinners, BP meds, and statins are protective only when taken consistently. Set reminders, use a pill organizer.' },
  { title: 'Treat atrial fibrillation', body: "AFib is a frequent hidden cause of stroke. Wearable monitors can detect it — ask about screening if it hasn't been checked." },
  { title: 'Quit smoking immediately', body: 'Smokers face roughly twice the risk of a recurrent stroke. Quitting at any age sharply lowers that risk within months.' },
  { title: 'Manage diabetes & weight', body: 'Both raise the risk of a second stroke. Aim for an A1C under 7% and steady, gradual weight loss if needed.' },
  { title: 'Keep moving long-term', body: 'Daily activity — even short walks — protects gains made in rehab and lowers recurrence. Maintenance matters.' },
];

const RecoveryReducingFutureRisk = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const inner = { maxWidth: 1200, margin: '0 auto' };
  const sectionPad = isMobile ? '3rem 1.25rem' : '4rem 2rem';

  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <section style={{ padding: isMobile ? '2rem 1.25rem 3rem' : '3rem 2rem 4rem' }}>
        <div style={inner}>
          <nav style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--ink-70)' }} aria-label="Breadcrumb">
            <Link to="/" style={{ color: 'var(--ink-70)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 0.5rem' }}>/</span>
            <Link to="/learn" style={{ color: 'var(--ink-70)', textDecoration: 'none' }}>Learn More</Link>
            <span style={{ margin: '0 0.5rem' }}>/</span>
            <Link to="/learn/stroke-prevention/recognizing-stroke-symptoms-fast" style={{ color: 'var(--ink-70)', textDecoration: 'none' }}>Stroke Prevention</Link>
            <span style={{ margin: '0 0.5rem' }}>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Recovery & Reducing Future Risk</span>
          </nav>

          <span style={{ display: 'inline-block', backgroundColor: '#FFEDE9', color: '#DC5A42', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', padding: '0.4rem 1.125rem', borderRadius: 'var(--radius-pill)', marginBottom: '1.25rem', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
            Stroke Prevention
          </span>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2.5rem' : '3.25rem', fontWeight: 400, color: '#1f1f1f', lineHeight: 1.05, margin: '0 0 1rem' }}>Recovery & Reducing Future Risk</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700, color: '#333333', lineHeight: 1.5, margin: '0 0 0.75rem', maxWidth: 1120 }}>
            Surviving a stroke is the beginning. The first months shape long-term recovery — and the right plan can prevent a second stroke.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.65, margin: 0, maxWidth: 650 }}>
            About 1 in 4 stroke survivors will have another stroke if their risk factors aren&apos;t addressed. Recovery and prevention go hand in hand: rehab rebuilds what the brain lost, while medication, lifestyle, and follow-up care guard against what comes next.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: '#191919', padding: isMobile ? '2rem 1.25rem' : '3rem 2rem' }}>
        <div style={{ ...inner, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '1.5rem' : '2rem' }}>
          {[
            { stat: '2 of 3', color: '#3BAA66', text: 'stroke survivors regain meaningful independence with consistent rehab' },
            { stat: '90 days', color: '#ffffff', text: "window where the brain's neuroplasticity gains are steepest — act early" },
            { stat: '1 in 4', color: '#EC7D68', text: 'survivors will have a second stroke without secondary prevention' },
          ].map((item, index) => (
            <div key={item.stat} style={{ borderLeft: !isMobile && index > 0 ? '1px solid rgba(255,255,255,0.18)' : 'none', paddingLeft: !isMobile && index > 0 ? '2rem' : 0 }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2.5rem' : '3rem', fontWeight: 400, color: item.color, lineHeight: 1, marginBottom: '0.75rem' }}>{item.stat}</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.55, margin: 0, maxWidth: 300 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ ...inner }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 400, color: '#1f1f1f', lineHeight: 1.15, margin: '0 0 1.5rem' }}>Recovery Has Phases</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#4d4d4d', lineHeight: 1.7, margin: '0 0 1.25rem', maxWidth: 820 }}>
            Stroke recovery isn&apos;t linear. Some abilities return within days; others take months or years. The brain rewires itself around damaged areas through a process called neuroplasticity — and it responds to consistent, repeated effort.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#4d4d4d', lineHeight: 1.7, margin: '0 0 1.5rem', maxWidth: 820 }}>
            The biggest gains come in the first three to six months, but meaningful recovery continues for years. The plan should match the phase: aggressive rehab early, smart maintenance later.
          </p>
          <div style={{ backgroundColor: '#E5F4EA', borderLeft: '4px solid #3BAA66', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', padding: '1rem 1.25rem', maxWidth: 820 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 800, color: '#3BAA66', marginBottom: '0.35rem' }}>The early window matters most</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#333333', lineHeight: 1.55, margin: 0 }}>
              Most stroke survivors should begin rehab within 24–48 hours of becoming stable. The first 90 days drive the steepest gains — don&apos;t delay therapy waiting to feel “ready.”
            </p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#F3F2EF', padding: sectionPad }}>
        <div style={inner}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 400, color: '#1f1f1f', lineHeight: 1.15, margin: '0 0 2rem' }}>Rehab Pillars & Reducing Future Risk</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.25rem' }}>
            <article style={{ backgroundColor: '#ffffff', border: '1px solid #dedbd6', borderTop: '3px solid #3BAA66', borderRadius: 'var(--radius-sm)', padding: isMobile ? '1.5rem' : '1.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 400, color: '#3BAA66', margin: '0 0 1rem' }}>Rehab Pillars</h3>
              {rehabPillars.map((item, index) => (
                <div key={item.title} style={{ padding: index === 0 ? '0 0 0.9rem' : '0.9rem 0', borderBottom: index === rehabPillars.length - 1 ? 'none' : '1px solid #edeae6' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 800, color: '#1f1f1f', marginBottom: '0.2rem' }}>{item.title}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#5a5a5a', lineHeight: 1.35, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </article>
            <article style={{ backgroundColor: '#ffffff', border: '1px solid #dedbd6', borderTop: '3px solid #EC7D68', borderRadius: 'var(--radius-sm)', padding: isMobile ? '1.5rem' : '1.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 400, color: '#EC7D68', margin: '0 0 1rem' }}>Reducing Future Risk</h3>
              {reducingRisk.map((item, index) => (
                <div key={item.title} style={{ padding: index === 0 ? '0 0 0.9rem' : '0.9rem 0', borderBottom: index === reducingRisk.length - 1 ? 'none' : '1px solid #edeae6' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 800, color: '#1f1f1f', marginBottom: '0.2rem' }}>{item.title}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#5a5a5a', lineHeight: 1.35, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </article>
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? '0 1.25rem 3rem' : '0 2rem 4rem', backgroundColor: '#F3F2EF' }}>
        <div style={{ ...inner, display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #dedbd6', paddingTop: '2rem' }}>
          <Link to="/learn/stroke-prevention/recognizing-stroke-symptoms-fast" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#E05A4D', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', padding: '0.875rem 1.5rem', borderRadius: 30, textDecoration: 'none' }}>
            Recognizing Stroke Symptoms (FAST)
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default RecoveryReducingFutureRisk;
