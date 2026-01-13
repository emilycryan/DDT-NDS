import dotenv from 'dotenv';
import { searchProgramsByLocation } from '../lib/local-db.js';

dotenv.config({ path: '.env.local' });

async function testSearch() {
  try {
    console.log('🔍 Testing program search for Atlanta, GA...\n');
    
    const programs = await searchProgramsByLocation(null, 'GA', 'Atlanta');
    
    console.log(`✅ Found ${programs.length} program(s):\n`);
    
    for (const prog of programs) {
      console.log(`📋 ${prog.organization_name}`);
      console.log(`   Location: ${prog.city}, ${prog.state} ${prog.zip_code}`);
      console.log(`   Delivery: ${prog.delivery_mode || 'N/A'}`);
      console.log(`   Status: ${prog.enrollment_status || 'N/A'}`);
      if (prog.latitude && prog.longitude) {
        console.log(`   Coordinates: ${prog.latitude}, ${prog.longitude}`);
      }
      console.log();
    }
    
    if (programs.length === 0) {
      console.log('⚠️  No programs found. This might mean:');
      console.log('   - The search criteria doesn\'t match any programs');
      console.log('   - There\'s an issue with the database connection');
    }
    
  } catch (error) {
    console.error('❌ Search failed:', error.message);
    console.error('   Code:', error.code);
    process.exit(1);
  }
}

testSearch();


