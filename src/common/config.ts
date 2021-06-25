import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const { PORT, NODE_ENV, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD,
  POSTGRES_DB, POSTGRES_HOST,  JWT_SECRET_KEY, AUTH_MODE } = process.env;
const AUTHORIZATION_MODE = AUTH_MODE === 'true';

export { PORT, NODE_ENV,
  JWT_SECRET_KEY, AUTHORIZATION_MODE, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD,
  POSTGRES_DB, POSTGRES_HOST };


