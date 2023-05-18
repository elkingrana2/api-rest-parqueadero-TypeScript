/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
import { Application, Request, Response } from 'express';

import { checkApiKey } from '../middlewares/auth.handler';

export const loadApiEndpoints = (app: Application): void => {
  // PRUEBA DE ENDPOINT CON APIKEY

  app.get(/hola-mundo/, checkApiKey, (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Hola mundo' });
  });
};
