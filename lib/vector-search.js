import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Initialize OpenAI client with error handling
let openai = null;
let openaiAvailable = false;

try {
  if (process.env.VITE_OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.VITE_OPENAI_API_KEY
    });
    openaiAvailable = true;
    console.log('✅ OpenAI API initialized for vector search');
  } else {
    console.log('⚠️  OpenAI API key not found - vector search will use fallback mode');
  }
} catch (error) {
  console.error('❌ Failed to initialize OpenAI:', error.message);
  openaiAvailable = false;
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

// Generate embedding for text using OpenAI
export async function generateEmbedding(text) {
  if (!openaiAvailable || !openai) {
    throw new Error('OpenAI not available for embeddings');
  }
  
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text.replace(/\n/g, ' '), // Clean text
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

// Create comprehensive text representation of a program for embedding
export function createProgramText(program) {
  const parts = [
    program.organization_name,
    program.description || '',
    `${program.delivery_mode || ''} program`,
    `Located in ${program.city}, ${program.state}`,
    `CDC recognition: ${program.cdc_recognition_status || 'Unknown'}`,
    program.language || 'English',
    program.cost ? `Cost: $${program.cost}` : '',
    program.duration_weeks ? `Duration: ${program.duration_weeks} weeks` : '',
    program.enrollment_status === 'open' ? 'Currently accepting new participants' : '',
    program.mdpp_supplier ? 'Medicare Diabetes Prevention Program supplier' : ''
  ].filter(Boolean);
  
  return parts.join('. ');
}

// Generate embeddings for all programs
export async function generateProgramEmbeddings(programs) {
  const programsWithEmbeddings = [];
  
  console.log(`Generating embeddings for ${programs.length} programs...`);
  
  for (const program of programs) {
    try {
      const programText = createProgramText(program);
      const embedding = await generateEmbedding(programText);
      
      programsWithEmbeddings.push({
        ...program,
        embedding,
        searchText: programText
      });
      
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Error generating embedding for program ${program.id}:`, error);
      // Include program without embedding as fallback
      programsWithEmbeddings.push({
        ...program,
        embedding: null,
        searchText: createProgramText(program)
      });
    }
  }
  
  return programsWithEmbeddings;
}

// Simple text-based search (fallback when embeddings aren't available)
function simpleTextSearch(query, programs, limit = 5) {
  const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 2);
  
  const programsWithScores = programs.map(program => {
    const programText = createProgramText(program).toLowerCase();
    let score = 0;
    
    // Calculate simple word matching score
    queryWords.forEach(word => {
      if (programText.includes(word)) {
        score += 1;
        // Bonus for matches in organization name or description
        if (program.organization_name.toLowerCase().includes(word)) score += 2;
        if (program.description && program.description.toLowerCase().includes(word)) score += 1;
        if (program.delivery_mode && program.delivery_mode.toLowerCase().includes(word)) score += 3;
      }
    });
    
    return {
      ...program,
      similarity: score / queryWords.length, // Normalize score
      searchText: createProgramText(program)
    };
  })
  .filter(program => program.similarity > 0)
  .sort((a, b) => b.similarity - a.similarity)
  .slice(0, limit);
  
  return programsWithScores;
}

// Perform semantic search on programs
export async function semanticSearch(query, programsWithEmbeddings, limit = 5) {
  // If OpenAI is not available, use simple text search
  if (!openaiAvailable) {
    console.log('Using simple text search (OpenAI not available)');
    return simpleTextSearch(query, programsWithEmbeddings, limit);
  }
  
  try {
    // Generate embedding for the search query
    const queryEmbedding = await generateEmbedding(query);
    
    // Calculate similarity scores
    const programsWithScores = programsWithEmbeddings
      .filter(program => program.embedding) // Only include programs with embeddings
      .map(program => ({
        ...program,
        similarity: cosineSimilarity(queryEmbedding, program.embedding)
      }))
      .sort((a, b) => b.similarity - a.similarity) // Sort by similarity (highest first)
      .slice(0, limit);
    
    return programsWithScores;
  } catch (error) {
    console.error('Error performing semantic search, falling back to text search:', error);
    return simpleTextSearch(query, programsWithEmbeddings, limit);
  }
}

// Simple rule-based intent analysis (fallback when OpenAI is not available)
function simpleIntentAnalysis(query) {
  const q = query.toLowerCase();
  const analysis = {
    intent: 'search_programs',
    preferences: {
      delivery_mode: null,
      location: null,
      cost_sensitive: false,
      schedule_flexible: false,
      insurance_important: false,
      language_preference: null
    },
    questions_to_ask: [],
    confidence: 0.7
  };
  
  // Detect delivery mode preferences
  if (q.includes('virtual') || q.includes('online') || q.includes('remote')) {
    analysis.preferences.delivery_mode = 'virtual';
  } else if (q.includes('in-person') || q.includes('face to face')) {
    analysis.preferences.delivery_mode = 'in-person';
  } else if (q.includes('hybrid') || q.includes('combination')) {
    analysis.preferences.delivery_mode = 'hybrid';
  }
  
  // Detect cost sensitivity
  if (q.includes('cost') || q.includes('price') || q.includes('afford') || q.includes('cheap') || q.includes('free')) {
    analysis.preferences.cost_sensitive = true;
    analysis.questions_to_ask.push('What budget range works best for you?');
  }
  
  // Detect location mentions
  const locationWords = ['near', 'close', 'location', 'area', 'city', 'local'];
  if (locationWords.some(word => q.includes(word))) {
    analysis.questions_to_ask.push('What area or city would be most convenient for you?');
  }
  
  // Detect schedule concerns
  if (q.includes('schedule') || q.includes('time') || q.includes('flexible') || q.includes('evening') || q.includes('weekend')) {
    analysis.preferences.schedule_flexible = true;
    analysis.questions_to_ask.push('What days and times work best for your schedule?');
  }
  
  // Add general questions if none specific
  if (analysis.questions_to_ask.length === 0) {
    analysis.questions_to_ask = [
      'What type of program format would work best for you?',
      'Do you have any location preferences?',
      'Are there any specific requirements that are important to you?'
    ];
  }
  
  return analysis;
}

// Analyze user query to understand intent and extract preferences
export async function analyzeUserIntent(query, conversationHistory = []) {
  if (!openaiAvailable || !openai) {
    console.log('Using simple intent analysis (OpenAI not available)');
    return simpleIntentAnalysis(query);
  }
  
  try {
    const context = conversationHistory.length > 0 
      ? `Previous conversation: ${conversationHistory.slice(-3).join(' ')}\n\n` 
      : '';
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant that analyzes user queries about diabetes prevention programs. Extract key preferences and intent from the user's message.

Return a JSON object with:
- "intent": "search_programs" | "get_info" | "compare_options" | "ask_questions" | "other"
- "preferences": {
    "delivery_mode": "in-person" | "virtual" | "hybrid" | "any" | null,
    "location": string | null,
    "cost_sensitive": boolean,
    "schedule_flexible": boolean,
    "insurance_important": boolean,
    "language_preference": string | null
  }
- "questions_to_ask": array of follow-up questions to better understand needs
- "confidence": number between 0-1

Focus on extracting specific preferences even if not explicitly stated.`
        },
        {
          role: 'user',
          content: `${context}Current query: "${query}"`
        }
      ],
      max_tokens: 300,
      temperature: 0.3
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error analyzing user intent, falling back to simple analysis:', error);
    return simpleIntentAnalysis(query);
  }
}

// Generate intelligent follow-up questions based on search results
export function generateFollowUpQuestions(searchResults, userPreferences) {
  const questions = [];
  
  // Check delivery mode diversity
  const deliveryModes = [...new Set(searchResults.map(p => p.delivery_mode))];
  if (deliveryModes.length > 1 && !userPreferences.delivery_mode) {
    questions.push(`I found programs in different formats: ${deliveryModes.join(', ')}. Which format appeals to you most?`);
  }
  
  // Check cost range
  const costs = searchResults.filter(p => p.cost).map(p => parseFloat(p.cost));
  if (costs.length > 1 && !userPreferences.cost_sensitive) {
    const minCost = Math.min(...costs);
    const maxCost = Math.max(...costs);
    questions.push(`Program costs range from $${minCost} to $${maxCost}. Is cost a major factor in your decision?`);
  }
  
  // Check location diversity
  const locations = [...new Set(searchResults.map(p => `${p.city}, ${p.state}`))];
  if (locations.length > 1 && !userPreferences.location) {
    questions.push(`I found programs in ${locations.slice(0, 2).join(' and ')}${locations.length > 2 ? ' and other locations' : ''}. Which area works best for you?`);
  }
  
  // Check schedule/duration
  const durations = [...new Set(searchResults.filter(p => p.duration_weeks).map(p => p.duration_weeks))];
  if (durations.length > 1) {
    questions.push(`Programs vary in length from ${Math.min(...durations)} to ${Math.max(...durations)} weeks. Do you prefer a shorter or longer program?`);
  }
  
  return questions;
}
