/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prettier/prettier */
/* eslint-disable simple-import-sort/imports */
import { Router } from 'express';

import passport from 'passport';

import { checkRoles } from '../middlewares/auth.handler';

import {
  getParqueaderos,
  getParqueaderoById,
  createParqueadero,
  deleteParqueadero,
  updateParqueadero,
  ingresarVehiculo,
  registrarSalidaVehiculo,
  getVehiculosEnParqueadero,
  getDetalleVehiculo,
  getParqueaderosPorSocio,
  listadoVehiculosParqueaderos,
} from '../controllers/parqueadero.controller';

import validatorHandler from '../middlewares/validator.handler';

import {
  createParqueaderoSchema,
  getParqueaderoSchema,
  updateParqueaderoSchema,
} from '../schema/parqueadero.schema';

import {
  registerVehiculoSchema,
  getVehiculoSchema,
} from '../schema/vehiculo.schema';
import { Rol } from '../entities/Usuario.entitie';

const router = Router();

// rutas de parqueaderos
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.admin),
  getParqueaderos
);
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.admin),
  validatorHandler(getParqueaderoSchema, 'params'),
  getParqueaderoById
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.admin),
  validatorHandler(createParqueaderoSchema, 'body'),
  createParqueadero
);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.admin),
  validatorHandler(getParqueaderoSchema, 'params'),
  validatorHandler(updateParqueaderoSchema, 'body'),
  updateParqueadero
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.admin),
  validatorHandler(getParqueaderoSchema, 'params'),
  deleteParqueadero
);

router.post(
  '/:id/vehiculos',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.empleado),
  validatorHandler(registerVehiculoSchema, 'body'),
  ingresarVehiculo
);

router.put(
  '/:id/vehiculos',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.empleado),
  registrarSalidaVehiculo
);

router.get(
  '/:id/vehiculos',
  passport.authenticate('jwt', { session: false }),
  // mandar el rol de admin y socio en checkRoles
  checkRoles(Rol.admin, Rol.socio, Rol.empleado),
  //checkRoles(Rol.admin, Rol.socio),
  getVehiculosEnParqueadero
);

router.get(
  '/vehiculos-detalle/:placa',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.admin, Rol.socio, Rol.empleado),
  validatorHandler(getVehiculoSchema, 'params'),
  getDetalleVehiculo
);

router.get(
  '/socio/lista',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.socio),
  getParqueaderosPorSocio
);

router.get(
  '/socio/vehiculos',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.empleado),
  listadoVehiculosParqueaderos
);

export default router;
