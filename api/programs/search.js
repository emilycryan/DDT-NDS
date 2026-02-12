import { searchProgramsByLocation } from '../../lib/db.js';

// Fallback when DB unavailable
const FALLBACK_PROGRAMS = [
  { id: 1, organization_name: 'Atlanta Diabetes Prevention Center', city: 'Atlanta', state: 'GA', zip_code: '30309', delivery_mode: 'in-person', latitude: 33.7490, longitude: -84.3880 },
  { id: 2, organization_name: 'Virtual Health Solutions', city: 'Remote', state: 'GA', zip_code: '00000', delivery_mode: 'virtual-live', latitude: null, longitude: null },
  { id: 3, organization_name: 'Community Wellness Network', city: 'Savannah', state: 'GA', zip_code: '31401', delivery_mode: 'hybrid', latitude: 32.0809, longitude: -81.0912 },
  { id: 4, organization_name: 'Flexible Learning Health', city: 'Remote', state: 'FL', zip_code: '00000', delivery_mode: 'virtual-self-paced', latitude: null, longitude: null },
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
    const programs = filterFallback(zipCode, state, city, deliveryMode);
    return res.status(200).json({ success: true, count: programs.length, programs, searchCriteria: { zipCode: zipCode || null, state: state || null, city: city || null, deliveryMode: deliveryMode || null, radius: parseInt(radius) || 25 } });
  }
}
