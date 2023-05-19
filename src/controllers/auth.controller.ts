/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import config from '../configuration/config';
import { validatePassword } from '../lib/encryptPassword';
import UsuariosService from '../services/usuario.service';

const service = new UsuariosService();

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { correo, password } = req.body;
    const findUser = await service.findUsuarioByCorreo(correo);
    if (!findUser) {
      res.status(401).json({ message: 'Usuario no encontrado' });

      return;
    }
    const uth = await validatePassword(password, findUser.password);

    if (!uth) {
      res.status(401).json({ message: 'Contraseña Incorrecta' });
    }

    const user = findUser;
    const payload = {
      id: user.id,
      nombre: user.nombre,
      rol: user.rol,
    };

    const token: string = jwt.sign(payload, config.jwtSecret as string, {
      expiresIn: '6h',
    });
    console.log(token.split('.'));
    console.log(payload.rol);

    //console.log(`lo que hay en req`, req);
    //res.header('auth-token', token).json(findUser)
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const profile = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: 'Ingreso Exitoso' });
  } catch (error) {
    next(error);
  }
};
