/* eslint-disable prettier/prettier */
import { Router } from 'express';

//import { tokenValidation, validarTokenAdmin } from '../lib/veryfyToken';
import { getTop10PlacasVehiculoss } from '../controllers/historial.controller';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/top-10', getTop10PlacasVehiculoss);

export default router;
