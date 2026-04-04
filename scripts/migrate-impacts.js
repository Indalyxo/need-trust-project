const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  // Read database URL from environment
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('DATABASE_URL environment variable is required');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: databaseUrl,
  });

  try {
    // Read the SQL migration file
    const sqlPath = path.join(__dirname, 'remove-impact-fields.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Running migration to remove impact fields...');
    await pool.query(sql);
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();