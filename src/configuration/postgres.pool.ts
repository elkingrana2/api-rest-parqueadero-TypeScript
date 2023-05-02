/* eslint-disable prettier/prettier */
import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: '',
  database: 'db_parqueadero_ts',
  port: 5432,
});

export default pool;
