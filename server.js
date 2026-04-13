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
const STRICT_DB_ERRORS = process.env.STRICT_DB_ERRORS === 'true';

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
  {
    id: 1,
    organization_name: 'Atlanta Diabetes Prevention Center',
    description: 'Comprehensive diabetes prevention programs with personalized coaching and support groups.',
    address_line1: '123 Peachtree St',
    city: 'Atlanta',
    state: 'GA',
    zip_code: '30309',
    delivery_mode: 'in-person',
    enrollment_status: 'open',
    cost: 75,
    duration_weeks: 16,
    contact_phone: '(555) 234-5678',
    contact_email: 'programs@atlantadpp.org',
    website_url: 'https://atlantadpp.org',
    insurance_accepted: ['Medicare', 'Aetna'],
    latitude: 33.7490,
    longitude: -84.3880,
    free_or_low_cost: true,
    insurance_covered: true,
    whole_health_focus: true,
    caregiver_family_friendly: false,
    languages: ['English'],
    accessibility_options: [],
    faith_based: false,
    glp1_specific: false,
  },
  {
    id: 2,
    organization_name: 'Virtual Health Solutions',
    description: 'Live virtual group sessions with a lifestyle coach and peer support.',
    address_line1: 'Online Platform',
    city: 'Remote',
    state: 'GA',
    zip_code: '00000',
    delivery_mode: 'virtual-live',
    enrollment_status: 'open',
    cost: 0,
    duration_weeks: 12,
    contact_email: 'support@virtualhealth.example',
    website_url: 'https://virtualhealth.example',
    insurance_accepted: [],
    latitude: null,
    longitude: null,
    free_or_low_cost: true,
    insurance_covered: true,
    whole_health_focus: true,
    caregiver_family_friendly: true,
    languages: ['English', 'Spanish'],
    accessibility_options: ['ASL'],
    faith_based: false,
    glp1_specific: true,
  },
  {
    id: 3,
    organization_name: 'Community Wellness Network',
    description: 'Hybrid program with flexible scheduling and community-based support.',
    address_line1: '456 River St',
    city: 'Savannah',
    state: 'GA',
    zip_code: '31401',
    delivery_mode: 'hybrid',
    enrollment_status: 'waitlist',
    cost: 25,
    duration_weeks: 20,
    contact_phone: '(555) 555-0100',
    website_url: 'https://communitywellness.example',
    insurance_accepted: ['BCBS'],
    latitude: 32.0809,
    longitude: -81.0912,
    free_or_low_cost: true,
    insurance_covered: true,
    whole_health_focus: true,
    caregiver_family_friendly: true,
    languages: ['English'],
    accessibility_options: [],
    faith_based: true,
    glp1_specific: false,
  },
  {
    id: 4,
    organization_name: 'Flexible Learning Health',
    description: 'Self-paced online course you can complete anytime.',
    address_line1: 'Self-Paced Online',
    city: 'Remote',
    state: 'FL',
    zip_code: '00000',
    delivery_mode: 'virtual-self-paced',
    enrollment_status: 'closed',
    cost: 49,
    duration_weeks: 10,
    contact_email: 'hello@flexlearn.example',
    website_url: 'https://flexlearn.example',
    insurance_accepted: ['UnitedHealthcare'],
    latitude: null,
    longitude: null,
    free_or_low_cost: false,
    insurance_covered: true,
    whole_health_focus: false,
    caregiver_family_friendly: false,
    languages: ['English'],
    accessibility_options: [],
    faith_based: false,
    glp1_specific: false,
  },
];

// Helper to filter programs by optional criteria
function applyProgramFilters(programs, filters) {
  if (!programs || programs.length === 0) return programs;
  let result = [...programs];
  if (filters.freeOrLowCost === 'true' || filters.freeOrLowCost === true) {
    result = result.filter(p => p.free_or_low_cost === true);
  }
  if (filters.insuranceCovered === 'true' || filters.insuranceCovered === true) {
    result = result.filter(p => p.insurance_covered === true);
  }
  if (filters.wholeHealthFocus === 'true' || filters.wholeHealthFocus === true) {
    result = result.filter(p => p.whole_health_focus === true);
  }
  if (filters.caregiverFamilyFriendly === 'true' || filters.caregiverFamilyFriendly === true) {
    result = result.filter(p => p.caregiver_family_friendly === true);
  }
  if (filters.languages) {
    const langs = String(filters.languages).toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
    if (langs.length) {
      result = result.filter(p => {
        const pLangs = (Array.isArray(p.languages) ? p.languages : (p.language ? [p.language] : [])).map(l => String(l || '').toLowerCase());
        return langs.some(l => pLangs.some(pl => pl.includes(l) || l.includes(pl)));
      });
    }
  }
  if (filters.accessibilityOptions) {
    const opts = String(filters.accessibilityOptions).toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
    if (opts.length) {
      result = result.filter(p => {
        const pOpts = (p.accessibility_options || []).map(o => String(o || '').toLowerCase());
        return opts.some(o => pOpts.some(po => po.includes(o) || o.includes(po)));
      });
    }
  }
  if (filters.faithBased === 'true' || filters.faithBased === true) {
    result = result.filter(p => p.faith_based === true);
  }
  if (filters.glp1Specific === 'true' || filters.glp1Specific === true) {
    result = result.filter(p => p.glp1_specific === true);
  }
  return result;
}

