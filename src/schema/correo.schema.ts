/* eslint-disable prettier/prettier */
import Joi from 'joi';

const placa = Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  .min(6)
  .max(6);
const correo = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
});
const idParqueadero = Joi.number().required();
const mensaje = Joi.string().required().min(3).max(100);

export const enviarCorreoSchema = Joi.object({
  placa: placa.required(),
  correo: correo.required(),
  idParqueadero: idParqueadero.required(),
  mensaje: mensaje.required(),
});
