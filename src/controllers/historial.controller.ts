/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';

import HistorialService from '../services/historial.service';

const service = new HistorialService();

// eslint-disable-next-line @typescript-eslint/require-await
export async function getTop10PlacasVehiculoss(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const response = await service.getTop10PlacasVehiculos();

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
