/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable import/no-duplicates */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prettier/prettier */
import { Router } from 'express';
//import passport from 'passport';
import * as auth from '../controllers/auth.controller';

import {} from '../lib/veryfyToken';

const router = Router();

router.post('/login', auth.signin);
router.get('/profile', auth.profile);

export default router;

//module.exports = router;
