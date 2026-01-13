import { sql } from '../lib/db.js';

const samplePrograms = [
  {
    organization: "Atlanta Diabetes Prevention Center",
    location: { city: "Atlanta", state: "GA", zip: "30309", address: "123 Peachtree St" },
    details: { mode: "in-person", language: "English", cost: 75.00, weeks: 16 }
  },
  {
    organization: "Virtual Health Solutions",
    location: { city: "Remote", state: "GA", zip: "00000", address: "Online Platform" },
    details: { mode: "virtual-live", language: "English", cost: 0.00, weeks: 12 }
  },
  {
    organization: "Community Wellness Network",
    location: { city: "Savannah", state: "GA", zip: "31401", address: "456 River St" },
    details: { mode: "hybrid", language: "Spanish", cost: 25.00, weeks: 16 }
  },
  {
    organization: "Northside Medical Center",
    location: { city: "Roswell", state: "GA", zip: "30075", address: "789 Medical Plaza" },
    details: { mode: "in-person", language: "English", cost: 100.00, weeks: 20 }
  },
  {
    organization: "Flexible Learning Health",
    location: { city: "Remote", state: "FL", zip: "00000", address: "Self-Paced Online" },
    details: { mode: "virtual-self-paced", language: "English", cost: 49.99, weeks: 24 }
  }
];

export async function populateSampleData() {
  try {
    console.log('🌱 Populating sample program data...');
    
    for (const program of samplePrograms) {
      // Insert program
      const programResult = await sql`
        INSERT INTO programs (
          organization_name, 
          cdc_recognition_status, 
          mdpp_supplier, 
          contact_phone, 
          contact_email, 
          description
        ) VALUES (
          ${program.organization},
          'CDC-Recognized',
          ${Math.random() > 0.5},
          '(555) 123-4567',
          ${`contact@${program.organization.toLowerCase().replace(/\s+/g, '')}.org`},
          ${`Comprehensive diabetes prevention program offered by ${program.organization}`}
        ) RETURNING id;
      `;
      
      const programId = programResult.rows[0].id;
      
      // Insert location
      await sql`
        INSERT INTO program_locations (
          program_id,
          address_line1,
          city,
          state,
          zip_code
        ) VALUES (
          ${programId},
          ${program.location.address},
          ${program.location.city},
          ${program.location.state},
          ${program.location.zip}
        );
      `;
      
      // Insert program details
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
          ${program.details.mode},
          ${program.details.language},
          ${program.details.weeks},
          ${program.details.cost},
          ${Math.floor(Math.random() * 20) + 10},
          'open'
        );
      `;
      
      console.log(`✅ Added: ${program.organization}`);
    }
    
    console.log('🎉 Sample data populated successfully!');
    return { success: true };
    
  } catch (error) {
    console.error('❌ Error populating sample data:', error);
    return { success: false, error: error.message };
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  populateSampleData();
}
