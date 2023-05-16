/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';

import { getTop10PlacasVehiculos } from '../services/historial.service';

// eslint-disable-next-line @typescript-eslint/require-await
export async function getTop10PlacasVehiculoss(req: Request,
  res: Response,
  next: NextFunction): Promise<Response | void> {
  try {
    const response = getTop10PlacasVehiculos;

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
