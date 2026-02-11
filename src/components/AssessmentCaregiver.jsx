import React, { useState, useEffect } from 'react';
import * as motion from 'motion/react-client';

const CAREGIVER_QUESTIONS = [
  {
    id: 'conditions',
    question: 'Which chronic condition(s) does the person you care about have?',
    type: 'checkbox',
    options: [
      { label: 'Diabetes (type 1 or 2)', value: 'diabetes', score: 2 },
      { label: 'Heart disease or hypertension', value: 'heart', score: 2 },
      { label: 'COPD or asthma', value: 'respiratory', score: 2 },
      { label: 'Obesity (BMI 30+)', value: 'obesity', score: 2 },
      { label: 'Depression or anxiety', value: 'mental_health', score: 1 },
      { label: 'Other chronic condition', value: 'other', score: 1 },
    ],
  },
  {
    id: 'years_supporting',
    question: 'How long have you been supporting them with their health?',
    type: 'radio',
    options: [
      { label: 'Less than 1 year', value: 'under_1', score: 3 },
      { label: '1 to 5 years', value: '1_5', score: 2 },
      { label: '5 to 10 years', value: '5_10', score: 1 },
      { label: 'More than 10 years', value: '10_plus', score: 0 },
    ],
  },
  {
    id: 'their_medication',
    question: 'Are they currently taking medication as prescribed?',
    type: 'radio',
    options: [
      { label: 'Yes, as prescribed', value: 'yes', score: 0 },
      { label: 'Yes, but they sometimes miss doses', value: 'sometimes', score: 2 },
      { label: 'No', value: 'no', score: 1 },
    ],
  },
  {
    id: 'their_adherence',
    question: "How would you rate their adherence to their treatment plan (medication, diet, exercise)?",
    type: 'radio',
    options: [
      { label: 'Always follows it', value: 'always', score: 0 },
      { label: 'Usually follows it', value: 'usually', score: 1 },
      { label: 'Sometimes follows it', value: 'sometimes', score: 2 },
      { label: 'Rarely or never', value: 'rarely', score: 3 },
    ],
  },
  {
    id: 'your_support',
    question: 'How much support do you have in your caregiving role?',
    type: 'radio',
    options: [
      { label: 'A lot—family, friends, or respite', value: 'a_lot', score: 0 },
      { label: 'Some support', value: 'some', score: 1 },
      { label: 'A little support', value: 'a_little', score: 2 },
      { label: "No support—I'm on my own", value: 'none', score: 3 },
    ],
  },
  {
    id: 'stress',
    question: 'How often does stress (yours or theirs) get in the way of managing their health?',
    type: 'radio',
    options: [
      { label: 'Rarely or never', value: 'rarely', score: 0 },
      { label: 'Sometimes', value: 'sometimes', score: 1 },
      { label: 'Often', value: 'often', score: 2 },
      { label: 'Almost always', value: 'always', score: 3 },
    ],
  },
];

const optionStyle = (selected) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem 1.25rem',
  marginBottom: '0.75rem',
  cursor: 'pointer',
  border: selected ? '2px solid #0F4C5C' : '2px solid transparent',
  backgroundColor: 'var(--bg-content)',
  borderRadius: 'var(--radius-lg)',
  transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s ease',
});

