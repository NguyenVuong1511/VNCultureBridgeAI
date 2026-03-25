const dotenv = require('dotenv');

dotenv.config();

const dbInstance = process.env.DB_INSTANCE || '';
const dbPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : null;
const dbAuthMode = (process.env.DB_AUTH_MODE || 'sql').toLowerCase();
const useWindowsAuth = dbAuthMode === 'windows';
const dbServer = process.env.DB_SERVER || 'localhost';
const dbName = process.env.DB_NAME || '';
const dbEncrypt = process.env.DB_ENCRYPT === 'true';
const dbTrustCert = process.env.DB_TRUST_SERVER_CERTIFICATE !== 'false';

const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'change_me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  dbAuthMode,
  db: useWindowsAuth
    ? {
        connectionString: `server=${dbInstance ? `${dbServer}\\${dbInstance}` : dbServer};Database=${dbName};Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server};TrustServerCertificate=${dbTrustCert ? 'Yes' : 'No'};Encrypt=${dbEncrypt ? 'Yes' : 'No'}`,
        options: {
          trustServerCertificate: dbTrustCert,
        },
      }
    : {
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        server: dbServer,
        database: dbName,
        ...(dbInstance ? {} : { port: dbPort || 1433 }),
        options: {
          encrypt: dbEncrypt,
          trustServerCertificate: dbTrustCert,
          ...(dbInstance ? { instanceName: dbInstance } : {}),
        },
      },
};

module.exports = { env };
