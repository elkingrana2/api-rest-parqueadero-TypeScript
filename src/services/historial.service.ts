/* eslint-disable prettier/prettier */
import { getRepository } from 'typeorm';

import { Historial } from '../entities/historial.entitie';

interface Top10PlacasVehiculos {
  placa: string;
  numeroIngresos: number;
}

// optener el top 10 de vehiculos que mas ingresan a todos los parqueaderos
// @Query(value = "SELECT placa_vehiculo, COUNT(*) as veces_registrado FROM historial GROUP BY placa_vehiculo ORDER BY veces_registrado DESC LIMIT 10", nativeQuery = true)
export const getTop10PlacasVehiculos = async (): Promise<
  Top10PlacasVehiculos[]
> => {
  const historial = await getRepository(Historial)
    .createQueryBuilder('historial')
    .select('historial.placaVehiculo', 'placa')
    .addSelect('COUNT(*)', 'numeroIngresos')
    .groupBy('historial.placaVehiculo')
    .orderBy('numeroIngresos', 'DESC')
    .limit(10)
    .getRawMany();

  return historial as Top10PlacasVehiculos[];
};

// async getParqueaderos(): Promise<Parqueadero[]> {
//   const parqueadero = Parqueadero.find();

//   return parqueadero;
// }
