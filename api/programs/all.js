import { searchProgramsByLocation } from '../../lib/db.js';
const STRICT_DB_ERRORS = process.env.STRICT_DB_ERRORS === 'true';

// Fallback when DB unavailable (e.g. DATABASE_URL not set in Vercel)
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
    insurance_accepted: ['Medicare', 'Aetna']
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
    insurance_accepted: []
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
    insurance_accepted: ['BCBS']
  },
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const programs = await searchProgramsByLocation(null, null, null, 999);
    return res.status(200).json({ success: true, count: programs.length, programs });
  } catch (error) {
    console.error('Get all programs error:', error.message);
    if (STRICT_DB_ERRORS) {
      return res.status(503).json({
        success: false,
        message: 'Database unavailable for /api/programs/all',
        error: error.message,
        fallback: false,
      });
    }
    return res.status(200).json({
      success: true,
      count: FALLBACK_PROGRAMS.length,
      programs: FALLBACK_PROGRAMS
    });
  }
}
