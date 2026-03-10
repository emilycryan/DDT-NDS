import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ForPractitioners = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sectionStyles = {
    maxWidth: 1200,
    margin: '0 auto',
    padding: isMobile ? '2rem 1rem' : '3rem 2rem',
  };

  const h2Styles = {
    fontSize: isMobile ? '1.5rem' : '1.75rem',
    fontFamily: 'var(--font-serif)',
    fontWeight: '600',
    color: 'var(--ink)',
    marginBottom: '1rem',
    marginTop: '2rem',
  };

  const listItemStyles = {
    marginBottom: '1rem',
    paddingLeft: '1.5rem',
    position: 'relative',
  };

  const bulletStyles = {
    position: 'absolute',
    left: 0,
    top: '0.6rem',
    width: '0.5rem',
    height: '0.5rem',
    backgroundColor: 'var(--coral)',
    borderRadius: '50%',
  };

  const linkStyles = {
    color: 'var(--coral)',
    fontWeight: '600',
    textDecoration: 'none',
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        minHeight: '80vh',
      }}
    >
      {/* Hero Section */}
      <section style={sectionStyles}>
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
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>For Practitioners</span>
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
          For Practitioners
        </span>

        <h1
          style={{
            fontSize: isMobile ? '2.25rem' : '3rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: '600',
            color: '#333333',
            lineHeight: 1.15,
            margin: '0 0 0.5rem 0',
          }}
        >
          For Practitioners: Tools, Evidence &amp; Practice Support
        </h1>

        <h2
          style={{
            fontSize: '1.25rem',
            fontFamily: 'var(--font-body)',
            fontWeight: '700',
            color: '#333333',
            margin: '0 0 1rem 0',
          }}
        >
          Support for clinicians and public health partners
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
          This site is designed to support both people on their health journey and the practitioners who
          guide them. Below are starter resources to help you integrate this prototype into patient care,
          education, and prevention strategies.
        </p>
      </section>

      {/* Content Sections */}
      <section style={{ ...sectionStyles, paddingTop: 0 }}>
        <h2 style={{ ...h2Styles, marginTop: 0 }}>
          How This Resource Fits Into Care
        </h2>

        <h3 style={{
          fontSize: '1.25rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: '600',
          color: 'var(--ink)',
          marginBottom: '1rem',
        }}>
          Overview
        </h3>
        <p style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}>
          This prototype is built to complement standard clinical care by:
        </p>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
          <li style={listItemStyles}><span style={bulletStyles} />Reinforcing CDC-aligned guidance on chronic disease prevention</li>
          <li style={listItemStyles}><span style={bulletStyles} />Offering patient-centered tools for self-management</li>
          <li style={listItemStyles}><span style={bulletStyles} />Supporting shared decision-making conversations</li>
          <li style={listItemStyles}><span style={bulletStyles} />Directing patients to credible, action-oriented education</li>
        </ul>

        <h3 style={{
          fontSize: '1.25rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: '600',
          color: 'var(--ink)',
          marginBottom: '1rem',
        }}>
          Use Cases
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
          <li style={listItemStyles}>
            <span style={bulletStyles} />
            <strong style={{ color: 'var(--ink)' }}>Before a Visit</strong>
            {' —'} Send educational links to patients to prepare for discussions about risk factors and lifestyle changes
          </li>
          <li style={listItemStyles}>
            <span style={bulletStyles} />
            <strong style={{ color: 'var(--ink)' }}>During Counseling</strong>
            {' —'} Reference specific modules or tools to support goal-setting
          </li>
          <li style={listItemStyles}>
            <span style={bulletStyles} />
            <strong style={{ color: 'var(--ink)' }}>After a Visit</strong>
            {' —'} Share personalized resource packets or follow-up links
          </li>
        </ul>

        <h2 style={h2Styles}>
          Guidelines &amp; Evidence You Can Trust
        </h2>

        <h3 style={{
          fontSize: '1.25rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: '600',
          color: 'var(--ink)',
          marginBottom: '1rem',
        }}>
          CDC and Federal Resources
        </h3>

        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
          <li style={listItemStyles}>
            <span style={bulletStyles} />
            <strong style={{ color: 'var(--ink)' }}>Community Preventive Services Task Force</strong>
            {' —'} Evidence summaries on what works for chronic disease prevention.{' '}
            <a href="https://www.thecommunityguide.org/" target="_blank" rel="noopener noreferrer" style={linkStyles}>Learn more</a>
          </li>
          <li style={listItemStyles}>
            <span style={bulletStyles} />
            <strong style={{ color: 'var(--ink)' }}>National Diabetes Prevention Program (DPP)</strong>
            {' —'} Framework, standards, and implementation guidance.{' '}
            <a href="https://www.cdc.gov/diabetes-prevention/programs/what-is-the-national-dpp.html" target="_blank" rel="noopener noreferrer" style={linkStyles}>Learn more</a>
          </li>
        </ul>

        <h2 style={h2Styles}>
          Patient Education Support
        </h2>

        <h3 style={{
          fontSize: '1.25rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: '600',
          color: 'var(--ink)',
          marginBottom: '1rem',
        }}>
          Sample Handouts &amp; Printables
        </h3>
        <p style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}>
          Replace with links or embeds later.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
          <li style={listItemStyles}><span style={bulletStyles} />Risk factor checklist</li>
          <li style={listItemStyles}><span style={bulletStyles} />Weekly activity tracking sheet</li>
          <li style={listItemStyles}><span style={bulletStyles} />Healthy eating guide</li>
          <li style={listItemStyles}><span style={bulletStyles} />Goal-setting worksheet</li>
        </ul>

        <h2 style={h2Styles}>
          Integrating Into Practice Workflows
        </h2>

        <h3 style={{
          fontSize: '1.25rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: '600',
          color: 'var(--ink)',
          marginBottom: '1rem',
        }}>
          Tips for Workflow Integration
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
          <li style={listItemStyles}><span style={bulletStyles} />Embed direct links into patient portals</li>
          <li style={listItemStyles}><span style={bulletStyles} />Use short URLs or QR codes on print handouts</li>
          <li style={listItemStyles}><span style={bulletStyles} />Create clinic-specific resource packets</li>
        </ul>

        <h3 style={{
          fontSize: '1.25rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: '600',
          color: 'var(--ink)',
          marginBottom: '1rem',
        }}>
          EHR &amp; Referral Support
        </h3>
        <p style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '2rem',
        }}>
          Notes on building order sets or smart phrases that point to these resources.
        </p>

        <h2 style={h2Styles}>
          Feedback &amp; Improvement Loop
        </h2>

        <p style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}>
          We&apos;re building this site with input from clinicians and public health partners. Please share your suggestions, challenges, and success stories through our feedback form.
        </p>
        <button type="button" onClick={() => navigate('/for-practitioners/feedback')} className="btn btn-primary" style={{ display: 'inline-block', marginBottom: '3rem' }}>
          Share Your Feedback
        </button>
      </section>
    </div>
  );
};

export default ForPractitioners;
