import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { searchProgramsByLocation, searchProgramsByName, getProgramById, searchProgramsByDeliveryMode } from './lib/local-db.js';
import { semanticSearch, analyzeUserIntent, generateFollowUpQuestions } from './lib/vector-search.js';
import { getProgramStats } from './lib/pgvector-db.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3004;

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
      // Fallback to local database search
      console.log('🔄 pgvector not available, using fallback search...');
      const fallbackResults = await searchProgramsByLocation(null, null, null, limit * 2);
      
      return res.status(200).json({
        success: true,
        query,
        intent_analysis: { intent: 'search_programs', confidence: 0.5 },
        results: fallbackResults.slice(0, limit),
        count: Math.min(fallbackResults.length, limit),
        fallback: true
      });
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
      console.log('✅ Searching by delivery mode:', deliveryMode);
      programs = await searchProgramsByDeliveryMode(deliveryMode);
      
      return res.status(200).json({
        success: true,
        count: programs.length,
        programs: programs,
        searchCriteria: {
          deliveryMode: deliveryMode,
          locationBased: false
        }
      });
    }

    // Otherwise, require location parameters
    if (!zipCode && !state && !city) {
      console.log('❌ No location parameters and no deliveryMode provided');
      return res.status(400).json({ 
        message: 'At least one location parameter (zipCode, state, or city) is required, or specify deliveryMode' 
      });
    }

    programs = await searchProgramsByLocation(
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
        radius: parseInt(radius) || 25,
        locationBased: true
      }
    });

  } catch (error) {
    console.error('❌ Program search error:', error.message);
    console.error('   Code:', error.code);
    console.error('   Detail:', error.detail);
    console.error('   Stack:', error.stack);
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
      return res.status(400).json({ 
        message: 'Organization name parameter is required' 
      });
    }

    const programs = await searchProgramsByName(name);

    return res.status(200).json({
      success: true,
      count: programs.length,
      programs: programs,
      searchTerm: name
    });

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
  
  // Check pgvector status
  console.log('\n🔍 Checking pgvector status...');
  const pgvectorStatus = await checkPgVectorStatus();
  
  if (pgvectorStatus) {
    console.log('✅ pgvector is ready for semantic search');
  } else {
    console.log('⚠️  pgvector not available - using fallback search');
    console.log('   To set up pgvector, run: node scripts/setup-pgvector.js');
  }
});
