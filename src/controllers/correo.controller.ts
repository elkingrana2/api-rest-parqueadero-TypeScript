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
    const { email, mensaje, placa, idParqueadero } = req.body;

    const correo = new correoDTO();
    correo.email = email as string;
    correo.mensaje = mensaje as string;
    correo.placa = placa as string;
    correo.idParqueadero = idParqueadero as number;

    await service.enviarCorrreo(correo);
    //await service.enviarCorrreo(correo);

    return res.status(200).json({ message: 'correo enviado' });
  } catch (error) {
    next(error);
  }
};
