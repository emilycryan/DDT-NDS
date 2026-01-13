-- Create programs table
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

-- Create program_locations table
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

-- Create program_details table
CREATE TABLE IF NOT EXISTS program_details (
  id SERIAL PRIMARY KEY,
  program_id INTEGER REFERENCES programs(id) ON DELETE CASCADE,
  delivery_mode VARCHAR(50),
  language VARCHAR(50) DEFAULT 'English',
  class_schedule TEXT,
  duration_weeks INTEGER,
  cost DECIMAL(10,2),
  insurance_accepted TEXT[],
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  enrollment_status VARCHAR(20) DEFAULT 'open',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create assessment_results table (optional, for future use)
CREATE TABLE IF NOT EXISTS assessment_results (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255),
  risk_level VARCHAR(20),
  recommended_program_types TEXT[],
  assessment_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);


