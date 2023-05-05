/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

type ValidatorHandler = (
  schema: Joi.ObjectSchema,
  property: string
) => (
  req: Request & { [key: string]: any },
  res: Response,
  next: NextFunction
) => void;

const validatorHandler: ValidatorHandler = (schema, property) => {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
};

export default validatorHandler;
