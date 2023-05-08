/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';

import { Historial } from '../entities/historial.entitie';
import { Parqueadero } from '../entities/parqueadero.entitie';
import { Usuario } from '../entities/Usuario.entitie';
import { Vehiculo } from '../entities/vehiculo.entitie';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'db_parking',
  entities: [Usuario, Parqueadero, Vehiculo, Historial],
  synchronize: true,
  logging: true,
  subscribers: [],
  migrations: [],
});
