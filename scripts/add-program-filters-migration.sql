-- Migration: Add program filter columns for expanded search
-- Run with: psql -d ddt_database -f scripts/add-program-filters-migration.sql
-- Or: cat scripts/add-program-filters-migration.sql | psql $DATABASE_URL

-- Add new columns to program_details for filtering
ALTER TABLE program_details ADD COLUMN IF NOT EXISTS free_or_low_cost BOOLEAN DEFAULT FALSE;
ALTER TABLE program_details ADD COLUMN IF NOT EXISTS insurance_covered BOOLEAN DEFAULT FALSE;
ALTER TABLE program_details ADD COLUMN IF NOT EXISTS whole_health_focus BOOLEAN DEFAULT FALSE;
ALTER TABLE program_details ADD COLUMN IF NOT EXISTS caregiver_family_friendly BOOLEAN DEFAULT FALSE;
ALTER TABLE program_details ADD COLUMN IF NOT EXISTS languages TEXT[];
ALTER TABLE program_details ADD COLUMN IF NOT EXISTS accessibility_options TEXT[] DEFAULT '{}';
ALTER TABLE program_details ADD COLUMN IF NOT EXISTS faith_based BOOLEAN DEFAULT FALSE;
ALTER TABLE program_details ADD COLUMN IF NOT EXISTS glp1_specific BOOLEAN DEFAULT FALSE;

-- Ensure insurance_accepted exists (it may already)
-- ALTER TABLE program_details ADD COLUMN IF NOT EXISTS insurance_accepted TEXT[];
