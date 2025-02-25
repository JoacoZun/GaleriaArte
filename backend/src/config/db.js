const { Pool } = require('pg');
require('dotenv').config();

const isTestEnv = process.env.ENV_NAME === 'development';

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: isTestEnv ? process.env.PGTESTDATABASE : process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

module.exports = { pool };
