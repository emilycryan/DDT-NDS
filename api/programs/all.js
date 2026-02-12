import { searchProgramsByLocation } from '../../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const programs = await searchProgramsByLocation(null, null, null, 999);

    return res.status(200).json({
      success: true,
      count: programs.length,
      programs: programs
    });

  } catch (error) {
    console.error('Get all programs error:', error);
    return res.status(500).json({
      message: 'Error getting all programs',
      error: error.message
    });
  }
}
