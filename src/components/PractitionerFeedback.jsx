import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LIKERT_OPTIONS = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'];

const PractitionerFeedback = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    primaryRole: '',
    practiceSetting: '',
    patientPopulation: [],
    usefulness: '',
    featuresValuable: [],
    guidelineAlignment: '',
    guidelineConcerns: '',
    whenUse: [],
    integrateEase: '',
    easierToUse: '',
    understandEasily: '',
    feelMotivated: '',
    trustIt: '',
    notServedWell: '',
    whatMissing: '',
    prioritizeNext: '',
    futureTesting: '',
    futureTestingEmail: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const update = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const toggleMulti = (key, value) => {
    setFormData(prev => {
      const arr = prev[key] || [];
      const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
      if (key === 'featuresValuable' && next.length > 3) return prev;
      return { ...prev, [key]: next };
    });
  };

  const sectionStyles = {
    maxWidth: '720px',
    margin: '0 auto',
    padding: isMobile ? '1.5rem 1rem' : '2rem',
  };

  const fieldsetStyles = {
    border: '1px solid var(--ink-10)',
    borderRadius: 'var(--radius-sm)',
    padding: '1.5rem',
    marginBottom: '2rem',
    backgroundColor: 'var(--bg-page)',
  };

  const labelStyles = {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontWeight: '600',
    color: 'var(--ink)',
    marginBottom: '0.5rem',
  };

  const fieldsetLabelStyles = {
    ...labelStyles,
    marginBottom: '1rem',
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
  };

  const inputTextStyles = {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    fontFamily: 'var(--font-body)',
    border: '1px solid var(--ink-10)',
    borderRadius: 'var(--radius-sm)',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST to API when backend is ready
    console.log('Feedback submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main style={{ backgroundColor: 'var(--bg-page)', minHeight: '80vh' }}>
        <section style={{ ...sectionStyles, padding: '4rem 2rem', textAlign: 'center' }}>
          <h1 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: '700',
            color: 'var(--ink)',
            marginBottom: '1rem',
          }}>
            Thank You
          </h1>
          <p style={{
            fontSize: '1.125rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            maxWidth: '500px',
            margin: '0 auto 2rem auto',
          }}>
            Your feedback helps us improve this resource for clinicians and patients. We appreciate you taking the time to share your thoughts.
          </p>
          <button
            type="button"
            onClick={() => navigate('/for-practitioners')}
            className="btn btn-primary"
          >
            Back to For Practitioners
          </button>
        </section>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: 'var(--bg-page)', minHeight: '80vh', paddingBottom: '3rem' }}>
      {/* Hero */}
      <section style={{
        backgroundColor: 'var(--soft-peach)',
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--ink-10)',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: '700',
            color: 'var(--ink)',
            marginBottom: '0.75rem',
          }}>
            Practitioner Feedback
          </h1>
          <p style={{
            fontSize: '1rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
          }}>
            Help us improve this prototype. Your responses inform how we shape the tool for clinical use.
          </p>
          <button
            type="button"
            onClick={() => navigate('/for-practitioners')}
            className="btn btn-secondary"
            style={{ marginTop: '1rem', fontSize: '0.9rem' }}
          >
            ← Back to For Practitioners
          </button>
        </div>
      </section>

      <form onSubmit={handleSubmit}>
        {/* Section 1: About You */}
        <section style={sectionStyles}>
          <h2 style={{
            fontSize: '1.5rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: '600',
            color: 'var(--ink)',
            marginBottom: '0.5rem',
          }}>
            Section 1: About You
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Context for interpretation. Keep it short.
          </p>

          <fieldset style={{ ...fieldsetStyles, paddingTop: '1.5rem' }}>
            <div style={fieldsetLabelStyles}>Primary role</div>
            {['Physician (Primary Care)', 'Nurse / NP / PA', 'Dietitian', 'Health Educator', 'Public Health Professional', 'Other'].map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="primaryRole" value={opt} checked={formData.primaryRole === opt} onChange={() => update('primaryRole', opt)} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontFamily: 'var(--font-body)' }}>{opt}</span>
              </label>
            ))}
          </fieldset>

          <fieldset style={{ ...fieldsetStyles, paddingTop: '1.5rem' }}>
            <div style={fieldsetLabelStyles}>Practice setting</div>
            {['Private practice', 'FQHC', 'Hospital system', 'Public health department', 'Community-based organization', 'Other'].map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="practiceSetting" value={opt} checked={formData.practiceSetting === opt} onChange={() => update('practiceSetting', opt)} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontFamily: 'var(--font-body)' }}>{opt}</span>
              </label>
            ))}
          </fieldset>

          <fieldset style={{ ...fieldsetStyles, paddingTop: '1.5rem' }}>
            <div style={fieldsetLabelStyles}>Patient population focus (optional, select all that apply)</div>
            {['Diabetes', 'Prediabetes', 'Cardiovascular risk', 'General prevention', 'High-risk underserved populations'].map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={(formData.patientPopulation || []).includes(opt)} onChange={() => toggleMulti('patientPopulation', opt)} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontFamily: 'var(--font-body)' }}>{opt}</span>
              </label>
            ))}
          </fieldset>
        </section>

        {/* Section 2: Clinical Usefulness */}
        <section style={sectionStyles}>
          <h2 style={{
            fontSize: '1.5rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: '600',
            color: 'var(--ink)',
            marginBottom: '0.5rem',
          }}>
            Section 2: Clinical Usefulness
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Whether the tool supports care.
          </p>

          <fieldset style={{ ...fieldsetStyles, paddingTop: '1.5rem' }}>
            <div style={fieldsetLabelStyles}>1. How useful would this resource be in supporting patient education?</div>
            {['Very useful', 'Somewhat useful', 'Neutral', 'Not useful'].map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="usefulness" value={opt} checked={formData.usefulness === opt} onChange={() => update('usefulness', opt)} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontFamily: 'var(--font-body)' }}>{opt}</span>
              </label>
            ))}
          </fieldset>

          <fieldset style={{ ...fieldsetStyles, paddingTop: '1.5rem' }}>
            <div style={fieldsetLabelStyles}>2. Which features are most valuable? (Select up to 3)</div>
            {['Risk assessment tools', 'Patient-friendly education content', 'Lifestyle guidance', 'Referral pathways (e.g., DPP)', 'Printable materials', 'Visual explanations', 'Other'].map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={(formData.featuresValuable || []).includes(opt)} onChange={() => toggleMulti('featuresValuable', opt)} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontFamily: 'var(--font-body)' }}>{opt}</span>
              </label>
            ))}
            {(formData.featuresValuable || []).length >= 3 && (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Maximum 3 selected.</p>
            )}
          </fieldset>

          <fieldset style={{ ...fieldsetStyles, paddingTop: '1.5rem' }}>
            <div style={fieldsetLabelStyles}>3. Does the content align with current CDC or clinical guidelines?</div>
            {['Fully aligned', 'Mostly aligned', 'Some concerns', 'Significant concerns'].map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="guidelineAlignment" value={opt} checked={formData.guidelineAlignment === opt} onChange={() => update('guidelineAlignment', opt)} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontFamily: 'var(--font-body)' }}>{opt}</span>
              </label>
            ))}
            {(formData.guidelineAlignment === 'Some concerns' || formData.guidelineAlignment === 'Significant concerns') && (
              <div style={{ marginTop: '1rem' }}>
                <label style={labelStyles}>If concerns, please describe:</label>
                <textarea name="guidelineConcerns" value={formData.guidelineConcerns} onChange={e => update('guidelineConcerns', e.target.value)} rows={3} style={{ ...inputTextStyles, resize: 'vertical' }} placeholder="Describe your concerns..." />
              </div>
            )}
          </fieldset>
        </section>

        {/* Section 3: Workflow Fit */}
        <section style={sectionStyles}>
          <h2 style={{
            fontSize: '1.5rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: '600',
            color: 'var(--ink)',
            marginBottom: '0.5rem',
          }}>
            Section 3: Workflow Fit
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Integration into your practice.
          </p>

          <fieldset style={{ ...fieldsetStyles, paddingTop: '1.5rem' }}>
            <div style={fieldsetLabelStyles}>4. When would you most likely use this resource?</div>
            {['Before visits (prep material)', 'During visits (shared screen)', 'After visits (follow-up link)', 'As part of group education', 'I would not use it in workflow'].map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={(formData.whenUse || []).includes(opt)} onChange={() => toggleMulti('whenUse', opt)} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontFamily: 'var(--font-body)' }}>{opt}</span>
              </label>
            ))}
          </fieldset>

          <fieldset style={{ ...fieldsetStyles, paddingTop: '1.5rem' }}>
            <label style={labelStyles}>5. How easy would it be to integrate this into your practice?</label>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Scale 1 (Very difficult) → 5 (Very easy)</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[1, 2, 3, 4, 5].map(n => (
                <label key={n} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="integrateEase" value={String(n)} checked={formData.integrateEase === String(n)} onChange={() => update('integrateEase', String(n))} style={{ marginRight: '0.25rem' }} />
                  <span style={{ fontFamily: 'var(--font-body)' }}>{n}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset style={{ ...fieldsetStyles, paddingTop: '1.5rem' }}>
            <label style={labelStyles}>6. What would make this easier to use in your setting?</label>
            <textarea name="easierToUse" value={formData.easierToUse} onChange={e => update('easierToUse', e.target.value)} rows={4} style={{ ...inputTextStyles, resize: 'vertical' }} placeholder="e.g., QR codes, printable summaries, EHR integration, smart phrases..." />
          </fieldset>
        </section>

        {/* Section 4: Patient Impact */}
        <section style={sectionStyles}>
          <h2 style={{
            fontSize: '1.5rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: '600',
            color: 'var(--ink)',
            marginBottom: '0.5rem',
          }}>
            Section 4: Patient Impact
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Helps justify expansion.
          </p>

          <fieldset style={{ ...fieldsetStyles, paddingTop: '1.5rem' }}>
            <div style={fieldsetLabelStyles}>7. Do you believe patients would:</div>
            {[
              { key: 'understandEasily', label: 'Understand this information easily?' },
              { key: 'feelMotivated', label: 'Feel motivated by it?' },
              { key: 'trustIt', label: 'Trust it?' },
            ].map(({ key, label }) => (
              <div key={key} style={{ marginBottom: '1.25rem' }}>
                <label style={{ ...labelStyles, fontSize: '0.95rem' }}>{label}</label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {LIKERT_OPTIONS.map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input type="radio" name={key} value={opt} checked={formData[key] === opt} onChange={() => update(key, opt)} style={{ marginRight: '0.25rem' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </fieldset>

          <fieldset style={{ ...fieldsetStyles, paddingTop: '1.5rem' }}>
            <label style={labelStyles}>8. Are there patient populations this would NOT serve well?</label>
            <textarea name="notServedWell" value={formData.notServedWell} onChange={e => update('notServedWell', e.target.value)} rows={3} style={{ ...inputTextStyles, resize: 'vertical' }} placeholder="Open text..." />
          </fieldset>
        </section>

        {/* Section 5: Improvement & Priorities */}
        <section style={sectionStyles}>
          <h2 style={{
            fontSize: '1.5rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: '600',
            color: 'var(--ink)',
            marginBottom: '0.5rem',
          }}>
            Section 5: Improvement & Priorities
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            What should we focus on next?
          </p>

          <fieldset style={{ ...fieldsetStyles, paddingTop: '1.5rem' }}>
            <label style={labelStyles}>9. What is missing that would make this more useful?</label>
            <textarea name="whatMissing" value={formData.whatMissing} onChange={e => update('whatMissing', e.target.value)} rows={4} style={{ ...inputTextStyles, resize: 'vertical' }} placeholder="Open text..." />
          </fieldset>

          <fieldset style={{ ...fieldsetStyles, paddingTop: '1.5rem' }}>
            <label style={labelStyles}>10. What one improvement should be prioritized next?</label>
            <textarea name="prioritizeNext" value={formData.prioritizeNext} onChange={e => update('prioritizeNext', e.target.value)} rows={3} style={{ ...inputTextStyles, resize: 'vertical' }} placeholder="Open text..." />
          </fieldset>

          <fieldset style={{ ...fieldsetStyles, paddingTop: '1.5rem' }}>
            <label style={labelStyles}>11. Would you be interested in participating in future testing or pilot use?</label>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {['Yes', 'No'].map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="radio" name="futureTesting" value={opt} checked={formData.futureTesting === opt} onChange={() => update('futureTesting', opt)} style={{ marginRight: '0.5rem' }} />
                  <span style={{ fontFamily: 'var(--font-body)' }}>{opt}</span>
                </label>
              ))}
            </div>
            {formData.futureTesting === 'Yes' && (
              <div>
                <label style={{ ...labelStyles, fontSize: '0.95rem' }}>Email</label>
                <input type="email" name="futureTestingEmail" value={formData.futureTestingEmail} onChange={e => update('futureTestingEmail', e.target.value)} placeholder="your@email.com" style={inputTextStyles} />
              </div>
            )}
          </fieldset>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary">
              Submit Feedback
            </button>
            <button type="button" onClick={() => navigate('/for-practitioners')} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </section>
      </form>
    </main>
  );
};

export default PractitionerFeedback;
