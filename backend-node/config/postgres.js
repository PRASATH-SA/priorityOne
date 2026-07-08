const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

pool.on('connect', () => {
  console.log('PostgreSQL Connected');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
