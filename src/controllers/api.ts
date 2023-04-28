/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
import { Application, Request, Response } from 'express';

import CoursesData from '../../data/courses.json';

export const loadApiEndpoints = (app: Application): void => {
  app.get('/parqueadero', (req: Request, res: Response) => {
    return res.status(200).send(CoursesData);
  });

  app.get(/hola-mundo/, (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Hola mundo' });
  });

  app.get('/ping', (_req, res) => {
    // eslint-disable-next-line no-console
    console.log('Han hecho un ping ' + new Date().toLocaleDateString());
    res.send('pong');
  });

  // crear un endpoint que diga hola mundo
};
