import { sql } from '@vercel/postgres';

// Database connection utility
export { sql };

// Helper function to initialize database tables
export async function initializeDatabase() {
  try {
    // Create programs table
    await sql`
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
    `;

    // Create program_locations table
    await sql`
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
    `;

    // Create program_details table
    await sql`
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
    `;

    // Create assessment_results table (for user assessments)
    await sql`
      CREATE TABLE IF NOT EXISTS assessment_results (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255),
        risk_level VARCHAR(20), -- 'low', 'medium', 'high'
        recommended_program_types TEXT[],
        assessment_data JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    console.log('Database tables initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('Error initializing database:', error);
    return { success: false, error: error.message };
  }
}

// Helper function to search programs by location
export async function searchProgramsByLocation(zipCode, state, city, radius = 25) {
  try {
    // Build query dynamically based on provided parameters
    if (state && city && zipCode) {
      const programs = await sql`
        SELECT 
          p.*,
          pl.address_line1,
          pl.address_line2,
          pl.city,
          pl.state,
          pl.zip_code,
          pd.delivery_mode,
          pd.language,
          pd.enrollment_status
        FROM programs p
        LEFT JOIN program_locations pl ON p.id = pl.program_id
        LEFT JOIN program_details pd ON p.id = pd.program_id
        WHERE pl.state = ${state} AND pl.city ILIKE ${`%${city}%`} AND pl.zip_code = ${zipCode}
        ORDER BY p.organization_name
      `;
      return programs.rows;
    } else if (state && city) {
      const programs = await sql`
        SELECT 
          p.*,
          pl.address_line1,
          pl.address_line2,
          pl.city,
          pl.state,
          pl.zip_code,
          pd.delivery_mode,
          pd.language,
          pd.enrollment_status
        FROM programs p
        LEFT JOIN program_locations pl ON p.id = pl.program_id
        LEFT JOIN program_details pd ON p.id = pd.program_id
        WHERE pl.state = ${state} AND pl.city ILIKE ${`%${city}%`}
        ORDER BY p.organization_name
      `;
      return programs.rows;
    } else if (state) {
      const programs = await sql`
        SELECT 
          p.*,
          pl.address_line1,
          pl.address_line2,
          pl.city,
          pl.state,
          pl.zip_code,
          pd.delivery_mode,
          pd.language,
          pd.enrollment_status
        FROM programs p
        LEFT JOIN program_locations pl ON p.id = pl.program_id
        LEFT JOIN program_details pd ON p.id = pd.program_id
        WHERE pl.state = ${state}
        ORDER BY p.organization_name
      `;
      return programs.rows;
    } else if (city) {
      const programs = await sql`
        SELECT 
          p.*,
          pl.address_line1,
          pl.address_line2,
          pl.city,
          pl.state,
          pl.zip_code,
          pd.delivery_mode,
          pd.language,
          pd.enrollment_status
        FROM programs p
        LEFT JOIN program_locations pl ON p.id = pl.program_id
        LEFT JOIN program_details pd ON p.id = pd.program_id
        WHERE pl.city ILIKE ${`%${city}%`}
        ORDER BY p.organization_name
      `;
      return programs.rows;
    } else if (zipCode) {
      const programs = await sql`
        SELECT 
          p.*,
          pl.address_line1,
          pl.address_line2,
          pl.city,
          pl.state,
          pl.zip_code,
          pd.delivery_mode,
          pd.language,
          pd.enrollment_status
        FROM programs p
        LEFT JOIN program_locations pl ON p.id = pl.program_id
        LEFT JOIN program_details pd ON p.id = pd.program_id
        WHERE pl.zip_code = ${zipCode}
        ORDER BY p.organization_name
      `;
      return programs.rows;
    } else {
      // Return all programs if no filters provided
      const programs = await sql`
        SELECT 
          p.*,
          pl.address_line1,
          pl.address_line2,
          pl.city,
          pl.state,
          pl.zip_code,
          pd.delivery_mode,
          pd.language,
          pd.enrollment_status
        FROM programs p
        LEFT JOIN program_locations pl ON p.id = pl.program_id
        LEFT JOIN program_details pd ON p.id = pd.program_id
        ORDER BY p.organization_name
      `;
      return programs.rows;
    }
  } catch (error) {
    console.error('Error searching programs:', error);
    throw error;
  }
}

// Helper function to get program recommendations based on assessment
export async function getRecommendedPrograms(assessmentData) {
  try {
    // This is a simplified recommendation logic
    // You can enhance this based on your assessment criteria
    const deliveryModes = assessmentData.preferredDeliveryModes || ['in-person', 'virtual-live'];
    const location = assessmentData.location || {};
    
    const programs = await sql`
      SELECT 
        p.*,
        pl.city,
        pl.state,
        pl.zip_code,
        pd.delivery_mode,
        pd.language,
        pd.enrollment_status,
        pd.cost
      FROM programs p
      LEFT JOIN program_locations pl ON p.id = pl.program_id
      LEFT JOIN program_details pd ON p.id = pd.program_id
      WHERE 
        pd.delivery_mode = ANY(${deliveryModes})
        AND pd.enrollment_status = 'open'
        AND (${location.state} IS NULL OR pl.state = ${location.state})
      ORDER BY 
        CASE WHEN pl.state = ${location.state} THEN 1 ELSE 2 END,
        p.organization_name
      LIMIT 10;
    `;
    
    return programs.rows;
  } catch (error) {
    console.error('Error getting recommended programs:', error);
    throw error;
  }
}
