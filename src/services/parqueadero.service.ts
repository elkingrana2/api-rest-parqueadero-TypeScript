/* eslint-disable no-console */
/* eslint-disable prettier/prettier */

import boom from '@hapi/boom';

import { Historial } from '../entities/historial.entitie';
import { Parqueadero } from '../entities/parqueadero.entitie';
import { Rol, Usuario } from '../entities/Usuario.entitie';
import { Vehiculo } from '../entities/vehiculo.entitie';

class ParqueaderoService {
  constructor() {
    const parqueadero = new Parqueadero();
    parqueadero.vehiculos = [];
  }

  async getParqueaderos(): Promise<Parqueadero[]> {
    const parqueadero = Parqueadero.find();

    return parqueadero;
  }

  async getParqueaderoById(idParqueadero: number): Promise<Parqueadero> {
    const parqueadero = await Parqueadero.findOne({
      where: { id: idParqueadero },
      relations: ['usuario', 'vehiculos'],
      // traer tambien el historial que esta en la tabla vehiculo
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
    //console.log('ACA LLEGA');
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
    parqueadero.vehiculos = [];
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

  /*
    Funcion para limitar el acceso del empleado a solo los parqueaderos de su jefe
  */
  async verificarPermisoEmpleado(
    idParqueadero: number,
    usuario: Usuario
  ): Promise<boolean> {
    const parqueadero = await this.getParqueaderoById(idParqueadero);

    // verificar que el usuario logueado tenga permisos para ingresar vehiculos en ese parqueadero
    const usuarioLoggeado = await Usuario.findOne({
      where: { id: usuario.id },
      relations: ['jefe'],
    });

    if (!usuarioLoggeado) {
      throw boom.badRequest('El usuario no existe', {
        idParqueadero,
      });
    }
    //console.log(`Parqueadero: `, parqueadero.usuario);
    //console.log(`Usuario: `, usuarioLoggeado);

    const correo1 = parqueadero.usuario?.correo;
    const correo2 = usuarioLoggeado.jefe.correo;

    console.log(`Correo 1: `, correo1);
    console.log(`Correo 2: `, correo2);

    if (correo1 === correo2) {
      return true;
    }

    return false;
  }

  async ingresarVehiculo(
    idParqueadero: number,
    placa: string,
    modelo: string,
    color: string,
    usuario: Usuario
  ): Promise<Parqueadero | void> {
    const parqueadero = await this.getParqueaderoById(idParqueadero);

    const permiso = await this.verificarPermisoEmpleado(idParqueadero, usuario);

    if (!permiso) {
      throw boom.badRequest(
        'El usuario no tiene permisos para ingresar vehiculos en este parqueadero',
        {
          idParqueadero,
        }
      );
    }

    // verificar que el parqueadero este asignado a un usuario
    if (!parqueadero.usuario) {
      throw boom.badRequest(
        'El parqueadero no está asignado a ningún socio, no se pueden registrar vehiculos',
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

      vehiculoExistente.placa = placa;
      vehiculoExistente.modelo = modelo;
      vehiculoExistente.color = color;
      vehiculoExistente.parqueadero = parqueadero;
      //parqueadero.addVehiculo(vehiculoExistente);
      await parqueadero.save();

      await vehiculoExistente.save();
    } else {
      const vehiculo = new Vehiculo();
      vehiculo.fechaIngreso = new Date();
      parqueadero.espacioDisponible = parqueadero.espacioDisponible - 1;

      vehiculo.placa = placa;
      vehiculo.modelo = modelo;
      vehiculo.color = color;
      vehiculo.parqueadero = parqueadero;
      vehiculo.historial = [];
      //parqueadero.addVehiculo(vehiculo);
      await parqueadero.save();
      await vehiculo.save();
    }
  }

  async registrarSalidaVehiculo(
    idParqueadero: number,
    placa: string,
    usuario: Usuario
  ): Promise<Vehiculo | void> {
    const parqueadero = await this.getParqueaderoById(idParqueadero);

    const permiso = await this.verificarPermisoEmpleado(idParqueadero, usuario);

    if (!permiso) {
      throw boom.badRequest(
        'El usuario no tiene permisos para registrar salidas de vehiculos en este parqueadero',
        {
          idParqueadero,
        }
      );
    }

    const vehiculo = await Vehiculo.findOne({
      where: { placa },
      relations: ['parqueadero'],
    });

    //console.log(`ESTO TIENE PARQUEADERO: `, parqueadero);
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

    //const idPar =

    if (vehiculo.parqueadero !== null) {
      if (vehiculo.parqueadero?.id !== idParqueadero) {
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
    historial.fechaIngreso = vehiculo.fechaIngreso as Date;
    historial.fechaSalida = new Date();
    historial.duracionSegundos = Math.floor(
      (historial.fechaSalida.getTime() - historial.fechaIngreso.getTime()) /
        1000
    );
    historial.vehiculo = vehiculo;
    //vehiculo.addHistorial(historial);
    historial.parqueadero = parqueadero;
    await historial.save();

    console.log(`Asi queda el historial: `, historial);

    vehiculo.parqueadero = null;
    vehiculo.fechaIngreso = null;
    vehiculo.fechaSalida = historial.fechaSalida;
    parqueadero.espacioDisponible = parqueadero.espacioDisponible + 1;
    console.log(`asi quedo el vehiculo: `, vehiculo);
    await vehiculo.save();
    await parqueadero.save();
  }

  // listado de vehiculos que estan en el parqueadero
  async getVehiculosEnParqueadero(
    idParqueadero: number,
    usuario: Usuario
  ): Promise<Vehiculo[] | void> {
    //const parqueadero = await this.getParqueaderoById(idParqueadero);
    const parqueadero = await Parqueadero.findOne({
      where: { id: idParqueadero },
      relations: ['usuario', 'vehiculos', 'vehiculos.historial'],
      // traer tambien el historial que esta en la tabla vehiculo
    });

    if (!parqueadero) {
      throw boom.notFound('Parqueadero no encontrado', { idParqueadero });
    }

    if (usuario.rol === Rol.socio) {
      return await this.vehiculosEnParqueadero_socio(idParqueadero, usuario);
    }

    if (usuario.rol === Rol.empleado) {
      console.log(`ACA LLEGA`);
      const empleado = await Usuario.findOne({
        where: { id: usuario.id },
        relations: ['jefe'],
      });
      console.log(`ESTO TIENE EMPLEADO: `, empleado);

      const jefe = empleado?.jefe as Usuario;

      return await this.vehiculosEnParqueadero_socio(idParqueadero, jefe);
    }

    //console.log(`ESTO TIENE PARQUEADERO: `, parqueadero);
    const vehiculos = parqueadero.vehiculos;
    //console.log(`ESTO TIENE VEHICULOS: `, vehiculos);

    return vehiculos;
  }

  async vehiculosEnParqueadero_socio(
    idParqueadero: number,
    usuario: Usuario
  ): Promise<Vehiculo[] | void> {
    const parqueadero = await Parqueadero.findOne({
      where: { id: idParqueadero },
      relations: ['usuario', 'vehiculos', 'vehiculos.historial'],
      // traer tambien el historial que esta en la tabla vehiculo
    });

    if (!parqueadero) {
      throw boom.notFound('Parqueadero no encontrado', { idParqueadero });
    }

    const usuarioLoggeado = await Usuario.findOne({
      where: { id: usuario.id },
      relations: ['parqueaderos'],
    });

    if (!usuarioLoggeado) {
      throw boom.notFound('Usuario no encontrado', { id: usuario.id });
    }

    // verificar que el usuario tenga parqueaderos
    if (usuarioLoggeado.parqueaderos.length === 0) {
      throw boom.badRequest('El usuario no tiene parqueaderos', {
        id: usuario.id,
      });
    }

    // verificar si el parqueadero pertenece al usuario
    const parqueaderoEncontrado = usuarioLoggeado.parqueaderos.find(
      (parqueadero) => parqueadero.id === idParqueadero
    );

    if (!parqueaderoEncontrado) {
      throw boom.badRequest('El parqueadero no pertenece al usuario', {
        idParqueadero,
      });
    }

    const vehiculos = parqueadero.vehiculos;

    return vehiculos;
  }

  // optener el detalle de un vehiculo por su placa
  async getDetalleVehiculo(
    placa: string,
    usuario: Usuario
  ): Promise<Vehiculo | void> {
    const vehiculo = await Vehiculo.findOne({
      where: { placa },
      relations: ['historial', 'parqueadero.usuario'],
    });

    if (!vehiculo) {
      throw boom.notFound('Vehiculo no encontrado', { placa });
    }

    if (usuario.rol === Rol.socio) {
      return await this.detalleVehiculo_socio(vehiculo, usuario);
    }

    if (usuario.rol === Rol.empleado) {
      const empleado = await Usuario.findOne({
        where: { id: usuario.id },
        relations: ['jefe'],
      });

      const jefe = empleado?.jefe as Usuario;

      return await this.detalleVehiculo_socio(vehiculo, jefe);
    }

    return vehiculo;
  }

  // detalle de un vehiculo para un socio
  async detalleVehiculo_socio(
    vehiculo: Vehiculo,
    usuario: Usuario
  ): Promise<Vehiculo | void> {
    // ver si el vehiculo esta en un parqueadero
    if (vehiculo.parqueadero === null) {
      throw boom.badRequest('El vehiculo no está en ningún parqueadero', {
        placa: vehiculo.placa,
      });
    }
    // parqueadero en el que esta el vehiculo
    const parqueadero = vehiculo.parqueadero;
    const usuarioLoggeado = await Usuario.findOne({
      where: { id: usuario.id },
      relations: ['parqueaderos'],
    });

    if (parqueadero) {
      const correo1 = parqueadero.usuario?.correo;
      const correo2 = usuarioLoggeado?.correo;

      if (correo1 !== correo2) {
        throw boom.forbidden(
          'El usuario no tiene permisos para ver el detalle del vehiculo',
          {
            placa: vehiculo.placa,
          }
        );
      }
    }

    return vehiculo;
  }

  // optener parqueaderos por socio (los parqueaderos que tiene un socio)
  async getParqueaderosPorSocio(socio: Usuario): Promise<Parqueadero[] | void> {
    const usuario = await Usuario.findOne({
      where: { id: socio.id },
      relations: ['parqueaderos'],
    });

    // ver que el usuario tiene parqueaderos
    if (usuario?.parqueaderos.length === 0) {
      throw boom.badRequest('El usuario no tiene parqueaderos asignados', {
        id: socio.id,
      });
    }

    if (!usuario) {
      throw boom.notFound('Usuario no encontrado', { id: socio.id });
    }

    const parqueaderos = usuario.parqueaderos;

    return parqueaderos;
  }

  // el rol empleado lista los vehiculos de todos los parqueaderos de su jefe
  async listado_vehiculos_parqueaderos(
    usuario: Usuario
  ): Promise<Vehiculo[] | void> {
    const empleado = await Usuario.findOne({
      where: { id: usuario.id },
      relations: ['jefe'],
    });

    const jefe = empleado?.jefe as Usuario;

    const parqueaderos = (await this.getParqueaderosPorSocio(
      jefe
    )) as Parqueadero[];

    const vehiculos: Vehiculo[] = [];
    console.log(`ESTO TIENE PARQUEADEROS: `, parqueaderos);

    const promises = parqueaderos.map((parqueadero) =>
      this.getVehiculosEnParqueadero(parqueadero.id, usuario)
    );

    // que se cumplan todas las promesas antes del ciclo
    const vehiculosParqueadero = await Promise.all(promises);

    // se itera sobre cada matriz de vehiculos y se agrega cada vehiculo a la matriz vehiculos
    vehiculosParqueadero.forEach((vehiculosParqueaderoParqueadero) => {
      if (vehiculosParqueaderoParqueadero) {
        vehiculosParqueaderoParqueadero.forEach((vehiculo) => {
          vehiculos.push(vehiculo);
        });
      }
    });

    return vehiculos;
  }
}

export default ParqueaderoService;
