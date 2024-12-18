import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables
config({ path: join(__dirname, '../../.env') });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'development', // Auto-sync database in development
  logging: process.env.NODE_ENV === 'development',
  entities: [join(__dirname, '../entities/**/*.{ts,js}')],
  migrations: [join(__dirname, '../migrations/**/*.{ts,js}')],
  subscribers: [join(__dirname, '../subscribers/**/*.{ts,js}')],
}); 