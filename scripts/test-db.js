import dotenv from 'dotenv';
import { initializeDatabase, sql } from '../lib/db.js';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function testDatabase() {
  try {
    console.log('🔌 Testing database connection...');
    
    // Test basic connection
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Database connected successfully!');
    console.log('⏰ Current time:', result.rows[0].current_time);
    
    console.log('\n🏗️  Initializing database tables...');
    const initResult = await initializeDatabase();
    
    if (initResult.success) {
      console.log('✅ Database tables created successfully!');
      
      // Test inserting a sample program
      console.log('\n📝 Inserting sample program...');
      const sampleProgram = await sql`
        INSERT INTO programs (
          organization_name, 
          cdc_recognition_status, 
          mdpp_supplier, 
          contact_phone, 
          contact_email, 
          description
        ) VALUES (
          'Sample Community Health Center',
          'CDC-Recognized',
          true,
          '(555) 123-4567',
          'info@samplehealth.org',
          'Comprehensive diabetes prevention program with proven results'
        ) RETURNING id, organization_name;
      `;
      
      const programId = sampleProgram.rows[0].id;
      console.log('✅ Sample program created:', sampleProgram.rows[0]);
      
      // Add location for the sample program
      await sql`
        INSERT INTO program_locations (
          program_id,
          address_line1,
          city,
          state,
          zip_code,
          latitude,
          longitude
        ) VALUES (
          ${programId},
          '123 Health St',
          'Atlanta',
          'GA',
          '30309',
          33.7490,
          -84.3880
        );
      `;
      
      // Add program details
      await sql`
        INSERT INTO program_details (
          program_id,
          delivery_mode,
          language,
          duration_weeks,
          cost,
          max_participants,
          enrollment_status
        ) VALUES (
          ${programId},
          'hybrid',
          'English',
          16,
          50.00,
          15,
          'open'
        );
      `;
      
      console.log('✅ Sample program data added successfully!');
      
      // Test search functionality
      console.log('\n🔍 Testing program search...');
      const searchResults = await sql`
        SELECT 
          p.organization_name,
          pl.city,
          pl.state,
          pd.delivery_mode,
          pd.cost
        FROM programs p
        LEFT JOIN program_locations pl ON p.id = pl.program_id
        LEFT JOIN program_details pd ON p.id = pd.program_id
        WHERE pl.state = 'GA';
      `;
      
      console.log('✅ Search results:', searchResults.rows);
      
    } else {
      console.error('❌ Failed to initialize database:', initResult.error);
    }
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  }
}

testDatabase();
