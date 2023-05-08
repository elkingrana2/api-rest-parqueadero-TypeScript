/* eslint-disable prettier/prettier */
import boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

import config from '../configuration/config';

export function checkApiKey(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized('Apikey incorrecto'));
  }
}

//export default checkApiKey;
