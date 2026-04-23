import React, { useState, useEffect } from 'react';

const faqs = [
  {
    question: "What is a Lifestyle Change Intervention (LCI) program?",
    answer: "A CDC-recognized program that helps people with prediabetes prevent or delay type 2 diabetes. Participants work with a trained lifestyle coach over 12 months to make modest changes to nutrition and physical activity — typically losing 5–7% of body weight and increasing activity to 150 minutes per week.",
  },
  {
    question: "How do I know if a chronic condition might affect me?",
    answer: "The best starting point is answering a few free questions on this site — it takes under 10 minutes and covers age, weight, family history, physical activity levels, and existing health conditions. You can also speak with your primary care provider for clinical screenings like blood glucose and blood pressure tests.",
  },
  {
    question: "Is the information on this site specific to my state or location?",
    answer: "General health information applies nationally. The program finder lets you search for CDC-recognized Lifestyle Change Intervention programs by zip code to find local options near you. Virtual programs are also available for those who prefer online participation.",
  },
];

const FAQs = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '2rem 1rem' : '2rem 2rem' }}>
      <h2
        style={{
          fontSize: isMobile ? '1.75rem' : '2rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: '700',
          color: 'var(--text-primary)',
          margin: '0 0 0.5rem 0',
        }}
      >
        Frequently Asked Questions
      </h2>
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--ink-70)',
          lineHeight: 1.5,
          margin: '0 0 2rem 0',
        }}
      >
        Common questions about chronic disease prevention and this site.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}
      >
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{
              backgroundColor: 'white',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #e5e5e5',
              borderTop: '3px solid #E05A4D',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#E05A4D',
                lineHeight: 1,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#2e2e2e',
                margin: 0,
                lineHeight: 1.35,
              }}
            >
              {faq.question}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: '#555555',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
