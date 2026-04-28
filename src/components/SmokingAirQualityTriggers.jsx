import React from 'react';
import COPDContentPage from './COPDContentPage';

const SmokingAirQualityTriggers = () => (
  <COPDContentPage
    title="Smoking, Air Quality & Triggers"
    lead="Most COPD damage is caused by what we breathe in — and most of that is preventable."
    intro="From cigarette smoke to wildfire haze to workplace dust, the air around us shapes lung health more than any other factor. Knowing what to avoid — and how to protect yourself when you can't — is the foundation of COPD prevention."
    stats={[
      { stat: '7,000+', color: '#EC7D68', text: 'chemicals in cigarette smoke — at least 70 known to cause cancer or lung damage' },
      { stat: '10×', color: '#EC7D68', text: 'higher COPD risk in long-term smokers compared to people who have never smoked' },
      { stat: '20 min', color: '#3BAA66', text: 'after your last cigarette, heart rate and blood pressure begin returning to normal' },
    ]}
    section={{
      title: 'Quitting Is the Single Most Powerful Step',
      paragraphs: [
        'No medication, exercise routine, or treatment plan does more for your lungs than quitting tobacco. Within hours, your body begins repairing itself — and within years, your COPD risk drops significantly.',
        'Most successful quitters use a combination of methods: behavioral support, nicotine replacement therapy, and prescription medications. Talk to your doctor — combining strategies can double or triple your chance of quitting for good.',
      ],
      callout: 'It often takes multiple attempts — most people try 6 to 30 times before quitting successfully. Each attempt teaches you something. Every relapse is a step forward, not a failure.',
      aside: {
        title: 'Your Body After Quitting',
        items: [
          { title: 'After 48 hours', dot: '#2F9E55', body: 'Sense of taste and smell start improving as nerve endings heal.' },
          { title: 'Within 3 months', dot: '#2F9E55', body: 'Lung function increases up to 30%. Walking and exercise feel easier.' },
          { title: 'Within 1 year', dot: '#2F9E55', body: 'Risk of coronary heart disease cuts in half. Coughing and shortness of breath decrease.' },
          { title: 'After 10 years', dot: '#2F9E55', body: 'Lung cancer death rate falls to about half that of a continuing smoker.' },
        ],
      },
    }}
    bottom={{
      title: 'Air Quality & Everyday Triggers',
      intro: 'Even non-smokers can damage their lungs by breathing in irritants over time. These exposures are everywhere — but most are manageable with awareness and small adjustments.',
      cards: [
        { title: 'Secondhand Smoke', body: 'Make your home and car smoke-free. Even brief exposure can trigger inflammation in sensitive lungs.' },
        { title: 'Wildfire Smoke', body: 'Track AQI on smoky days. Stay indoors with windows closed and run a HEPA filter when AQI exceeds 100.' },
        { title: 'Workplace Dust', body: 'Use the right respirator for your industry — N95 minimum for dust, P100 for chemical vapors. Replace filters regularly.' },
        { title: 'Household Chemicals', body: 'Ventilate when cleaning. Avoid mixing bleach with ammonia. Choose fragrance-free, low-VOC products when possible.' },
        { title: 'Mold & Allergens', body: 'Fix leaks within 48 hours. Keep humidity below 50% and clean visible mold promptly to prevent lung irritation.' },
        { title: 'Radon & Indoor Air', body: "Test your home for radon — a colorless gas that's the second-leading cause of lung cancer in the U.S.", wide: true },
      ],
    }}
    next={{ path: '/learn/copd-prevention/breathing-activity-daily-management', title: 'Breathing, Activity & Daily Management' }}
  />
);

export default SmokingAirQualityTriggers;
