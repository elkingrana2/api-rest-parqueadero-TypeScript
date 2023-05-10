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
import { Rol, Usuario } from '../entities/Usuario.entitie';
import { UsuarioResponse } from '../responses/usuario.response';
import { DataSource } from 'typeorm';

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
    const { nombre, apellido, correo, password } = req.body;

    const usuario = new Usuario();
    usuario.nombre = nombre as string;
    usuario.apellido = apellido as string;
    usuario.correo = correo as string;
    usuario.password = password as string;

    const usuarioResp = await service.updateUsuario(id, usuario);

    //usuarioResp.password = password as string;
    //delete usuarioResp.DataSource.password;

    const usuarioResponse = new UsuarioResponse();
    usuarioResponse.id = usuarioResp.id;
    usuarioResponse.nombre = usuarioResp.nombre;
    usuarioResponse.apellido = usuarioResp.apellido;
    usuarioResponse.correo = usuarioResp.correo;

    return res.status(200).json({
      message: `Usuario ${id} actualizado correctamente`,
      usuario: usuarioResponse,
    });
  } catch (error) {
    next(error);
  }
};

// agregarParqueaderoSocio
export const agregarParqueaderoSocio = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const idUsuario = parseInt(req.params.idUsuario);
    const idParqueadero = parseInt(req.params.idParqueadero);

    await service.agregarParqueaderoSocio(idUsuario, idParqueadero);
    return res
      .status(200)
      .json({ message: `Parqueadero ${idParqueadero} agregado correctamente` });
  } catch (error) {
    next(error);
  }
};

// buscar un usuario por id y rol
export const getUsuarioByIdAndRol = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const id = parseInt(req.params.id);
    const { rol } = req.body;

    const usuario = await service.findUsuarioByIdAndRol(id, rol as Rol);
    return res.status(200).json({ usuario });
  } catch (error) {
    next(error);
  }
};
