import pg from 'pg';
import { pipeline } from '@xenova/transformers';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const { Pool } = pg;

// Create PostgreSQL connection pool (Neon/Supabase require SSL; enable when using a URL)
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const useSsl = !!connectionString; // Neon and other cloud Postgres require SSL
const pool = new Pool({
  connectionString,
  ssl: useSsl ? { rejectUnauthorized: false } : false,
});

// Initialize embedding model (using a lightweight model for local processing)
let embeddingModel = null;

async function initializeEmbeddingModel() {
  if (!embeddingModel) {
    console.log('🧠 Loading local embedding model...');
    try {
      // Use a lightweight sentence transformer model
      embeddingModel = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
      console.log('✅ Local embedding model loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load embedding model:', error);
      throw error;
    }
  }
  return embeddingModel;
}

// Generate embedding using local model
export async function generateLocalEmbedding(text) {
  try {
    const model = await initializeEmbeddingModel();
    
    // Clean and prepare text
    const cleanText = text.replace(/\n/g, ' ').trim();
    
    // Generate embedding
    const output = await model(cleanText, { pooling: 'mean', normalize: true });
    
    // Convert to array format
    const embedding = Array.from(output.data);
    
    return embedding;
  } catch (error) {
    console.error('Error generating local embedding:', error);
    throw error;
  }
}

