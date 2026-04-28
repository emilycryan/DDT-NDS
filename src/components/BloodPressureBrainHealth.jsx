import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const bpCategories = [
  { label: 'Normal', value: 'Below 120 / 80', color: '#3BAA66' },
  { label: 'Elevated', value: '120–129 / under 80', color: '#B7791F' },
  { label: 'Stage 1 hypertension', value: '130–139 / 80–89', color: '#D97706' },
  { label: 'Stage 2 hypertension', value: '140+ / 90+', color: '#D83933' },
  { label: 'Home reading', value: 'Same time, twice daily', color: '#1f1f1f' },
  { label: 'Stroke prevention goal', value: 'Under 130 / 80', color: '#1f1f1f' },
  { label: 'Hypertensive crisis', value: '180+ / 120+ — call 911', color: '#EC7D68', highlight: true },
];

const lifestyleFirst = [
  { title: 'Move 30 minutes daily', body: 'Walking, biking, swimming — lowers systolic BP by about 5–8 mmHg on its own.' },
  { title: 'DASH-style eating', body: 'Plant-forward, low-salt eating pattern. Most people see results within two weeks.' },
  { title: 'Cut sodium hard', body: 'Aim for under 1,500 mg/day. Most sodium hides in restaurant meals, bread, and packaged foods — not the salt shaker.' },
  { title: 'Limit alcohol', body: 'Under 1 drink/day for women, 2 for men. Heavy drinking raises BP and stroke risk independently.' },
  { title: 'Lose 5–10 pounds', body: "If you're overweight, each pound lost trims systolic BP by about 1 point. The first ten pounds matter most." },
];

const medications = [
  { title: 'ACE inhibitors', body: 'Drugs ending in "-pril" (lisinopril, enalapril). Relax vessels and protect kidney function. First-line for many people.' },
  { title: 'ARBs', body: 'Drugs ending in "-sartan" (losartan, valsartan). Similar effect to ACE inhibitors with fewer side effects — no cough.' },
  { title: 'Diuretics', body: 'Help kidneys remove excess sodium and water. Inexpensive, well-studied — often part of combination therapy.' },
  { title: 'Calcium channel blockers', body: 'Drugs like amlodipine. Relax artery walls. Especially helpful for older adults and people of African descent.' },
  { title: 'Combination therapy', body: "Most people need two or more drugs to reach goal. This is normal — not a sign you're failing at lifestyle changes." },
];

