/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prettier/prettier */
import { Router } from 'express';
import passport from 'passport';

import * as correo from '../controllers/correo.controller';
import { Rol } from '../entities/Usuario.entitie';
import * as auth from '../middlewares/auth.handler';
import validatorHandler from '../middlewares/validator.handler';
import * as correoSchema from '../schema/correo.schema';

const router = Router();

router.post(
  '/enviar',
  passport.authenticate('jwt', { session: false }),
  auth.checkRoles(Rol.admin),
  validatorHandler(correoSchema.enviarCorreoSchema, 'body'),
  correo.enviarCorreo
);

router.get(
  '/solicitudes',
  passport.authenticate('jwt', { session: false }),
  auth.checkRoles(Rol.admin),
  correo.getSolicitudes
);

export default router;
