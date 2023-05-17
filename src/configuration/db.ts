/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';

//import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Historial } from '../entities/historial.entitie';
import { Parqueadero } from '../entities/parqueadero.entitie';
import { Usuario } from '../entities/Usuario.entitie';
import { Vehiculo } from '../entities/vehiculo.entitie';
import config from './config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.dbHost,
  port: config.dbPort as number,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  entities: [Usuario, Parqueadero, Vehiculo, Historial],
  synchronize: true,
  logging: true,
  //namingStrategy: new SnakeNamingStrategy(),
  subscribers: [],
  migrations: [],
});
