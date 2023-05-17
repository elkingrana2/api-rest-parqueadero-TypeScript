/* eslint-disable prettier/prettier */
import { Router } from 'express';

import * as correo from '../controllers/correo.controller';

const router = Router();

router.post('/enviar', correo.enviarCorreo);

export default router;
