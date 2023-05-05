/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable radix */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';

import UsuariosService from '../services/usuario.service';
import { Usuario } from '../entities/Usuario.entitie';
import { UsuarioResponse } from '../responses/usuario.response';

const service = new UsuariosService();

// obtener todos los usuarios
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getUsuarios = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const usuarios = await service.getUsuarios();
    return res.status(200).json({ usuarios });
  } catch (error) {
    next(error);
  }
};

export const getUsuarioById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const id = parseInt(req.params.id);
    const usuario = await service.getUsuarioById(id);
    return res.status(200).json({ usuario });
  } catch (error) {
    next(error);
  }
};

// crear un usuario
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createUsuario = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { apellido, correo, nombre, password } = req.body;

    const usuario = await service.createUsuario(
      nombre as string,
      apellido as string,
      correo as string,
      password as string
    );

    const usuarioResponse = new UsuarioResponse();
    usuarioResponse.id = usuario.id;
    usuarioResponse.nombre = usuario.nombre;
    usuarioResponse.apellido = usuario.apellido;
    usuarioResponse.correo = usuario.correo;

    //return res.json(response.rows);
    return res.status(200).json({
      message: 'Usuario creado correctamente',
      body: {
        usuarioResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};

// eliminar un usuario
export const deleteUsuario = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const id = parseInt(req.params.id);

    await service.deleteUsuario(id);
    return res
      .status(200)
      .json({ message: `Usuario ${id} eliminado correctamente` });
  } catch (error) {
    next(error);
  }
};

// actualizar un usuario
export const updateUsuario = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const id = parseInt(req.params.id);
    const { apellido, correo, nombre, password } = req.body;

    const usuario = new Usuario();
    usuario.nombre = nombre as string;
    usuario.apellido = apellido as string;
    usuario.correo = correo as string;
    usuario.password = password as string;

    await service.updateUsuario(id, usuario);
    return res
      .status(200)
      .json({ message: `Usuario ${id} actualizado correctamente` });
  } catch (error) {
    next(error);
  }
};