// Initialize pgvector extension and create tables
export async function initializePgVector() {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Initializing pgvector extension...');
    
    // Enable pgvector extension
    await client.query('CREATE EXTENSION IF NOT EXISTS vector;');
    
    // Create programs table with vector column
    await client.query(`
      CREATE TABLE IF NOT EXISTS programs_vector (
        id SERIAL PRIMARY KEY,
        program_id INTEGER UNIQUE NOT NULL,
        organization_name VARCHAR(255) NOT NULL,
        description TEXT,
        city VARCHAR(100),
        state VARCHAR(2),
        zip_code VARCHAR(10),
        delivery_mode VARCHAR(50),
        language VARCHAR(50) DEFAULT 'English',
        cost DECIMAL(10,2),
        duration_weeks INTEGER,
        enrollment_status VARCHAR(20) DEFAULT 'open',
        cdc_recognition_status VARCHAR(100),
        mdpp_supplier BOOLEAN DEFAULT FALSE,
        contact_phone VARCHAR(20),
        contact_email VARCHAR(255),
        website_url TEXT,
        class_schedule TEXT,
        search_text TEXT,
        embedding vector(384), -- 384 dimensions for all-MiniLM-L6-v2
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    // Create index for vector similarity search
    await client.query(`
      CREATE INDEX IF NOT EXISTS programs_vector_embedding_idx 
      ON programs_vector USING ivfflat (embedding vector_cosine_ops) 
      WITH (lists = 100);
    `);
    
    // Create index for text search
    await client.query(`
      CREATE INDEX IF NOT EXISTS programs_vector_search_text_idx 
      ON programs_vector USING gin(to_tsvector('english', search_text));
    `);
    
    console.log('✅ pgvector tables and indexes created successfully');
    
  } catch (error) {
    console.error('❌ Error initializing pgvector:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Create comprehensive text representation of a program for embedding
export function createProgramSearchText(program) {
  const parts = [
    program.organization_name || '',
    program.description || '',
    `${program.delivery_mode || ''} program`,
    `Located in ${program.city || ''}, ${program.state || ''}`,
    `CDC recognition: ${program.cdc_recognition_status || 'Unknown'}`,
    program.language || 'English',
    program.cost ? `Cost: $${program.cost}` : '',
    program.duration_weeks ? `Duration: ${program.duration_weeks} weeks` : '',
    program.enrollment_status === 'open' ? 'Currently accepting new participants' : '',
    program.mdpp_supplier ? 'Medicare Diabetes Prevention Program supplier' : '',
    program.class_schedule || ''
  ].filter(Boolean);
  
  return parts.join('. ');
}

// Insert or update program with embedding
export async function upsertProgramWithEmbedding(program) {
  const client = await pool.connect();
  
  try {
    // Create search text
    const searchText = createProgramSearchText(program);
    
    // Generate embedding
    const embedding = await generateLocalEmbedding(searchText);
    
    // Upsert program
    const result = await client.query(`
      INSERT INTO programs_vector (
        program_id, organization_name, description, city, state, zip_code,
        delivery_mode, language, cost, duration_weeks, enrollment_status,
        cdc_recognition_status, mdpp_supplier, contact_phone, contact_email,
        website_url, class_schedule, search_text, embedding, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, NOW()
      )
      ON CONFLICT (program_id) 
      DO UPDATE SET
        organization_name = EXCLUDED.organization_name,
        description = EXCLUDED.description,
        city = EXCLUDED.city,
        state = EXCLUDED.state,
        zip_code = EXCLUDED.zip_code,
        delivery_mode = EXCLUDED.delivery_mode,
        language = EXCLUDED.language,
        cost = EXCLUDED.cost,
        duration_weeks = EXCLUDED.duration_weeks,
        enrollment_status = EXCLUDED.enrollment_status,
        cdc_recognition_status = EXCLUDED.cdc_recognition_status,
        mdpp_supplier = EXCLUDED.mdpp_supplier,
        contact_phone = EXCLUDED.contact_phone,
        contact_email = EXCLUDED.contact_email,
        website_url = EXCLUDED.website_url,
        class_schedule = EXCLUDED.class_schedule,
        search_text = EXCLUDED.search_text,
        embedding = EXCLUDED.embedding,
        updated_at = NOW()
      RETURNING id;
    `, [
      program.id,
      program.organization_name,
      program.description,
      program.city,
      program.state,
      program.zip_code,
      program.delivery_mode,
      program.language,
      program.cost,
      program.duration_weeks,
      program.enrollment_status,
      program.cdc_recognition_status,
      program.mdpp_supplier,
      program.contact_phone,
      program.contact_email,
      program.website_url,
      program.class_schedule,
      searchText,
      `[${embedding.join(',')}]` // Convert array to PostgreSQL array format
    ]);
    
    return result.rows[0];
    
  } catch (error) {
    console.error('Error upserting program with embedding:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Bulk insert programs with embeddings
export async function bulkInsertProgramsWithEmbeddings(programs) {
  console.log(`🔄 Processing ${programs.length} programs for vector storage...`);
  
  const results = [];
  let processed = 0;
  
  for (const program of programs) {
    try {
      const result = await upsertProgramWithEmbedding(program);
      results.push(result);
      processed++;
      
      if (processed % 10 === 0) {
        console.log(`📊 Processed ${processed}/${programs.length} programs`);
      }
      
      // Small delay to prevent overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`❌ Error processing program ${program.id}:`, error.message);
      // Continue with other programs
    }
  }
  
  console.log(`✅ Successfully processed ${results.length}/${programs.length} programs`);
  return results;
}

// Perform semantic search using pgvector
export async function performSemanticSearch(query, limit = 5, threshold = 0.3) {
  const client = await pool.connect();
  
  try {
    // Generate embedding for query
    const queryEmbedding = await generateLocalEmbedding(query);
    
    // Perform vector similarity search
    const result = await client.query(`
      SELECT 
        program_id,
        organization_name,
        description,
        city,
        state,
        zip_code,
        delivery_mode,
        language,
        cost,
        duration_weeks,
        enrollment_status,
        cdc_recognition_status,
        mdpp_supplier,
        contact_phone,
        contact_email,
        website_url,
        class_schedule,
        search_text,
        1 - (embedding <=> $1::vector) as similarity
      FROM programs_vector
      WHERE 1 - (embedding <=> $1::vector) > $2
      ORDER BY embedding <=> $1::vector
      LIMIT $3;
    `, [`[${queryEmbedding.join(',')}]`, threshold, limit]);
    
    return result.rows.map(row => ({
      ...row,
      id: row.program_id, // Map back to expected format
      similarity: parseFloat(row.similarity)
    }));
    
  } catch (error) {
    console.error('Error performing semantic search:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Hybrid search combining vector similarity and text search
export async function performHybridSearch(query, limit = 5, vectorWeight = 0.7) {
  const client = await pool.connect();
  
  try {
    // Generate embedding for query
    const queryEmbedding = await generateLocalEmbedding(query);
    
    // Perform hybrid search
    const result = await client.query(`
      WITH vector_search AS (
        SELECT 
          *,
          1 - (embedding <=> $1::vector) as vector_similarity
        FROM programs_vector
        WHERE 1 - (embedding <=> $1::vector) > 0.2
      ),
      text_search AS (
        SELECT 
          *,
          ts_rank(to_tsvector('english', search_text), plainto_tsquery('english', $2)) as text_rank
        FROM programs_vector
        WHERE to_tsvector('english', search_text) @@ plainto_tsquery('english', $2)
      ),
      combined_search AS (
        SELECT 
          COALESCE(v.program_id, t.program_id) as program_id,
          COALESCE(v.organization_name, t.organization_name) as organization_name,
          COALESCE(v.description, t.description) as description,
          COALESCE(v.city, t.city) as city,
          COALESCE(v.state, t.state) as state,
          COALESCE(v.zip_code, t.zip_code) as zip_code,
          COALESCE(v.delivery_mode, t.delivery_mode) as delivery_mode,
          COALESCE(v.language, t.language) as language,
          COALESCE(v.cost, t.cost) as cost,
          COALESCE(v.duration_weeks, t.duration_weeks) as duration_weeks,
          COALESCE(v.enrollment_status, t.enrollment_status) as enrollment_status,
          COALESCE(v.cdc_recognition_status, t.cdc_recognition_status) as cdc_recognition_status,
          COALESCE(v.mdpp_supplier, t.mdpp_supplier) as mdpp_supplier,
          COALESCE(v.contact_phone, t.contact_phone) as contact_phone,
          COALESCE(v.contact_email, t.contact_email) as contact_email,
          COALESCE(v.website_url, t.website_url) as website_url,
          COALESCE(v.class_schedule, t.class_schedule) as class_schedule,
          COALESCE(v.search_text, t.search_text) as search_text,
          COALESCE(v.vector_similarity, 0) as vector_similarity,
          COALESCE(t.text_rank, 0) as text_rank,
          ($3 * COALESCE(v.vector_similarity, 0) + (1 - $3) * COALESCE(t.text_rank, 0)) as combined_score
        FROM vector_search v
        FULL OUTER JOIN text_search t ON v.program_id = t.program_id
      )
      SELECT *
      FROM combined_search
      WHERE combined_score > 0
      ORDER BY combined_score DESC
      LIMIT $4;
    `, [`[${queryEmbedding.join(',')}]`, query, vectorWeight, limit]);
    
    return result.rows.map(row => ({
      ...row,
      id: row.program_id,
      similarity: parseFloat(row.combined_score)
    }));
    
  } catch (error) {
    console.error('Error performing hybrid search:', error);
    // Fallback to simple vector search
    return await performSemanticSearch(query, limit);
  } finally {
    client.release();
  }
}

// Get program statistics
export async function getProgramStats() {
  const client = await pool.connect();
  
  try {
    const result = await client.query(`
      SELECT 
        COUNT(*) as total_programs,
        COUNT(embedding) as programs_with_embeddings,
        COUNT(DISTINCT delivery_mode) as delivery_modes,
        COUNT(DISTINCT state) as states_covered,
        AVG(cost) as avg_cost,
        MIN(created_at) as oldest_program,
        MAX(updated_at) as last_updated
      FROM programs_vector;
    `);
    
    return result.rows[0];
    
  } catch (error) {
    console.error('Error getting program stats:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Clean up and close connections
export async function closePgVectorConnection() {
  await pool.end();
}

export { pool };
