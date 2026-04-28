import React from 'react';
import COPDContentPage from './COPDContentPage';

const BreathingActivityDailyManagement = () => (
  <COPDContentPage
    title="Breathing, Activity & Daily Management"
    lead="Lungs respond to use. The right movement and breathing habits build resilience for life."
    intro="Whether you're protecting healthy lungs or living with COPD, daily habits matter. Breathing techniques, regular movement, and small adjustments to your routine all reinforce respiratory strength and reduce flare-ups."
    stats={[
      { stat: '150 min', color: '#3BAA66', text: 'of moderate weekly activity recommended for adult lung and heart health' },
      { stat: '30%', color: '#3BAA66', text: 'improvement in exercise capacity reported by COPD patients in pulmonary rehab' },
      { stat: '2 in 3', color: '#3BAA66', text: 'flare-ups are preventable with vaccines, action plans, and consistent monitoring' },
    ]}
    section={{
      title: 'Breathe Smarter, Not Harder',
      paragraphs: [
        'Most adults breathe shallowly using only the upper chest. Two simple techniques — pursed-lip and diaphragmatic breathing — train your lungs to move more air with less effort. Practiced daily, they help calm shortness of breath and improve oxygen delivery during activity.',
        "Pulmonary rehabilitation programs combine breathing techniques with supervised exercise and education. They're proven to reduce hospitalizations and significantly improve quality of life — and they're covered by Medicare and most insurance plans.",
      ],
      callout: "Practice when you're calm, not just when you're short of breath. Building the habit during everyday moments makes it second nature when you really need it.",
      aside: {
        title: 'Two Techniques to Practice',
        items: [
          { title: 'Pursed-Lip Breathing', meta: '5 min', body: "Inhale slowly through the nose for 2 counts. Pucker your lips like you're cooling soup, then exhale gently for 4 counts.", note: 'Best when feeling winded or anxious.' },
          { title: 'Diaphragmatic Breathing', meta: '5–10 min', color: '#EC7D68', highlight: true, bg: '#FFF7F7', body: 'Lie down with one hand on your chest, one on your belly. Breathe so only the belly hand rises. Strengthens the diaphragm.', note: 'Practice 1–2 times daily.' },
          { title: 'Pulmonary Rehab', meta: '6–12 weeks', body: 'A structured program of supervised exercise, breathing training, and education led by respiratory therapists.', note: 'Ask your doctor for a referral.' },
        ],
      },
    }}
    bottom={{
      title: 'Daily Habits That Protect Your Lungs',
      intro: 'Small, consistent choices add up. These evidence-based habits keep airways clear, reduce flare-up risk, and help you stay active.',
      cards: [
        { title: 'Move Most Days', body: 'Aim for 30 minutes of brisk walking, swimming, or cycling. Build slowly — even 5–10 minutes is a meaningful start.' },
        { title: 'Stay Up to Date on Vaccines', body: 'Annual flu shot, COVID-19 boosters, and pneumococcal vaccines prevent the infections most likely to trigger a flare-up.' },
        { title: 'Eat for Energy', body: 'Smaller, more frequent meals reduce pressure on the diaphragm. Lean protein supports muscle strength used in breathing.' },
        { title: 'Hydrate & Clear Airways', body: 'Aim for 6–8 cups of water a day. Hydration thins mucus, making it easier for the lungs to clear naturally.' },
        { title: 'Track Symptoms Daily', body: 'Note breath, cough, mucus, and energy. A simple pattern helps you and your doctor catch flare-ups early.' },
        { title: 'Have an Action Plan', body: 'Work with your provider on a written plan that defines what to do at the first sign of worsening symptoms.', wide: true },
      ],
    }}
    next={{ path: '/learn/copd-prevention/understanding-copd', title: 'Understanding COPD' }}
  />
);

export default BreathingActivityDailyManagement;
