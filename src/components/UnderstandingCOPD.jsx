import React from 'react';
import COPDContentPage from './COPDContentPage';

const UnderstandingCOPD = () => (
  <COPDContentPage
    title="Understanding COPD"
    lead="More than 16 million Americans live with COPD — and many cases are preventable."
    intro="Chronic Obstructive Pulmonary Disease (COPD) is a progressive lung disease that makes breathing harder over time. The good news: understanding how COPD develops gives you the power to protect your lungs and slow or prevent its progression."
    stats={[
      { stat: '16M', text: 'Americans currently live with COPD — many more remain undiagnosed' },
      { stat: '3rd', text: 'leading cause of death by chronic disease in the United States' },
      { stat: '85%', color: '#EC7D68', text: 'of COPD cases are linked to preventable causes — primarily smoking' },
    ]}
    section={{
      title: 'What Is COPD?',
      paragraphs: [
        'COPD is an umbrella term for chronic lung diseases — most commonly emphysema and chronic bronchitis — that block airflow and make breathing difficult. It develops slowly, often over decades, and damage to the airways is largely irreversible.',
        "COPD doesn't appear overnight. By the time symptoms become noticeable, significant lung damage has often already occurred. That's why prevention and early action matter — every breath you protect today preserves capacity for tomorrow.",
      ],
      callout: 'Early signs are easy to dismiss — a lingering cough, shortness of breath climbing stairs, or wheezing during exercise. Talk to your doctor if symptoms last more than a few weeks.',
      aside: {
        title: 'Common Forms of COPD',
        items: [
          { title: 'Emphysema', body: "Damage to the air sacs (alveoli) reduces the lungs' ability to transfer oxygen into the bloodstream." },
          { title: 'Chronic Bronchitis', body: 'Long-term inflammation of airway linings produces excess mucus and persistent cough.' },
          { title: 'Refractory Asthma', body: 'Severe, non-reversible asthma that no longer responds to standard medications, often overlapping with COPD.' },
        ],
      },
    }}
    bottom={{
      title: 'Recognize the Warning Signs',
      intro: 'COPD develops slowly. The earlier you act on these symptoms, the more lung function you can preserve.',
      cards: [
        { title: 'Persistent Cough', body: 'A cough that lingers for weeks or months — often called a "smoker\'s cough" — that may bring up mucus.' },
        { title: 'Shortness of Breath', body: 'Feeling winded during everyday activities like walking, climbing stairs, or carrying groceries.' },
        { title: 'Wheezing', body: 'A whistling or squeaking sound when breathing, especially during exhalation or activity.' },
        { title: 'Chest Tightness', body: 'A feeling of pressure or constriction in the chest, especially after activity or during cold weather.' },
        { title: 'Frequent Infections', body: 'Recurring colds, flu, or respiratory infections that take longer than usual to clear up.' },
      ],
    }}
    next={{ path: '/learn/copd-prevention/risk-factors-lung-health', title: 'Risk Factors & Lung Health' }}
  />
);

export default UnderstandingCOPD;
