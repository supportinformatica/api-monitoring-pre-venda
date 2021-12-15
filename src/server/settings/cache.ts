const REDIS_HOST = process.env.REDIS_HOST || 'localhost';

const REDIS_PORT = process.env.REDIS_PORT || '6379';

export const REDIS_URI = process.env.REDIS_TLS_URL || `redis://@${REDIS_HOST}:${REDIS_PORT}`;

export const REDIS_TIMEOUT = 1000 * 10; // 5seg

// TODO: UM MINUTO PARA CACHE

// export const REDIS_EXPIRATION_TIME = 1000 * 60 * 60; // 1min

export const REDIS_EXPIRATION_TIME = 1000 * 30;

export const REDIS_EX_MODE = 'ex'; // seconds

export const REDIS_PX_MODE = 'px'; // milliseconds
