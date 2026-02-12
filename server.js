import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables - DDT-copy first, then DDT as fallback (same connection as DDT)
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
  dotenv.config({ path: path.join(process.cwd(), '../DDT/.env.local') });
}

import { searchProgramsByLocation, searchProgramsByName, getProgramById, searchProgramsByDeliveryMode } from './lib/local-db.js';
import { semanticSearch, analyzeUserIntent, generateFollowUpQuestions } from './lib/vector-search.js';
import { getProgramStats } from './lib/pgvector-db.js';

const app = express();
const PORT = 3006;

// Middleware
app.use(cors());
app.use(express.json());

// Check pgvector status
async function checkPgVectorStatus() {
  try {
    const stats = await getProgramStats();
    console.log(`📊 pgvector status: ${stats.programs_with_embeddings}/${stats.total_programs} programs with embeddings`);
    return stats.programs_with_embeddings > 0;
  } catch (error) {
    console.error('⚠️  pgvector not available:', error.message);
    return false;
  }
}

// Sample API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ 
    message: 'Hello from CDC: Path2Prevention API!',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    service: 'CDC: Path2Prevention API',
    timestamp: new Date().toISOString()
  });
});

// Fallback sample programs when database is unavailable
const FALLBACK_PROGRAMS = [
  { id: 1, organization_name: 'Atlanta Diabetes Prevention Center', city: 'Atlanta', state: 'GA', zip_code: '30309', address_line1: '123 Peachtree St', delivery_mode: 'in-person', latitude: 33.7490, longitude: -84.3880 },
  { id: 2, organization_name: 'Virtual Health Solutions', city: 'Remote', state: 'GA', zip_code: '00000', address_line1: 'Online Platform', delivery_mode: 'virtual-live', latitude: null, longitude: null },
  { id: 3, organization_name: 'Community Wellness Network', city: 'Savannah', state: 'GA', zip_code: '31401', address_line1: '456 River St', delivery_mode: 'hybrid', latitude: 32.0809, longitude: -81.0912 },
  { id: 4, organization_name: 'Flexible Learning Health', city: 'Remote', state: 'FL', zip_code: '00000', address_line1: 'Self-Paced Online', delivery_mode: 'virtual-self-paced', latitude: null, longitude: null }
];

// Vector search endpoint for intelligent program matching (using pgvector)
app.post('/api/programs/semantic-search', async (req, res) => {
  try {
    const { query, conversation_history = [], limit = 5 } = req.body;

    if (!query) {
      return res.status(400).json({ 
        message: 'Search query is required' 
      });
    }

    // Check if pgvector is available
    const pgvectorAvailable = await checkPgVectorStatus();
    
    if (!pgvectorAvailable) {
      console.log('🔄 pgvector not available, using fallback search...');
      try {
        const fallbackResults = await searchProgramsByLocation(null, null, null, limit * 2);
        return res.status(200).json({
          success: true,
          query,
          intent_analysis: { intent: 'search_programs', confidence: 0.5 },
          results: fallbackResults.slice(0, limit),
          count: Math.min(fallbackResults.length, limit),
          fallback: true
        });
      } catch (dbError) {
        console.warn('⚠️ Database unavailable for semantic search, using static fallback:', dbError.message);
        return res.status(200).json({
          success: true,
          query,
          intent_analysis: { intent: 'search_programs', confidence: 0.5 },
          results: FALLBACK_PROGRAMS.slice(0, limit),
          count: Math.min(FALLBACK_PROGRAMS.length, limit),
          fallback: true
        });
      }
    }

    // Analyze user intent
    const intentAnalysis = await analyzeUserIntent(query, conversation_history);
    
    // Perform semantic search with pgvector
    const searchResults = await semanticSearch(query, null, limit);
    
    // Generate follow-up questions
    const followUpQuestions = generateFollowUpQuestions(searchResults, intentAnalysis.preferences);
    
    return res.status(200).json({
      success: true,
      query,
      intent_analysis: {
        ...intentAnalysis,
        questions_to_ask: followUpQuestions
      },
      results: searchResults.map(program => ({
        ...program,
        embedding: undefined, // Don't send embeddings back to client
        searchText: undefined // Don't send search text back
      })),
      count: searchResults.length,
      pgvector: true
    });

  } catch (error) {
    console.error('Semantic search error:', error);
    return res.status(500).json({ 
      message: 'Error performing semantic search',
      error: error.message 
    });
  }
});

// Get all programs endpoint (for chatbot delivery mode filtering)
app.get('/api/programs/all', async (req, res) => {
  try {
    const programs = await searchProgramsByLocation(null, null, null, 999);
    return res.status(200).json({ success: true, count: programs.length, programs });
  } catch (error) {
    console.warn('⚠️ Database unavailable for /api/programs/all, using fallback:', error.message);
    return res.status(200).json({ success: true, count: FALLBACK_PROGRAMS.length, programs: FALLBACK_PROGRAMS });
  }
});

