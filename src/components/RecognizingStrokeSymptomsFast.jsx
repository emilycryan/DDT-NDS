import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const fastCards = [
  {
    letter: 'F',
    title: 'FACE DROOPING',
    body: 'Ask the person to smile. Does one side of the face droop, or feel numb? An uneven smile is one of the clearest early signs.',
    bg: '#3BAA66',
  },
  {
    letter: 'A',
    title: 'ARM WEAKNESS',
    body: 'Ask the person to raise both arms. Does one drift downward, or feel weak or numb? Sudden one-sided weakness is a red flag.',
    bg: '#3BAA66',
  },
  {
    letter: 'S',
    title: 'SPEECH DIFFICULTY',
    body: 'Ask the person to repeat a simple sentence. Is their speech slurred, garbled, or hard to understand? Even brief confusion counts.',
    bg: '#3BAA66',
  },
  {
    letter: 'T',
    title: 'TIME TO CALL 911',
    body: 'If you see any one sign, call 911 immediately and note the time symptoms started. Do not wait, and do not drive yourself.',
    bg: '#EC7D68',
  },
];

const otherSigns = [
  {
    title: 'Sudden vision changes',
    body: 'Blurred or double vision, or losing sight in one or both eyes — even if it clears up.',
  },
  {
    title: 'Severe headache',
    body: 'A sudden, intense headache with no known cause — often described as the worst headache of your life.',
  },
  {
    title: 'Loss of balance',
    body: 'Sudden dizziness, trouble walking, or coordination loss — especially with any other FAST sign.',
  },
  {
    title: 'Confusion or numbness',
    body: 'Sudden trouble understanding others, or numbness on one side of the body or face.',
  },
];

const checklistItems = [
  'Call 911 immediately — do not call your doctor first.',
  'Note when symptoms started, or when the person was last known to be normal.',
  "Don't give food, water, or medication — including aspirin.",
  'Stay with the person and keep them comfortable until help arrives.',
];

