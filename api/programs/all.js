import { searchProgramsByLocation } from '../../lib/db.js';

// Fallback when DB unavailable (e.g. DATABASE_URL not set in Vercel)
const FALLBACK_PROGRAMS = [
  { id: 1, organization_name: 'Atlanta Diabetes Prevention Center', city: 'Atlanta', state: 'GA', zip_code: '30309', delivery_mode: 'in-person' },
  { id: 2, organization_name: 'Virtual Health Solutions', city: 'Remote', state: 'GA', zip_code: '00000', delivery_mode: 'virtual-live' },
  { id: 3, organization_name: 'Community Wellness Network', city: 'Savannah', state: 'GA', zip_code: '31401', delivery_mode: 'hybrid' },
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
    return res.status(200).json({
      success: true,
      count: FALLBACK_PROGRAMS.length,
      programs: FALLBACK_PROGRAMS
    });
  }
}
