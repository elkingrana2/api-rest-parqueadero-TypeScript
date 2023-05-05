/* eslint-disable prettier/prettier */
/* eslint-disable unused-imports/no-unused-vars */
import Joi from 'joi';

const id = Joi.number().required();
const nombre = Joi.string().alphanum().min(3).max(20);
const apellido = Joi.string().alphanum().min(3).max(20);
const correo = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
});
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));

export const createUsuarioSchema = Joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  correo: correo.required(),
  password: password.required(),
});

export const getUsuarioSchema = Joi.object({
  id: id.required(),
});

export const updateUsuarioSchema = Joi.object({
  nombre,
  apellido,
  correo,
  password,
});
