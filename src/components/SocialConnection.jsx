import React, { useState, useEffect } from 'react';
import HealthyLivingPageLayout from './HealthyLivingPageLayout';

const biologyBoxes = [
  { title: 'Oxytocin release', desc: 'Physical touch, eye-contact, and shared laughter all trigger oxytocin—lowering heart rate, blood pressure, and cortisol within minutes.' },
  { title: 'Immune strengthening', desc: 'People with strong social networks have higher NK cell activity and antibody production—they fight off infections more effectively.' },
  { title: 'Cognitive protection', desc: 'Regular social engagement is one of the strongest modifiable protective factors against cognitive decline and Alzheimer\'s disease.' },
  { title: 'Longevity effect', desc: 'The Harvard Study of Adult Development—the longest study of happiness ever conducted—found strong relationships as the #1 predictor of health and longevity at 80.' },
];

const connectionCards = [
  { title: 'Join a Group Program', desc: 'Structured group programs like the Diabetes Prevention Program deliver connection as a core component. Shared goals, accountability, and group identity produce some of the strongest social bonds in adulthood.' },
  { title: 'Volunteer', desc: 'Volunteering consistently ranks as one of the most effective interventions for loneliness and depression. Helping others activates the same reward circuits as receiving help—and provides regular structured social contact.' },
  { title: 'Nurture Close Ties', desc: 'Invest in a handful of deep relationships rather than broadening a shallow network. Regular, unhurried time with people who know you well is the highest-value social investment available. Schedule it like a health appointment.' },
  { title: 'Get Into Community', desc: 'Faith communities, sports leagues, hobby groups, neighborhood organizations—any setting with regular in-person contact and shared purpose builds the social infrastructure that protects health over decades.' },
];

const SocialConnection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <HealthyLivingPageLayout title="Social Connection">
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#555555',
          lineHeight: 1.6,
          margin: '0 0 0.75rem 0',
        }}
      >
        Human connection is a biological need — and its absence carries the same health risk as smoking 15 cigarettes a day.
      </p>
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#555555',
          lineHeight: 1.6,
          margin: '0 0 2rem 0',
        }}
      >
        Strong social ties reduce cortisol, strengthen immune response, and lower cardiovascular risk. Building community isn&apos;t just good for your mood — it&apos;s one of the most evidence-backed prevention strategies available.
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
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#E8A598', marginBottom: '0.5rem' }}>26%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            higher mortality risk from social isolation — comparable to smoking, obesity, and physical inactivity
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#E8A598', marginBottom: '0.5rem' }}>61%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            of Americans report feeling lonely — a figure that has risen steadily over the past two decades across all age groups
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#E8A598', marginBottom: '0.5rem' }}>15 cigs</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            per day — the equivalent health impact of chronic loneliness, according to a landmark Brigham Young University study
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.5rem' }}>THE BRIGHAM YOUNG UNIVERSITY STUDY</div>
        </div>
      </div>

      {/* Why Connection Is Medicine + Biology of Belonging */}
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
            Why Connection Is Medicine
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
            Social connection has direct biological effects. When we feel genuinely connected, oxytocin reduces blood pressure and inflammation. Cortisol drops. Immune markers improve. The effect is dose-responsive — more meaningful connection, better outcomes.
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
            Loneliness, by contrast, activates the same threat-detection system as physical pain. It raises inflammatory cytokines, disrupts sleep architecture, and increases the risk of depression, dementia, and cardiovascular disease — independent of other risk factors.
          </p>
          <div
            style={{
              backgroundColor: '#e8f4ef',
              border: '1px solid #1f9660',
              borderRadius: 8,
              padding: '1.25rem 1.5rem',
            }}
          >
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#333333', marginBottom: '0.25rem' }}>
              Social Prescribing
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: 0 }}>
              Healthcare providers in the UK, Canada, and increasingly the U.S. now &quot;prescribe&quot; community activities — group exercise classes, volunteer programs, arts groups — as formally as they prescribe medication for loneliness and mild depression.
            </p>
          </div>
        </div>

        <div>
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
            The Biology of Belonging
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {biologyBoxes.map((box, i) => (
              <React.Fragment key={i}>
                <div
                  style={{
                    padding: '1rem',
                    borderRadius: 8,
                    border: '1px solid #e5e5e5',
                    width: '100%',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem', color: '#333333' }}>
                    {box.title}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.5, margin: 0, color: '#555555' }}>
                    {box.desc}
                  </p>
                </div>
                {i < biologyBoxes.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Ways to Build Meaningful Connection */}
      <h2
        style={{
          fontSize: isMobile ? '1.5rem' : '1.75rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: 600,
          color: '#333333',
          margin: '0 0 0.5rem 0',
        }}
      >
        Ways to Build Meaningful Connection
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
        The quality of connection matters more than the quantity. A few deep, reciprocal relationships provide more protection than a large network of superficial ones.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '1rem',
        }}
      >
        {connectionCards.map((card, i) => (
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
            <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', color: '#333333', margin: '0 0 0.5rem 0' }}>
              {card.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: 0 }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </HealthyLivingPageLayout>
  );
};

export default SocialConnection;
