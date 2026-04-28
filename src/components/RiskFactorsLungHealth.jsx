import React from 'react';
import COPDContentPage from './COPDContentPage';

const RiskFactorsLungHealth = () => (
  <COPDContentPage
    title="Risk Factors & Lung Health"
    lead="Knowing your risk is the first step toward protecting your lungs."
    intro="Some COPD risk factors are within your control — others aren't. Understanding both helps you focus your prevention efforts where they'll have the greatest impact and have an honest conversation with your doctor."
    stats={[
      { stat: '75%', color: '#EC7D68', text: 'of COPD diagnoses are linked to current or former tobacco use' },
      { stat: '1 in 4', text: 'people with COPD never smoked — environmental and genetic factors matter too' },
      { stat: '40+', color: '#EC7D68', text: 'most COPD diagnoses occur after age 40 — risk grows steadily with exposure' },
    ]}
    section={{
      title: 'How Healthy Lungs Work',
      paragraphs: [
        'Your lungs contain about 480 million tiny air sacs called alveoli. Each one is wrapped in capillaries that exchange oxygen for carbon dioxide every time you breathe — roughly 20,000 times a day.',
        'When lungs are healthy, the airways are open and elastic. With COPD, those airways become inflamed, narrowed, and lined with mucus — and the alveoli lose their stretch. Less air gets in. Less oxygen reaches the blood. Daily activities take more effort.',
      ],
      callout: 'Lung function peaks in your mid-20s, then naturally declines about 1% per year. Smoking and air pollution can triple that decline — but quitting at any age slows the loss.',
      aside: {
        title: 'Lung Function Over Time',
        items: [
          { title: 'Healthy Adult', dot: '#2F9E55', rows: [{ label: 'Annual decline', value: '~1% per year' }, { label: 'FEV1', value: '≥ 80% predicted' }] },
          { title: 'Active Smoker', dot: '#EC7D68', color: '#EC7D68', rows: [{ label: 'Annual decline', value: '2–3× faster' }, { label: 'FEV1', value: '50–79% predicted' }] },
          { title: 'Advanced COPD', dot: '#8B1A1A', color: '#5B3A35', rows: [{ label: 'Annual decline', value: 'Variable' }, { label: 'FEV1', value: '< 50% predicted' }] },
        ],
      },
    }}
    bottom={{
      title: 'What Increases Your Risk?',
      intro: 'COPD is rarely caused by a single factor. Most cases reflect years of cumulative exposure combined with personal vulnerability.',
      cards: [
        { title: 'Tobacco Smoke', body: 'Cigarettes, cigars, pipes — and long-term secondhand smoke exposure — are the leading risk factor.' },
        { title: 'Workplace Exposure', body: 'Dust, chemical fumes, vapors, and silica common in mining, construction, agriculture, and manufacturing.' },
        { title: 'Air Pollution', body: 'Outdoor pollution, indoor smoke from biomass fuel, and wildfire smoke all contribute to lung damage.' },
        { title: 'Age & Genetics', body: 'Risk rises after 40. Alpha-1 antitrypsin deficiency — a genetic disorder — accounts for a small share of cases.' },
        { title: 'Childhood Asthma', body: 'A history of asthma — especially uncontrolled or severe — raises long-term risk of developing COPD.' },
        { title: 'Respiratory Infections', body: 'Frequent or severe lung infections in childhood can permanently affect lung development and function.', wide: true },
      ],
    }}
    next={{ path: '/learn/copd-prevention/smoking-air-quality-triggers', title: 'Smoking, Air Quality & Triggers' }}
  />
);

export default RiskFactorsLungHealth;
