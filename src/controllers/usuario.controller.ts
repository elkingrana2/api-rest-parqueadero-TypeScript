/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable radix */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { QueryResult } from 'pg';

import { pool } from '../database';
import app from '../app';

// obtener todos los usuarios
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getUsuarios = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query(
      'SELECT * FROM usuario ORDER BY id ASC'
    );
    // eslint-disable-next-line no-console
    //console.log(response.rows);
    //res.send('usuarios socios del parqueadero');

    return res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Internal server error');
  }
};

// obtener un usuario por id
export const getUsuarioById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  //console.log(req.params.id);
  try {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query(
      'SELECT * FROM usuario WHERE id = $1',
      [id]
    );
    return res.json(response.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Internal server error');
  }
};

// crear un usuario
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createUsuario = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { apellido, correo, nombre, password } = req.body;

    // si el correo ya existe en la base de datos no se puede crear el usuario
    const response1: QueryResult = await pool.query(
      'SELECT * FROM usuario WHERE correo = $1',
      [correo]
    );
    if (response1.rowCount > 0) {
      return res.status(400).json('El correo ya existe');
    }

    // el rol se asigna por defecto como SOCIO

    //console.log(apellido, correo, nombre, password, rol);
    const response: QueryResult = await pool.query(
      'INSERT INTO usuario (apellido, correo, nombre, password, rol, eliminado) VALUES ($1, $2, $3, $4, $5, false)',
      [apellido, correo, nombre, password, 'SOCIO']
    );
    //return res.json(response.rows);
    return res.status(200).json({
      message: 'Usuario creado correctamente',
      body: {
        usuario: {
          apellido,
          correo,
          nombre,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json('Internal server error');
  }
};

// eliminar un usuario
export const deleteUsuario = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);

    // si el usuario no existe en la base de datos se indica en un mensaje
    const response1: QueryResult = await pool.query(
      'SELECT * FROM usuario WHERE id = $1',
      [id]
    );
    if (response1.rowCount === 0) {
      return res.status(400).json('El usuario no existe');
    }

    await pool.query('DELETE FROM usuario where id = $1', [id]);
    return res.status(200).json(`Usuario ${id} eliminado correctamente`);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Internal server error');
  }
};

// actualizar un usuario
export const updateUsuario = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const { apellido, correo, nombre, password } = req.body;

    // si el usuario no existe en la base de datos se indica en un mensaje
    const usuario: QueryResult = await pool.query(
      'SELECT * FROM usuario WHERE id = $1',
      [id]
    );
    if (usuario.rowCount === 0) {
      return res.status(400).json('El usuario no existe');
    }

    // si el CORREO de USUARIO ha cambiado, verificar que no exista otro USUARIO con el mismo CORREO
    if (usuario.rows[0].correo !== correo) {
      const usuarioCorreo = await pool.query(
        'SELECT * FROM usuario WHERE correo = $1',
        [correo]
      );
      if (usuarioCorreo.rowCount > 0) {
        return res.status(400).json('El correo ya existe');
      }
    }

    await pool.query(
      'UPDATE usuario SET apellido = $1, correo = $2, nombre = $3, password = $4, rol = $5 WHERE id = $6',
      [apellido, correo, nombre, password, 'SOCIO', id]
    );
    return res.status(200).json(`Usuario ${id} actualizado correctamente`);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Internal server error');
  }
};
