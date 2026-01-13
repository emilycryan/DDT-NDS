import { initializeDatabase } from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const result = await initializeDatabase();
    
    if (result.success) {
      return res.status(200).json({ 
        message: 'Database initialized successfully',
        tables: [
          'programs',
          'program_locations', 
          'program_details',
          'assessment_results'
        ]
      });
    } else {
      return res.status(500).json({ 
        message: 'Failed to initialize database',
        error: result.error 
      });
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
}