// Program search endpoints
app.get('/api/programs/search', async (req, res) => {
  try {
    const { zipCode, state, city, radius, deliveryMode } = req.query;
    
    console.log('🔍 Search request received:', {
      zipCode,
      state,
      city,
      radius,
      deliveryMode,
      allQueryParams: req.query
    });

    let programs = [];

    // If deliveryMode is specified, search by delivery mode (no location required)
    if (deliveryMode) {
      try {
        programs = await searchProgramsByDeliveryMode(deliveryMode);
      } catch (dbError) {
        console.warn('⚠️ Database error (using fallback):', dbError?.message || dbError);
        const mode = String(deliveryMode).toLowerCase();
        const virtualModes = ['virtual', 'remote', 'online', 'virtual-live', 'virtual-self-paced'];
        const isVirtual = virtualModes.includes(mode);
        programs = FALLBACK_PROGRAMS.filter(p => {
          if (isVirtual) return virtualModes.includes((p.delivery_mode || '').toLowerCase());
          if (mode === 'in-person' || mode === 'in person') return p.delivery_mode === 'in-person';
          if (mode === 'hybrid') return p.delivery_mode === 'hybrid';
          return (p.delivery_mode || '').toLowerCase().includes(mode);
        });
      }
      return res.status(200).json({
        success: true,
        count: programs.length,
        programs: programs,
        searchCriteria: { deliveryMode: deliveryMode, locationBased: false }
      });
    }

    // Otherwise, require location parameters
    if (!zipCode && !state && !city) {
      console.log('❌ No location parameters and no deliveryMode provided');
      return res.status(400).json({ 
        message: 'At least one location parameter (zipCode, state, or city) is required, or specify deliveryMode' 
      });
    }

    try {
      programs = await searchProgramsByLocation(
        zipCode || null, 
        state || null, 
        city || null, 
        parseInt(radius) || 25
      );
    } catch (dbError) {
      console.warn('⚠️ Database unavailable, using fallback programs:', dbError.message);
      const stateNorm = (state || '').toUpperCase();
      const cityNorm = (city || '').toLowerCase();
      programs = FALLBACK_PROGRAMS.filter(p => {
        if (stateNorm && p.state !== stateNorm) return false;
        if (cityNorm && !(p.city || '').toLowerCase().includes(cityNorm)) return false;
        if (zipCode && p.zip_code !== zipCode) return false;
        return true;
      });
    }

    return res.status(200).json({
      success: true,
      count: programs.length,
      programs: programs,
      searchCriteria: {
        zipCode: zipCode || null,
        state: state || null,
        city: city || null,
        radius: parseInt(radius) || 25,
        locationBased: true
      }
    });

  } catch (error) {
    console.error('❌ Program search error:', error.message);
    return res.status(500).json({ 
      message: 'Error searching programs',
      error: error.message 
    });
  }
});

// Search programs by organization name (for chatbot)
app.get('/api/programs/search-by-name', async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: 'Organization name parameter is required' });
    }
    let programs;
    try {
      programs = await searchProgramsByName(name);
    } catch (dbError) {
      console.warn('⚠️ Database unavailable for name search, using fallback:', dbError.message);
      const term = (name || '').toLowerCase();
      programs = FALLBACK_PROGRAMS.filter(p => (p.organization_name || '').toLowerCase().includes(term));
    }
    return res.status(200).json({ success: true, count: programs.length, programs, searchTerm: name });
  } catch (error) {
    console.error('Program name search error:', error);
    return res.status(500).json({ 
      message: 'Error searching programs by name',
      error: error.message 
    });
  }
});

// Get specific program by ID
app.get('/api/programs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ 
        message: 'Valid program ID is required' 
      });
    }

    const program = await getProgramById(parseInt(id));

    if (!program) {
      return res.status(404).json({ 
        message: 'Program not found' 
      });
    }

    return res.status(200).json({
      success: true,
      program: program
    });

  } catch (error) {
    console.error('Get program error:', error);
    return res.status(500).json({ 
      message: 'Error getting program',
      error: error.message 
    });
  }
});

// Sample POST endpoint
app.post('/api/data', (req, res) => {
  try {
    const { data } = req.body;
    
    if (!data) {
      return res.status(400).json({ error: 'Data is required' });
    }
    
    res.json({
      success: true,
      received: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, async () => {
  console.log(`🚀 CDC: Path2Prevention API server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log(`  GET  http://localhost:${PORT}/api/hello`);
  console.log(`  GET  http://localhost:${PORT}/api/health`);
  console.log(`  GET  http://localhost:${PORT}/api/programs/all`);
  console.log(`  POST http://localhost:${PORT}/api/programs/semantic-search`);
  console.log(`  GET  http://localhost:${PORT}/api/programs/search?state=GA&city=Atlanta`);
  console.log(`  GET  http://localhost:${PORT}/api/programs/search-by-name?name=Sample`);
  console.log(`  GET  http://localhost:${PORT}/api/programs/1`);
  console.log(`  POST http://localhost:${PORT}/api/data`);
  
  console.log('\n🔍 Checking pgvector status...');
  const pgvectorOk = await checkPgVectorStatus().catch(() => false);
  console.log(pgvectorOk ? '✅ pgvector ready' : '⚠️  pgvector not available - using fallback');
});
