import React, { useState } from 'react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDrawer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is a Lifestyle Change Intervention (LCI) program?",
      answer: "A Lifestyle Change Intervention program is a CDC-recognized program designed to help people with prediabetes prevent or delay type 2 diabetes. Participants work with a trained lifestyle coach over 12 months to make modest changes to diet and physical activity — typically losing 5-7% of body weight and increasing activity to 150 minutes per week."
    },
    {
      question: "How do I know if I'm at risk for a chronic condition?",
      answer: "The best starting point is our free risk assessment, which takes under 10 minutes and covers key risk factors including age, weight, family history, physical activity levels, and existing health conditions. You can also speak with your primary care provider for clinical screenings like blood glucose and blood pressure tests."
    },
    {
      question: "Is the information on this site specific to my state or location?",
      answer: "General health information on this site applies nationally. However, the program finder allows you to search for CDC-recognized Lifestyle Change Intervention programs by zip code, making it easy to find local options near you. Virtual programs are also available for those who prefer online participation."
    }
  ];

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 15px'
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        fontFamily: 'var(--font-serif)',
        fontWeight: '700',
        color: 'var(--text-primary)',
        margin: '0 0 0.5rem 0'
      }}>
        Frequently Asked Questions
      </h2>
      <p style={{
        fontSize: '1rem',
        fontFamily: 'var(--font-body)',
        color: 'var(--ink-70)',
        lineHeight: 1.5,
        margin: '0 0 2rem 0'
      }}>
        Common questions about chronic disease prevention and this site.
      </p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              border: openIndex === index ? `2px solid var(--green-primary)` : '1px solid var(--green-light-bg)',
              borderRadius: '0.5rem',
              backgroundColor: openIndex === index ? 'var(--green-light-bg)' : 'var(--bg-content)',
              overflow: 'hidden'
            }}
          >
            {/* Drawer Header */}
            <button
              onClick={() => toggleDrawer(index)}
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'left'
              }}
            >
              <h3 style={{
                fontSize: '1.25rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: '600',
                color: 'var(--text-primary)',
                margin: 0
              }}>
                {faq.question}
              </h3>
              {openIndex === index ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              )}
            </button>

            {/* Drawer Content */}
            {openIndex === index && (
              <div style={{
                padding: '0 1.5rem 1.5rem 1.5rem',
                fontSize: '1rem',
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                lineHeight: '1.6'
              }}>
                <p style={{ margin: '1rem 0 0 0' }}>
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
