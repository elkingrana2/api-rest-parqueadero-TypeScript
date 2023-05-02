/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Client } from 'pg';

// CONEXION A PG EN DOCKER
// async function getConnection() {
//   const client = new Client({
//     host: 'localhost',
//     port: 5432,
//     user: 'elkin',
//     password: 'admin123',
//     database: 'db_parking',
//   });
//   await client.connect();
//   return client;
// }

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '',
    database: 'db_parqueadero_ts',
  });
  await client.connect();
  return client;
}

export default getConnection;
