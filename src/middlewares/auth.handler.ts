/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

import config from '../configuration/config';
import { Rol, Usuario } from '../entities/Usuario.entitie';

export function checkApiKey(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized('Apikey incorrecto'));
  }
}

export function checkAdminRole(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const user = req.user as Usuario;
  //console.log(user.rol);
  const rol = user.rol;
  if (rol === Rol.admin) {
    next();
  } else {
    next(boom.unauthorized('No tiene privilegios de administrador'));
  }
}

export function checkRoles(...roles: Rol[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    //console.log(`ACA LLEGA :`);
    const user = req.user as Usuario;
    //console.log(`Usuario que llega: `, req.user);
    //console.log(`Lo que llega en req: `, req);
    //console.log(`Roles que llegan: `, roles);
    const rol = user.rol;
    //console.log(`Rol del usuario: `, rol);
    //console.log(`Rol del usuario incluides: `, roles.includes(rol));
    if (roles.includes(rol)) {
      next();
    } else {
      const mensaje = `El rol ${rol} no tiene permisos para realizar esta acción`;
      next(boom.unauthorized(mensaje));
    }
  };
}

export function checkSocioRole(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const user = req.user as Usuario;
  //console.log(user.rol);
  const rol = user.rol;
  if (rol === Rol.socio) {
    next();
  } else {
    next(boom.unauthorized('No tiene privilegios de socio'));
  }
}

export function checkAdminOrSocioRole(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const user = req.user as Usuario;
  //console.log(user.rol);
  const rol = user.rol;
  if (rol === Rol.socio || rol === Rol.admin) {
    next();
  } else {
    next(boom.unauthorized('No tiene privilegios de socio o administrador'));
  }
}

export function checkAdminOrSocioOrEmployeeRole(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const user = req.user as Usuario;
  //console.log(user.rol);
  const rol = user.rol;
  if (rol === Rol.socio || rol === Rol.admin || rol === Rol.empleado) {
    next();
  } else {
    next(
      boom.unauthorized(
        'No tiene privilegios de socio o administrador o empleado'
      )
    );
  }
}

export function checkEmployeeRole(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const user = req.user as Usuario;
  //console.log(user.rol);
  const rol = user.rol;
  if (rol === Rol.empleado) {
    next();
  } else {
    next(boom.unauthorized('No tiene privilegios de empleado'));
  }
}

//export default checkApiKey;