const BloodPressureBrainHealth = () => {
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
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Blood Pressure & Brain Health</span>
          </nav>

          <span style={{ display: 'inline-block', backgroundColor: '#FFEDE9', color: '#DC5A42', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', padding: '0.4rem 1.125rem', borderRadius: 'var(--radius-pill)', marginBottom: '1.25rem', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
            Stroke Prevention
          </span>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2.5rem' : '3.25rem', fontWeight: 400, color: '#1f1f1f', lineHeight: 1.05, margin: '0 0 1rem' }}>
            Blood Pressure & Brain Health
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700, color: '#333333', lineHeight: 1.5, margin: '0 0 0.75rem', maxWidth: 1120 }}>
            High blood pressure is the leading cause of stroke. It often shows no symptoms — but quietly damages the small vessels that keep your brain working.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.65, margin: 0, maxWidth: 650 }}>
            Most people who have a stroke had elevated blood pressure for years before. The good news: blood pressure is also one of the most measurable, treatable, and modifiable risk factors. A 10-point drop in systolic BP can cut stroke risk by a third.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: '#191919', padding: isMobile ? '2rem 1.25rem' : '3rem 2rem' }}>
        <div style={{ ...inner, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '1.5rem' : '2rem' }}>
          {[
            { stat: '1 in 3', color: '#ffffff', text: "U.S. adults have high blood pressure — nearly half don't have it under control" },
            { stat: '35%', color: '#3BAA66', text: 'drop in stroke risk when systolic BP is lowered from 140 to 130 mmHg' },
            { stat: 'Silent', color: '#EC7D68', text: 'Most people with high BP feel completely normal — only measurement reveals it' },
          ].map((item, index) => (
            <div key={item.stat} style={{ borderLeft: !isMobile && index > 0 ? '1px solid rgba(255,255,255,0.18)' : 'none', paddingLeft: !isMobile && index > 0 ? '2rem' : 0 }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2.5rem' : '3rem', fontWeight: 400, color: item.color, lineHeight: 1, marginBottom: '0.75rem' }}>{item.stat}</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.55, margin: 0, maxWidth: 300 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ ...inner, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 360px', gap: isMobile ? '2rem' : '4rem', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 400, color: '#1f1f1f', lineHeight: 1.15, margin: '0 0 1.5rem' }}>How High BP Damages the Brain</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#4d4d4d', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
              Blood pressure is the force your blood puts on artery walls. When it&apos;s chronically too high, it scars and stiffens those walls — including the tiny vessels deep in the brain. Over time, those vessels narrow, leak, or burst.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#4d4d4d', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
              This damage often happens silently. Many people accumulate small &quot;silent strokes&quot; they never feel — each one chipping away at memory, balance, and thinking. By the time a major stroke happens, the groundwork has often been laid for decades.
            </p>
            <div style={{ backgroundColor: '#E5F4EA', borderLeft: '4px solid #3BAA66', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', padding: '1rem 1.25rem' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 800, color: '#3BAA66', marginBottom: '0.35rem' }}>Silent strokes are real</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#333333', lineHeight: 1.55, margin: 0 }}>
                About 1 in 4 adults over 80 has had a silent stroke they never knew about. Controlling BP earlier in life is the most powerful way to prevent the cumulative damage that leads to stroke and vascular dementia.
              </p>
            </div>
          </div>

          <aside>
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 800, letterSpacing: '0.08em', color: '#6b6b6b', margin: '0 0 0.75rem', textTransform: 'uppercase' }}>Blood Pressure Categories</h3>
            <div style={{ border: '1px solid #dedbd6', borderRadius: 'var(--radius-sm)', overflow: 'hidden', backgroundColor: '#ffffff' }}>
              {bpCategories.map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.9rem 1rem', borderBottom: item === bpCategories[bpCategories.length - 1] ? 'none' : '1px solid #edeae6', backgroundColor: item.highlight ? '#FBE7DF' : '#ffffff' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 800, color: item.highlight ? '#EC7D68' : '#1f1f1f' }}>{item.label}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 800, color: item.color, whiteSpace: 'nowrap' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section style={{ backgroundColor: '#F3F2EF', padding: sectionPad }}>
        <div style={inner}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 400, color: '#1f1f1f', lineHeight: 1.15, margin: '0 0 2rem' }}>Lowering Your Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.25rem' }}>
            <article style={{ backgroundColor: '#ffffff', border: '1px solid #dedbd6', borderTop: '3px solid #3BAA66', borderRadius: 'var(--radius-sm)', padding: isMobile ? '1.5rem' : '1.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 400, color: '#3BAA66', margin: '0 0 1rem' }}>Lifestyle First</h3>
              {lifestyleFirst.map((item, index) => (
                <div key={item.title} style={{ padding: index === 0 ? '0 0 0.9rem' : '0.9rem 0', borderBottom: index === lifestyleFirst.length - 1 ? 'none' : '1px solid #edeae6' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 800, color: '#1f1f1f', marginBottom: '0.2rem' }}>{item.title}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#5a5a5a', lineHeight: 1.35, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </article>
            <article style={{ backgroundColor: '#ffffff', border: '1px solid #dedbd6', borderTop: '3px solid #EC7D68', borderRadius: 'var(--radius-sm)', padding: isMobile ? '1.5rem' : '1.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 400, color: '#EC7D68', margin: '0 0 1rem' }}>When You Need Medication</h3>
              {medications.map((item, index) => (
                <div key={item.title} style={{ padding: index === 0 ? '0 0 0.9rem' : '0.9rem 0', borderBottom: index === medications.length - 1 ? 'none' : '1px solid #edeae6' }}>
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
          <Link to="/learn/stroke-prevention/recovery-reducing-future-risk" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#E05A4D', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', padding: '0.875rem 1.5rem', borderRadius: 30, textDecoration: 'none' }}>
            Recovery & Reducing Future Risk
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default BloodPressureBrainHealth;
