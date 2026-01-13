import { sql } from '../lib/db.js';

async function showDatabaseInfo() {
  try {
    console.log('🔍 Database Connection Info:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Show database version and basic info
    const version = await sql`SELECT version()`;
    console.log('📝 PostgreSQL Version:', version.rows[0].version.split(' ')[0] + ' ' + version.rows[0].version.split(' ')[1]);
    
    // Show current database name
    const dbName = await sql`SELECT current_database()`;
    console.log('🗄️  Database Name:', dbName.rows[0].current_database);
    
    // Show current user
    const user = await sql`SELECT current_user`;
    console.log('👤 Current User:', user.rows[0].current_user);
    
    // Show all tables in our schema
    console.log('\n📋 Tables in Database:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const tables = await sql`
      SELECT 
        tablename,
        schemaname
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `;
    
    for (const table of tables.rows) {
      console.log(`📊 ${table.tablename}`);
      
      // Get column info for each table
      const columns = await sql`
        SELECT 
          column_name,
          data_type,
          is_nullable,
          column_default
        FROM information_schema.columns
        WHERE table_name = ${table.tablename}
        AND table_schema = 'public'
        ORDER BY ordinal_position
      `;
      
      for (const col of columns.rows) {
        const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
        const defaultVal = col.column_default ? ` DEFAULT ${col.column_default}` : '';
        console.log(`   ├─ ${col.column_name}: ${col.data_type} ${nullable}${defaultVal}`);
      }
      console.log('');
    }
    
    // Show foreign key relationships
    console.log('🔗 Foreign Key Relationships:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const fkeys = await sql`
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
    
    for (const fk of fkeys.rows) {
      console.log(`🔗 ${fk.table_name}.${fk.column_name} → ${fk.foreign_table_name}.${fk.foreign_column_name}`);
    }
    
    // Show row counts
    console.log('\n📊 Data Counts:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    for (const table of tables.rows) {
      const count = await sql.unsafe(`SELECT COUNT(*) as count FROM ${table.tablename}`);
      console.log(`📈 ${table.tablename}: ${count.rows[0].count} rows`);
    }
    
    console.log('\n✅ Database exploration complete!');
    console.log('\n💡 To connect with a GUI tool like DBeaver:');
    console.log('   Host: Your Neon host (from Vercel env vars)');
    console.log('   Port: 5432');
    console.log('   Database: ' + dbName.rows[0].current_database);
    console.log('   Username: Your Neon username (from Vercel env vars)');
    console.log('   Password: Your Neon password (from Vercel env vars)');
    
  } catch (error) {
    console.error('❌ Error exploring database:', error.message);
  }
}

showDatabaseInfo();
