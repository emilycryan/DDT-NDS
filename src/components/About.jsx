import React from 'react';

const About = () => {
  return (
    <main style={{ 
      backgroundColor: 'var(--bg-secondary)',
      minHeight: '80vh'
    }}>
      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '4rem 2rem',
        textAlign: 'left'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontFamily: 'var(--font-header)',
          fontWeight: '700',
          color: 'var(--text-primary)',
          lineHeight: '1.1',
          marginBottom: '1.5rem',
          margin: '0 0 1.5rem 0',
          textAlign: 'center'
        }}>
          About This Site
        </h1>

        <div style={{
          fontSize: '1.125rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--text-secondary)',
          lineHeight: '1.7',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            This site exists to help people take charge of their health before chronic conditions take hold. Too often, conditions like diabetes, heart disease, obesity, depression, and others are only addressed once symptoms appear. But research is clear: small, sustained lifestyle changes—made early—can prevent or delay the onset of many of the most common and costly health challenges.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            Our goal is to make prevention practical. We bring together resources, tools, and stories that support everyday choices in areas like nutrition, physical activity, stress management, sleep, and social connection. Whether you are a busy parent, a caregiver, a health professional, or someone simply curious about your own risk, this site is designed to meet you where you are.
          </p>

          <h2 style={{
            fontSize: '1.5rem',
            fontFamily: 'var(--font-header)',
            fontWeight: '600',
            color: 'var(--primary-dark)',
            marginBottom: '1rem',
            marginTop: '2rem'
          }}>
            Here you'll find:
          </h2>

          <ul style={{
            listStyle: 'none',
            padding: '0',
            marginBottom: '2rem'
          }}>
            <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '0',
                top: '0.6rem',
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: 'var(--accent-yellow)',
                borderRadius: '50%'
              }}></span>
              <strong style={{ color: 'var(--primary-dark)' }}>Trusted Information:</strong> Clear, evidence-based guidance on the 12 major chronic conditions affecting Americans today.
            </li>
            <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '0',
                top: '0.6rem',
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: 'var(--accent-yellow)',
                borderRadius: '50%'
              }}></span>
              <strong style={{ color: 'var(--primary-dark)' }}>Interactive Tools:</strong> Self-assessments, videos, and checklists that help you understand risks and take the next step.
            </li>
            <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '0',
                top: '0.6rem',
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: 'var(--accent-yellow)',
                borderRadius: '50%'
              }}></span>
              <strong style={{ color: 'var(--primary-dark)' }}>Lifestyle Change Programs:</strong> Access to local and virtual resources that support lasting behavior change.
            </li>
            <li style={{ marginBottom: '1rem', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '0',
                top: '0.6rem',
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: 'var(--accent-yellow)',
                borderRadius: '50%'
              }}></span>
              <strong style={{ color: 'var(--primary-dark)' }}>Stories and Learning:</strong> Real-world examples of people making changes that work for them.
            </li>
          </ul>

          <p style={{ marginBottom: '1.5rem' }}>
            This initiative reflects a simple truth: prevention is powerful. By addressing risks before conditions appear, we can improve quality of life, reduce healthcare costs, and build healthier families and communities.
          </p>

          <p style={{
            fontSize: '1.25rem',
            fontWeight: '500',
            color: 'var(--primary-dark)',
            textAlign: 'center',
            marginTop: '2rem'
          }}>
            Every visit to this site is a step toward health that lasts.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
