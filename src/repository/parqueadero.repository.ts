/* eslint-disable prettier/prettier */

import { Parqueadero } from '../entities/parqueadero.entitie';

class ParqueaderoRepository extends Parqueadero {
  // optener un parqueadero por id con la relacion de usuario
  async getParqueadero(id: number): Promise<Parqueadero | null> {
    const parqueadero1 = await Parqueadero.findOne({
      where: { id },
      relations: ['usuario'],
    });

    return parqueadero1;
  }

  async getParqueaderos(): Promise<Parqueadero[]> {
    const parqueaderos = await Parqueadero.find();

    return parqueaderos;
  }

  async getParqueaderoById(idParqueadero: number): Promise<Parqueadero | null> {
    const parqueadero = await Parqueadero.findOne({
      where: { id: idParqueadero },
      relations: ['usuario', 'vehiculos'],
    });

    return parqueadero;
  }

  // listado de vehiculos que estan en el parqueadero
  async getVehiculosParqueadero(
    idParqueadero: number
  ): Promise<Parqueadero | null> {
    const parqueadero = await Parqueadero.findOne({
      where: { id: idParqueadero },
      relations: ['usuario', 'vehiculos', 'vehiculos.historial'],
      // traer tambien el historial que esta en la tabla vehiculo
    });

    return parqueadero;
  }

  
}

export default ParqueaderoRepository;
