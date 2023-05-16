/* eslint-disable prettier/prettier */
import { Router } from 'express';

import validatorHandler from '../middlewares/validator.handler';

//import { tokenValidation, validarTokenAdmin } from '../lib/veryfyToken';

import passport from 'passport';

import { checkRoles } from '../middlewares/auth.handler';

import { getTop10PlacasVehiculoss } from '../controllers/historial.controller';

import { Rol } from '../entities/Usuario.entitie';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/top-10', getTop10PlacasVehiculoss);

export default router;
