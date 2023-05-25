/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable import/no-duplicates */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prettier/prettier */
import { Router } from 'express';
import validatorHandler from '../middlewares/validator.handler';

//import { tokenValidation, validarTokenAdmin } from '../lib/veryfyToken';

import passport from 'passport';

import { checkRoles } from '../middlewares/auth.handler';

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
  createUsuarioEmpleado,
} from '../controllers/usuario.controller';
import { Rol } from '../entities/Usuario.entitie';

const router = Router();

// rutas de usuarios
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.admin),
  //validarTokenAdmin,
  getUsuarios
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.admin),
  validatorHandler(getUsuarioSchema, 'params'),
  getUsuarioById
);

/**
 * Post track
 * @openapi
 * /usuarios:
 *    post:
 *      tags:
 *        - usuarios
 *      summary: "Listar usuario"
 *      description: Este endpoint es para listar los usuario totales
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/usuario"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.admin),
  validatorHandler(createUsuarioSchema, 'body'),
  createUsuario
);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.admin),
  validatorHandler(getUsuarioSchema, 'params'),
  validatorHandler(createUsuarioSchema, 'body'),
  updateUsuario
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.admin),
  validatorHandler(getUsuarioSchema, 'params'),
  deleteUsuario
);

// Agregar un parqueadero a un socio (admin)
router.put(
  '/:idUsuario/parqueaderos/:idParqueadero',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.admin),
  agregarParqueaderoSocio
);

// crear un usuario empleado (socio)
router.post(
  '/socio-crea-empleado',
  passport.authenticate('jwt', { session: false }),
  checkRoles(Rol.socio),
  validatorHandler(createUsuarioSchema, 'body'),
  createUsuarioEmpleado
);

//router.get('/:id/rol', getUsuarioByIdAndRol);

export default router;

//module.exports = router;
