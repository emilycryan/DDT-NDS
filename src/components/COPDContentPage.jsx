import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const COPDContentPage = ({
  title,
  lead,
  intro,
  stats,
  section,
  bottom,
  next,
}) => {
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
            <Link to="/learn/copd-prevention/understanding-copd" style={{ color: 'var(--ink-70)', textDecoration: 'none' }}>COPD Prevention</Link>
            <span style={{ margin: '0 0.5rem' }}>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{title}</span>
          </nav>

          <span style={{ display: 'inline-block', backgroundColor: '#FFEDE9', color: '#DC5A42', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', padding: '0.4rem 1.125rem', borderRadius: 'var(--radius-pill)', marginBottom: '1.25rem', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
            COPD Prevention
          </span>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2.5rem' : '3.25rem', fontWeight: 400, color: '#1f1f1f', lineHeight: 1.05, margin: '0 0 1rem' }}>{title}</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700, color: '#333333', lineHeight: 1.5, margin: '0 0 0.75rem', maxWidth: 1120 }}>{lead}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.65, margin: 0, maxWidth: 650 }}>{intro}</p>
        </div>
      </section>

      <section style={{ backgroundColor: '#191919', padding: isMobile ? '2rem 1.25rem' : '3rem 2rem' }}>
        <div style={{ ...inner, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '1.5rem' : '2rem' }}>
          {stats.map((item, index) => (
            <div key={item.stat} style={{ borderLeft: !isMobile && index > 0 ? '1px solid rgba(255,255,255,0.18)' : 'none', paddingLeft: !isMobile && index > 0 ? '2rem' : 0 }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2.5rem' : '3rem', fontWeight: 400, color: item.color || '#ffffff', lineHeight: 1, marginBottom: '0.75rem' }}>{item.stat}</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.55, margin: 0, maxWidth: 330 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: sectionPad }}>
        <div style={{ ...inner, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 360px', gap: isMobile ? '2rem' : '4rem', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 400, color: '#1f1f1f', lineHeight: 1.15, margin: '0 0 1.5rem' }}>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#4d4d4d', lineHeight: 1.7, margin: '0 0 1.25rem' }}>{paragraph}</p>
            ))}
            {section.callout && (
              <div style={{ backgroundColor: '#FBEFE8', borderLeft: '4px solid #EC7D68', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', padding: '1rem 1.25rem', marginTop: '1.5rem' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#333333', lineHeight: 1.55, margin: 0 }}>{section.callout}</p>
              </div>
            )}
          </div>

          {section.aside && (
            <aside>
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 800, letterSpacing: '0.08em', color: '#6b6b6b', margin: '0 0 0.75rem', textTransform: 'uppercase' }}>{section.aside.title}</h3>
              <div style={{ display: 'grid', gap: '0.85rem' }}>
                {section.aside.items.map((item) => (
                  <article key={item.title} style={{ backgroundColor: item.bg || '#ffffff', border: item.highlight ? '2px solid #EC7D68' : '1px solid #dedbd6', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start' }}>
                      <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 800, color: item.color || '#304B3B', margin: '0 0 0.65rem' }}>{item.title}</h4>
                      {item.dot && <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: item.dot, flexShrink: 0, marginTop: 4 }} />}
                      {item.meta && <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#777777', whiteSpace: 'nowrap' }}>{item.meta}</span>}
                    </div>
                    {item.rows ? (
                      <div style={{ display: 'grid', gap: '0.35rem' }}>
                        {item.rows.map((row) => (
                          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#5d5d5d' }}>
                            <span>{row.label}</span>
                            <strong style={{ color: '#1f1f1f', textAlign: 'right' }}>{row.value}</strong>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#666666', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                    )}
                    {item.note && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#666666', fontStyle: 'italic', lineHeight: 1.5, margin: '0.85rem 0 0' }}>{item.note}</p>}
                  </article>
                ))}
              </div>
            </aside>
          )}
        </div>
      </section>

      <section style={{ backgroundColor: '#F3F2EF', padding: sectionPad }}>
        <div style={inner}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 400, color: '#1f1f1f', lineHeight: 1.15, margin: '0 0 0.75rem' }}>{bottom.title}</h2>
          {bottom.intro && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#4d4d4d', lineHeight: 1.65, margin: '0 0 2rem', maxWidth: 640 }}>{bottom.intro}</p>}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)', gap: '1.25rem' }}>
            {bottom.cards.map((card) => (
              <article key={card.title} style={{ backgroundColor: '#ffffff', border: '1px solid #dedbd6', borderTop: '3px solid #EC7D68', borderRadius: 'var(--radius-sm)', padding: '1.35rem', gridColumn: !isMobile && card.wide ? '1 / -1' : 'auto' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 800, color: '#1f1f1f', margin: '0 0 0.75rem' }}>{card.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#4d4d4d', lineHeight: 1.55, margin: 0 }}>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {next && (
        <section style={{ padding: isMobile ? '0 1.25rem 3rem' : '0 2rem 4rem', backgroundColor: '#F3F2EF' }}>
          <div style={{ ...inner, display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #dedbd6', paddingTop: '2rem' }}>
            <Link to={next.path} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#E05A4D', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', padding: '0.875rem 1.5rem', borderRadius: 30, textDecoration: 'none' }}>
              {next.title}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};

export default COPDContentPage;
