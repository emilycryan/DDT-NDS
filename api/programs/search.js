import { searchProgramsByLocation } from '../../lib/db.js';
const STRICT_DB_ERRORS = process.env.STRICT_DB_ERRORS === 'true';

// Fallback when DB unavailable
const FALLBACK_PROGRAMS = [
  {
    id: 1,
    organization_name: 'Atlanta Diabetes Prevention Center',
    city: 'Atlanta',
    state: 'GA',
    zip_code: '30309',
    address_line1: '123 Peachtree St',
    delivery_mode: 'in-person',
    enrollment_status: 'open',
    cost: 75,
    duration_weeks: 16,
    contact_phone: '(555) 234-5678',
    contact_email: 'programs@atlantadpp.org',
    website_url: 'https://atlantadpp.org',
    insurance_accepted: ['Medicare', 'Aetna'],
    latitude: 33.7490,
    longitude: -84.3880
  },
  {
    id: 2,
    organization_name: 'Virtual Health Solutions',
    city: 'Remote',
    state: 'GA',
    zip_code: '00000',
    address_line1: 'Online Platform',
    delivery_mode: 'virtual-live',
    enrollment_status: 'open',
    cost: 0,
    duration_weeks: 12,
    contact_email: 'support@virtualhealth.example',
    website_url: 'https://virtualhealth.example',
    insurance_accepted: [],
    latitude: null,
    longitude: null
  },
  {
    id: 3,
    organization_name: 'Community Wellness Network',
    city: 'Savannah',
    state: 'GA',
    zip_code: '31401',
    address_line1: '456 River St',
    delivery_mode: 'hybrid',
    enrollment_status: 'waitlist',
    cost: 25,
    duration_weeks: 20,
    contact_phone: '(555) 555-0100',
    website_url: 'https://communitywellness.example',
    insurance_accepted: ['BCBS'],
    latitude: 32.0809,
    longitude: -81.0912
  },
  {
    id: 4,
    organization_name: 'Flexible Learning Health',
    city: 'Remote',
    state: 'FL',
    zip_code: '00000',
    address_line1: 'Self-Paced Online',
    delivery_mode: 'virtual-self-paced',
    enrollment_status: 'closed',
    cost: 49,
    duration_weeks: 10,
    contact_email: 'hello@flexlearn.example',
    website_url: 'https://flexlearn.example',
    insurance_accepted: ['UnitedHealthcare'],
    latitude: null,
    longitude: null
  },
];

function filterFallback(zipCode, state, city, deliveryMode) {
  let programs = FALLBACK_PROGRAMS;
  if (state) programs = programs.filter(p => (p.state || '').toUpperCase() === String(state).toUpperCase());
  if (city) programs = programs.filter(p => (p.city || '').toLowerCase().includes(String(city).toLowerCase()));
  if (zipCode) programs = programs.filter(p => p.zip_code === zipCode);
  if (deliveryMode) {
    const mode = String(deliveryMode).toLowerCase();
    const virtualModes = ['virtual', 'remote', 'online', 'virtual-live', 'virtual-self-paced'];
    const isVirtual = virtualModes.includes(mode);
    programs = programs.filter(p => {
      const dm = (p.delivery_mode || '').toLowerCase();
      if (isVirtual) return virtualModes.includes(dm);
      if (mode === 'in-person' || mode === 'in person') return dm === 'in-person';
      if (mode === 'hybrid') return dm === 'hybrid';
      return dm.includes(mode);
    });
  }
  return programs;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { zipCode, state, city, radius, deliveryMode } = req.query;

  if (!zipCode && !state && !city && !deliveryMode) {
    return res.status(400).json({ message: 'At least one parameter (zipCode, state, city, or deliveryMode) is required' });
  }

  try {
    let programs;
    if (deliveryMode) {
      programs = await searchProgramsByLocation(null, null, null, 999);
      const mode = String(deliveryMode).toLowerCase();
      const virtualModes = ['virtual-live', 'virtual-self-paced'];
      const modesToSearch = (mode === 'virtual' || mode === 'remote' || mode === 'online') ? virtualModes : [mode];
      programs = programs.filter(p => modesToSearch.includes((p.delivery_mode || '').toLowerCase()));
    } else {
      programs = await searchProgramsByLocation(
        zipCode || null, state || null, city || null, parseInt(radius) || 25
      );
    }

    return res.status(200).json({
      success: true,
      count: programs.length,
      programs,
      searchCriteria: { zipCode: zipCode || null, state: state || null, city: city || null, deliveryMode: deliveryMode || null, radius: parseInt(radius) || 25 }
    });
  } catch (error) {
    console.error('Program search error:', error.message);
    if (STRICT_DB_ERRORS) {
      return res.status(503).json({
        success: false,
        message: 'Database unavailable for program search',
        error: error.message,
        fallback: false,
        searchCriteria: { zipCode: zipCode || null, state: state || null, city: city || null, deliveryMode: deliveryMode || null, radius: parseInt(radius) || 25 },
      });
    }
    const programs = filterFallback(zipCode, state, city, deliveryMode);
    return res.status(200).json({ success: true, count: programs.length, programs, searchCriteria: { zipCode: zipCode || null, state: state || null, city: city || null, deliveryMode: deliveryMode || null, radius: parseInt(radius) || 25 } });
  }
}
