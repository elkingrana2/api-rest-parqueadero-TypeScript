/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import boom from '@hapi/boom';
import { Response } from 'express';

import config from '../configuration/config';
import { Vehiculo } from '../entities/vehiculo.entitie';
import { correoDTO } from '../responses/correo-dto';
import { get,post } from '../utils/httpClient.service';
import ParqueaderoService from './parqueadero.service';

const service = new ParqueaderoService();
class CorreoService {
  async enviarCorrreo(correo: correoDTO): Promise<Response> {
    //const ruta = 'correo';

    // validar que el parqueadero exista
    const parqueadero = await service.getParqueaderoById(correo.idParqueadero);

    // validar que la placa se encuentre en el parqueadero
    const vehiculo = await Vehiculo.findOne({
      where: { placa: correo.placa },
      relations: ['parqueadero'],
    });
    if (!vehiculo) {
      throw boom.notFound('La placa no existe', { placa: correo.placa });
    }

    if (vehiculo.fechaIngreso === null) {
      throw boom.notFound('El vehiculo no se encuentra en ningun parqueadero', {
        placa: correo.placa,
      });
    }

    if (vehiculo.parqueadero?.id !== correo.idParqueadero) {
      throw boom.notFound('El vehiculo no se encuentra en el parqueadero', {
        placa: correo.placa,
      });
    }

    const url = config.servicioCorreo as string;
    const body = correo;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await post(`${url}/send`, body);
    //console.log(`Esta es la respuesta: `, response);

    if (!response) {
      throw boom.notFound('No se pudo enviar el correo', {
        placa: correo.placa,
      });
    }

    return response as unknown as Response;
  }

  // optener las solicitudes de la otra api
  async getSolicitudes(): Promise<Response> {
    const url = config.servicioCorreo as string;
    const response = await get(`${url}/solicitudes`);
    //console.log(`Esta es la respuesta: `, response);

    // if (!response) {
    //   throw boom.notFound('No se pudo obtener las solicitudes');
    // }

    return response as unknown as Response;
  }
}

export default CorreoService;
