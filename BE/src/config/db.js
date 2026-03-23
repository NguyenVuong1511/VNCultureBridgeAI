const sql = require('mssql');
const { env } = require('./env');

let pool;

async function getPool() {
  if (pool) {
    return pool;
  }

  pool = await sql.connect(env.db);
  return pool;
}

async function query(command, bindings = {}) {
  const connection = await getPool();
  const request = connection.request();

  Object.entries(bindings).forEach(([key, value]) => {
    request.input(key, value);
  });

  const result = await request.query(command);
  return result.recordset;
}

module.exports = {
  sql,
  getPool,
  query
};
