/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import config from '../configuration/config';
import { Rol } from '../entities/Usuario.entitie';
import UsuariosService from '../services/usuario.service';

const service = new UsuariosService();

interface IPayload {
  id: number;
  nombre: string;
  correo: string;
  rol: Rol;
}

export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ message: 'Acceso Denegado' });
  }
  const payload = jwt.verify(token, config.jwtSecret as string) as IPayload;
  console.log(payload.id);
  console.log(payload.rol);
  console.log(payload.nombre);
  console.log(payload.correo);

  req.body.userId = payload.id;
  req.body.userRol = payload.rol;
  next();
};

export const validarTokenSocio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const findSocio = await service.findUsuarioByIdAndRol(
    req.body.userId as number,
    req.body.userRol as Rol
  );
  console.log(findSocio);
  if (findSocio?.rol !== Rol.socio) {
    return res.status(400).json({ message: 'No tiene privilegios de socio' });
  }
  next();
};

export const validarTokenAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const findAdmin = await service.findUsuarioByIdAndRol(
    req.body.userId as number,
    req.body.userRol as Rol
  );
  console.log(findAdmin);
  if (findAdmin?.rol !== Rol.admin) {
    return res.status(400).json({ message: 'No tiene privilegios de admin' });
  }
  next();
};

export const validarTokenEmpleado = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const findEmpleado = await service.findUsuarioByIdAndRol(
    req.body.userId as number,
    req.body.userRol as Rol
  );
  console.log(findEmpleado);
  if (findEmpleado?.rol !== Rol.empleado) {
    return res
      .status(400)
      .json({ message: 'No tiene privilegios de empleado' });
  }
  next();
};

//export const

// export const validarRolTokenSocio = async (req: Request, res: Response, next: NextFunction)=> {
//   const findSocio = await service.findOneSocio(req.body.userId, req.body.userRol);
//   if(!findSocio) {return res.status(400).jsonp({message: "No tiene privilegios de socio"});}
//   next();
// }

// export const validarRolTokenCliente = async (req: Request, res: Response, next: NextFunction)=> {
//   const findCliente = await service.findOneCliente(req.body.userId, req.body.userRol);
//   if(!findCliente) {return res.status(400).jsonp({message: "No tiene privilegios de cliente"});}
//   next();
// }

// export const validarRolTokenAdmin = async (req: Request, res: Response, next: NextFunction)=> {
//   const findCliente = await service.findOneAdmin(req.body.userId, req.body.userRol);
//   if(!findCliente) {return res.status(400).jsonp({message: "Admin no encontrado"});}
//   next();
// }
