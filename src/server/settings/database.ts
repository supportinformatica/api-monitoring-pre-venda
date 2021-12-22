/**  SQL Server config (APP) */
export const APP_CONNECTION_NAME = process.env.APP_CONNECTION_NAME || 'app';
export const MSSQL_APP_HOST = process.env.MSSQL_APP_HOST || 'localhost';
export const MSSQL_APP_PORT = Number(process.env.MSSQL_APP_PORT) || 1433;
export const MSSQL_APP_NAME = process.env.MSSQL_APP_NAME || 'root';
export const MSSQL_APP_USER = process.env.MSSQL_APP_USER || 'root';
export const MSSQL_APP_PASS = process.env.MSSQL_APP_PASS || 'root';

/**  SQL Server config (ADMIN) */
export const ADMIN_CONNECTION_NAME = process.env.ADMIN_CONNECTION_NAME || 'admin';
export const MSSQL_ADMIN_HOST = process.env.MSSQL_ADMIN_HOST || 'localhost';
export const MSSQL_ADMIN_PORT = Number(process.env.MSSQL_ADMIN_PORT) || 1433;
export const MSSQL_ADMIN_NAME = process.env.MSSQL_ADMIN_NAME || 'root';
export const MSSQL_ADMIN_USER = process.env.MSSQL_ADMIN_USER || 'root';
export const MSSQL_ADMIN_PASS = process.env.MSSQL_ADMIN_PASS || 'root';

/** Mongo config  */
const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_PORT } = process.env;

export const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}`;

export const MONGO_NAME = process.env.MONGO_NAME || 'test';
