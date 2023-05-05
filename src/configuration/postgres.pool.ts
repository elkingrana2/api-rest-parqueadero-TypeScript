/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable prettier/prettier */
import { Pool } from 'pg';

import config from './config';
//import config from './config';

const USER = encodeURIComponent(config.dbUser as string);
const PASSWORD = encodeURIComponent(config.dbPassword as string);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

export const pool = new Pool({ connectionString: URI });

export default pool;
