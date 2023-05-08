/* eslint-disable prettier/prettier */

import Joi from 'joi';

const id = Joi.number().required();
const nombre = Joi.string().required().min(3).max(100);
const capacidad = Joi.number().required().min(0);
const direccion = Joi.string().required().min(3).max(100);

export const createParqueaderoSchema = Joi.object({
  nombre: nombre.required(),
  capacidad: capacidad.required(),
  direccion: direccion.required(),
});

export const getParqueaderoSchema = Joi.object({
  id: id.required(),
});

export const updateParqueaderoSchema = Joi.object({
  nombre,
  capacidad,
  direccion,
});
