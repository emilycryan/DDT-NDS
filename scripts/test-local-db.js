import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function testLocalDatabase() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'ddt_database',
    user: '63172',
    // No password needed for local development
  });

  try {
    console.log('🔌 Testing local PostgreSQL connection...');
    
    // Connect to database
    await client.connect();
    console.log('✅ Connected to local PostgreSQL successfully!');
    
    // Test basic query
    const result = await client.query('SELECT NOW() as current_time');
    console.log('⏰ Current time:', result.rows[0].current_time);
    
    // Create tables
    console.log('\n🏗️  Creating database tables...');
    
    // Create programs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS programs (
        id SERIAL PRIMARY KEY,
        organization_name VARCHAR(255) NOT NULL,
        cdc_recognition_status VARCHAR(100),
        mdpp_supplier BOOLEAN DEFAULT FALSE,
        contact_phone VARCHAR(20),
        contact_email VARCHAR(255),
        website_url TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Create program_locations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS program_locations (
        id SERIAL PRIMARY KEY,
        program_id INTEGER REFERENCES programs(id) ON DELETE CASCADE,
        address_line1 VARCHAR(255),
        address_line2 VARCHAR(255),
        city VARCHAR(100) NOT NULL,
        state VARCHAR(2) NOT NULL,
        zip_code VARCHAR(10) NOT NULL,
        latitude DECIMAL(10,8),
        longitude DECIMAL(11,8),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Create program_details table
    await client.query(`
      CREATE TABLE IF NOT EXISTS program_details (
        id SERIAL PRIMARY KEY,
        program_id INTEGER REFERENCES programs(id) ON DELETE CASCADE,
        delivery_mode VARCHAR(50), -- 'in-person', 'virtual-live', 'virtual-self-paced', 'hybrid'
        language VARCHAR(50) DEFAULT 'English',
        class_schedule TEXT,
        duration_weeks INTEGER,
        cost DECIMAL(10,2),
        insurance_accepted TEXT[],
        max_participants INTEGER,
        current_participants INTEGER DEFAULT 0,
        enrollment_status VARCHAR(20) DEFAULT 'open', -- 'open', 'closed', 'waitlist'
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Create assessment_results table
    await client.query(`
      CREATE TABLE IF NOT EXISTS assessment_results (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255),
        risk_level VARCHAR(20), -- 'low', 'medium', 'high'
        recommended_program_types TEXT[],
        assessment_data JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log('✅ Database tables created successfully!');

    // Test inserting a sample program
    console.log('\n📝 Inserting sample program...');
    const sampleProgram = await client.query(`
      INSERT INTO programs (
        organization_name, 
        cdc_recognition_status, 
        mdpp_supplier, 
        contact_phone, 
        contact_email, 
        description
      ) VALUES (
        $1, $2, $3, $4, $5, $6
      ) RETURNING id, organization_name;
    `, [
      'Sample Community Health Center',
      'CDC-Recognized',
      true,
      '(555) 123-4567',
      'info@samplehealth.org',
      'Comprehensive diabetes prevention program with proven results'
    ]);
    
    const programId = sampleProgram.rows[0].id;
    console.log('✅ Sample program created:', sampleProgram.rows[0]);
    
    // Add location for the sample program
    await client.query(`
      INSERT INTO program_locations (
        program_id,
        address_line1,
        city,
        state,
        zip_code,
        latitude,
        longitude
      ) VALUES ($1, $2, $3, $4, $5, $6, $7);
    `, [programId, '123 Health St', 'Atlanta', 'GA', '30309', 33.7490, -84.3880]);
    
    // Add program details
    await client.query(`
      INSERT INTO program_details (
        program_id,
        delivery_mode,
        language,
        duration_weeks,
        cost,
        max_participants,
        enrollment_status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7);
    `, [programId, 'hybrid', 'English', 16, 50.00, 15, 'open']);
    
    console.log('✅ Sample program data added successfully!');
    
    // Test search functionality
    console.log('\n🔍 Testing program search...');
    const searchResults = await client.query(`
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
    `);
    
    console.log('✅ Search results:', searchResults.rows);
    console.log('\n🎉 All database tests passed! Your PostgreSQL database is working correctly.');

  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  } finally {
    await client.end();
  }
}

testLocalDatabase();
