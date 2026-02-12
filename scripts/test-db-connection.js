#!/usr/bin/env node
/**
 * Test database connection - run from DDT-copy: node scripts/test-db-connection.js
 */
import dotenv from 'dotenv';
import path from 'path';

// Load env exactly like the app (DDT-copy first, then DDT fallback)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
  const ddtEnv = path.resolve(process.cwd(), '../DDT/.env.local');
  console.log('No DATABASE_URL in DDT-copy, trying fallback:', ddtEnv);
  dotenv.config({ path: ddtEnv });
}

console.log('DATABASE_URL set:', !!process.env.DATABASE_URL);
console.log('POSTGRES_URL set:', !!process.env.POSTGRES_URL);
if (process.env.DATABASE_URL) {
  const url = process.env.DATABASE_URL;
  // Show host only (hide credentials)
  const hostMatch = url.match(/@([^\/]+)/);
  console.log('Connection host:', hostMatch ? hostMatch[1] : '(could not parse)');
}

const { createDbClient } = await import('../lib/local-db.js');

async function test() {
  const client = createDbClient();
  try {
    await client.connect();
    console.log('✅ Connected successfully');
    const r = await client.query('SELECT 1 as ok');
    console.log('Query test:', r.rows[0]);
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    if (err.code) console.error('   Code:', err.code);
    process.exit(1);
  } finally {
    await client.end();
  }
}

test();
