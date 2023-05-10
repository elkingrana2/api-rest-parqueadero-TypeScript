/* eslint-disable import/no-duplicates */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prettier/prettier */
import { Router } from 'express';
import validatorHandler from '../middlewares/validator.handler';

import { tokenValidation, validarTokenAdmin } from '../lib/veryfyToken';

import {
  createUsuarioSchema,
  getUsuarioSchema,
} from '../schema/usuario.schema';

import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  deleteUsuario,
  updateUsuario,
  agregarParqueaderoSocio,
} from '../controllers/usuario.controller';

const router = Router();

// rutas de usuarios
router.get('/', tokenValidation, validarTokenAdmin, getUsuarios);

router.get(
  '/:id',
  tokenValidation,
  validarTokenAdmin,
  validatorHandler(getUsuarioSchema, 'params'),
  getUsuarioById
);

router.post(
  '/',
  tokenValidation,
  validarTokenAdmin,
  validatorHandler(createUsuarioSchema, 'body'),
  createUsuario
);
router.put(
  '/:id',
  tokenValidation,
  validarTokenAdmin,
  validatorHandler(getUsuarioSchema, 'params'),
  validatorHandler(createUsuarioSchema, 'body'),
  updateUsuario
);
router.delete(
  '/:id',
  tokenValidation,
  validarTokenAdmin,
  validatorHandler(getUsuarioSchema, 'params'),
  deleteUsuario
);
router.put(
  '/:idUsuario/parqueaderos/:idParqueadero',
  tokenValidation,
  validarTokenAdmin,
  agregarParqueaderoSocio
);

//router.get('/:id/rol', getUsuarioByIdAndRol);

export default router;

//module.exports = router;
