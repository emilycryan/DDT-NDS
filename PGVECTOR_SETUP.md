# pgvector Setup Guide

This guide will help you set up pgvector for semantic search in the CDC: Path2Prevention application.

## Overview

pgvector is a PostgreSQL extension that provides vector similarity search capabilities. This setup replaces the OpenAI-dependent vector search with a local, self-contained solution using:

- **pgvector**: PostgreSQL extension for vector operations
- **Transformers.js**: Local embedding generation using `all-MiniLM-L6-v2` model
- **Hybrid Search**: Combines vector similarity with traditional text search

## Prerequisites

### 1. PostgreSQL with pgvector

You need PostgreSQL with the pgvector extension installed. Here are your options:

#### Option A: Local PostgreSQL with pgvector
```bash
# Install PostgreSQL (if not already installed)
brew install postgresql

# Install pgvector
brew install pgvector

# Start PostgreSQL
brew services start postgresql

# Create database
createdb cdc_path2prevention
```

#### Option B: Docker with pgvector
```bash
# Run PostgreSQL with pgvector in Docker
docker run --name pgvector-db \
  -e POSTGRES_DB=cdc_path2prevention \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d pgvector/pgvector:pg16
```

#### Option C: Cloud PostgreSQL
- **Supabase**: Includes pgvector by default
- **Neon**: Supports pgvector extension
- **AWS RDS**: Enable pgvector extension manually

### 2. Environment Variables

Add your database connection string to `.env.local`:

```env
# For local PostgreSQL
DATABASE_URL=postgresql://username:password@localhost:5432/cdc_path2prevention

# For Docker
DATABASE_URL=postgresql://postgres:password@localhost:5432/cdc_path2prevention

# For cloud providers (example)
DATABASE_URL=postgresql://user:pass@host:5432/dbname?sslmode=require
```

## Installation Steps

### 1. Install Dependencies
```bash
npm install pgvector @xenova/transformers
```

### 2. Set up pgvector
```bash
npm run setup-pgvector
```

This script will:
- Enable the pgvector extension
- Create the `programs_vector` table with vector columns
- Create indexes for efficient similarity search
- Load existing programs and generate embeddings
- Verify the setup with a test search

### 3. Verify Setup
After running the setup script, you should see output like:
```
✅ pgvector setup completed successfully!
🎉 Semantic search is now ready to use.
📊 pgvector Setup Summary:
================================
Total programs: 5
Programs with embeddings: 5
Delivery modes: 3
States covered: 2
```

## Usage

### API Endpoint
The semantic search endpoint automatically uses pgvector when available:

```javascript
POST /api/programs/semantic-search
{
  "query": "virtual diabetes prevention program",
  "conversation_history": [],
  "limit": 5
}
```

### Response Format
```javascript
{
  "success": true,
  "query": "virtual diabetes prevention program",
  "intent_analysis": {
    "intent": "search_programs",
    "preferences": {
      "delivery_mode": "virtual-live",
      "cost_sensitive": false
    },
    "questions_to_ask": ["What area would be most convenient for you?"]
  },
  "results": [
    {
      "id": 1,
      "organization_name": "Virtual Health Center",
      "similarity": 0.89,
      "delivery_mode": "virtual-live"
    }
  ],
  "count": 1,
  "pgvector": true
}
```

## Features

### 1. Local Embedding Generation
- Uses `all-MiniLM-L6-v2` model (384 dimensions)
- No external API dependencies
- Runs entirely on your server

### 2. Hybrid Search
- Combines vector similarity search with PostgreSQL full-text search
- Configurable weighting between vector and text scores
- Better results than pure vector search

### 3. Intelligent Fallback
- Automatically falls back to traditional search if pgvector is unavailable
- Graceful degradation ensures the application always works

### 4. Performance Optimizations
- IVFFlat index for fast vector similarity search
- GIN index for text search
- Configurable similarity thresholds

## Database Schema

### programs_vector Table
```sql
CREATE TABLE programs_vector (
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
```

### Indexes
```sql
-- Vector similarity search index
CREATE INDEX programs_vector_embedding_idx 
ON programs_vector USING ivfflat (embedding vector_cosine_ops) 
WITH (lists = 100);

-- Text search index
CREATE INDEX programs_vector_search_text_idx 
ON programs_vector USING gin(to_tsvector('english', search_text));
```

## Troubleshooting

### Common Issues

#### 1. pgvector Extension Not Found
```
ERROR: extension "vector" is not available
```
**Solution**: Install pgvector extension in your PostgreSQL instance.

#### 2. Permission Denied
```
ERROR: permission denied to create extension "vector"
```
**Solution**: Connect as a superuser or ask your database administrator to enable the extension.

#### 3. Model Download Issues
```
Error loading embedding model
```
**Solution**: Ensure you have internet connectivity for the initial model download. The model will be cached locally after the first download.

#### 4. Memory Issues
```
JavaScript heap out of memory
```
**Solution**: Increase Node.js memory limit:
```bash
node --max-old-space-size=4096 scripts/setup-pgvector.js
```

### Performance Tuning

#### 1. Adjust IVFFlat Lists
For better performance with more data:
```sql
-- For 1K-10K vectors
CREATE INDEX ... WITH (lists = 100);

-- For 10K-100K vectors  
CREATE INDEX ... WITH (lists = 1000);

-- For 100K+ vectors
CREATE INDEX ... WITH (lists = 10000);
```

#### 2. Similarity Threshold
Adjust the similarity threshold in searches:
```javascript
// More strict (higher quality results)
await performSemanticSearch(query, limit, 0.5);

// More lenient (more results)
await performSemanticSearch(query, limit, 0.2);
```

## Maintenance

### Update Embeddings
When programs are added or updated, regenerate embeddings:
```bash
npm run setup-pgvector
```

### Monitor Performance
Check search performance:
```sql
-- Check index usage
EXPLAIN ANALYZE 
SELECT * FROM programs_vector 
ORDER BY embedding <=> '[0.1,0.2,...]' 
LIMIT 5;

-- Check table statistics
SELECT 
  COUNT(*) as total_programs,
  COUNT(embedding) as programs_with_embeddings,
  pg_size_pretty(pg_total_relation_size('programs_vector')) as table_size
FROM programs_vector;
```

## Migration from OpenAI

The new pgvector implementation is a drop-in replacement for the OpenAI-based vector search:

1. **No API Changes**: The same endpoints work with pgvector
2. **Better Performance**: Local processing eliminates API latency
3. **Cost Savings**: No OpenAI API costs for embeddings
4. **Reliability**: No dependency on external services

The system automatically detects and uses pgvector when available, falling back to traditional search methods when needed.
