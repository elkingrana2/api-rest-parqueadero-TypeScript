/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable import/no-duplicates */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prettier/prettier */
import { Router } from 'express';
//import passport from 'passport';
import * as auth from '../controllers/auth.controller';

import {} from '../lib/veryfyToken';

import passport from 'passport';

const router = Router();

router.post('/login', auth.signin);
router.get('/profile', auth.profile);

// rutas de autenticacion
router.post(
  '/logan',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

export default router;

//module.exports = router;