const RecognizingStrokeSymptomsFast = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pagePad = isMobile ? '3rem 1.25rem' : '4rem 2rem';
  const inner = {
    maxWidth: 1200,
    margin: '0 auto',
  };

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
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Recognizing Stroke Symptoms (FAST)</span>
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
            Recognizing Stroke Symptoms
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 700,
              color: '#333333',
              lineHeight: 1.5,
              maxWidth: 1050,
              margin: '0 0 0.75rem',
            }}
          >
            Stroke is a brain attack. Every minute without treatment costs 1.9 million brain cells — recognize it fast and call 911.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: '#555555',
              lineHeight: 1.65,
              maxWidth: 620,
              margin: 0,
            }}
          >
            Most people survive a first stroke, but the difference between full recovery and lifelong disability often comes down to how quickly someone recognized the signs and got to the hospital. Learn the F.A.S.T. test — it takes ten seconds to remember and could save a life.
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
            { stat: '1.9M', color: '#EC7D68', text: 'brain cells lost every minute a stroke goes untreated — time is brain' },
            { stat: '80%', color: '#3BAA66', text: 'of strokes are preventable — recognizing risk and acting on early signs is the first defense' },
            { stat: '3 hrs', color: '#ffffff', text: 'treatment window for the most effective clot-busting drugs — sooner is better' },
          ].map((item, index) => (
            <div
              key={item.stat}
              style={{
                borderLeft: !isMobile && index > 0 ? '1px solid rgba(255,255,255,0.18)' : 'none',
                paddingLeft: !isMobile && index > 0 ? '2rem' : 0,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: isMobile ? '2.5rem' : '3rem',
                  fontWeight: 400,
                  color: item.color,
                  lineHeight: 1,
                  marginBottom: '0.75rem',
                }}
              >
                {item.stat}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.55, margin: 0, maxWidth: 300 }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: pagePad }}>
        <div style={inner}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', color: '#3BAA66', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            The F.A.S.T. Test
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: 400,
              color: '#1f1f1f',
              lineHeight: 1.15,
              margin: '0 0 0.75rem',
            }}
          >
            Four signs. Ten seconds. One call.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#4d4d4d', lineHeight: 1.65, maxWidth: 690, margin: '0 0 2rem' }}>
            F.A.S.T. is the most widely used way to recognize a stroke. If you see any one of these signs — even briefly — treat it as an emergency.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: '1rem',
            }}
          >
            {fastCards.map((card) => (
              <article
                key={card.letter}
                style={{
                  backgroundColor: card.bg,
                  borderRadius: 'var(--radius-sm)',
                  padding: isMobile ? '1.5rem' : '1.75rem',
                  minHeight: isMobile ? 250 : 275,
                  color: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '4.75rem', fontWeight: 400, lineHeight: 0.95, marginBottom: '1.5rem' }}>
                  {card.letter}
                </div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.3, margin: '0 0 1rem', textTransform: 'uppercase' }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, margin: 0 }}>
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#F3F2EF', padding: pagePad }}>
        <div style={inner}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', color: '#3BAA66', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Beyond F.A.S.T.
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: 400,
              color: '#1f1f1f',
              lineHeight: 1.15,
              margin: '0 0 0.75rem',
            }}
          >
            Other sudden signs of stroke
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#4d4d4d', lineHeight: 1.65, maxWidth: 690, margin: '0 0 2rem' }}>
            Strokes don&apos;t always start with the four classic signs. The word that matters most is sudden — symptoms appear out of nowhere, often in seconds.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: '1.25rem',
            }}
          >
            {otherSigns.map((sign) => (
              <article
                key={sign.title}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #dedbd6',
                  borderTop: '3px solid #3BAA66',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.35rem',
                  minHeight: 128,
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 800, color: '#1f1f1f', margin: '0 0 0.65rem' }}>
                  {sign.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#5d5d5d', lineHeight: 1.55, margin: 0 }}>
                  {sign.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: pagePad }}>
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
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', color: '#EC7D68', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              If you suspect a stroke
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: isMobile ? '2rem' : '2.5rem',
                fontWeight: 400,
                color: '#1f1f1f',
                lineHeight: 1.15,
                margin: '0 0 1.25rem',
              }}
            >
              Call 911. Don&apos;t drive.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#4d4d4d', lineHeight: 1.65, margin: '0 0 1rem' }}>
              Paramedics can begin treatment in the ambulance, alert the hospital, and route to a certified stroke center. Driving someone yourself loses critical minutes — and risks a second emergency on the road.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#4d4d4d', lineHeight: 1.65, margin: 0 }}>
              Note the time the symptoms started, even approximately. The treatment options available to doctors depend heavily on this number.
            </p>
          </div>

          <aside
            style={{
              backgroundColor: '#FBE7DF',
              border: '1px solid rgba(236,125,104,0.35)',
              borderLeft: '4px solid #EC7D68',
              borderRadius: 'var(--radius-sm)',
              padding: '1.5rem',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', color: '#EC7D68', margin: '0 0 1rem', textTransform: 'uppercase' }}>
              Emergency Checklist
            </h3>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.9rem' }}>
              {checklistItems.map((item, index) => (
                <li key={item} style={{ display: 'grid', gridTemplateColumns: '22px 1fr', gap: '0.75rem', alignItems: 'start' }}>
                  <span style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#EC7D68', color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 800, lineHeight: 1 }}>
                    {index + 1}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#1f1f1f', lineHeight: 1.4 }}>
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section style={{ padding: isMobile ? '0 1.25rem 3rem' : '0 2rem 4rem' }}>
        <div style={{ ...inner, display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #e5e5e5', paddingTop: '2rem' }}>
          <Link
            to="/learn/stroke-prevention/risk-factors-prevention"
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
            Stroke Risk Factors & Prevention
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default RecognizingStrokeSymptomsFast;
