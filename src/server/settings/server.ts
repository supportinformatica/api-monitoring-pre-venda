export const HOST = process.env.HOST || '0.0.0.0';

export const PORT = process.env.PORT || 8080;
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const DEFAULT_PHONE_NUMBER = Number(process.env.DEFAULT_PHONE_NUMBER) || 99999999999;
