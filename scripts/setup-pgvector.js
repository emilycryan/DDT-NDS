#!/usr/bin/env node

import { 
  initializePgVector, 
  bulkInsertProgramsWithEmbeddings, 
  getProgramStats,
  closePgVectorConnection 
} from '../lib/pgvector-db.js';
import { searchProgramsByLocation } from '../lib/local-db.js';

async function setupPgVector() {
  console.log('🚀 Setting up pgvector for semantic search...\n');
  
  try {
    // Step 1: Initialize pgvector extension and tables
    console.log('Step 1: Initializing pgvector extension and tables...');
    await initializePgVector();
    console.log('✅ pgvector setup complete\n');
    
    // Step 2: Load existing programs
    console.log('Step 2: Loading existing programs...');
    const existingPrograms = await searchProgramsByLocation(null, null, null, 999);
    console.log(`📊 Found ${existingPrograms.length} existing programs\n`);
    
    if (existingPrograms.length === 0) {
      console.log('⚠️  No existing programs found. You may need to populate sample data first.');
      console.log('   Run: npm run populate-sample-data');
      return;
    }
    
    // Step 3: Generate embeddings and insert into pgvector
    console.log('Step 3: Generating embeddings and inserting into pgvector...');
    console.log('⏳ This may take a few minutes depending on the number of programs...\n');
    
    await bulkInsertProgramsWithEmbeddings(existingPrograms);
    
    // Step 4: Verify setup
    console.log('\nStep 4: Verifying setup...');
    const stats = await getProgramStats();
    
    console.log('\n📊 pgvector Setup Summary:');
    console.log('================================');
    console.log(`Total programs: ${stats.total_programs}`);
    console.log(`Programs with embeddings: ${stats.programs_with_embeddings}`);
    console.log(`Delivery modes: ${stats.delivery_modes}`);
    console.log(`States covered: ${stats.states_covered}`);
    console.log(`Average cost: $${stats.avg_cost ? parseFloat(stats.avg_cost).toFixed(2) : 'N/A'}`);
    console.log(`Last updated: ${stats.last_updated}`);
    
    if (stats.programs_with_embeddings > 0) {
      console.log('\n✅ pgvector setup completed successfully!');
      console.log('🎉 Semantic search is now ready to use.');
      
      // Test search
      console.log('\n🧪 Testing semantic search...');
      const { performSemanticSearch } = await import('../lib/pgvector-db.js');
      const testResults = await performSemanticSearch('diabetes prevention program', 3);
      
      if (testResults.length > 0) {
        console.log(`✅ Test search returned ${testResults.length} results`);
        console.log('Sample result:', {
          name: testResults[0].organization_name,
          similarity: testResults[0].similarity.toFixed(3),
          location: `${testResults[0].city}, ${testResults[0].state}`
        });
      } else {
        console.log('⚠️  Test search returned no results');
      }
    } else {
      console.log('\n❌ No programs were successfully processed with embeddings');
      console.log('   Check the error messages above for details');
    }
    
  } catch (error) {
    console.error('\n❌ Error setting up pgvector:', error);
    console.error('\nTroubleshooting tips:');
    console.error('1. Make sure PostgreSQL is running');
    console.error('2. Verify DATABASE_URL is set in .env.local');
    console.error('3. Ensure pgvector extension is available in your PostgreSQL instance');
    console.error('4. Check that you have sufficient permissions to create extensions');
    
    process.exit(1);
  } finally {
    await closePgVectorConnection();
  }
}

// Run setup if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupPgVector().catch(console.error);
}

export { setupPgVector };
