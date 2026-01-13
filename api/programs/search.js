import { searchProgramsByLocation } from '../../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { zipCode, state, city, radius } = req.query;

    // Validate required parameters
    if (!zipCode && !state && !city) {
      return res.status(400).json({ 
        message: 'At least one location parameter (zipCode, state, or city) is required' 
      });
    }

    const programs = await searchProgramsByLocation(
      zipCode || null, 
      state || null, 
      city || null, 
      parseInt(radius) || 25
    );

    return res.status(200).json({
      success: true,
      count: programs.length,
      programs: programs,
      searchCriteria: {
        zipCode: zipCode || null,
        state: state || null,
        city: city || null,
        radius: parseInt(radius) || 25
      }
    });

  } catch (error) {
    console.error('Program search error:', error);
    return res.status(500).json({ 
      message: 'Error searching programs',
      error: error.message 
    });
  }
}
