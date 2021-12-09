export const MSSQL_HOST = process.env.MSSQL_HOST || 'localhost';
export const MSSQL_PORT = Number(process.env.MSSQL_PORT) || 1433;
export const MSSQL_NAME = process.env.MSSQL_NAME || 'root';
export const MSSQL_USER = process.env.MSSQL_USER || 'root';
export const MSSQL_PASS = process.env.MSSQL_PASS || 'root';

const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_PORT } = process.env;

export const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}`;

export const MONGO_NAME = process.env.MONGO_NAME || 'test';
