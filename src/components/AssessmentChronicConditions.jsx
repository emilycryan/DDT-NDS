import React, { useState, useEffect, useMemo } from 'react';
import * as motion from 'motion/react-client';

// Prediabetes Risk Test — 7 questions + conditional Q6b for women (gestational diabetes)
const FAMILY_HISTORY_QUESTION = {
  id: 'familyHistory',
  question: 'Do you have a mother, father, sister, or brother with diabetes?',
  type: 'radio',
  options: [
    { label: 'Yes', value: 'yes', score: 1 },
    { label: 'No', value: 'no', score: 0 },
  ],
};

const HIGH_BP_QUESTION = {
  id: 'highBloodPressure',
  question: 'Have you ever been diagnosed with high blood pressure?',
  type: 'radio',
  options: [
    { label: 'Yes', value: 'yes', score: 1 },
    { label: 'No', value: 'no', score: 0 },
  ],
};

const AGE_QUESTION = {
  id: 'age',
  question: 'How old are you?',
  type: 'radio',
  options: [
    { label: 'Younger than 40 years', value: 'under40', score: 0 },
    { label: '40–49 years', value: '40_49', score: 1 },
    { label: '50–59 years', value: '50_59', score: 2 },
    { label: '60 years or older', value: '60_plus', score: 3 },
  ],
};

const RACE_QUESTION = {
  id: 'race',
  question: 'What race or ethnicity best describes you?',
  subtext: 'People of certain racial and ethnic groups are more likely to develop type 2 diabetes than others.',
  type: 'radio',
  options: [
    { label: 'White / Caucasian', value: 'white', score: 0 },
    { label: 'American Indian or Alaska Native', value: 'american_indian', score: 0 },
    { label: 'Asian American', value: 'asian', score: 0 },
    { label: 'Black or African American', value: 'black', score: 0 },
    { label: 'Hispanic or Latino', value: 'hispanic', score: 0 },
    { label: 'Native Hawaiian or Other Pacific Islander', value: 'pacific_islander', score: 0 },
    { label: 'Other', value: 'other', score: 0 },
    { label: "Don't want to say", value: 'decline', score: 0 },
  ],
};

const PHYSICAL_ACTIVITY_QUESTION = {
  id: 'physicalActivity',
  question: 'Are you physically active?',
  type: 'radio',
  options: [
    { label: 'Yes', value: 'yes', score: 0 },
    { label: 'No', value: 'no', score: 1 },
  ],
};

const GENDER_QUESTION = {
  id: 'gender',
  question: 'Are you a man or a woman?',
  type: 'radio',
  options: [
    { label: 'Man', value: 'man', score: 1 },
    { label: 'Woman', value: 'woman', score: 0 },
  ],
};

const GESTATIONAL_QUESTION = {
  id: 'gestationalDiabetes',
  question: 'Have you ever been diagnosed with gestational diabetes?',
  type: 'radio',
  options: [
    { label: 'Yes', value: 'yes', score: 1 },
    { label: 'No', value: 'no', score: 0 },
  ],
};

const HEIGHT_OPTIONS = (() => {
  const opts = [];
  for (let ft = 4; ft <= 6; ft++) {
    const minIn = ft === 4 ? 10 : 0;
    const maxIn = ft === 6 ? 10 : 11;
    for (let in_ = minIn; in_ <= maxIn; in_++) {
      const totalIn = ft * 12 + in_;
      opts.push({ label: `${ft}'${in_}"`, value: String(totalIn) });
    }
  }
  return opts;
})();

const WEIGHT_OPTIONS = (() => {
  const opts = [];
  for (let w = 100; w <= 400; w += 5) {
    opts.push({ label: `${w} lbs`, value: String(w) });
  }
  return opts;
})();

function getBmiScore(heightInches, weightLbs) {
  if (!heightInches || !weightLbs) return 0;
  const bmi = (Number(weightLbs) * 703) / (Number(heightInches) * Number(heightInches));
  if (bmi < 25) return 0;
  if (bmi < 30) return 1;
  if (bmi < 40) return 2;
  return 3;
}

