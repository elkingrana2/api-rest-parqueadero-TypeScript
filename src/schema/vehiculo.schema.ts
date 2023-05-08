/* eslint-disable prettier/prettier */
/* eslint-disable unused-imports/no-unused-vars */
import Joi from 'joi';

const placa = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
const modelo = Joi.string().min(3).max(50);
const color = Joi.string().required().min(3).max(20);

export const registerVehiculoSchema = Joi.object({
  placa: placa.required(),
  modelo: modelo.required(),
  color: color.required(),
});

export const getVehiculoSchema = Joi.object({
  placa: placa.required(),
});
