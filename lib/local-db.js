import dotenv from 'dotenv';
import pkg from 'pg';

const { Client } = pkg;

// Load environment variables
dotenv.config({ path: '.env.local' });

// Create a connection pool function
export function createDbClient() {
  // Check if DATABASE_URL is set (Neon, Supabase, or other Postgres)
  if (process.env.DATABASE_URL) {
    const connectionString = process.env.DATABASE_URL;
    const isNeon = connectionString.includes('neon.tech');
    console.log(`🔌 Using ${isNeon ? 'Neon' : 'cloud'} database connection`);

    // Neon and some providers use URLs without port (e.g. host/dbname?sslmode=require).
    // Only parse when we have host:port; otherwise use connectionString so pg handles it.
    const match = connectionString.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+?)(?:\?|$)/);
    if (match) {
      const [, user, password, host, port, database] = match;
      return new Client({
        host,
        port: parseInt(port, 10),
        database: database.split('?')[0],
        user: decodeURIComponent(user),
        password: decodeURIComponent(password),
        ssl: { rejectUnauthorized: false },
      });
    }
    // Use full connection string (required for Neon-style URLs with no port, or with ?sslmode=require)
    return new Client({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
  }
  
  // Fall back to local database
  console.log('🔌 Using local database connection');
  return new Client({
    host: 'localhost',
    port: 5432,
    database: 'ddt_database',
    user: '63172',
    // No password needed for local development
  });
}

// Helper function to search programs by location
export async function searchProgramsByLocation(zipCode, state, city, radius = 25) {
  const client = createDbClient();
  
  try {
    await client.connect();
    console.log('✅ Database connected successfully');
    
    // Build query dynamically based on provided parameters
    if (state && city && zipCode) {
      const result = await client.query(`
        SELECT 
          p.*,
          pl.address_line1,
          pl.address_line2,
          pl.city,
          pl.state,
          pl.zip_code,
          pl.latitude,
          pl.longitude,
          pd.delivery_mode,
          pd.language,
          pd.enrollment_status,
          pd.cost,
          pd.duration_weeks,
          pd.max_participants,
          pd.current_participants
        FROM programs p
        LEFT JOIN program_locations pl ON p.id = pl.program_id
        LEFT JOIN program_details pd ON p.id = pd.program_id
        WHERE pl.state = $1 AND pl.city ILIKE $2 AND pl.zip_code = $3
        ORDER BY p.organization_name
      `, [state, `%${city}%`, zipCode]);
      return result.rows;
      
    } else if (state && city) {
      const result = await client.query(`
        SELECT 
          p.*,
          pl.address_line1,
          pl.address_line2,
          pl.city,
          pl.state,
          pl.zip_code,
          pl.latitude,
          pl.longitude,
          pd.delivery_mode,
          pd.language,
          pd.enrollment_status,
          pd.cost,
          pd.duration_weeks,
          pd.max_participants,
          pd.current_participants
        FROM programs p
        LEFT JOIN program_locations pl ON p.id = pl.program_id
        LEFT JOIN program_details pd ON p.id = pd.program_id
        WHERE pl.state = $1 AND pl.city ILIKE $2
        ORDER BY p.organization_name
      `, [state, `%${city}%`]);
      return result.rows;
      
    } else if (state) {
      const result = await client.query(`
        SELECT 
          p.*,
          pl.address_line1,
          pl.address_line2,
          pl.city,
          pl.state,
          pl.zip_code,
          pl.latitude,
          pl.longitude,
          pd.delivery_mode,
          pd.language,
          pd.enrollment_status,
          pd.cost,
          pd.duration_weeks,
          pd.max_participants,
          pd.current_participants
        FROM programs p
        LEFT JOIN program_locations pl ON p.id = pl.program_id
        LEFT JOIN program_details pd ON p.id = pd.program_id
        WHERE pl.state = $1
        ORDER BY p.organization_name
      `, [state]);
      return result.rows;
      
    } else if (city) {
      const result = await client.query(`
        SELECT 
          p.*,
          pl.address_line1,
          pl.address_line2,
          pl.city,
          pl.state,
          pl.zip_code,
          pl.latitude,
          pl.longitude,
          pd.delivery_mode,
          pd.language,
          pd.enrollment_status,
          pd.cost,
          pd.duration_weeks,
          pd.max_participants,
          pd.current_participants
        FROM programs p
        LEFT JOIN program_locations pl ON p.id = pl.program_id
        LEFT JOIN program_details pd ON p.id = pd.program_id
        WHERE pl.city ILIKE $1
        ORDER BY p.organization_name
      `, [`%${city}%`]);
      return result.rows;
      
    } else if (zipCode) {
      const result = await client.query(`
        SELECT 
          p.*,
          pl.address_line1,
          pl.address_line2,
          pl.city,
          pl.state,
          pl.zip_code,
          pl.latitude,
          pl.longitude,
          pd.delivery_mode,
          pd.language,
          pd.enrollment_status,
          pd.cost,
          pd.duration_weeks,
          pd.max_participants,
          pd.current_participants
        FROM programs p
        LEFT JOIN program_locations pl ON p.id = pl.program_id
        LEFT JOIN program_details pd ON p.id = pd.program_id
        WHERE pl.zip_code = $1
        ORDER BY p.organization_name
      `, [zipCode]);
      return result.rows;
      
    } else {
      // Return all programs if no filters provided
      const result = await client.query(`
        SELECT 
          p.*,
          pl.address_line1,
          pl.address_line2,
          pl.city,
          pl.state,
          pl.zip_code,
          pl.latitude,
          pl.longitude,
          pd.delivery_mode,
          pd.language,
          pd.enrollment_status,
          pd.cost,
          pd.duration_weeks,
          pd.max_participants,
          pd.current_participants
        FROM programs p
        LEFT JOIN program_locations pl ON p.id = pl.program_id
        LEFT JOIN program_details pd ON p.id = pd.program_id
        ORDER BY p.organization_name
      `);
      return result.rows;
    }
  } catch (error) {
    console.error('❌ Error searching programs:', error.message);
    console.error('   Code:', error.code);
    console.error('   Detail:', error.detail);
    throw error;
  } finally {
    await client.end();
  }
}

