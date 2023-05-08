/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
import { Application, Request, Response } from 'express';

import CoursesData from '../../data/courses.json';
import { checkApiKey } from '../middlewares/auth.handler';

export const loadApiEndpoints = (app: Application): void => {
  app.get('/parqueadero', (req: Request, res: Response) => {
    return res.status(200).send(CoursesData);
  });

  app.get(/hola-mundo/, checkApiKey, (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Hola mundo' });
  });

  app.get('/ping', (_req, res) => {
    // eslint-disable-next-line no-console
    console.log('Han hecho un ping ' + new Date().toLocaleDateString());
    res.send('pong');
  });

  // crear un endpoint que diga hola mundo
};


// PORT=3000
// DB_USER='postgres'
// DB_PASSWORD=''
// DB_HOST='localhost'
// DB_NAME='db_parqueadero_ts'
// DB_PORT='5432'
// API_KEY=123