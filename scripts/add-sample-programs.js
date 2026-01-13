import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function addSamplePrograms() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'ddt_database',
    user: '63172',
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    
    console.log('📝 Adding sample programs...');
    
    // LCI - Community Health Centers
    const lciProgram = await client.query(`
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
      'LCI Health Community Centers',
      'CDC-Recognized',
      true,
      '(555) 234-5678',
      'programs@lcihealth.org',
      'LCI Health offers comprehensive diabetes prevention programs with personalized coaching and support groups in a community-centered environment.'
    ]);
    
    const lciProgramId = lciProgram.rows[0].id;
    console.log('✅ LCI Program created:', lciProgram.rows[0]);
    
    // Add LCI location
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
    `, [lciProgramId, '456 Community Way', 'Atlanta', 'GA', '30310', 33.7515, -84.3960]);
    
    // Add LCI program details
    await client.query(`
      INSERT INTO program_details (
        program_id,
        delivery_mode,
        language,
        duration_weeks,
        cost,
        max_participants,
        enrollment_status,
        class_schedule
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `, [lciProgramId, 'in-person', 'English', 16, 75.00, 20, 'open', 'Tuesdays 6:00 PM - 7:30 PM']);

    // Another health center
    const healthCenterProgram = await client.query(`
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
      'Riverside Medical Center',
      'CDC-Recognized',
      true,
      '(555) 345-6789',
      'wellness@riverside.org',
      'Evidence-based diabetes prevention program with virtual and in-person options, including nutrition counseling and fitness support.'
    ]);
    
    const healthCenterId = healthCenterProgram.rows[0].id;
    console.log('✅ Riverside Program created:', healthCenterProgram.rows[0]);
    
    // Add Riverside location
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
    `, [healthCenterId, '789 Wellness Blvd', 'Decatur', 'GA', '30030', 33.7748, -84.2963]);
    
    // Add Riverside program details
    await client.query(`
      INSERT INTO program_details (
        program_id,
        delivery_mode,
        language,
        duration_weeks,
        cost,
        max_participants,
        enrollment_status,
        class_schedule
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `, [healthCenterId, 'hybrid', 'English', 12, 60.00, 15, 'open', 'Saturdays 10:00 AM - 11:30 AM']);

    // Virtual program
    const virtualProgram = await client.query(`
      INSERT INTO programs (
        organization_name, 
        cdc_recognition_status, 
        mdpp_supplier, 
        contact_phone, 
        contact_email, 
        description,
        website_url
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7
      ) RETURNING id, organization_name;
    `, [
      'Georgia Virtual Wellness',
      'CDC-Recognized',
      true,
      '(555) 456-7890',
      'support@gavirtual.org',
      'Fully virtual diabetes prevention program accessible from anywhere in Georgia. Features live coaching sessions and mobile app support.',
      'https://gavirtual.org'
    ]);
    
    const virtualId = virtualProgram.rows[0].id;
    console.log('✅ Virtual Program created:', virtualProgram.rows[0]);
    
    // Add Virtual location (state-wide)
    await client.query(`
      INSERT INTO program_locations (
        program_id,
        address_line1,
        city,
        state,
        zip_code
      ) VALUES ($1, $2, $3, $4, $5);
    `, [virtualId, 'Online/Virtual', 'Statewide', 'GA', '30000']);
    
    // Add Virtual program details
    await client.query(`
      INSERT INTO program_details (
        program_id,
        delivery_mode,
        language,
        duration_weeks,
        cost,
        max_participants,
        enrollment_status,
        class_schedule
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `, [virtualId, 'virtual-live', 'English', 16, 45.00, 25, 'open', 'Wednesdays 7:00 PM - 8:00 PM']);

    console.log('\n🎉 All sample programs added successfully!');
    console.log('\nYou can now test the chatbot with queries like:');
    console.log('- "Tell me about LCI"');
    console.log('- "What is LCI Health?"');
    console.log('- "More information about Riverside Medical Center"');
    console.log('- "Details about virtual wellness programs"');

  } catch (error) {
    console.error('❌ Error adding sample programs:', error.message);
  } finally {
    await client.end();
  }
}

addSamplePrograms();
