/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prettier/prettier */
/* eslint-disable simple-import-sort/imports */
import { Router } from 'express';

import {
  getParqueaderos,
  getParqueaderoById,
  createParqueadero,
  deleteParqueadero,
  updateParqueadero,
  ingresarVehiculo,
  registrarSalidaVehiculo,
  getVehiculosEnParqueadero,
} from '../controllers/parqueadero.controller';

import validatorHandler from '../middlewares/validator.handler';

import {
  createParqueaderoSchema,
  getParqueaderoSchema,
  updateParqueaderoSchema,
} from '../schema/parqueadero.schema';

import { registerVehiculoSchema } from '../schema/vehiculo.schema';

const router = Router();

// rutas de parqueaderos
router.get('/', getParqueaderos);
router.get(
  '/:id',
  validatorHandler(getParqueaderoSchema, 'params'),
  getParqueaderoById
);
router.post(
  '/',
  validatorHandler(createParqueaderoSchema, 'body'),
  createParqueadero
);
router.put(
  '/:id',
  validatorHandler(getParqueaderoSchema, 'params'),
  validatorHandler(updateParqueaderoSchema, 'body'),
  updateParqueadero
);
router.delete(
  '/:id',
  validatorHandler(getParqueaderoSchema, 'params'),
  deleteParqueadero
);

router.post(
  '/:id/vehiculos',
  validatorHandler(registerVehiculoSchema, 'body'),
  ingresarVehiculo
);

router.put('/:id/vehiculos', registrarSalidaVehiculo);

router.post('/:id/vehiculos-en-parqueadero', getVehiculosEnParqueadero);

export default router;
