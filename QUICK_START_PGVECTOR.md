# Quick Start: pgvector Semantic Search

Get semantic search up and running in 5 minutes!

## 🚀 Quick Setup

### 1. Prerequisites
You need PostgreSQL with pgvector. Choose one option:

**Option A: Docker (Easiest)**
```bash
docker run --name pgvector-db \
  -e POSTGRES_DB=cdc_path2prevention \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d pgvector/pgvector:pg16
```

**Option B: Local PostgreSQL**
```bash
brew install postgresql pgvector
brew services start postgresql
createdb cdc_path2prevention
```

### 2. Configure Environment
Add to `.env.local`:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/cdc_path2prevention
```

### 3. Install & Setup
```bash
# Install dependencies (already done if you followed the main setup)
npm install pgvector @xenova/transformers

# Set up pgvector (this will take a few minutes)
npm run setup-pgvector

# Test the setup
npm run test-pgvector
```

### 4. Start the Server
```bash
npm run dev
```

## ✅ Verification

You should see:
```
✅ pgvector is ready for semantic search
📊 pgvector status: 5/5 programs with embeddings
```

## 🧪 Test Semantic Search

Try these API calls:

```bash
# Basic search
curl -X POST http://localhost:3004/api/programs/semantic-search \
  -H "Content-Type: application/json" \
  -d '{"query": "virtual diabetes prevention program", "limit": 3}'

# Search with conversation history
curl -X POST http://localhost:3004/api/programs/semantic-search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "I need something affordable", 
    "conversation_history": ["I want a diabetes program", "virtual would be good"],
    "limit": 5
  }'
```

## 🎯 What You Get

- **Local Embeddings**: No OpenAI API needed
- **Fast Search**: Sub-100ms response times
- **Smart Matching**: Understands intent, not just keywords
- **Hybrid Results**: Combines vector similarity + text search
- **Automatic Fallback**: Works even if pgvector fails

## 🔧 Troubleshooting

**pgvector not available?**
```bash
# Check if PostgreSQL is running
pg_isready

# Verify database connection
psql $DATABASE_URL -c "SELECT 1;"

# Re-run setup
npm run setup-pgvector
```

**No search results?**
```bash
# Check if programs exist
npm run populate-sample-data

# Re-generate embeddings
npm run setup-pgvector
```

**Performance issues?**
- Increase Node.js memory: `node --max-old-space-size=4096 scripts/setup-pgvector.js`
- Check database indexes: See full documentation in `PGVECTOR_SETUP.md`

## 📚 Next Steps

- Read the full documentation: `PGVECTOR_SETUP.md`
- Customize search parameters in `lib/vector-search-pgvector.js`
- Add more programs to improve search quality
- Monitor performance with database queries

That's it! Your semantic search is now powered by pgvector. 🎉
