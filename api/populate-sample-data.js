import { populateSampleData } from '../scripts/populate-sample-data.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const result = await populateSampleData();
    
    if (result.success) {
      return res.status(200).json({ 
        message: 'Sample data populated successfully',
        note: 'Database now contains sample LCI programs for testing'
      });
    } else {
      return res.status(500).json({ 
        message: 'Failed to populate sample data',
        error: result.error 
      });
    }
  } catch (error) {
    console.error('Sample data population error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
}
