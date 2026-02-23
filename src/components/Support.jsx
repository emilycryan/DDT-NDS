import React, { useState, useEffect } from 'react';

const Support = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sectionStyles = {
    maxWidth: '900px',
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
    <div style={{
      backgroundColor: 'var(--bg-page)',
      minHeight: '80vh',
    }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'var(--soft-peach)',
        padding: isMobile ? '3rem 1rem' : '4rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--ink-10)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: isMobile ? '2.25rem' : '3rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: '700',
            color: 'var(--ink)',
            lineHeight: '1.2',
            marginBottom: '1.5rem',
          }}>
            Support — Learn, Connect, and Take Action
          </h1>

          <p style={{
            fontSize: '1.125rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--text-secondary)',
            lineHeight: '1.7',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            Chronic conditions like diabetes, heart disease, and stroke don&apos;t define you — they&apos;re part of a journey. This page brings together trusted information, tools, and support to help you understand your health, take informed steps, and connect with resources that meet you where you are.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section style={sectionStyles}>
        <h2 style={{ ...h2Styles, marginTop: 0 }}>
          Your Health Journey Starts Here
        </h2>

        <h3 style={{
          fontSize: '1.25rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: '600',
          color: 'var(--ink)',
          marginBottom: '1rem',
        }}>
          Understand Chronic Conditions
        </h3>
        <p style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}>
          Learn the basics and find practical steps for prevention and management.
        </p>

        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
          <li style={listItemStyles}>
            <span style={bulletStyles} />
            <strong style={{ color: 'var(--ink)' }}>What Is Type 2 Diabetes?</strong>
            {' '}Overview, risk factors, symptoms, and how to manage your risk.{' '}
            <a href="https://www.cdc.gov/diabetes/basics/type2.html" target="_blank" rel="noopener noreferrer" style={linkStyles}>Learn more</a>
          </li>
          <li style={listItemStyles}>
            <span style={bulletStyles} />
            <strong style={{ color: 'var(--ink)' }}>Heart Disease &amp; Stroke</strong>
            {' '}Key facts about prevention, screening, and living well.{' '}
            <a href="https://www.cdc.gov/heartdisease/index.htm" target="_blank" rel="noopener noreferrer" style={linkStyles}>Heart disease</a>
            {' · '}
            <a href="https://www.cdc.gov/stroke" target="_blank" rel="noopener noreferrer" style={linkStyles}>Stroke</a>
          </li>
          <li style={listItemStyles}>
            <span style={bulletStyles} />
            <strong style={{ color: 'var(--ink)' }}>Preventing Chronic Disease</strong>
            {' '}Lifestyle steps that lower risk — from healthy eating to staying active.{' '}
            <a href="https://www.cdc.gov/chronicdisease/index.htm" target="_blank" rel="noopener noreferrer" style={linkStyles}>Learn more</a>
          </li>
        </ul>

        <h2 style={h2Styles}>
          Tools and Resources You Can Use Now
        </h2>

        <h3 style={{
          fontSize: '1.25rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: '600',
          color: 'var(--ink)',
          marginBottom: '1rem',
        }}>
          Interactive Tools &amp; Self-Assessments
        </h3>

        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
          <li style={listItemStyles}>
            <span style={bulletStyles} />
            <strong style={{ color: 'var(--ink)' }}>Diabetes Risk Test</strong>
            {' '}A quick quiz to learn your risk for type 2 diabetes.{' '}
            <a href="https://www.cdc.gov/diabetes/risk-test/index.html" target="_blank" rel="noopener noreferrer" style={linkStyles}>Take the test</a>
          </li>
          <li style={listItemStyles}>
            <span style={bulletStyles} />
            <strong style={{ color: 'var(--ink)' }}>Make a Plan: Healthy Living Tools</strong>
            {' '}Printable trackers, goal planners, and habit tips.
          </li>
        </ul>

        <h3 style={{
          fontSize: '1.25rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: '600',
          color: 'var(--ink)',
          marginBottom: '1rem',
        }}>
          Learn With Video
        </h3>
        <p style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '0.5rem',
        }}>
          CDC educational videos to help you understand prevention:
        </p>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
          <li style={listItemStyles}><span style={bulletStyles} />&quot;What Is Prediabetes?&quot;</li>
          <li style={listItemStyles}><span style={bulletStyles} />&quot;Steps to Heart-Healthy Eating&quot;</li>
          <li style={listItemStyles}><span style={bulletStyles} />&quot;Moving More: Physical Activity Basics&quot;</li>
        </ul>

        <h2 style={h2Styles}>
          Connect With Support
        </h2>

        <h3 style={{
          fontSize: '1.25rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: '600',
          color: 'var(--ink)',
          marginBottom: '1rem',
        }}>
          Find Local &amp; Online Support
        </h3>

        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
          <li style={listItemStyles}>
            <span style={bulletStyles} />
            <strong style={{ color: 'var(--ink)' }}>National Diabetes Prevention Program (DPP)</strong>
            {' '}Evidence-based lifestyle change program.{' '}
            <a href="https://www.cdc.gov/diabetes/prevention/index.html" target="_blank" rel="noopener noreferrer" style={linkStyles}>Find a program</a>
          </li>
          <li style={listItemStyles}>
            <span style={bulletStyles} />
            <strong style={{ color: 'var(--ink)' }}>Support Groups &amp; Coaching</strong>
            {' '}Community groups, peer support forums, and coaching services.
          </li>
        </ul>

        <h3 style={{
          fontSize: '1.25rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: '600',
          color: 'var(--ink)',
          marginBottom: '1rem',
        }}>
          Get Help
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
          <li style={listItemStyles}>
            <span style={bulletStyles} />
            <strong style={{ color: 'var(--ink)' }}>CDC Chronic Disease Contact Center</strong>
            {' '}Email and call-in support for questions, tools, and referrals.
          </li>
        </ul>

        <h2 style={h2Styles}>
          Tips That Fit Your Life
        </h2>

        <h3 style={{
          fontSize: '1.25rem',
          fontFamily: 'var(--font-serif)',
          fontWeight: '600',
          color: 'var(--ink)',
          marginBottom: '1rem',
        }}>
          Everyday Habits That Make a Difference
        </h3>

        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '3rem' }}>
          <li style={listItemStyles}><span style={bulletStyles} />How to read food labels</li>
          <li style={listItemStyles}><span style={bulletStyles} />Meal planning on a budget</li>
          <li style={listItemStyles}><span style={bulletStyles} />Moving more when you&apos;re busy</li>
          <li style={listItemStyles}><span style={bulletStyles} />Setting realistic goals you can stick with</li>
        </ul>
      </section>
    </div>
  );
};

export default Support;
