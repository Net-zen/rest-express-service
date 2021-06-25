import {ConnectionOptions} from 'typeorm';
import path from 'path';
import { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD,
  POSTGRES_DB, POSTGRES_HOST } from './common/config';


const config: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST || 'localhost',
  port: POSTGRES_PORT ? parseInt(POSTGRES_PORT, 10) : 5432,
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'password',
  database: POSTGRES_DB || 'postgres',
  entities: [path.join(__dirname, '/**/*.model{.ts,.js}')],
  synchronize: false,
  migrationsRun: true,
  connectTimeoutMS: 60000,
  migrations: [path.join(__dirname, '/migrations/**/*{.ts,.js}')],
  cli: {
    migrationsDir: './src/migrations',
  },
};

export default config;