// Helper function to search programs by delivery mode
export async function searchProgramsByDeliveryMode(deliveryMode) {
  const client = createDbClient();
  
  try {
    await client.connect();
    console.log('✅ Database connected successfully');
    
    // Map common keywords to delivery mode values
    const normalizedMode = deliveryMode.toLowerCase().trim();
    let modesToSearch = [];
    
    // Handle exact matches first
    if (normalizedMode === 'virtual-live' || normalizedMode === 'virtual-self-paced') {
      modesToSearch = [normalizedMode];
    } 
    // Map common keywords to their corresponding database values
    else if (normalizedMode === 'virtual' || normalizedMode === 'remote' || normalizedMode === 'online') {
      // Search for both virtual delivery modes
      modesToSearch = ['virtual-live', 'virtual-self-paced'];
    }
    else if (normalizedMode === 'in-person' || normalizedMode === 'in person') {
      modesToSearch = ['in-person'];
    }
    else if (normalizedMode === 'hybrid') {
      modesToSearch = ['hybrid'];
    }
    else {
      // Fallback: use the input as-is (case-insensitive match)
      modesToSearch = [normalizedMode];
    }
    
    // Build query with proper array handling for PostgreSQL
    // Use array constructor for better compatibility with pg library
    const result = await client.query(`
      SELECT 
        p.*,
        pl.address_line1,
        pl.address_line2,
        pl.city,
        pl.state,
        pl.zip_code,
        pl.latitude,
        pl.longitude,
        pd.delivery_mode,
        pd.language,
        pd.enrollment_status,
        pd.cost,
        pd.duration_weeks,
        pd.max_participants,
        pd.current_participants
      FROM programs p
      LEFT JOIN program_locations pl ON p.id = pl.program_id
      LEFT JOIN program_details pd ON p.id = pd.program_id
      WHERE pd.delivery_mode = ANY($1::text[])
      ORDER BY p.organization_name
    `, [modesToSearch]);
    
    return result.rows;
  } catch (error) {
    console.error('Error searching programs by delivery mode:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Helper function to get a specific program by ID
export async function getProgramById(programId) {
  const client = createDbClient();
  
  try {
    await client.connect();
    
    const result = await client.query(`
      SELECT 
        p.*,
        pl.address_line1,
        pl.address_line2,
        pl.city,
        pl.state,
        pl.zip_code,
        pl.latitude,
        pl.longitude,
        pd.delivery_mode,
        pd.language,
        pd.class_schedule,
        pd.duration_weeks,
        pd.cost,
        pd.insurance_accepted,
        pd.max_participants,
        pd.current_participants,
        pd.enrollment_status
      FROM programs p
      LEFT JOIN program_locations pl ON p.id = pl.program_id
      LEFT JOIN program_details pd ON p.id = pd.program_id
      WHERE p.id = $1
    `, [programId]);
    
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error getting program by ID:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Helper function to get programs by organization name (for chatbot searches)
export async function searchProgramsByName(organizationName) {
  const client = createDbClient();
  
  try {
    await client.connect();
    
    const result = await client.query(`
      SELECT 
        p.*,
        pl.address_line1,
        pl.address_line2,
        pl.city,
        pl.state,
        pl.zip_code,
        pl.latitude,
        pl.longitude,
        pd.delivery_mode,
        pd.language,
        pd.enrollment_status,
        pd.cost,
        pd.duration_weeks,
        pd.class_schedule,
        pd.max_participants,
        pd.current_participants
      FROM programs p
      LEFT JOIN program_locations pl ON p.id = pl.program_id
      LEFT JOIN program_details pd ON p.id = pd.program_id
      WHERE p.organization_name ILIKE $1
      ORDER BY p.organization_name
    `, [`%${organizationName}%`]);
    
    return result.rows;
  } catch (error) {
    console.error('Error searching programs by name:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Helper function to get all programs (for semantic search fallback)
export async function getAllPrograms() {
  const client = createDbClient();
  
  try {
    await client.connect();
    
    const result = await client.query(`
      SELECT 
        p.id,
        p.organization_name,
        p.cdc_recognition_status,
        p.mdpp_supplier,
        p.contact_phone,
        p.contact_email,
        p.website_url,
        p.description,
        p.created_at,
        p.updated_at,
        pl.address_line1,
        pl.address_line2,
        pl.city,
        pl.state,
        pl.zip_code,
        pd.delivery_mode,
        pd.language,
        pd.enrollment_status,
        pd.cost,
        pd.duration_weeks,
        pd.max_participants,
        pd.current_participants
      FROM programs p
      LEFT JOIN program_locations pl ON p.id = pl.program_id
      LEFT JOIN program_details pd ON p.id = pd.program_id
      ORDER BY p.organization_name
    `);
    
    return result.rows;
  } catch (error) {
    console.error('Error getting all programs:', error);
    throw error;
  } finally {
    await client.end();
  }
}
