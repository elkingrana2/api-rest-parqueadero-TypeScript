/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
import { Response } from 'express';

import { StandardErrorResponse } from './standard-error-response';

export function notFound(res: Response, id: number) {
  return res.status(404).json({
    errors: [
      {
        code: 'DATA_NOT_FOUND',
        description: `No se encontraron datos con el id  ${id}`,
      },
    ],
  });
}

export function internalError(
  res: Response,
  standardErrorResponse: StandardErrorResponse
) {
  return res.status(500).json(standardErrorResponse);
}

export function internalErrorBD(res: Response) {
  return internalError(res, {
    errors: [
      {
        code: 'CONECTION_DB_ERROR',
        description: 'Error de conexión con la base de datos',
      },
    ],
  });
}

export function badRequest(
  res: Response,
  errorResponse: StandardErrorResponse
) {
  return res.status(400).json(errorResponse);
}
