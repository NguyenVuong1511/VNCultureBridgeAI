const sql = require('mssql');
const sqlNative = require('mssql/msnodesqlv8');
const { env } = require('./env');

let pool;

async function getPool() {
  if (pool) {
    return pool;
  }

  const driver = env.dbAuthMode === 'windows' ? sqlNative : sql;
  pool = await driver.connect(env.db);
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
