#!/usr/bin/env node

import { 
  performSemanticSearch, 
  performHybridSearch, 
  getProgramStats,
  closePgVectorConnection 
} from '../lib/pgvector-db.js';

async function testPgVector() {
  console.log('🧪 Testing pgvector semantic search...\n');
  
  try {
    // Test 1: Check database status
    console.log('Test 1: Checking database status...');
    const stats = await getProgramStats();
    console.log(`✅ Database connected: ${stats.total_programs} programs, ${stats.programs_with_embeddings} with embeddings\n`);
    
    if (stats.programs_with_embeddings === 0) {
      console.log('❌ No programs with embeddings found. Run setup first:');
      console.log('   npm run setup-pgvector\n');
      return;
    }
    
    // Test 2: Basic semantic search
    console.log('Test 2: Basic semantic search...');
    const basicResults = await performSemanticSearch('diabetes prevention program', 3);
    console.log(`✅ Basic search returned ${basicResults.length} results`);
    if (basicResults.length > 0) {
      console.log(`   Top result: ${basicResults[0].organization_name} (similarity: ${basicResults[0].similarity.toFixed(3)})`);
    }
    console.log();
    
    // Test 3: Hybrid search
    console.log('Test 3: Hybrid search (vector + text)...');
    const hybridResults = await performHybridSearch('virtual health program', 3);
    console.log(`✅ Hybrid search returned ${hybridResults.length} results`);
    if (hybridResults.length > 0) {
      console.log(`   Top result: ${hybridResults[0].organization_name} (score: ${hybridResults[0].similarity.toFixed(3)})`);
    }
    console.log();
    
    // Test 4: Different query types
    const testQueries = [
      'in-person diabetes class',
      'virtual prevention program',
      'low cost health program',
      'Medicare diabetes prevention'
    ];
    
    console.log('Test 4: Testing different query types...');
    for (const query of testQueries) {
      const results = await performSemanticSearch(query, 2, 0.2);
      console.log(`   "${query}": ${results.length} results`);
    }
    console.log();
    
    // Test 5: Performance test
    console.log('Test 5: Performance test...');
    const startTime = Date.now();
    await performSemanticSearch('diabetes prevention program near me', 5);
    const endTime = Date.now();
    console.log(`✅ Search completed in ${endTime - startTime}ms\n`);
    
    console.log('🎉 All tests passed! pgvector is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure PostgreSQL is running');
    console.error('2. Verify DATABASE_URL is set correctly');
    console.error('3. Run setup: npm run setup-pgvector');
    
    process.exit(1);
  } finally {
    await closePgVectorConnection();
  }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testPgVector().catch(console.error);
}

export { testPgVector };