const optionStyle = (selected) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem 1.25rem',
  marginBottom: '0.75rem',
  cursor: 'pointer',
  border: selected ? '2px solid var(--coral)' : '2px solid transparent',
  backgroundColor: 'var(--bg-content)',
  borderRadius: 'var(--radius-lg)',
  transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s ease',
});

function AssessmentChronicConditions({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);

  const steps = useMemo(() => {
    const base = [
      FAMILY_HISTORY_QUESTION,
      HIGH_BP_QUESTION,
      AGE_QUESTION,
      RACE_QUESTION,
      PHYSICAL_ACTIVITY_QUESTION,
      GENDER_QUESTION,
    ];
    if (answers.gender === 'woman') {
      return [...base, GESTATIONAL_QUESTION, 'heightWeight'];
    }
    return [...base, 'heightWeight'];
  }, [answers.gender]);

  const totalSteps = steps.length;
  const currentStep = steps[currentIndex];
  const isHeightWeightStep = currentStep === 'heightWeight';
  const progress = ((currentIndex + (isComplete ? 1 : 0)) / totalSteps) * 100;

  const getScoreForAnswer = (question, value) => {
    if (!question || question === 'heightWeight') return 0;
    if (question.type === 'radio') {
      const opt = question.options.find((o) => o.value === value);
      return opt ? (opt.score ?? 0) : 0;
    }
    return 0;
  };

  const totalScore = useMemo(() => {
    let score = 0;
    steps.forEach((step) => {
      if (step === 'heightWeight') {
        score += getBmiScore(answers.heightInches, answers.weightLbs);
      } else if (step && step.id) {
        const val = answers[step.id];
        if (val !== undefined && val !== null) score += getScoreForAnswer(step, val);
      }
    });
    return score;
  }, [answers, steps]);

  const maxPossibleScore = useMemo(() => {
    let max = 0;
    max += 1;
    max += 1;
    max += 3;
    max += 1;
    max += 1;
    if (answers.gender === 'woman') max += 1;
    max += 3;
    return max;
  }, [answers.gender]);

  const handleNext = () => {
    if (isHeightWeightStep) {
      if (answers.heightInches && answers.weightLbs) setIsComplete(true);
      return;
    }
    const val = answers[currentStep?.id];
    const hasAnswer = val !== undefined && val !== null && val !== '';
    if (!hasAnswer) return;
    if (currentIndex < totalSteps - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const canProceed = () => {
    if (isHeightWeightStep) {
      return !!answers.heightInches && !!answers.weightLbs;
    }
    const val = answers[currentStep?.id];
    return val !== undefined && val !== null && val !== '';
  };

  if (isComplete) {
    const riskLevel = totalScore >= 5 ? 'higher' : totalScore >= 3 ? 'moderate' : 'lower';

    return (
      <main style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: '700', color: 'var(--ink)', marginBottom: '1rem', fontSize: '1.75rem' }}>
            Your results
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Based on your answers, this is a snapshot of your prediabetes risk. This is not a diagnosis—it's a starting point for conversation with your care team. A score of 5 or higher suggests increased risk. Consider sharing these results with your doctor.
          </p>
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.875rem', fontFamily: 'var(--font-body)', color: 'var(--ink-70)', marginBottom: '0.25rem' }}>
              Prediabetes risk score
            </div>
            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: '700', color: 'var(--ink)' }}>
              {totalScore} <span style={{ fontWeight: '400', color: 'var(--ink-70)' }}>/ {maxPossibleScore}</span>
            </div>
            <div
              style={{
                marginTop: '0.75rem',
                padding: '0.5rem 0.75rem',
                backgroundColor:
                  riskLevel === 'higher'
                    ? 'rgba(239, 70, 35, 0.12)'
                    : riskLevel === 'moderate'
                    ? 'rgba(245, 158, 11, 0.12)'
                    : 'rgba(15, 76, 92, 0.12)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9375rem',
                fontFamily: 'var(--font-body)',
                color: 'var(--ink)',
              }}
            >
              Risk level: <strong>{riskLevel}</strong>
            </div>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Consider sharing these results with your doctor and exploring lifestyle programs and resources that match your needs.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setCurrentIndex(0);
                setIsComplete(false);
                setAnswers({});
              }}
            >
              Retake assessment
            </button>
            {onBack && (
              <button type="button" className="btn btn-primary" onClick={onBack}>
                Back to assessments
              </button>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ height: '4px', backgroundColor: 'var(--ink-10)', borderRadius: '2px', marginBottom: '2rem', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: '100%', backgroundColor: 'var(--coral)' }}
          />
        </div>

        <p style={{ fontSize: '0.875rem', fontFamily: 'var(--font-body)', color: 'var(--ink-70)', marginBottom: '0.5rem' }}>
          Question {currentIndex + 1} of {totalSteps}
        </p>

        {isHeightWeightStep ? (
          <motion.div
            key="heightWeight"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: '700',
                color: 'var(--ink)',
                marginBottom: '0.5rem',
                fontSize: '1.5rem',
                lineHeight: 1.3,
              }}
            >
              How tall are you?
            </h2>
            <p style={{ fontSize: '0.9rem', fontFamily: 'var(--font-body)', color: 'var(--ink-70)', marginBottom: '1rem' }}>
              Please select your height and weight.
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--ink)', marginBottom: '0.5rem' }}>
                Height
              </label>
              <select
                value={answers.heightInches ?? ''}
                onChange={(e) => handleChange('heightInches', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  border: '1px solid var(--ink-10)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-content)',
                  color: 'var(--ink)',
                  marginBottom: '1rem',
                }}
              >
                <option value="">Choose height...</option>
                {HEIGHT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--ink)', marginBottom: '0.5rem' }}>
                Weight (lbs)
              </label>
              <select
                value={answers.weightLbs ?? ''}
                onChange={(e) => handleChange('weightLbs', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  border: '1px solid var(--ink-10)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-content)',
                  color: 'var(--ink)',
                }}
              >
                <option value="">Choose weight...</option>
                {WEIGHT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        ) : (
          <>
            <motion.h2
              key={currentIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: '700',
                color: 'var(--ink)',
                marginBottom: currentStep.subtext ? '0.5rem' : '1.5rem',
                fontSize: '1.5rem',
                lineHeight: 1.3,
              }}
            >
              {currentStep.question}
            </motion.h2>
            {currentStep.subtext && (
              <p style={{ fontSize: '0.9rem', fontFamily: 'var(--font-body)', color: 'var(--ink-70)', marginBottom: '1rem' }}>
                {currentStep.subtext}
              </p>
            )}

            <motion.div
              key={`options-${currentIndex}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: '2rem' }}
            >
              <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
                {currentStep.options.map((opt) => (
                  <motion.label
                    key={opt.value}
                    className="card card-clickable"
                    style={optionStyle(answers[currentStep.id] === opt.value)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <input
                      type="radio"
                      name={currentStep.id}
                      value={opt.value}
                      checked={answers[currentStep.id] === opt.value}
                      onChange={() => handleChange(currentStep.id, opt.value)}
                      style={{ marginRight: '0.75rem', accentColor: 'var(--coral)' }}
                    />
                    <span style={{ fontFamily: 'var(--font-body)', color: 'var(--ink)' }}>{opt.label}</span>
                  </motion.label>
                ))}
              </fieldset>
            </motion.div>
          </>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {currentIndex > 0 && (
              <button type="button" className="btn btn-secondary" onClick={handlePrev}>
                Back
              </button>
            )}
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!canProceed()}
            style={{ opacity: canProceed() ? 1 : 0.6 }}
          >
            {currentIndex < totalSteps - 1 ? 'Next' : 'See results'}
          </button>
        </div>

        {onBack && currentIndex === 0 && (
          <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              type="button"
              onClick={onBack}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-body)',
                color: 'var(--ink-70)',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '0.9375rem',
              }}
            >
              ← Back to assessment options
            </button>
          </p>
        )}
      </div>
    </main>
  );
}

export default AssessmentChronicConditions;
