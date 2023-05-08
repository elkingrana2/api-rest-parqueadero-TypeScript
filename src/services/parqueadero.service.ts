/* eslint-disable no-console */
/* eslint-disable prettier/prettier */

import boom from '@hapi/boom';

import { Historial } from '../entities/historial.entitie';
import { Parqueadero } from '../entities/parqueadero.entitie';
import { Vehiculo } from '../entities/vehiculo.entitie';

class ParqueaderoService {
  async getParqueaderos(): Promise<Parqueadero[]> {
    const parqueadero = Parqueadero.find();

    return parqueadero;
  }

  async getParqueaderoById(idParqueadero: number): Promise<Parqueadero> {
    const parqueadero = await Parqueadero.findOne({
      where: { id: idParqueadero },
      relations: ['usuario'],
    });
    //const parqueadero = await Parqueadero.findOneBy({ id: idParqueadero });
    if (!parqueadero) {
      throw boom.notFound('Parqueadero no encontrado', { idParqueadero });
    }
    //parqueadero.vehiculos = [];

    return parqueadero;
  }

  async createParqueadero(
    nombre: string,
    direccion: string,
    capacidad: number
  ): Promise<Parqueadero> {
    // si el nombre ya existe, no se puede crear
    const parqueaderoExistente = await Parqueadero.findOneBy({ nombre });
    if (parqueaderoExistente) {
      throw boom.badRequest('Ya existe un parqueadero con ese nombre', {
        nombre,
      });
    }
    // ver que la capacidad sea mayor a 0
    if (capacidad <= 0) {
      throw boom.badRequest('La capacidad debe ser mayor a 0', {
        capacidad,
      });
    }

    const parqueadero = new Parqueadero();
    //parqueadero.vehiculos = [];
    parqueadero.espacioDisponible = capacidad;
    parqueadero.nombre = nombre;
    parqueadero.direccion = direccion;
    parqueadero.capacidad = capacidad;
    await parqueadero.save();

    return parqueadero;
  }

  async updateParqueadero(
    idParqueadero: number,
    nombre: string,
    direccion: string,
    capacidad: number
  ): Promise<Parqueadero> {
    const parqueadero = await this.getParqueaderoById(idParqueadero);

    // si el nombre ya existe, no se puede actualizar
    if (parqueadero.nombre !== nombre) {
      const parqueaderoExistente = await Parqueadero.findOneBy({ nombre });
      if (parqueaderoExistente) {
        throw boom.badRequest('Ya existe un parqueadero con ese nombre', {
          nombre,
        });
      }
    }
    // ver que la capacidad sea mayor a 0
    if (capacidad <= 0) {
      throw boom.badRequest('La capacidad debe ser mayor a 0', {
        capacidad,
      });
    }

    if (parqueadero.capacidad - parqueadero.espacioDisponible > capacidad) {
      throw boom.badRequest(
        'La cantidad de vehiculos que hay en el parqueadero registrados es mayor a la disponibilidad que está agregando',
        {
          capacidad,
        }
      );
    }

    parqueadero.nombre = nombre;
    parqueadero.direccion = direccion;

    parqueadero.espacioDisponible =
      capacidad - (parqueadero.capacidad - parqueadero.espacioDisponible);
    parqueadero.capacidad = capacidad;
    await parqueadero.save();

    return parqueadero;
  }

  async deleteParqueadero(idParqueadero: number): Promise<void> {
    const parqueadero = await this.getParqueaderoById(idParqueadero);

    // si el parqueadero tiene vehiculos registrados, no se puede eliminar
    if (parqueadero.capacidad > parqueadero.espacioDisponible) {
      throw boom.badRequest(
        'El parqueadero tiene vehiculos registrados, no se puede eliminar',
        {
          idParqueadero,
        }
      );
    }

    await parqueadero.remove();
  }

