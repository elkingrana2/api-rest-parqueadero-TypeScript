/* eslint-disable import/no-duplicates */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prettier/prettier */
import { Router } from 'express';
import validatorHandler from '../middlewares/validator.handler';

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
router.get('/', getUsuarios);
router.get(
  '/:id',
  validatorHandler(getUsuarioSchema, 'params'),
  getUsuarioById
);
router.post('/', validatorHandler(createUsuarioSchema, 'body'), createUsuario);
router.put(
  '/:id',
  validatorHandler(getUsuarioSchema, 'params'),
  validatorHandler(createUsuarioSchema, 'body'),
  updateUsuario
);
router.delete(
  '/:id',
  validatorHandler(getUsuarioSchema, 'params'),
  deleteUsuario
);
router.put('/:idUsuario/parqueaderos/:idParqueadero', agregarParqueaderoSocio);

export default router;

//module.exports = router;
