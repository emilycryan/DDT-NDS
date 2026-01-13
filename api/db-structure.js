import { sql } from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get database info
    const version = await sql`SELECT version()`;
    const dbName = await sql`SELECT current_database()`;
    const user = await sql`SELECT current_user`;

    // Get all tables
    const tables = await sql`
      SELECT 
        tablename,
        schemaname
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `;

    // Get detailed table structure
    const tableStructures = {};
    
    for (const table of tables.rows) {
      // Get columns
      const columns = await sql`
        SELECT 
          column_name,
          data_type,
          is_nullable,
          column_default,
          character_maximum_length
        FROM information_schema.columns
        WHERE table_name = ${table.tablename}
        AND table_schema = 'public'
        ORDER BY ordinal_position
      `;

      // Get row count
      let count;
      if (table.tablename === 'programs') {
        count = await sql`SELECT COUNT(*) as count FROM programs`;
      } else if (table.tablename === 'program_locations') {
        count = await sql`SELECT COUNT(*) as count FROM program_locations`;
      } else if (table.tablename === 'program_details') {
        count = await sql`SELECT COUNT(*) as count FROM program_details`;
      } else if (table.tablename === 'assessment_results') {
        count = await sql`SELECT COUNT(*) as count FROM assessment_results`;
      } else {
        count = { rows: [{ count: 0 }] };
      }

      tableStructures[table.tablename] = {
        columns: columns.rows,
        rowCount: parseInt(count.rows[0].count)
      };
    }

    // Get foreign keys
    const foreignKeys = await sql`
      SELECT
        tc.table_name,
        kcu.column_name,
        ccu.table_name AS foreign_table_name,
        ccu.column_name AS foreign_column_name
      FROM information_schema.table_constraints AS tc
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
        AND ccu.table_schema = tc.table_schema
      WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_schema = 'public'
      ORDER BY tc.table_name, kcu.column_name
    `;

    return res.status(200).json({
      database: {
        name: dbName.rows[0].current_database,
        version: version.rows[0].version.split(' ')[1],
        user: user.rows[0].current_user
      },
      tables: tableStructures,
      foreignKeys: foreignKeys.rows,
      summary: {
        totalTables: tables.rows.length,
        totalForeignKeys: foreignKeys.rows.length
      }
    });

  } catch (error) {
    console.error('Database structure error:', error);
    return res.status(500).json({ 
      message: 'Error getting database structure',
      error: error.message 
    });
  }
}
