/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable radix */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';

import ParqueaderoService from '../services/parqueadero.service';

const service = new ParqueaderoService();

// obtener todos los parqueaderos
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getParqueaderos = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const parqueaderos = await service.getParqueaderos();
    return res.status(200).json({ parqueaderos });
  } catch (error) {
    next(error);
  }
};

// obtener un parqueadero por id
export const getParqueaderoById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  //console.log(req.params.id);
  try {
    const id = parseInt(req.params.id);
    const parqueadero = await service.getParqueaderoById(id);
    return res.status(200).json({ parqueadero });
  } catch (error) {
    next(error);
  }
};

// crear un parqueadero
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createParqueadero = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { nombre, direccion, capacidad } = req.body;

    const parqueadero = await service.createParqueadero(
      nombre as string,
      direccion as string,
      capacidad as number
    );
    return res.status(200).json({
      message: 'Parqueadero creado exitosamente',
      body: { parqueadero },
    });
  } catch (error) {
    next(error);
  }
};

// eliminar un parqueadero
export const deleteParqueadero = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const id = parseInt(req.params.id);
    await service.deleteParqueadero(id);
    return res.status(200).json(`Parqueadero ${id} eliminado exitosamente`);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// actualizar un parqueadero
export const updateParqueadero = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, capacidad, direccion } = req.body;

    const parqueadero = await service.updateParqueadero(
      id,
      nombre as string,
      direccion as string,
      capacidad as number
    );
    return res
      .status(200)
      .json({ message: `Parqueadero ${id} actualizado exitosamente` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const ingresarVehiculo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { placa, modelo, color } = req.body;
    const id = parseInt(req.params.id);
    const parqueadero = await service.ingresarVehiculo(
      id,
      placa as string,
      modelo as string,
      color as string
    );
    return res.status(200).json({
      message: 'Vehiculo registrado exitosamente',
      body: { placa, modelo, color },
    });
  } catch (error) {
    next(error);
  }
};

export const registrarSalidaVehiculo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { placa } = req.body;
    const id = parseInt(req.params.id);
    const parqueadero = await service.registrarSalidaVehiculo(
      id,
      placa as string
    );
    return res.status(200).json({
      message: 'Vehiculo retirado exitosamente',
      body: { placa },
    });
  } catch (error) {
    next(error);
  }
}
