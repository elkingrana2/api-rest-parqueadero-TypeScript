/* eslint-disable no-console */
/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable prettier/prettier */
import express from 'express';
import path from 'path';
//import bodyParser from 'body-parser';

import { loadApiEndpoints } from './controllers/api';
import usuarioRoutes from './routes/usuario.router';
import parqueaderoRoutes from './routes/parqueadero.router';
import loginRoutes from './routes/auth.router';
import historialRoutes from './routes/historial.router';

const cors = require('cors');

// definir middleware
import {
  logErrors,
  errorHandler,
  boomErrorHandler,
  validationErrorHandler,
  handleDuplicateKeyErrors,
} from './middlewares/error.handler';
//import { LoginStrategy } from './auth/strategies/login.strategy';
// Create Express server
const app = express();

//app.use(LoginStrategy);
const passport = require('passport');

// global error handler
app.use(cors());

require('./utils/auth');

// Express configuration
app.set('port', process.env.PORT ?? 3000);
app.use(express.json()); // middeleware que transforma la req.body a un json
app.use(express.urlencoded({ extended: true }));
app.use(
  express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 })
);

//app.use(passport.initialize());

//Manejo de rutas
const router = express.Router();
app.use('/api/v1', router);
router.use('/usuarios', usuarioRoutes);
router.use('/parqueaderos', parqueaderoRoutes);
router.use('/auth', loginRoutes);
router.use('/indicadores', historialRoutes);

loadApiEndpoints(app);

// Errores middleware se usan despues de las rutas
app.use(logErrors);
app.use(boomErrorHandler);
app.use(handleDuplicateKeyErrors);
app.use(validationErrorHandler);
app.use(errorHandler);

export default app;
