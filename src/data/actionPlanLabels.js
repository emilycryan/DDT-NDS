/** Human-readable labels for Action Plan summary (step 7) and lookups */

export const MOTIVATOR_LABELS = {
  'lose-weight': 'Lose weight',
  family: 'Stay healthy for my family',
  energy: 'Feel more energized',
  active: 'Be more active',
  'less-medicine': 'Take less medicine (such as high blood pressure medicine)',
  'avoid-diabetes': "Avoid type 2 diabetes because I've seen what it can do",
  'medical-bills': 'Reduce my chances of higher medical bills',
  'avoid-conditions': 'Avoid serious medical conditions',
  prioritize: 'Prioritize my health',
};

export const BARRIER_LABELS = {
  caregiver: 'Caregiver duties (childcare or other)',
  'family-meals': 'Family meals',
  schedule: 'Schedule changes',
  travel: 'Travel plans',
  transportation: 'Transportation',
  'pet-care': 'Pet care',
  commitments: 'Prior commitments',
};

export const PARTICIPATION_LABELS = {
  'in-person': 'In person, so I can see my coach and fellow participants directly.',
  online: 'Online, so I can participate on my own schedule.',
  distance:
    'Distance learning, so I can participate in scheduled classes from the comfort of my home.',
};

export const TIME_LABELS = {
  morning: "In the morning. I'm a morning person!",
  afternoon: "In the afternoon. That's when I have the most free time!",
  evening: 'In the evening. I have more flexibility at the end of the day.',
  weekend: "On the weekend. I know I'll have time.",
};

export function labelsFromIds(map, ids) {
  if (!ids || !ids.length) return [];
  return ids.map((id) => map[id]).filter(Boolean);
}
