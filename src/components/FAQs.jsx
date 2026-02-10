import React, { useState } from 'react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDrawer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Question 1",
      answer: "Placeholder answer text for the first frequently asked question. This is where the answer content will go."
    },
    {
      question: "Question 2",
      answer: "Placeholder answer text for the second frequently asked question. This is where the answer content will go."
    },
    {
      question: "Question 3",
      answer: "Placeholder answer text for the third frequently asked question. This is where the answer content will go."
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
        marginBottom: '2rem',
        margin: '0 0 2rem 0'
      }}>
        FAQs
      </h2>

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
