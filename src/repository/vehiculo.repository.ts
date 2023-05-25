/* eslint-disable prettier/prettier */
import { Vehiculo } from '../entities/vehiculo.entitie';

/* eslint-disable prettier/prettier */
class VehiculoRepository extends Vehiculo {
  // buscar un vehiculo por la placa
  async findVehiculoByPlaca(placa: string): Promise<Vehiculo | null> {
    const vehiculo = await Vehiculo.findOne({
      where: { placa },
      relations: ['parqueadero'],
    });

    return vehiculo;
  }

  async getDetalleVehiculo(placa: string): Promise<Vehiculo | null> {
    const vehiculo = await Vehiculo.findOne({
      where: { placa },
      relations: ['historial', 'parqueadero.usuario'],
    });

    return vehiculo;
  }
}

export default VehiculoRepository;
