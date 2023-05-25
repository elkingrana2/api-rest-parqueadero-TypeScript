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
//import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import swaggerSetup from './configuration/swagger';
import * as swaggerConfig from './configuration/swagger.config.js';

import { loadApiEndpoints } from './controllers/api';
import usuarioRoutes from './routes/usuario.routes';
import parqueaderoRoutes from './routes/parqueadero.routes';
import loginRoutes from './routes/auth.routes';
import historialRoutes from './routes/historial.routes';
import correoRoutes from './routes/correo.routes';

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

// Generar la documentación de Swagger en formato JSON
//const specs = swaggerJSDoc(swaggerConfig);

// Ruta para acceder a la documentación de Swagger generada
//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

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
router.use('/documentacion', swaggerUI.serve, swaggerUI.setup(swaggerSetup));
router.use('/usuarios', usuarioRoutes);
router.use('/parqueaderos', parqueaderoRoutes);
router.use('/auth', loginRoutes);
router.use('/indicadores', historialRoutes);
router.use('/correo', correoRoutes);

loadApiEndpoints(app);

// Errores middleware se usan despues de las rutas
app.use(logErrors);
app.use(boomErrorHandler);
app.use(handleDuplicateKeyErrors);
app.use(validationErrorHandler);
app.use(errorHandler);

export default app;