  async ingresarVehiculo(
    idParqueadero: number,
    placa: string,
    modelo: string,
    color: string
  ): Promise<Parqueadero | void> {
    const parqueadero = await this.getParqueaderoById(idParqueadero);

    // verificar que el parqueadero este asignado a un usuario
    if (!parqueadero.usuario) {
      throw boom.badRequest(
        'El parqueadero no está asignado a ningún usuario, no se pueden registrar vehiculos',
        {
          idParqueadero,
        }
      );
    }

    // si el parqueadero no tiene espacio disponible, no se puede ingresar
    if (parqueadero.espacioDisponible <= 0) {
      throw boom.badRequest('El parqueadero no tiene espacio disponible', {
        idParqueadero,
      });
    }

    // si el vehiculo ya existe, no se puede ingresar
    const vehiculoExistente = await Vehiculo.findOne({
      where: { placa },
      relations: ['parqueadero'],
    });
    if (vehiculoExistente && vehiculoExistente.fechaSalida === null) {
      throw boom.badRequest('Ya existe la placa', {
        placa,
      });
    }

    if (vehiculoExistente) {
      vehiculoExistente.fechaIngreso = new Date();
      vehiculoExistente.fechaSalida = null;
      parqueadero.espacioDisponible = parqueadero.espacioDisponible - 1;
      await parqueadero.save();
      vehiculoExistente.placa = placa;
      vehiculoExistente.modelo = modelo;
      vehiculoExistente.color = color;
      vehiculoExistente.parqueadero = parqueadero;

      await vehiculoExistente.save();
    } else {
      const vehiculo = new Vehiculo();
      vehiculo.fechaIngreso = new Date();
      parqueadero.espacioDisponible = parqueadero.espacioDisponible - 1;
      await parqueadero.save();
      vehiculo.placa = placa;
      vehiculo.modelo = modelo;
      vehiculo.color = color;
      vehiculo.parqueadero = parqueadero;

      await vehiculo.save();
    }
  }

  async registrarSalidaVehiculo(
    idParqueadero: number,
    placa: string
  ): Promise<Vehiculo | void> {
    const parqueadero = await this.getParqueaderoById(idParqueadero);

    const vehiculo = await Vehiculo.findOne({
      where: { placa },
      relations: ['parqueadero'],
    });

    console.log(`ESTO TIENE PARQUEADERO: `, parqueadero);
    console.log(`ESTO TIENE VEHICULO: `, vehiculo);
    if (!vehiculo) {
      throw boom.notFound('Vehiculo no encontrado', { placa });
    }

    // si el vehiculo no esta registrado en ningun parqueadero, no se puede registrar la salida
    if (vehiculo.fechaIngreso === null) {
      throw boom.badRequest(
        'El vehiculo no está registrado en ningún parqueadero',
        {
          placa,
        }
      );
    }

    // if (vehiculo.parqueadero?.id !== idParqueadero) {
    //   throw boom.badRequest(
    //     'El vehiculo no está registrado en este parqueadero',
    //     {
    //       placa,
    //     }
    //   );
    // }

    if (vehiculo.parqueadero !== null) {
      if (vehiculo.parqueadero.id !== idParqueadero) {
        throw boom.badRequest(
          'El vehiculo no está registrado en este parqueadero',
          {
            placa,
          }
        );
      }
    } else {
      throw boom.badRequest(
        'El vehiculo no está registrado en ningún parqueadero',
        {
          placa,
        }
      );
    }

    const historial = new Historial();
    historial.fechaIngreso = vehiculo.fechaIngreso;
    historial.fechaSalida = new Date();
    historial.duracionSegundos = Math.floor(
      (historial.fechaSalida.getTime() - historial.fechaIngreso.getTime()) /
        1000
    );
    historial.vehiculo = vehiculo;
    historial.parqueadero = parqueadero;
    await historial.save();

    vehiculo.parqueadero = null;
    vehiculo.fechaIngreso = null;
    vehiculo.fechaSalida = historial.fechaSalida;
    parqueadero.espacioDisponible = parqueadero.espacioDisponible + 1;
    await vehiculo.save();
    await parqueadero.save();
  }

  // listado de vehiculos que estan en el parqueadero
  async getVehiculosEnParqueadero(
    idParqueadero: number
  ): Promise<Vehiculo[] | void> {
    const parqueadero = await this.getParqueaderoById(idParqueadero);

    console.log(`ESTO TIENE PARQUEADERO: `, parqueadero);
    const vehiculos = parqueadero.vehiculos;
    console.log(`ESTO TIENE VEHICULOS: `, vehiculos);

    return vehiculos;
  }
}

export default ParqueaderoService;