function sendDbErrorOrFallback(res, message, error, fallbackPrograms, extra = {}) {
  if (STRICT_DB_ERRORS) {
    return res.status(503).json({
      success: false,
      message,
      error: error.message,
      fallback: false,
      ...extra,
    });
  }

  return res.status(200).json({
    success: true,
    count: fallbackPrograms.length,
    programs: fallbackPrograms,
    fallback: true,
    ...extra,
  });
}

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
        return sendDbErrorOrFallback(
          res,
          'Database unavailable for semantic search',
          dbError,
          FALLBACK_PROGRAMS.slice(0, limit),
          {
            query,
            intent_analysis: { intent: 'search_programs', confidence: 0.5 },
            count: Math.min(FALLBACK_PROGRAMS.length, limit),
            results: FALLBACK_PROGRAMS.slice(0, limit),
          }
        );
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
    return sendDbErrorOrFallback(res, 'Database unavailable for /api/programs/all', error, FALLBACK_PROGRAMS);
  }
});

// Helper to filter programs by name (organization_name)
function filterProgramsByName(programs, name) {
  if (!name || !String(name).trim() || !programs?.length) return programs;
  const term = String(name).trim().toLowerCase();
  return programs.filter(p => (p.organization_name || '').toLowerCase().includes(term));
}

// Program search endpoints
app.get('/api/programs/search', async (req, res) => {
  try {
    const { zipCode, state, city, radius, deliveryMode, name, freeOrLowCost, insuranceCovered, wholeHealthFocus, caregiverFamilyFriendly, languages, accessibilityOptions, faithBased, glp1Specific } = req.query;
    const filters = { freeOrLowCost, insuranceCovered, wholeHealthFocus, caregiverFamilyFriendly, languages, accessibilityOptions, faithBased, glp1Specific };

    console.log('🔍 Search request received:', {
      zipCode,
      state,
      city,
      radius,
      deliveryMode,
      name,
      filters,
      allQueryParams: req.query
    });

    let programs = [];
    const nameTrimmed = name ? String(name).trim() : '';
    const hasLocation = zipCode || state || city;

    // Step 1: Get base programs (location > format > name-only > all)
    if (hasLocation) {
      try {
        programs = await searchProgramsByLocation(zipCode || null, state || null, city || null, parseInt(radius) || 25);
      } catch (dbError) {
        console.warn('⚠️ Database unavailable, using fallback:', dbError.message);
        if (STRICT_DB_ERRORS) {
          return res.status(503).json({
            success: false,
            message: 'Database unavailable for location search',
            error: dbError.message,
            fallback: false,
            searchCriteria: { zipCode: zipCode || null, state: state || null, city: city || null, deliveryMode: deliveryMode || null, name: nameTrimmed || null, filters },
          });
        }
        const stateNorm = (state || '').toUpperCase();
        const cityNorm = (city || '').toLowerCase();
        programs = FALLBACK_PROGRAMS.filter(p => {
          if (stateNorm && p.state !== stateNorm) return false;
          if (cityNorm && !(p.city || '').toLowerCase().includes(cityNorm)) return false;
          if (zipCode && p.zip_code !== zipCode) return false;
          return true;
        });
      }
    } else if (deliveryMode) {
      try {
        programs = await searchProgramsByDeliveryMode(deliveryMode);
      } catch (dbError) {
        console.warn('⚠️ Database error, using fallback:', dbError.message);
        if (STRICT_DB_ERRORS) {
          return res.status(503).json({
            success: false,
            message: 'Database unavailable for delivery mode search',
            error: dbError.message,
            fallback: false,
            searchCriteria: { zipCode: zipCode || null, state: state || null, city: city || null, deliveryMode: deliveryMode || null, name: nameTrimmed || null, filters },
          });
        }
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
    } else if (nameTrimmed) {
      try {
        programs = await searchProgramsByName(nameTrimmed);
      } catch (dbError) {
        console.warn('⚠️ Database unavailable for name search, using fallback:', dbError.message);
        if (STRICT_DB_ERRORS) {
          return res.status(503).json({
            success: false,
            message: 'Database unavailable for name search',
            error: dbError.message,
            fallback: false,
            searchCriteria: { zipCode: zipCode || null, state: state || null, city: city || null, deliveryMode: deliveryMode || null, name: nameTrimmed || null, filters },
          });
        }
        programs = filterProgramsByName(FALLBACK_PROGRAMS, nameTrimmed);
      }
    } else {
      try {
        programs = await searchProgramsByLocation(null, null, null, 99999);
      } catch (dbError) {
        if (STRICT_DB_ERRORS) {
          return res.status(503).json({
            success: false,
            message: 'Database unavailable for default search',
            error: dbError.message,
            fallback: false,
            searchCriteria: { zipCode: zipCode || null, state: state || null, city: city || null, deliveryMode: deliveryMode || null, name: nameTrimmed || null, filters },
          });
        }
        programs = FALLBACK_PROGRAMS;
      }
    }

    // Step 2: Filter by name (always combines with other criteria)
    if (nameTrimmed) {
      programs = filterProgramsByName(programs, nameTrimmed);
    }

    // Step 3: Apply feature filters
    programs = applyProgramFilters(programs, filters);

    return res.status(200).json({
      success: true,
      count: programs.length,
      programs,
      searchCriteria: { zipCode: zipCode || null, state: state || null, city: city || null, deliveryMode: deliveryMode || null, name: nameTrimmed || null, filters }
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
      if (STRICT_DB_ERRORS) {
        return res.status(503).json({
          success: false,
          message: 'Database unavailable for name search',
          error: dbError.message,
          fallback: false,
          searchTerm: name,
        });
      }
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
