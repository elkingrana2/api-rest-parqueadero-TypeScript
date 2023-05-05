/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { Boom } from '@hapi/boom';
import { ErrorRequestHandler } from 'express';

export const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.log('logErrors');
  console.error(err);
  next(err);
};

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req,
  res,
  next
) => {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

export const boomErrorHandler: ErrorRequestHandler = (
  err: Boom,
  req,
  res,
  next
) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};

// capturar las excepciones que se producen en Usuario.entitie.ts con las validaciones de typeorm
export const validationErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  console.log('validationErrorHandler');
  if (err instanceof Error) {
    res.status(400).json({
      message: err.message,
    });
  } else {
    next(err);
  }
};