function AssessmentCaregiver({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalQuestions = CAREGIVER_QUESTIONS.length;
  const currentQuestion = CAREGIVER_QUESTIONS[currentIndex];
  const progress = ((currentIndex + (isComplete ? 1 : 0)) / totalQuestions) * 100;

  const getScoreForAnswer = (question, value) => {
    if (question.type === 'checkbox') {
      const selected = Array.isArray(value) ? value : [];
      return question.options
        .filter((opt) => selected.includes(opt.value))
        .reduce((sum, opt) => sum + (opt.score ?? 0), 0);
    }
    const option = question.options.find((o) => o.value === value);
    return option ? (option.score ?? 0) : 0;
  };

  const totalScore = CAREGIVER_QUESTIONS.reduce((sum, q) => {
    const val = answers[q.id];
    if (val === undefined || val === null) return sum;
    return sum + getScoreForAnswer(q, val);
  }, 0);

  const maxPossibleScore = CAREGIVER_QUESTIONS.reduce((sum, q) => {
    if (q.type === 'checkbox') {
      return sum + q.options.reduce((s, o) => s + (o.score ?? 0), 0);
    }
    const maxOpt = q.options.reduce((max, o) => Math.max(max, o.score ?? 0), 0);
    return sum + maxOpt;
  }, 0);

  const handleNext = () => {
    const hasAnswer =
      answers[currentQuestion.id] !== undefined &&
      (currentQuestion.type !== 'checkbox' || (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length > 0));
    if (!hasAnswer) return;
    if (currentIndex < totalQuestions - 1) {
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

  const handleCheckboxChange = (questionId, optionValue, checked) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];
      const arr = Array.isArray(current) ? [...current] : [];
      if (checked) {
        if (!arr.includes(optionValue)) arr.push(optionValue);
      } else {
        return { ...prev, [questionId]: arr.filter((v) => v !== optionValue) };
      }
      return { ...prev, [questionId]: arr };
    });
  };

  const canProceed = () => {
    const val = answers[currentQuestion.id];
    if (currentQuestion.type === 'checkbox') {
      return Array.isArray(val) && val.length > 0;
    }
    return val !== undefined && val !== null && val !== '';
  };

  if (isComplete) {
    const scorePct = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
    const riskLevel = scorePct >= 70 ? 'higher' : scorePct >= 40 ? 'moderate' : 'lower';

    return (
      <main style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: '700', color: 'var(--ink)', marginBottom: '1rem', fontSize: '1.75rem' }}>
            Your results
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Based on your answers, we've calculated a snapshot of their situation and your caregiving context. This is not a diagnosis—it's a starting point for conversation with their care team and for support resources that can help you both.
          </p>
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.875rem', fontFamily: 'var(--font-body)', color: 'var(--ink-70)', marginBottom: '0.25rem' }}>
              Assessment score
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
            Consider sharing these results with their doctor and exploring caregiver resources and lifestyle programs that fit their needs—and yours.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-secondary" onClick={() => { setCurrentIndex(0); setIsComplete(false); setAnswers({}); }}>
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
            style={{ height: '100%', backgroundColor: '#0F4C5C' }}
          />
        </div>

        <p style={{ fontSize: '0.875rem', fontFamily: 'var(--font-body)', color: 'var(--ink-70)', marginBottom: '0.5rem' }}>
          Question {currentIndex + 1} of {totalQuestions}
        </p>

        <motion.h2
          key={currentIndex}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'var(--font-serif)', fontWeight: '700', color: 'var(--ink)', marginBottom: '1.5rem', fontSize: '1.5rem', lineHeight: 1.3 }}
        >
          {currentQuestion.question}
        </motion.h2>

        <motion.div
          key={`options-${currentIndex}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '2rem' }}
        >
          {currentQuestion.type === 'radio' && (
            <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
              {currentQuestion.options.map((opt) => (
                <motion.label
                  key={opt.value}
                  className="card card-clickable"
                  style={optionStyle(answers[currentQuestion.id] === opt.value)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={opt.value}
                    checked={answers[currentQuestion.id] === opt.value}
                    onChange={() => handleChange(currentQuestion.id, opt.value)}
                    style={{ marginRight: '0.75rem', accentColor: '#0F4C5C' }}
                  />
                  <span style={{ fontFamily: 'var(--font-body)', color: 'var(--ink)' }}>{opt.label}</span>
                </motion.label>
              ))}
            </fieldset>
          )}

          {currentQuestion.type === 'checkbox' && (
            <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
              {currentQuestion.options.map((opt) => {
                const selected = Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].includes(opt.value);
                return (
                  <motion.label
                    key={opt.value}
                    className="card card-clickable"
                    style={optionStyle(selected)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={(e) => handleCheckboxChange(currentQuestion.id, opt.value, e.target.checked)}
                      style={{ marginRight: '0.75rem', accentColor: '#0F4C5C' }}
                    />
                    <span style={{ fontFamily: 'var(--font-body)', color: 'var(--ink)' }}>{opt.label}</span>
                  </motion.label>
                );
              })}
            </fieldset>
          )}
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {currentIndex > 0 && (
              <button type="button" className="btn btn-secondary" onClick={handlePrev}>
                Back
              </button>
            )}
          </div>
          <button type="button" className="btn btn-primary" onClick={handleNext} disabled={!canProceed()} style={{ opacity: canProceed() ? 1 : 0.6 }}>
            {currentIndex < totalQuestions - 1 ? 'Next' : 'See results'}
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

export default AssessmentCaregiver;
