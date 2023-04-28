/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prettier/prettier */
/* eslint-disable simple-import-sort/imports */
import { Router } from 'express';

import {
  getParqueaderos,
  getParqueaderoById,
  createParqueadero,
  deleteParqueadero,
  updateParqueadero,
} from '../controllers/parqueadero.controller';

const router = Router();

// rutas de parqueaderos
router.get('/parqueaderos', getParqueaderos);
router.get('/parqueaderos/:id', getParqueaderoById);
router.post('/parqueaderos', createParqueadero);
router.put('/parqueaderos/:id', updateParqueadero);
router.delete('/parqueaderos/:id', deleteParqueadero);

export default router;
