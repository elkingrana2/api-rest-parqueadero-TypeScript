/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prettier/prettier */
import { Router } from 'express';

import * as correo from '../controllers/correo.controller';
import validatorHandler from '../middlewares/validator.handler';
import * as correoSchema from '../schema/correo.schema';

const router = Router();

router.post(
  '/enviar',
  validatorHandler(correoSchema.enviarCorreoSchema, 'body'),
  correo.enviarCorreo
);

router.get('/solicitudes', correo.getSolicitudes);

export default router;
