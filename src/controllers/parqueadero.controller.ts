/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable radix */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { QueryResult } from 'pg';

import { pool } from '../database';

// obtener todos los parqueaderos
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getParqueaderos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query(
      'SELECT * FROM parqueadero ORDER BY id ASC'
    );
    // eslint-disable-next-line no-console
    //console.log(response.rows);
    //res.send('usuarios socios del parqueadero');

    return res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server Error' });
  }
};

// obtener un parqueadero por id
export const getParqueaderoById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  //console.log(req.params.id);
  try {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query(
      'SELECT * FROM parqueadero WHERE id = $1',
      [id]
    );
    return res.json(response.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server Error' });
  }
};

// crear un parqueadero
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createParqueadero = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { nombre, capacidad, direccion } = req.body;

    // si el nombre ya existe, no se puede crear
    const parqueadero = await pool.query(
      'SELECT * FROM parqueadero WHERE nombre = $1',
      [nombre]
    );
    if (parqueadero.rowCount > 0) {
      return res.status(400).json({ message: 'El parqueadero ya existe' });
    }

    // ver que la capacidad sea mayor a 0
    if (capacidad <= 0) {
      return res
        .status(400)
        .json({ message: 'La capacidad debe ser mayor a 0' });
    }

    const espacioDisponible = capacidad;

    const response: QueryResult = await pool.query(
      'INSERT INTO parqueadero (nombre, capacidad, direccion, eliminado, espacio_disponible) VALUES ($1, $2, $3, false, $4)',
      [nombre, capacidad, direccion, espacioDisponible]
    );
    return res.json({
      message: 'Parqueadero creado exitosamente',
      body: {
        parqueadero: {
          nombre,
          capacidad,
          direccion,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server Error' });
  }
};

// eliminar un parqueadero
export const deleteParqueadero = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);

    // si el parqueadero no existe, no se puede eliminar
    const parqueadero = await pool.query(
      'SELECT * FROM parqueadero WHERE id = $1',
      [id]
    );
    if (parqueadero.rowCount === 0) {
      return res.status(400).json('El parqueadero no existe');
    }

    //'UPDATE parqueadero SET eliminado = true WHERE id = $1',
    await pool.query('DELETE FROM parqueadero WHERE id = $1', [id]);
    return res.status(200).json(`Parqueadero ${id} eliminado exitosamente`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server Error' });
  }
};

// actualizar un parqueadero
export const updateParqueadero = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, capacidad, direccion } = req.body;

    // si el parqueadero no existe, no se puede actualizar
    const parqueadero = await pool.query(
      'SELECT * FROM parqueadero WHERE id = $1',
      [id]
    );
    if (parqueadero.rowCount === 0) {
      return res.status(400).json('El parqueadero no existe');
    }

    // si el nombre de parqueadero ha cambiado, verificar que no exista otro parqueadero con el mismo nombre
    if (parqueadero.rows[0].nombre !== nombre) {
      const parqueaderoNombre = await pool.query(
        'SELECT * FROM parqueadero WHERE nombre = $1',
        [nombre]
      );
      if (parqueaderoNombre.rowCount > 0) {
        return res.status(400).json('El parqueadero ya existe');
      }
    }

    // ver que la capacidad sea mayor a 0
    if (capacidad <= 0) {
      return res.status(400).json('La capacidad debe ser mayor a 0');
    }

    const espacioDisponible = capacidad;

    await pool.query(
      'UPDATE parqueadero SET nombre = $1, capacidad = $2, direccion = $3, espacio_disponible = $4 WHERE id = $5',
      [nombre, capacidad, direccion, espacioDisponible, id]
    );
    return res.status(200).json(`Parqueadero ${id} actualizado exitosamente`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server Error' });
  }
};
