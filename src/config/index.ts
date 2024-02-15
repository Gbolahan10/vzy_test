import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const NODE_ENV = process.env.NODE_ENV as string;
export const PORT = parseInt(process.env.PORT as string, 10);
export const DATABASE_URL = process.env.DATABASE_URL as string;
export const LOG_FORMAT = process.env.LOG_FORMAT as string;
export const ORIGIN = process.env.ORIGIN as string;
export const LOG_DIR = process.env.LOG_DIR as string;
export const SECRET_KEY = process.env.SECRET_KEY as string;
export const ENDPOINT_SECRET = process.env.ENDPOINT_SECRET as string;
export const WEBHOOK_API_KEY = process.env.WEBHOOK_API_KEY as string;


