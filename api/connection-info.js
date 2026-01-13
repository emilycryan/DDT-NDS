export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const connectionInfo = {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DATABASE,
      port: 5432,
      passwordSet: !!process.env.POSTGRES_PASSWORD,
      passwordLength: process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD.length : 0,
      // Don't expose the actual password for security
      passwordHint: process.env.POSTGRES_PASSWORD ? 
        process.env.POSTGRES_PASSWORD.substring(0, 3) + '...' + 
        process.env.POSTGRES_PASSWORD.substring(process.env.POSTGRES_PASSWORD.length - 3) : 
        'Not set'
    };

    return res.status(200).json({
      message: 'Connection info (password hidden for security)',
      connectionInfo,
      note: 'Check your Vercel dashboard → Storage → Postgres for the full password'
    });

  } catch (error) {
    console.error('Connection info error:', error);
    return res.status(500).json({ 
      message: 'Error getting connection info',
      error: error.message 
    });
  }
}
