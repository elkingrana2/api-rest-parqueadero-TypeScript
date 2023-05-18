/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { getConnection, getRepository } from 'typeorm';

import { Historial } from '../entities/historial.entitie';

class HistorialService {
  async getTop10PlacasVehiculos(): Promise<Response | void> {
    // const historial = await Historial.find({
    //   where: { id: 1 },
    // })
    console.log(`ACA LLEGA`);
    const queryResult = await getConnection()
      .createQueryBuilder()
      .select('placa_vehiculo, COUNT(*) as veces_registrado')
      .from(Historial, 'historial')
      .groupBy('placa_vehiculo')
      .orderBy('veces_registrado', 'DESC')
      .limit(10)
      .getRawMany();

    console.log(`Esto trajo la consulta`, queryResult);
  }
}

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

export default HistorialService;
