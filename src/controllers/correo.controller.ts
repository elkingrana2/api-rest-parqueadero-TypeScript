/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable new-cap */
/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';

import { correoDTO } from '../responses/correo-dto';
import CorreoService from '../services/correo.service';
// eslint-disable-next-line @typescript-eslint/require-await

const service = new CorreoService();

export const enviarCorreo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { correo, mensaje, placa, idParqueadero } = req.body;

    const correoReq = new correoDTO();
    correoReq.correo = correo;
    correoReq.mensaje = mensaje;
    correoReq.placa = placa;
    correoReq.idParqueadero = idParqueadero;

    const response = await service.enviarCorrreo(correoReq);
    //await service.enviarCorrreo(correo);

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// optener las solicitudes de la otra api
// eslint-disable-next-line @typescript-eslint/require-await
export const getSolicitudes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const response = await service.getSolicitudes();

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}


