const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'user',
  password: '5w7aybjz',
  port: 5432,
});

module.exports = pool;
