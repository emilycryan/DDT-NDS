import React, { useState, useEffect } from 'react';
import * as motion from 'motion/react-client';

const JUST_CURIOUS_QUESTIONS = [
  {
    id: 'end_of_day',
    question: 'By the end of a typical day, how do you usually feel?',
    type: 'radio',
    theme: 'energy',
    options: [
      { label: 'Still have some gas in the tank', value: 'good', score: 0 },
      { label: 'Okay—ready to wind down', value: 'okay', score: 1 },
      { label: 'Really depends on the day', value: 'depends', score: 2 },
      { label: 'Pretty wiped', value: 'wiped', score: 3 },
    ],
  },
  {
    id: 'morning',
    question: 'When you wake up on a typical morning, how do you usually feel?',
    type: 'radio',
    theme: 'sleep',
    options: [
      { label: 'Rested and ready', value: 'rested', score: 0 },
      { label: 'Mostly okay', value: 'okay', score: 1 },
      { label: 'Could use more sleep', value: 'could_use_more', score: 2 },
      { label: "I don't sleep well most nights", value: 'poor', score: 3 },
    ],
  },
  {
    id: 'eating',
    question: 'When you think about what you eat in a typical week, what comes to mind?',
    type: 'radio',
    theme: 'eating',
    options: [
      { label: "I try to keep it balanced", value: 'balanced', score: 0 },
      { label: "I don't really think about it", value: 'dont_think', score: 2 },
      { label: "I know I could do better", value: 'could_do_better', score: 2 },
      { label: "I'm not sure where to start", value: 'not_sure', score: 3 },
    ],
  },
  {
    id: 'movement',
    question: 'How does movement or activity fit into your week?',
    type: 'radio',
    theme: 'movement',
    options: [
      { label: "It's a regular part of my routine", value: 'regular', score: 0 },
      { label: 'I fit it in when I can', value: 'when_can', score: 1 },
      { label: "I know I could do more", value: 'could_do_more', score: 2 },
      { label: "I've never been one to exercise much", value: 'rarely', score: 3 },
    ],
  },
  {
    id: 'stress',
    question: 'How would you describe your stress level most of the time?',
    type: 'radio',
    theme: 'stress',
    options: [
      { label: 'Manageable', value: 'manageable', score: 0 },
      { label: 'Some days are tough', value: 'some_days', score: 1 },
      { label: 'Pretty high', value: 'high', score: 2 },
      { label: "I try not to think about it", value: 'avoid', score: 3 },
    ],
  },
  {
    id: 'family',
    question: 'Has anyone in your family had heart disease, diabetes, or similar conditions?',
    type: 'radio',
    theme: 'family',
    options: [
      { label: 'No', value: 'no', score: 0 },
      { label: 'Not that I know of', value: 'dont_know', score: 1 },
      { label: 'Yes, a few relatives', value: 'few', score: 2 },
      { label: 'Yes, quite a few', value: 'many', score: 3 },
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

const EXPLORE_SUGGESTIONS = {
  energy: {
    title: 'Daily energy',
    text: 'Small shifts in when you eat, move, or rest can sometimes make a big difference in how you feel by evening. No pressure—just something to play with.',
  },
  sleep: {
    title: 'Sleep and rest',
    text: "Lots of people find that a few tweaks to their wind-down routine or schedule help. It might be worth a look when you're ready.",
  },
  eating: {
    title: 'Eating in a typical week',
    text: "Understanding how food fits into your life—without dieting or labels—can be a useful first step. There's no single \"right\" way.",
  },
  movement: {
    title: 'Movement that fits your life',
    text: 'Activity doesn\'t have to mean the gym. Finding ways to move that feel doable and even enjoyable is what matters.',
  },
  stress: {
    title: 'Stress and how you cope',
    text: "Stress affects everyone differently. Sometimes naming it and trying one or two small strategies can help—when you're ready.",
  },
  family: {
    title: 'Family history and you',
    text: "Knowing what runs in your family can help you and your doctor decide what to keep an eye on. It's just information, not a verdict.",
  },
};

const defaultSuggestions = [
  { title: 'What prevention actually looks like', text: 'A lot of "prevention" is small, everyday choices—sleep, movement, how we eat, stress. No one has to do it all at once.' },
  { title: "Resources when you're ready", text: "When you want to go deeper, we have articles, tools, and programs. Take what's useful and leave the rest." },
];

function AssessmentJustCurious({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalQuestions = JUST_CURIOUS_QUESTIONS.length;
  const currentQuestion = JUST_CURIOUS_QUESTIONS[currentIndex];
  const progress = ((currentIndex + (isComplete ? 1 : 0)) / totalQuestions) * 100;

  const getScoreForAnswer = (question, value) => {
    const option = question.options.find((o) => o.value === value);
    return option ? (option.score ?? 0) : 0;
  };

  const themesToHighlight = () => {
    const out = [];
    JUST_CURIOUS_QUESTIONS.forEach((q) => {
      const val = answers[q.id];
      if (val === undefined || val === null) return;
      const s = getScoreForAnswer(q, val);
      if (s >= 2 && q.theme) out.push(q.theme);
    });
    return out;
  };

  const handleNext = () => {
    const hasAnswer = answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== null && answers[currentQuestion.id] !== '';
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

  const canProceed = () => {
    const val = answers[currentQuestion.id];
    return val !== undefined && val !== null && val !== '';
  };

  if (isComplete) {
    const highlighted = themesToHighlight();
    const suggestions = highlighted.length > 0
      ? highlighted.slice(0, 3).map((t) => EXPLORE_SUGGESTIONS[t]).filter(Boolean)
      : defaultSuggestions;

    return (
      <main style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: '700', color: 'var(--ink)', marginBottom: '1rem', fontSize: '1.75rem' }}>
            A few things you might find interesting
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Based on what you shared, here are some areas that might be worth exploring—when and if you feel like it. There's no test to pass and no judgment. Just ideas.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {suggestions.map((s, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: '1.25rem',
                  borderLeft: '4px solid #0F4C5C',
                }}
              >
                <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', fontWeight: '600', color: 'var(--ink)', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.9375rem', fontFamily: 'var(--font-body)', color: 'var(--ink-70)', lineHeight: 1.5, margin: 0 }}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-70)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
            You can explore our resources anytime—or come back when you're ready. Either way, you're in the right place.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-secondary" onClick={() => { setCurrentIndex(0); setIsComplete(false); setAnswers({}); }}>
              Answer again
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
            {currentIndex < totalQuestions - 1 ? 'Next' : 'See what might be useful'}
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

export default AssessmentJustCurious;
